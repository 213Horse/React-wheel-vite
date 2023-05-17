import { useState } from "react";
import Image from "./Image";

export default function Gift({
    handleClickGift,
    id,
    isSelected,
    state,
}) {
    const [isFliped, setIsFliped] = useState(true);
    const [voucherSrc,setVoucherSrc] = useState("gift.png");
    
    async function handleClick() {
        if (state === 'sentMail' && isSelected) {
            setIsFliped(!isFliped);
            return;
        }

        const res = await handleClickGift(id);

        if (res) {
            let src = 
                "200.000 VNĐ" == res ? "200.png" :
                "300.000 VNĐ" == res ? "300.png" :
                "500.000 VNĐ" == res ? "500.png" :
                "800.000 VNĐ" == res ? "800.png" :
                "laha.png";
            setVoucherSrc(src); 
        } 
    }

    return (
        <section className="w-1/3 aspect-4/5 perspectives grid place-items-center bg-white transition-4 ">
            <div 
                className={"flip-card h-full relative preserve-3d w-10/12 flex justify-center items-center hover:scale-110 transition-4 cursor-pointer " + (isSelected && (isFliped ? ' animation-flip-to-right' : ' animation-flip-to-left'))}
                onClick={handleClick}>
                <div className="backface-hidden flex justify-center items-center absolute w-full h-full">
                    <Image src="gift.png" />
                </div>
                <div className="backface-hidden flex justify-center items-center rotate-y-180 absolute w-11/12">
                    <Image src={voucherSrc} />
                </div>
            </div>
        </section>
    )
}