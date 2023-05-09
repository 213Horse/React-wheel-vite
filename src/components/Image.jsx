export default function Image({
    className,
    src,
    alt,
}) {
    return (
        <div className={className + " mx-auto"}>
            <img src={src} alt={alt} />
        </div>
    )
}