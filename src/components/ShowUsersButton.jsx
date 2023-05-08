export default function showUsersButton({
    handleClick
}) {
    return (
        <button 
            className="block mx-auto mb-6 px-8 py-3 bg-white font-extrabold text-lg text-red rounded-3xl hover:scale-110 transition-4 shadow-2xl"
            onClick={handleClick}
        >
            Xem danh sách trúng thưởng
        </button>
    )
}