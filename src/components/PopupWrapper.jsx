export default function PopupWrapper({
    handleTurnOff,
    children
}) {
    return (
        <div className="fixed inset-0 z-50">
            <div className="h-full w-full bg-black opacity-80 animation-fade-in" onClick={handleTurnOff} />
            
            <div className="p-5 absolute top-1/2 left-1/2 animation-zoom-in border-2 border-white rounded-2xl bg-red">
                <span className="inline-block absolute top-0 right-1 font-bold text-xl px-2 cursor-pointer text-white"
                    onClick={handleTurnOff}
                >
                    x
                </span>
                {children}
            </div>
        </div>
    )
}