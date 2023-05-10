import { useState } from "react";
import PopupFrame from "../popup/PopupFrame";

export default function UserInfoForm({
    handleFetchUserInfo,
    handleTurnOffPopup,
}) {
    const [userInfo, setUserInfo] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
    })
    const [errors, setErrors] = useState({
        fullName: null,
        phoneNumber: null,
        email: null,
    });

    function handleChangePhone(e) {
        const value = e.target.value;
       
        setErrors({
            ...errors,
            phoneNumber: null,
        });

        if (/^\+?\d{0,3}\s?\d{0,13}$/.test(value))
            setUserInfo({
                ...userInfo,
                phoneNumber: value,
            });
    }

    function handleChangeInfo(e) {
        const key = e.target.name;

        setUserInfo({
            ...userInfo,
            [key]: e.target.value,
        });

        setErrors({
            ...errors,
            [key]: null,
        })
    }

    function validateInfo() {
        const fullNameRegex = /^[\p{L}\p{M}'\-]+(?:\s[\p{L}\p{M}'\-]+)*$/u;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;        

        let fullNameError = null;
        let phoneNumberError = null;
        let emailError = null;

        if (!fullNameRegex.test(userInfo.fullName)) {
            fullNameError = "Tên không hợp lệ!"
        }
        if (!emailRegex.test(userInfo.email)) {
            emailError = "Email không hợp lệ!"
        }
        if (userInfo.phoneNumber.length > 11 || userInfo.phoneNumber.length < 9)
        phoneNumberError = "Độ dài số điện thoại không hợp lê!"        

        setErrors({
            fullName: fullNameError,
            phoneNumber: phoneNumberError,
            email: emailError,
        });

        return !(fullNameError || phoneNumberError || emailError);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (validateInfo()) {
            handleFetchUserInfo(userInfo);
        }
    }

    

    return (
        <PopupFrame size="sm" handleTurnOffPopup={handleTurnOffPopup}>
            <h4 className="text-yellow-300 text-xl sm:text-2xl text-center font-extrabold">Đăng ký thông tin tham gia</h4>
            <form className="mt-4 pb-3 sm:py-5 w-full flex flex-col gap-4">
                <Input
                    name="fullName"
                    placeholder="Nhập họ tên"
                    handleChangeInfo={handleChangeInfo}
                    value={userInfo.fullName}
                    error={errors.fullName}
                />

                 <Input
                    name="phoneNumber"
                    placeholder="Nhập số điện thoại" 
                    handleChangeInfo={handleChangePhone}
                    value={userInfo.phoneNumber}
                    error={errors.phoneNumber}
                />

                <Input
                    name="email"
                    placeholder="Nhập email"
                    type="email"
                    handleChangeInfo={handleChangeInfo}
                    value={userInfo.email}
                    error={errors.email}
                />
                <button
                    onClick={handleSubmit}
                    className="mt-3 w-full max-w-80 mx-auto h-10 text-center rounded-lg bg-yellow-300 font-bold text-red-700">
                    Tham gia ngay
                </button>
            </form>
        </PopupFrame>
    )
}

function Input({
    name,
    placeholder,
    type="text",
    handleChangeInfo,
    value,
    error,
}) { 
    const inputClassName = "w-full max-w-80 mx-auto h-9 text-center rounded-lg"
    return (
        <>
        
            <input
                name={name}
                className={inputClassName}
                placeholder={placeholder}
                type={type}
                onChange={handleChangeInfo}
                value={value}
            />
            {error && <p className="text-center -mt-4 text-yellow-400">{error}</p>}
        </>
    )
}