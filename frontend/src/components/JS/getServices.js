import getEnv from "./env";

const getServices = () => {
    return fetch( `${getEnv().REACT_APP_API_URL}/project/getServices` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    .then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    }
    )
    .then((data) => {
        if (data.status === false) {
            throw new Error(data.message);
        }

        console.log('Services fetched in js:', data.services);
        return {data: data.services};
    }
    )
    .catch((error) => {
        console.error('Error fetching services:', error);
        return [];
    });

}

export default getServices;