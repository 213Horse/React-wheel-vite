import root from "./root";

export default async function sendMail(phoneNumber) {
    return await fetch(`${root}/api/SendMail/send-mail?phone=${phoneNumber}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .catch(error => console.log(error));
}