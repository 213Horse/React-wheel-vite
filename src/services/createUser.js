import root from "./root";
import axios from 'axios';
export default async function createUser(formData) {
    console.log(formData);
    const res = await axios.post(`${root}/api/Wheel/spin-wheel?fullname=${formData.fullName}&phone=${formData.phoneNumber}&email=${formData.email}`);
    return res;
}