import root from "./root";

const passCode = 77496996;

export default async function addVoucher(voucherCode, price) {
    return await fetch(`${root}/api/Ipn/addVoucher?voucherCode=${voucherCode}&price=${price}&passCode=${passCode}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .catch(error => console.log(error));
}