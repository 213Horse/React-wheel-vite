import { useState } from "react";
import Image from "./Image";

export default function Gift({
    handleGiftClick,
    id,
    isSelected,
}) {
    const [voucherSrc,setVoucherSrc] = useState("gift.png");

    let flipCardClass = "flip-card w-full h-full relative transition-4 preserve-3d ";
    if (isSelected) flipCardClass += " animation-flip";

    let containerClass = "w-full cursor-pointer transition-4 ";
    if (!isSelected) containerClass += " hover:scale-110 ";

    return (
        <div className="w-1/3 p-2  ">
            <div 
                className={containerClass}
                onClick={async () => {
                    const res = await handleGiftClick(id);

                    if (res) {
                        console.log(res);

                        let src = 
                            "200.000 VNĐ" == res ? "voucher-200.png" :
                            "300.000 VNĐ" == res ? "voucher-300.png" :
                            "500.000 VNĐ" == res ? "voucher-500.png" :
                            "800.000 VNĐ" == res ? "voucher-800.png" :
                            "voucher-cafe.png";
                        setVoucherSrc(src);
                    }
                }}
            > 
                <div className="w-full h-60 perspectives ">
                    <div className={flipCardClass}>
                        <div className="absolute w-full h-full backface-hidden ">
                            <Image src="gift.png" />
                        </div>
                        <div className="absolute w-full h-full pb-3 px-1 backface-hidden rotate-y-180 ">
                            {/* <div className="flex flex-col items-center h-full w-full bg-gradient-red rounded-lg shadow-xl text-center text-white">
                                <p className="mt-4  uppercase font-bold">Xin chúc mừng</p>
                                <p>Bạn đã trúng</p>
                                <p className="mt-2 font-bold text-yellow-200">VOUCHER</p>
                                <p className="font-extrabold text-yellow-200">200.000 VNĐ</p>
                            </div> */}
                            <Image src={voucherSrc} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}