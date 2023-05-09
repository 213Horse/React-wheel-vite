import './css/App.css'
import Image from "./test/Image"
import Gift from './test/Gift.test'
import PopupWrapper from './test/popup/PopupWrapper.test'
import { useState } from 'react';
import UserInfoForm from './test/form/UserInfoForm';
import Notification from './test/popup/Notification';
import ConfirmForm from './test/form/ConfirmForm';
import UserList from './test/UserList';
import createUser from './services/createUser';
import ShowUsersButton from './test/ShowUsersButton';
import Spinner from './test/Spinner';
import sendMail from './services/sendMail';

export default function App() {
    const [state, setState] = useState('init'); // init --> gotUserData --> sentMail
    const [popup, setPopup] = useState(null);
    // data
    const [userInfo, setUserInfo] = useState(null);
    const [selectedGiftId, setSelectedGiftId] = useState(null);

    async function handleClickGift(giftId) {
        if (state === 'init') {
            setPopup(
                <UserInfoForm 
                    handleFetchUserInfo={handleFetchUserInfo}
                    handleTurnOffPopup={handleTurnOffPopup}/>
            );
        }
        else if (state === 'gotUserData') {
            if (selectedGiftId == null)
                setSelectedGiftId(giftId);
            
            setPopup(<Spinner />)
            const res = await createUser(userInfo);
            const data = res.data;
            // There is a error
            if (data?.message) { 
                setPopup(<Notification title="Lỗi" content={data?.message} handleTurnOffPopup={handleTurnOffPopup} />)
                setState('init');
                setSelectedGiftId(null)
            }
            // No error
            else {
                setPopup(
                    <ConfirmForm  
                        gift={data}
                        handleSendEmailConfirm={handleSendEmailConfirm}
                        handleTurnOffPopup={handleTurnOffPopup} />
                    )
                setState('sentMail');
            }

            return data;
        }
        else if (state === 'sentMail') {
            setPopup(<Notification handleTurnOffPopup={handleTurnOffPopup} title="Bạn đã hết lượt chơi game" content="Cảm ơn bạn đã tham gia" />)
        }
    }

    function handleFetchUserInfo(nextUserInfo) {
        setUserInfo(nextUserInfo);
        setPopup(false);
        setState('gotUserData');
        setTimeout(() => {
            setPopup(<Notification title="Đã lưu thông tin người nhận" handleTurnOffPopup={handleTurnOffPopup} content="Chọn 1 hộp quà bất kỳ" />)
        }, 300);
    } 
    async function handleSendEmailConfirm() {
        setPopup(false);
        setPopup(<Spinner />)
        const response = await sendMail(userInfo.phoneNumber);

        if (response?.message)
            setTimeout(() => setPopup(<Notification handleTurnOffPopup={handleTurnOffPopup} title="Thông báo" content={response?.message} />))
    }

    function handleTurnOffPopup() {
        setPopup(null);
    }



    return (
        <div className={"w-screen overflow-x-hidden"}>
            { popup && <PopupWrapper handleTurnOffPopup={handleTurnOffPopup}>{popup}</PopupWrapper>}
            <main className="w-full max-w-160 mx-auto pt-6 pb-8 sm:pb-12 bg-blue-300">
                {state === 'sentMail' && <ShowUsersButton handleClick={() => setPopup(<UserList handleTurnOffPopup={handleTurnOffPopup}/>)}/>}
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
                                    handleClickGift={handleClickGift} />
                            ) 
                        }
                    </div>
                </section>


                {/* App bottom  */}
                <section>
                    <Image className="mt-12 w-1/3" src="danh-sach.png" />
                    <Image className="w-full" src="voucher-01.png" />
                    <Image className="mt-5 w-2/5" src="theo-doi.png" />
                    <section className='mt-5 sm:mt-8 w-full flex justify-center items-center gap-4'>
                        <a href="https://www.facebook.com/bsmart.edu.vn" className='flex justify-center items-center w-1/6 aspect-square bg-white rounded-full transition-4 text-blue-800 text-5xl sm:text-7xl hover:scale-110 transition-4'><i className="fa-brands fa-facebook"></i></a>
                        <a href="https://www.youtube.com/channel/UCxuIkuRJkam2Ii3xPehiirw" className='flex justify-center items-center w-1/6 aspect-square bg-white rounded-full transition-4 text-red-600 text-5xl  sm:text-7xl hover:scale-110 transition-4'><i className="fa-brands fa-youtube"></i></a>
                        <a href="https://www.linkedin.com/company/amazingtech74/" className='flex justify-center items-center w-1/6 aspect-square bg-white rounded-full transition-4 text-linkedin-color text-5xl sm:text-7xl hover:scale-110 transition-4'><i className="fa-brands fa-linkedin"></i></a>
                    </section>
                </section>
            </main>
        </div>
    )
}