import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Authcontext';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                // If response is { data: [...] }, use history.data
                // If response is [...], use history directly
                setMeetings(Array.isArray(history) ? history : history.data);
            } catch {
                // Optionally show a toast/snackbar here
            }
        };
        fetchHistory();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col">
            {/* Sticky Header */}
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur flex items-center justify-between px-8 py-5 shadow">
                <h1 className="text-2xl font-bold text-blue-700 tracking-tight">Meeting History</h1>
                <button
                    onClick={() => routeTo("/home")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0v6m0-6H7m6 0H7" />
                    </svg>
                    Home
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 overflow-auto">
                <div className="w-full max-w-3xl">
                    {meetings.length !== 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {meetings.map((e, i) => (
                                <div key={e._id || i} className="bg-white/90 shadow-lg rounded-xl p-6 flex flex-col border border-gray-100 hover:shadow-xl transition">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-blue-600 font-bold text-lg tracking-wide">
                                            {e.meetingCode}
                                        </span>
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                                            {formatDate(e.scheduledAt)}
                                        </span>
                                    </div>
                                    <div className="text-gray-600 mt-2">
                                        <span className="font-medium">Meeting Code:</span> <span className="font-mono">{e.meetingCode}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <svg className="w-16 h-16 text-blue-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m-4-5v9" />
                            </svg>
                            <div className="text-gray-400 text-xl font-semibold">
                                No meeting history found.
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}