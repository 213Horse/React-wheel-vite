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
    const regexes = {
        fullName: /^[\p{L}\p{M}\p{Zs}]+(?:[\p{L}\p{M}\p{Zs}'’‘`-]*[\p{L}\p{M}\p{Zs}])?$/,
        phoneNumber: /^\d[03|05|07|08|09]\s?\d{8}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,
    }
    const errorMessages = {
        fullName: "Tên không hợp lệ",
        phoneNumber: "Số điện thoại không hợp lệ",
        email: "Email không hợp lệ",
    }

    function handleChangePhone(e) {
        const value = e.target.value;
        setErrors({
            ...errors,
            phoneNumber: null,
        });

        if (/^\d{0,2}\s?\d{0,8}$/.test(value))
            setUserInfo({
                ...userInfo,
                phoneNumber: value,
            });
    }

    function handleChangeName(e) {
        const value = e.target.value;
        setErrors({
            ...errors,
            fullName: null,
        });

        if (/^[a-zA-Z!@#\$%\^\&*\)\(+=._\s-]*$/g.test(value))
            setUserInfo({
                ...userInfo,
                fullName: value,
            });
    }

    function handleChangeInfo(e) {
        const key = e.target.name;

        setUserInfo({
            ...userInfo,
            [key]: e.target.value,
        });
        // setErrors({
        //     ...errors,
        //     [key]: null,
        // })
    }

    function handleValidation(name) {
        const isValid = regexes[name].test(userInfo[name]);
        if (!isValid)
            setErrors({
                ...errors,
                [name]: errorMessages[name]
            })
    }
    function removeAscent (str) {
        if (str === null || str === undefined) return str;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        return str;
    }
    function handleValidateName(e) {
        const value = e.target.value;
        var re = /^[a-zA-Z!@#\$%\^\&*\)\(+=._\s-]*$/g // regex here
        if (!re.test(removeAscent(value))) 
            setErrors({
                ...errors,
                fullName : errorMessages.fullName
            })
    }

    function validateInfo() {
        const fullNameRegex = /^[\p{L}\p{M}'\-]+(?:\s[\p{L}\p{M}'\-]+)*$/u;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;        

        let fullNameError = null;
        let phoneNumberError = null;
        let emailError = null;

        if (!fullNameRegex.test(userInfo.fullName)) {
            fullNameError = errorMessages.fullName;
        }
        if (!emailRegex.test(userInfo.email)) {
            emailError = errorMessages.email;
        }
        if (userInfo.phoneNumber.length > 11 || userInfo.phoneNumber.length < 9)
            phoneNumberError = errorMessages.phoneNumber;

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
                    handleChangeInfo={handleChangeName}
                    handleBlur={handleValidateName}
                    value={userInfo.fullName}
                    error={errors.fullName}
                />
                 <Input
                    name="phoneNumber"
                    placeholder="Nhập số điện thoại" 
                    handleChangeInfo={handleChangePhone}
                    handleBlur={() => handleValidation("phoneNumber")}
                    value={userInfo.phoneNumber}
                    error={errors.phoneNumber}
                />
                <Input
                    name="email"
                    placeholder="Nhập email"
                    type="email"
                    handleChangeInfo={handleChangeInfo}
                    handleBlur={() => handleValidation("email")}
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