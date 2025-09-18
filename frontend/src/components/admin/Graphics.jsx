import React, { useState } from 'react'
import Aside from './Aside';
import getEnv from '../JS/env';
import styles from "../css/admin.module.css";

function Graphics() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([
        {
            id: 0,
            img: "",
            description: "",
        }
    ]);

    const addGraphic = () => {
        setData([
            ...data,
            {
                id: data.length + 1,
                img: "",
                description: "",
            }
        ]);
    };

    const deleteGraphic = (id) => {
        setData(data.filter((graphic) => graphic.id !== id));
        setImages(images.filter((_, index) => index !== id));
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...data];
        list[index][name] = value;
        setData(list);
    };

    const handleFileChange = async (e, index) => {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append("image", file);

        let fileName = await handleFileSubmit(formData);

        let list = [...data];
        list[index][e.target.name] = fileName;
        setData(list);
    };

    const handleFileSubmit = async (formData) => {
        try {
            setLoading(true);
            const response = await fetch(
                `${getEnv().REACT_APP_API_URL}/project/uploadImage`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Image upload failed");
            }

            const result = await response.json();
            setLoading(false);
            return result.imageUrl;
        } catch (erro) {
            console.log("Error uploading: ", erro);
            setLoading(false);
        }
    };

    const upload = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_API_URL}/project/postgraphics`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setData({id: 0, img: "", description: ""});
            alert("Ggraphics group created");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const isLoading = () => {
        return (
            <div className={styles.loadDiv}></div>
        );
    };

    return (
        <div>
            <Aside />
            <main className={styles.uploadMain}>
                {loading && isLoading()}
                <div>
                    <button
                        style={{ width: "auto", padding: "1em" }}
                        onClick={addGraphic}
                    >
                        Add graphic +
                    </button>

                    {data.map((graphic, index) => (
                        <div
                            key={graphic.id}
                            style={{
                                borderBottom: "1px solid grey",
                                marginTop: "1em",
                                paddingBottom: "1em",
                            }}
                        >
                            <input
                                type="file"
                                name="img"
                                onChange={(e) => handleFileChange(e, index)}
                            />

                            <textarea
                                name="description"
                                value={graphic.description}
                                onChange={(e) => handleChange(e, index)}
                            ></textarea>

                            <button
                                onClick={() => deleteGraphic(graphic.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}

                    <button
                        className={styles.submit}
                        style={{ marginTop: "1em" }}
                        onClick={upload}
                    >
                        Upload
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Graphics;
