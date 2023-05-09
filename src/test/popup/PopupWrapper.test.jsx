export default function PopupWrapper({
    handleTurnOffPopup, 
    children
}) {
    return (
        <section className="fixed inset-0 scroll z-50 bg-black-opacity animation-fade-in"
            onClick={handleTurnOffPopup}>
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3"
                onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </section>
    )
}