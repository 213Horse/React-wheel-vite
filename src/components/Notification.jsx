export default function Notification({
    title,
    content,
}) {
    return (
        <div className="w-96 flex flex-col pt-5 pb-3 gap-4 text-center text-white">
            <h3 className="text-2xl font-extrabold text-yellow-200">{title}</h3>
            <p className="">{content}</p>
        </div>
    )
}