export default function Image({
    className,
    src,
    alt,
}) {
    return (
        <div className={className + " overflow-hidden mx-auto"}>
            <img className="overflow-hidden" src={src} alt={alt} />
        </div>
    )
}