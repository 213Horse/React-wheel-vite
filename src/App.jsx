import './css/App.css'
import Image from "./components/Image"
import Gift from './components/Gift'
import PopupWrapper from './components/popup/PopupWrapper'
import { useEffect, useRef, useState } from 'react';
import UserInfoForm from './components/form/UserInfoForm.test';
// import UserInfoForm from './components/form/UserInfoForm';
import Notification from './components/popup/Notification';
import ConfirmForm from './components/form/ConfirmForm';
import UserList from './components/UserList';
import createUser from './services/createUser';
import ShowUsersButton from './components/ShowUsersButton';
import Spinner from './components/Spinner';
import sendMail from './services/sendMail';
import addVoucher from './services/addVoucher';
const SITE_KEY = "6LcDWTQlAAAAAKc32Bfp6IrAh2I5iPPVH94XzoEP";

export default function App() {
    const [state, setState] = useState('init'); // init --> gotUserData --> sentUserData --> sentMail
    const [popup, setPopup] = useState(null);
    // data
    const [userInfo, setUserInfo] = useState(null);
    const [selectedGiftId, setSelectedGiftId] = useState(null);
    const giftRef = useRef('Khởi tạo dữ liệu');
    const voucherCode = useRef('Khởi tạo dữ liệu');
    const [turnOffDisabled, setTurnOffDisabled] = useState(false);

    /**
     * 
     *! embedded recapCha-v3 to page 
    */
    useEffect(() => {
        const loadScriptByURL = (id, url, callback) => {
            const isScriptExist = document.getElementById(id);

            if (!isScriptExist) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = url;
                script.id = id;
                script.onload = function () {
                    if (callback) callback();
                };
                document.body.appendChild(script);
            }

            if (isScriptExist && callback) callback();
        }

        // load the script by passing the URL
        loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`, function () {
            console.log("Script recapCha-v3 loaded!");
        });
    }, []);

    async function handleClickGift(giftId) {
        if (state === 'init') {
            setPopup(
                <UserInfoForm
                    handleFetchUserInfo={handleFetchUserInfo}
                    handleTurnOffPopup={handleTurnOffPopup} />
            );
        }
        else if (state === 'gotUserData') {
            setPopup(<Spinner />)
            const res = await createUser(userInfo);
            const data = res.data;
            giftRef.current = data.gift; // [currently changed]
            voucherCode.current = data.voucherCode; // [currently changed]
            //  console.log(giftRef.current + "   -   " + voucherCode.current);
            // There is an error
            if (data?.message) {
                setPopup(<Notification title="Lỗi" content={data?.message} handleTurnOffPopup={handleTurnOffPopup} />)
                setState('init');
                setSelectedGiftId(null)
            }
            // No error
            else {
                setPopup(
                    <ConfirmForm
                        gift={giftRef.current}
                        handleSendEmailConfirm={handleSendEmailConfirm}
                        handleTurnOffPopup={handleTurnOffPopup} />
                )
                if (selectedGiftId == null)
                    setSelectedGiftId(giftId);
                setState('sentUserData');
            }

            return giftRef.current;
        }
        else if (state === 'sentUserData') {
            setPopup(
                <ConfirmForm
                    gift={giftRef.current}
                    handleSendEmailConfirm={handleSendEmailConfirm}
                    handleTurnOffPopup={handleTurnOffPopup} />
            )
        }
        else if (state === 'sentMail') {
            setPopup(<Notification handleTurnOffPopup={handleTurnOffPopup} title="Bạn đã hết lượt chơi game" content="Cảm ơn bạn đã tham gia" />)
        }
    }

    function handleFetchUserInfo(nextUserInfo) {
        setUserInfo(nextUserInfo);
        setPopup(false);
        setState('gotUserData');
        setTurnOffDisabled(false);
        setTimeout(() => {
            setPopup(<Notification title="Đã lưu thông tin người nhận" handleTurnOffPopup={handleTurnOffPopup} content="Chọn 1 hộp quà bất kỳ" />)
        }, 300);
    }

    async function handleSendEmailConfirm() {
        setPopup(false);
        setPopup(<Spinner />);

        // Call API 
        const price =
            "200.000 VNĐ" == giftRef.current ? 200000 :
                "300.000 VNĐ" == giftRef.current ? 300000 :
                    "500.000 VNĐ" == giftRef.current ? 500000 :
                        "800.000 VNĐ" == giftRef.current ? 800000 :
                            30000;
        await addVoucher(voucherCode.current, price); // Doesn't catch error yet when fetching failed

        // Call API
        const response = await sendMail(userInfo.phoneNumber);
        setState('sentMail');

        if (response?.message)
            setTimeout(() => setPopup(<Notification handleTurnOffPopup={handleTurnOffPopup} title="Thông báo" content={response?.message} />))
    }

    function handleTurnOffPopup() {
        setPopup(null);
    }

    useEffect(() => {
        if (state == 'init') {
            setTimeout(() => {
                setPopup(
                    <UserInfoForm
                        handleFetchUserInfo={handleFetchUserInfo}
                        handleTurnOffPopup={handleTurnOffPopup}
                        turnOffDisabled={true} />
                );
            }, 500);

            setTurnOffDisabled(true);
        }

    }, [state]);

    return (
        <div className={"w-screen overflow-x-hidden"}>
            {popup && <PopupWrapper handleTurnOffPopup={handleTurnOffPopup} turnOffDisabled={turnOffDisabled}>{popup}</PopupWrapper>}
            <main className="w-full max-w-160 mx-auto pt-6 pb-8 sm:pb-12 bg-blue-300">
                <Image className="w-80" src="icon-logo.png" />
                <Image className="mt-12 mb-4 w-2/3" src="claim-7.png" />
                <Image className="mb-4 w-2/3" src="react-removebg-preview.png" />
                {(state === 'sentMail' || state === 'sentUserData') && <ShowUsersButton handleClick={() => setPopup(<UserList handleTurnOffPopup={handleTurnOffPopup} />)} />}
                {/* Gift boxes here  */}
                <Image className="w-10/12" src="dau-qua.png" />
                <section className="w-9/12 mx-auto p-1 sm:p-2 bg-white">
                    <div className='w-full flex flex-wrap'>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9].map(item =>
                                <Gift
                                    key={item}
                                    id={item}
                                    isSelected={item == selectedGiftId}
                                    handleClickGift={handleClickGift}
                                    state={state} />
                            )
                        }
                    </div>
                </section>

                {/* App bottom  */}
                <section>
                    <Image className="mt-12 w-1/3" src="danh-sach.png" />
                    <Image className="w-full" src="voucher1-02.png" />
                    <Image className="mt-5 w-2/5" src="theo-doi.png" />
                    <section className='mt-5 sm:mt-8 w-full flex justify-center items-center gap-4'>
                        <a target='_blank' href="https://www.facebook.com/bsmart.edu.vn" className='flex justify-center items-center w-1/6 aspect-square bg-white rounded-full transition-4 text-blue-800 text-5xl sm:text-7xl hover:scale-110 transition-4'><i className="fa-brands fa-facebook"></i></a>
                        <a target='_blank' href="https://www.youtube.com/channel/UCxuIkuRJkam2Ii3xPehiirw" className='flex justify-center items-center w-1/6 aspect-square bg-white rounded-full transition-4 text-red-600 text-5xl  sm:text-7xl hover:scale-110 transition-4'><i className="fa-brands fa-youtube"></i></a>
                        <a target='_blank' href="https://www.linkedin.com/company/amazingtech74/" className='flex justify-center items-center w-1/6 aspect-square bg-white rounded-full transition-4 text-linkedin-color text-5xl sm:text-7xl hover:scale-110 transition-4'><i className="fa-brands fa-linkedin"></i></a>
                    </section>
                </section>
            </main>
        </div>
    )
}