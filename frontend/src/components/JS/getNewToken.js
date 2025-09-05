import getEnv from "./env.js";

const getNewToken = async (refreshToken) => {
    try {
        const response = await fetch( `${getEnv().REACT_APP_API_URL}/auth/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: refreshToken }),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            return data;
        }
    } catch (error) {
        console.log("An error occured: ", error);
        return {
            message: "An error occured. Try again later.",
        };
    }
}

export default getNewToken;