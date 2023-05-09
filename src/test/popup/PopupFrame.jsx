export default function PopupFrame({
    size = 'md',
    handleTurnOffPopup,
    children,
}) {
    let className = "mx-auto w-90vw bg-red rounded-lg border-2 border-white";
    if (size == 'md')
        className += ' max-w-120';
    else if (size == 'lg')
        className += ' max-w-160';
    else if (size == 'sm')
        className += ' max-w-100';

    return (
        <main className={className}>
            <div className="pt-2 pr-3 text-white cursor-pointer flex justify-end">
                <div onClick={handleTurnOffPopup}><i className="fa-solid fa-xmark fa-lg"></i></div>
            </div>
            <div className="px-3 py-2">
                {children}
            </div>
        </main>
    )
}