import PopupFrame from "./PopupFrame";

export default function Notification({
    title,
    content,
    handleTurnOffPopup,
}) {
    return (
        <PopupFrame handleTurnOffPopup={handleTurnOffPopup}>
            <h4 className="text-yellow-300 text-xl sm:text-2xl text-center font-extrabold">{title}</h4>
            <p className="text-white text-center py-4">{content}</p>
        </PopupFrame>
    )
}