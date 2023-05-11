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
    const regexValidation = {
        fullName: /^\s*\S.{0,}\S\s*$/, 
        phoneNumber: /^\d[03|05|07|08|09]\s?\d{8}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    }
    const regexTyping = {
        fullName: /^.{0,}$/,
        phoneNumber: /^\d{0,10}$/,
        email: /.{0,}$/,
    }
    
    const errorMessages = {
        fullName: "Tên không hợp lệ",
        phoneNumber: "Số điện thoại không hợp lệ",
        email: "Email không hợp lệ",
    }

    function handleChangeInfo(e, key) {
        const value = e.target.value;
        
        setErrors({
            ...errors,
            [key]: null,
        })

        if (regexTyping[key].test(value))
            setUserInfo({
                ...userInfo,
                [key]: value,
            })
    }

    function handleValidate(key) { 
        if (!(regexValidation[key].test(userInfo[key])))
            setErrors({
                ...errors,
                [key]: errorMessages[key]
            })  
    }

    function validateInfo() {
        let nextErrors = {
            fullName: null,
            phoneNumber: null,
            email: null,
        }

        const arr = ["fullName", "phoneNumber", "email"];
        arr.forEach(key => {
            const isValid = regexValidation[key].test(userInfo[key]);

            if (!isValid) 
                nextErrors[key] = errorMessages[key]
            
        });
        setErrors(nextErrors);

        return !(nextErrors.fullName || nextErrors.phoneNumber || nextErrors.email);
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
                    handleChangeInfo={e => handleChangeInfo(e, "fullName")}
                    handleBlur={() => handleValidate("fullName")}
                    value={userInfo.fullName}
                    error={errors.fullName}
                />
                 <Input
                    name="phoneNumber"
                    placeholder="Nhập số điện thoại" 
                    handleChangeInfo={e => handleChangeInfo(e, "phoneNumber")}
                    handleBlur={() => handleValidate("phoneNumber")}
                    value={userInfo.phoneNumber}
                    error={errors.phoneNumber}
                />
                <Input
                    name="email"
                    placeholder="Nhập email"
                    type="email"
                    handleChangeInfo={e => handleChangeInfo(e, "email")}
                    handleBlur={() => handleValidate("email")}
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
    handleBlur,
    value,
    error,
}) {  
    const inputClassName = "w-full max-w-80 mx-auto h-9 text-center rounded-lg";

    return (
        <>
            <input
                name={name}
                className={inputClassName}
                placeholder={placeholder}
                type={type}
                onChange={handleChangeInfo}
                onBlur={handleBlur}
                value={value}
            />
            {error && <p className="text-center -mt-4 text-yellow-400">{error}</p>}
        </>
    )
}
