import Image from "./Image";

export default function Gift({
    handleGiftClick,
    id,
    isSelected,
}) {

    return (
        <div className="w-1/3 p-2">
            <div 
                className="w-full cursor-pointer hover:scale-110 transition-4"
                onClick={() => handleGiftClick(id)}
            >
                {
                    isSelected ? null :

                    <Image src="gift.png" />
                }
            </div>
        </div>
    )
}