import root from "./root";

export default async function createUser(formData) {
    return await fetch(`${root}/api/Wheel/spin-wheel?fullname=${formData.fullname}&phone=${formData.phone}&email=${formData.email}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .catch(error => console.log(error));
}