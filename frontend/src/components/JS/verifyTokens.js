
const verifyToken = async (token) => {
    try {
        const response = await fetch("http://localhost:8000/api/auth/verifyToken", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
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

export default verifyToken;