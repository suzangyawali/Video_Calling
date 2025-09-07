
export default function Modal({ show, onClose, title, children }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full relative animate-fade-in">
        <h2 className="text-xl font-bold mb-4 text-blue-700">{title}</h2>
        <div className="mb-6 text-gray-700 text-base">{children}</div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
