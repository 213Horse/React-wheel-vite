import root from "./root";

export default async function createUser(formData) {

    await fetch(`${root}/api/Wheel/spin-wheel?fullname=${formData.fullname}&phone=${formData.phone}&email=${formData.email}`,
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