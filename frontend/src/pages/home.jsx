import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Authcontext';
import withAuth from '../utils/withAuth';
import ImgLogo from '../assets/videocall.jpg';

function HomeComponent() {
    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState('');
    const { addToUserHistory } = useContext(AuthContext);

    const handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) return;
        try {
            await addToUserHistory(meetingCode);
            navigate(`/${meetingCode}`);
        } catch (error) {
            console.error('Failed to join meeting:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-50 flex flex-col">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md shrink-0">
                <h2 className="text-2xl font-bold text-blue-700">Apna Video Call</h2>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/history")}
                        className="flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-100 transition"
                        title="History"
                    >
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M19.418 19A8 8 0 104.582 9m0 0V4m0 5h5" />
                        </svg>
                        <span className="text-gray-700 font-medium">History</span>
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex flex-1 items-center justify-center overflow-hidden">
                <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
                    {/* Left Panel */}
                    <div className="flex-1 p-8 flex flex-col justify-center">
                        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800">
                            Providing Quality Video Call Just Like Quality Education
                        </h2>
                        <form
                            className="flex gap-3"
                            onSubmit={e => {
                                e.preventDefault();
                                handleJoinVideoCall();
                            }}
                        >
                            <input
                                type="text"
                                value={meetingCode}
                                onChange={e => setMeetingCode(e.target.value)}
                                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                                placeholder="Meeting Code"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-medium"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                    {/* Right Panel */}
                    <div className="hidden md:flex items-center justify-center bg-gray-100 p-8">
                        <img src={ImgLogo} alt="Logo" className="max-h-64 object-contain" />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default withAuth(HomeComponent);