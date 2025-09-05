const getEnv = () => {
    const env = {
        REACT_APP_API_URL: import.meta.env.VITE_REACT_APP_API_URL,
    }
    
    return env;
}

export default getEnv;