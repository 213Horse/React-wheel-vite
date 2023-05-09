import Image from "./Image";

export default function Gift({
    handleGiftClick,
}) {
    return (
        <section className="w-1/3 aspect-4/5 grid place-items-center bg-white">
            <div 
                className="w-10/12 hover:scale-110 transition-4 shadow-lg cursor-pointer"
                onClick={handleGiftClick}>
                {/* <Image src="gift.png" /> */}
                <Image src="voucher-200.webp" />
            </div>
        </section>
    )
}