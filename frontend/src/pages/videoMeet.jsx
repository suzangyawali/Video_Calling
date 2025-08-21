import { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";
import server from '../environment';

var connections = {};
var processedJoinEvents = new Set(); // Track processed join events
const peerConfigConnections = {
    "iceServers": [{ "urls": "stun:stun.l.google.com:19302" }]
};

export default function VideoMeetComponent() {
    const socketRef = useRef();
    const socketIdRef = useRef();
    const localVideoref = useRef();
    const videoRef = useRef([]);
    
    // State variables
    const [videoAvailable, setVideoAvailable] = useState(true);
    const [audioAvailable, setAudioAvailable] = useState(true);
    const [video, setVideo] = useState(false);
    const [audio, setAudio] = useState(false);
    const [screen, setScreen] = useState(false);
    const [showModal, setModal] = useState(false);
    const [screenAvailable, setScreenAvailable] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [newMessages, setNewMessages] = useState(0);
    const [askForUsername, setAskForUsername] = useState(true);
    const [username, setUsername] = useState("");
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        getPermissions();
    }, []);

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
        }
    }, [video, audio]);

    useEffect(() => {
        if (screen !== undefined) {
            getDisplayMedia();
        }
    }, [screen]);

    // Helper function to safely add tracks to RTCPeerConnection
    const addTracksToConnection = (connection, stream) => {
        if (!stream || !connection) return;
        
        // Get existing senders
        const existingSenders = connection.getSenders();
        
        stream.getTracks().forEach(track => {
            // Check if we already have a sender for this track kind
            const existingSender = existingSenders.find(sender => 
                sender.track && sender.track.kind === track.kind
            );
            
            if (!existingSender) {
                try {
                    console.log('Adding track:', track.kind, 'to connection');
                    connection.addTrack(track, stream);
                } catch (error) {
                    console.error('Error adding track:', error);
                }
            } else {
                console.log('Track of kind', track.kind, 'already exists, skipping');
            }
        });
    };

    // Helper function to replace tracks in existing senders
    const replaceTracksInConnection = (connection, newStream) => {
        if (!connection) return;
        
        const senders = connection.getSenders();
        
        if (newStream) {
            const videoTrack = newStream.getVideoTracks()[0];
            const audioTrack = newStream.getAudioTracks()[0];
            
            senders.forEach(sender => {
                if (sender.track) {
                    if (sender.track.kind === 'video' && videoTrack) {
                        sender.replaceTrack(videoTrack).catch(e => console.log('Error replacing video track:', e));
                    } else if (sender.track.kind === 'audio' && audioTrack) {
                        sender.replaceTrack(audioTrack).catch(e => console.log('Error replacing audio track:', e));
                    }
                }
            });
        } else {
            // Remove all tracks if no new stream
            senders.forEach(sender => {
                if (sender.track) {
                    sender.replaceTrack(null).catch(e => console.log('Error removing track:', e));
                }
            });
        }
    };

    const getPermissions = async () => {
        try {
            // Check video permission
            try {
                const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setVideoAvailable(true);
                videoStream.getTracks().forEach(track => track.stop()); // Stop test stream
            } catch {
                setVideoAvailable(false);
            }

            // Check audio permission
            try {
                const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setAudioAvailable(true);
                audioStream.getTracks().forEach(track => track.stop()); // Stop test stream
            } catch {
                setAudioAvailable(false);
            }

            // Check screen share availability
            setScreenAvailable(!!navigator.mediaDevices.getDisplayMedia);

            // Get initial user media for preview
            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ 
                    video: videoAvailable, 
                    audio: audioAvailable 
                });
                window.localStream = userMediaStream;
                if (localVideoref.current) {
                    localVideoref.current.srcObject = userMediaStream;
                }
            }
        } catch (error) {
            console.error('Error getting permissions:', error);
        }
    };

    const getDisplayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDisplayMediaSuccess)
                    .catch((e) => console.log(e));
            }
        }
    };

    const getUserMediaSuccess = (stream) => {
        try {
            if (window.localStream) {
                window.localStream.getTracks().forEach(track => track.stop());
            }
        } catch (e) { 
            console.log(e);
        }

        window.localStream = stream;
        if (localVideoref.current) {
            localVideoref.current.srcObject = stream;
        }

        // Replace tracks in existing connections instead of adding new ones
        for (let id in connections) {
            if (id === socketIdRef.current) continue;
            
            replaceTracksInConnection(connections[id], stream);

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
                    })
                    .catch(e => console.log(e));
            });
        }

        stream.getTracks().forEach(track => {
            track.onended = () => {
                setVideo(false);
                setAudio(false);

                try {
                    if (localVideoref.current && localVideoref.current.srcObject) {
                        let tracks = localVideoref.current.srcObject.getTracks();
                        tracks.forEach(track => track.stop());
                    }
                } catch (e) { 
                    console.log(e);
                }

                let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
                window.localStream = blackSilence();
                if (localVideoref.current) {
                    localVideoref.current.srcObject = window.localStream;
                }

                // Replace with black/silent stream
                for (let id in connections) {
                    replaceTracksInConnection(connections[id], window.localStream);

                    connections[id].createOffer().then((description) => {
                        connections[id].setLocalDescription(description)
                            .then(() => {
                                socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
                            })
                            .catch(e => console.log(e));
                    });
                }
            };
        });
    };

    const getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .catch((e) => console.log(e));
        } else {
            try {
                if (localVideoref.current && localVideoref.current.srcObject) {
                    let tracks = localVideoref.current.srcObject.getTracks();
                    tracks.forEach(track => track.stop());
                }
            } catch (e) {
                console.log(e);
            }

            // Create black/silent stream when no media
            let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            if (localVideoref.current) {
                localVideoref.current.srcObject = window.localStream;
            }

            // Replace with black/silent stream
            for (let id in connections) {
                replaceTracksInConnection(connections[id], window.localStream);
            }
        }
    };

    const getDisplayMediaSuccess = (stream) => {
        try {
            if (window.localStream) {
                window.localStream.getTracks().forEach(track => track.stop());
            }
        } catch (e) { 
            console.log(e);
        }

        window.localStream = stream;
        if (localVideoref.current) {
            localVideoref.current.srcObject = stream;
        }

        // Replace tracks in existing connections
        for (let id in connections) {
            if (id === socketIdRef.current) continue;

            replaceTracksInConnection(connections[id], stream);

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
                    })
                    .catch(e => console.log(e));
            });
        }

        stream.getTracks().forEach(track => {
            track.onended = () => {
                setScreen(false);

                try {
                    if (localVideoref.current && localVideoref.current.srcObject) {
                        let tracks = localVideoref.current.srcObject.getTracks();
                        tracks.forEach(track => track.stop());
                    }
                } catch (e) { 
                    console.log(e);
                }

                let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
                window.localStream = blackSilence();
                if (localVideoref.current) {
                    localVideoref.current.srcObject = window.localStream;
                }

                getUserMedia();
            };
        });
    };

    const gotMessageFromServer = (fromId, message) => {
        try {
            var signal = JSON.parse(message);

            if (fromId !== socketIdRef.current) {
                if (signal.sdp) {
                    connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                        if (signal.sdp.type === 'offer') {
                            connections[fromId].createAnswer().then((description) => {
                                connections[fromId].setLocalDescription(description).then(() => {
                                    socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }));
                                }).catch(e => console.log(e));
                            }).catch(e => console.log(e));
                        }
                    }).catch(e => console.log(e));
                }

                if (signal.ice) {
                    connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e));
                }
            }
        } catch (e) {
            console.error('Error parsing message from server:', e);
        }
    };

    const connectToSocketServer = () => {
        socketRef.current = io.connect(server, { secure: false });

        socketRef.current.on('signal', gotMessageFromServer);

        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-call', window.location.href);
            socketIdRef.current = socketRef.current.id;

            socketRef.current.on('chat-message', addMessage);

            socketRef.current.on('user-left', (id) => {
                setVideos((videos) => videos.filter((video) => video.socketId !== id));
                // Clean up connection
                if (connections[id]) {
                    connections[id].close();
                    delete connections[id];
                }
            });

            socketRef.current.on('user-joined', (id, clients) => {
                console.log('User joined event:', id, 'Clients:', clients);
                
                // Create a unique key for this join event to prevent duplicates
                const eventKey = `${id}-${clients.length}-${Date.now()}`;
                
                // Prevent processing the same join event multiple times
                if (processedJoinEvents.has(eventKey)) {
                    console.log('Join event already processed, skipping');
                    return;
                }
                processedJoinEvents.add(eventKey);
                
                // Clean up old processed events (keep only last 10)
                if (processedJoinEvents.size > 10) {
                    const oldestKey = processedJoinEvents.values().next().value;
                    processedJoinEvents.delete(oldestKey);
                }
                
                // Create connections for all clients except self
                clients.forEach((socketListId) => {
                    // Skip self
                    if (socketListId === socketIdRef.current) return;
                    
                    // Only create new connection if it doesn't exist
                    if (!connections[socketListId]) {
                        console.log('Creating new connection for:', socketListId);
                        connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
                        
                        connections[socketListId].onicecandidate = function (event) {
                            if (event.candidate != null) {
                                socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }));
                            }
                        };

                        connections[socketListId].ontrack = (event) => {
                            console.log('Received track from:', socketListId, 'Stream ID:', event.streams[0].id);
                            
                            setVideos(prevVideos => {
                                console.log('Current videos before update:', prevVideos.map(v => v.socketId));
                                
                                // Ensure no duplicate entries for the same socketId
                                const filteredVideos = prevVideos.filter(video => video.socketId !== socketListId);
                                
                                console.log('Adding new video for:', socketListId);
                                // Always add as new video after filtering duplicates
                                const newVideo = {
                                    socketId: socketListId,
                                    stream: event.streams[0],
                                    autoplay: true,
                                    playsinline: true
                                };
                                const updatedVideos = [...filteredVideos, newVideo];
                                videoRef.current = updatedVideos;
                                console.log('Updated videos:', updatedVideos.map(v => v.socketId));
                                return updatedVideos;
                            });
                        };

                        // Add tracks to new connection
                        if (window.localStream !== undefined && window.localStream !== null) {
                            addTracksToConnection(connections[socketListId], window.localStream);
                        } else {
                            let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
                            window.localStream = blackSilence();
                            addTracksToConnection(connections[socketListId], window.localStream);
                        }
                    } else {
                        console.log('Connection already exists for:', socketListId);
                    }
                });

                // Only create offers if this is MY join event
                if (id === socketIdRef.current) {
                    console.log('This is my join event, creating offers for existing connections');
                    for (let id2 in connections) {
                        if (id2 === socketIdRef.current) continue;

                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                                .then(() => {
                                    socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }));
                                })
                                .catch(e => console.log(e));
                        });
                    }
                } else {
                    console.log('Someone else joined:', id, 'Not creating offers');
                }
            });
        });
    };

    // Utility functions
    const silence = () => {
        let ctx = new AudioContext();
        let oscillator = ctx.createOscillator();
        let dst = oscillator.connect(ctx.createMediaStreamDestination());
        oscillator.start();
        ctx.resume();
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
    };

    const black = ({ width = 640, height = 480 } = {}) => {
        let canvas = Object.assign(document.createElement("canvas"), { width, height });
        canvas.getContext('2d').fillRect(0, 0, width, height);
        let stream = canvas.captureStream();
        return Object.assign(stream.getVideoTracks()[0], { enabled: false });
    };

    // Event handlers
    const handleVideo = () => setVideo(!video);
    const handleAudio = () => setAudio(!audio);
    const handleScreen = () => setScreen(!screen);
    const handleEndCall = () => {
        try {
            if (localVideoref.current && localVideoref.current.srcObject) {
                let tracks = localVideoref.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        } catch (e) {
            console.log(e);
        }
        window.location.href = "/";
    };
    const openChat = () => { setModal(true); setNewMessages(0); };
    const closeChat = () => setModal(false);
    const handleMessage = (e) => setMessage(e.target.value);

    const addMessage = (data, sender, socketIdSender) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: sender, data: data }
        ]);
        if (socketIdSender !== socketIdRef.current) {
            setNewMessages((prevNewMessages) => prevNewMessages + 1);
        }
    };

    const sendMessage = () => {
        if (message.trim()) {
            socketRef.current.emit('chat-message', message, username);
            setMessage("");
        }
    };

    const getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    };

    const connect = () => {
        if (username.trim()) {
            setAskForUsername(false);
            getMedia();
        }
    };

    // SVG Icons component
    const Icon = ({ name, className }) => {
        const icons = {
            videocam: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 7h8a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" /></svg>,
            videocamOff: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 7h8a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" /></svg>,
            mic: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4" /></svg>,
            micOff: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15.414A2 2 0 004 16v2a2 2 0 002 2h12a2 2 0 002-2v-2a2 2 0 00-1.414-1.414L5.586 15.414zM3 3l18 18" /></svg>,
            callEnd: <svg className={className} fill="none" stroke="red" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" /></svg>,
            screenShare: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            stopScreenShare: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            chat: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
        };
        return icons[name] || null;
    };

    return (
        <div className=" fixed inset-0 bg-[#010430] overflow-hidden">
            {askForUsername ? (
                <div className="flex flex-col items-center justify-center rounded-lg shadow-lg p-8 space-y-6 max-w-md mx-auto mt-50 mb-16 border-4 border-solid border-blue-500 bg-white"> 
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter into Lobby</h2>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && connect()}
                    />
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-medium disabled:bg-gray-400"
                        onClick={connect}
                        disabled={!username.trim()}
                    >
                        Connect
                    </button>
                    <div>
                        <video ref={localVideoref} autoPlay muted className="mt-4 rounded shadow max-w-xs" />
                    </div>
                </div>
            ) : (
                <div className="relative h-full w-full">
                    {/* Chat Modal */}
                    {showModal && (
            <div className="absolute right-4 top-8 bottom-4 w-100 bg-white rounded-xl shadow-2xl z-20 flex flex-col max-h-[calc(100vh-2rem)] ">
              <div className="flex justify-between items-center border-b border-gray-200 p-4 flex-shrink-0">
                <h1 className="text-xl font-bold text-blue-700">Chat</h1>
                <button onClick={closeChat} className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">&times;</button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                {messages.length !== 0 ? messages.map((item, index) => (
                  <div className="bg-gray-50 rounded-lg p-3" key={index}>
                    <p className="font-semibold text-blue-600 text-sm mb-1 text-left">{item.sender}</p>
                    <p className="text-gray-800 text-sm leading-relaxed text-left">{item.data}</p>
                  </div>
                )) : (
                  <div className="text-center text-gray-400 py-8">
                    <p>No Messages Yet</p>
                    <p className="text-xs mt-1">Start the conversation!</p>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-200 p-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <input
                    value={message}
                    onChange={handleMessage}
                    onKeyDown={(e) => {
                   if (e.key === 'Enter') {
                      sendMessage();
                     }
                    }}
                    className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Type your message..."
                  />
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                    onClick={sendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

                    {/* Controls */}
                    <div className="absolute w-screen bottom-0 text-center flex justify-center gap-6 pb-6">
                        <button onClick={handleVideo} className={`p-3 rounded-full transition ${video ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}`}>
                            {video ? <Icon name="videocam" className="w-12 h-12 text-white" /> : <Icon name="videocamOff" className="w-12 h-12 text-white" />}
                        </button>
                        <button onClick={handleEndCall} className="p-3 rounded-full bg-red-700 hover:bg-red-800 transition">
                            <Icon name="callEnd" className="w-12 h-12" />
                        </button>
                        <button onClick={handleAudio} className={`p-3 rounded-full transition ${audio ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}`}>
                            {audio ? <Icon name="mic" className="w-12 h-12 text-white" /> : <Icon name="micOff" className="w-12 h-12 text-white" />}
                        </button>
                        {screenAvailable && (
                            <button onClick={handleScreen} className={`p-3 rounded-full transition ${screen ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-800 hover:bg-blue-700'}`}>
                                {screen ? <Icon name="screenShare" className="w-12 h-12 text-white" /> : <Icon name="stopScreenShare" className="w-12 h-12 text-white" />}
                            </button>
                        )}
                        <button onClick={() => setModal(!showModal)} className="p-3 rounded-full bg-gray-800 hover:bg-blue-700 transition relative">
                            <Icon name="chat" className="w-12 h-12 text-white" />
                            {newMessages > 0 && (
                                <span className="absolute top-1 right-1 bg-orange-500 text-white text-xs rounded-full px-2 py-0.5">{newMessages}</span>
                            )}
                        </button>
                    </div>

                    {/* Local Video */}
                    <video
                        className="absolute left-0 bottom-[10vh] h-[20vh] w-auto rounded-2xl shadow-lg bg-black"
                        ref={localVideoref}
                        autoPlay
                        muted
                        playsInline
                    />

                    {/* Conference Videos */}
                    <div className="flex flex-wrap gap-2 p-2 absolute top-0 left-0 w-full h-[80vh] items-center justify-center ">
                        {videos.map((video) => (
                            <div key={`${video.socketId}-${video.stream?.id || 'no-stream'}`} className="rounded-xl shadow-2xl border-2 border-gray-600/30 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/20">        
                                <video
                                    data-socket={video.socketId}
                                    ref={ref => {
                                        if (ref && video.stream) {
                                            ref.srcObject = video.stream;
                                        }
                                    }}
                                    autoPlay
                                    playsInline
                                    className="rounded-lg min-w-[30vw] w-[40vw] h-[20vh]"
                                    style={{ minWidth: '60vw', width: '50vw', height: '45vh' }}
                                />
                            </div>
                        ))}
                    </div>

                    
                </div>
            )}
        </div>
    );
}