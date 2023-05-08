import { useState } from "react"

export default function UserInfoForm({
    handleFetchData,
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
    })

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

        // let input = e.target.value;
        // input = input.replace(/\D/g, ""); // Remove all non-digit characters

        // // Format the phone number
        // let formattedPhoneNumber = "";

        // if (input.length > 0) {
        //     formattedPhoneNumber = "+";

        // if (input.length > 3) {
        //     formattedPhoneNumber += input.slice(0, 3) + " ";
        //     input = input.slice(3);
        // }

        // if (input.length > 3) {
        //     formattedPhoneNumber += "(" + input.slice(0, 3) + ") ";
        //     input = input.slice(3);
        // }

        // if (input.length > 2) {
        //     formattedPhoneNumber += input.slice(0, 2) + " ";
        //     input = input.slice(2);
        // }

        // formattedPhoneNumber += input;
        // }

        // setUserInfo({
        //     ...userInfo,
        //     phoneNumber: formattedPhoneNumber,
        // });
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
        const emailRegex = /^\S+@\S+\.\S+$/;        

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

    function handleClickSubmit(e) {
        e.preventDefault();
        if (validateInfo()) {
            handleFetchData(userInfo);
        }
    }

    return (
        <form className="w-96 flex flex-col pt-5 pb-3">
            <h3 className='w-72 mx-auto font-extrabold text-center text-2xl text-white'>ĐĂNG KÝ THÔNG TIN THAM GIA</h3>

            <div className="w-72 mt-8 mx-auto flex flex-col gap-4">
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
                    className="w-full h-10 bg-yellow-300 text-red-700 font-extrabold rounded-xl hover:bg-yellow-200 transition-4"
                    onClick={handleClickSubmit}
                >
                    THAM GIA NGAY
                </button>
            </div>
        </form>
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
    const errorClass = error ? " border-2 border-yellow-400" : " ";

    return (
        <div>
            <input
                name={name}
                className={"input-component w-full h-10 rounded-xl px-3 text-center " + errorClass}
                placeholder={placeholder}
                type={type}

                onChange={handleChangeInfo}
                value={value}
            />
            {error && <p className="text-center text-yellow-400">{error}</p>}
        </div>
    )
}