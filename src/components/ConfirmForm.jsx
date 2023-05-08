export default function ConfirmForm({
    handleSendEmailConfirm,
}) {
    return (
        <div className="w-96 flex flex-col pt-5 pb-3 text-center text-white">
            <h3 className="text-2xl font-extrabold">Chúc mừng bạn đã trúng thưởng</h3>
            <p className="">Voucher 200.000 VNĐ</p>

            <p className="mt-10">(Vui lòng chọn "Xác nhận" để nhận thông tin qua Email)</p>
            <button 
                className="w-80 mt-2 mx-auto h-10 bg-yellow-300 text-red-700 font-extrabold rounded-xl hover:bg-yellow-200 transition-4"
                onClick={handleSendEmailConfirm}
            >
                Xác nhận
            </button>
        </div>
    )
}