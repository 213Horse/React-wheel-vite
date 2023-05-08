import { useState } from 'react';
import './css/App.css'
import Gift from './components/Gift';
import Image from './components/Image';
import PopupWrapper from './components/PopupWrapper';
import UserInfoForm from './components/UserInfoForm';
import Notification from './components/Notification';
import ConfirmForm from './components/ConfirmForm';
import createUser from './services/createUser';
import sendMail from './services/sendMail';
import useUsers from './hooks/useUsers';
import ShowUsersButton from './components/ShowUsersButton';
import Spinner from './components/Spinner';
import UserList from './components/UserList';
import axios from 'axios';


export default function App() {
    const [appState, setAppState] = useState(0); // init --> gotData --> sentEmail
    const [popup, setPopup] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [selectedGiftId, setSelectedGiftId] = useState(null);
    const users = useUsers(appState);

    async function onGiftClick(giftId) {
        if (appState == 0) {
            setPopup(
                <UserInfoForm 
                    handleFetchData={handleFetchData}
                />
            );
        }
        else if (appState == 1) {
            if (selectedGiftId == null)
                setSelectedGiftId(giftId);

            try {
                const res =  await axios.post(`http://localhost:5029/api/Wheel/spin-wheel?fullname=${userInfo.fullName}&phone=${userInfo.phoneNumber}&email=${userInfo.email}`)
                console.log(res.data);

                const data = res.data
                // ERROR
                if (data?.message) { 
                    setPopup(<Notification title="Lỗi" content={data?.message} />)
                    setAppState(0);
                    setSelectedGiftId(null)
                }
                // user info is OK
                else {
                    setPopup(
                        <ConfirmForm  
                            gift={data}
                            handleSendEmailConfirm={handleSendEmailConfirm} />
                        )
                    setAppState(2);
                }
            } catch(err) {
                console.log({ err })

            }

            // let data = await handleSubmitData();
            // console.log(data); // undefined

            
        }
        else {
            setPopup(<Notification title="Bạn đã hết lượt chơi game" content="Cảm ơn bạn đã tham gia" />)
        }
    }

    function handleFetchData(nextUserInfo) {
        setUserInfo(nextUserInfo);
        setPopup(false);
        setAppState(1);

        setTimeout(() => {
            setPopup(<Notification title="Đã lưu thông tin người nhận" content="Chọn 1 hộp quà bất kỳ" />)
        }, 300);

    }

    async function handleSubmitData() {
        setPopup(<Spinner />);

        // return createUser({
        //     "fullname": userInfo.fullName,
        //     "phone": userInfo.phoneNumber,
        //     "email": userInfo.email,
        // }); 

        return await fetch(`http://localhost:5029/api/Wheel/spin-wheel?fullname=${userInfo.fullName}&phone=${userInfo.phoneNumber}&email=${userInfo.email}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }

    async function handleSendEmailConfirm() {
        setPopup(false);
        setPopup(<Spinner />)
        const response = await sendMail(userInfo.phoneNumber);

        if (response?.message)
            setTimeout(() => setPopup(<Notification title="Thông báo" content={response?.message} />))
    }

    function handleShowUsers() {
        setPopup(<UserList users={users} />);
    }

    return (
        <div className="w-screen">
            {
                popup &&
                <PopupWrapper
                    handleTurnOff={() => setPopup(null)}
                >
                    {popup}
                </PopupWrapper>
            } 
            <main className="w-180 mx-auto py-5 bg-blue-300">
                <section>
                    {
                        appState == 2 && users &&
                        <ShowUsersButton handleClick={handleShowUsers} />
                    }
                    <Image className="w-150" src="dau-qua.png" />
                    <div className='w-150 px-5 mx-auto '>
                        <div className="flex flex-wrap py-5 bg-white" >
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => 
                                <Gift
                                    key={item}
                                    id={item}
                                    isSelected={item == selectedGiftId}
                                    handleGiftClick={onGiftClick}
                                />    
                            )
                        }
                        </div>
                    </div>
                </section>

                <section className='mt-16'>
                    <Image className="w-56" src="danh-sach.png" />
                    <a 
                        href=''
                        className='block w-180 overflow-hidden'
                    >
                        <Image className="w-full" src="voucher.png" />
                    </a>
                </section>

                <section className='mt-16'>
                    <Image className="w-64" src="theo-doi.png" />

                    <div className="mt-5 mb-2 flex gap-5 justify-center">
                        <a className='w-16' href=""><Image className="w-full" src="fb.png" /></a>
                        <a className='w-16' href=""><Image className="w-full" src="ytb.png" /></a>
                        <a className='w-16' href=""><Image className="w-full" src="linkedin.png" /></a>
                    </div>
                </section>
            </main>
        </div>
    )
}

 