import PopupFrame from "../popup/PopupFrame";

export default function ConfirmForm({
    handleTurnOffPopup,
    handleSendEmailConfirm,
    gift,
}) {
    return (
        <PopupFrame size="sm" handleTurnOffPopup={handleTurnOffPopup}>
            <h4 className="text-yellow-300 text-xl sm:text-2xl text-center font-extrabold">Chúc mừng bạn đã trúng thưởng</h4>
            <h4 className="mt-4  text-center text-xl text-white">Voucher {gift}</h4>

            <p className="mt-5 text-sm text-white text-center">(Vui lòng chọn "Xác nhận" để nhận thông tin qua Email)</p>
            <button
                onClick={handleSendEmailConfirm}
                className="block mt-2 mb-3 w-10/12 mx-auto h-10 text-center rounded-lg bg-yellow-300 font-bold text-red-700">
                Xác nhận
            </button> 
        </PopupFrame>
    )
}