import root from './root';

export default async function fetchTwentyClosestUsers() {
    return await fetch(`${root}/api/Wheel/twenty-closest-spinned`)
                .then(response => response.json())
                .catch(error => console.log(error));
}