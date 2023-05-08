import Image from "./Image";

export default function Gift({
    handleGiftClick,
    id,
    isSelected,
}) {

    let flipCardClass = "flip-card w-full h-full relative transition-4 preserve-3d ";
    if (isSelected) flipCardClass += " animation-flip";

    return (
        <div className="w-1/3 p-2  ">
            <div 
                className="w-full cursor-pointer hover:scale-110 transition-4"
                onClick={() => handleGiftClick(id)}
            > 
                <div className="w-full h-60 perspective">
                    <div className={flipCardClass}>
                        <div className="absolute w-full h-full backface-hidden">
                            <Image src="gift.png" />
                        </div>
                        <div className="absolute w-full h-full backface-hidden rotate-y-180">
                            <Image src="fb.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}