import React, { useState, useEffect } from 'react'

import image from "../../assets/yellowme.png";
import image2 from "../../assets/flyer.jpg";
import flyer2 from "../../assets/flyer2.jpg";
import tickets from "../../assets/tickets.jpg";
import flyer3 from "../../assets/flyer3.jpg";
import flyer5 from "../../assets/flyer5.jpg";


import domestic from "../../assets/domestic.jpg"
import flyer001 from "../../assets/medesign.jpg"

import styles from "../css/main.module.css";
import Carousel from './Carousel';
import getEnv from '../JS/env';

function Section4() {

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [slizeValue, setSlizeValue] = useState(0);
    const [data, setData] = useState([]);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth < 768);
    });
    // show carousel only on mobile view

    const fetchGraphics = async () => {

        let res = await fetch(`${getEnv().REACT_APP_API_URL}/project/getgraphics`)

        if (!res.ok) {
            console.log("Error fetching graphics");
            return;
        }

        let gotten = await res.json();
        console.log(gotten.graphics)
        setData(gotten.graphics)
    }

    useEffect(() => {
        if (loading) {
            fetchGraphics();
            setTimeout(() => {
                setLoading(false)
                setShow(true);
                setSlizeValue(slizeValue + 1)
            }, 3000);
        }

    }, [loading])

    const loadWork = () => {
        return (
            data.slice(0, slizeValue).map((item, index) => (
                <div key={index} className={styles.loadWorkDiv}>
                    {
                        item.group.map((imgItem, idx) => (
                            <div>
                                {imgItem.img && imgItem.img != "" ? (
                                    <>
                                        <img key={idx} src={imgItem.img} alt="" />
                                        <p>{imgItem.description}</p>
                                    </>
                                ) : ""}

                            </div>
                        ))
                    }
                </div>
            ))
        )
    }

    const loadingFun = () => {
        return (
            <div className={styles.loadDiv}>
                <p className={styles.loadp}>Loading ...</p>
            </div>
        )
    }

    return (
        <>
            <div className={styles.sec4Div1}>
                <img src={image} alt="" />
                <div>
                    <h3>Me As a graphic</h3>
                    <h2>designer</h2>
                </div>
            </div>

            <div className={styles.sec4Div2}>
                <div>
                    <img src={image2} alt="" />
                </div>

                <div className={styles.sec4Div2Div2}>
                    <img src={domestic} alt="" />
                    <div className={styles.sec4Div2Div2Div}>
                        <div>
                            <img src={tickets} alt="" />
                            <img src={flyer5} alt="" />
                        </div>

                        <img src={flyer2} alt="" />
                    </div>
                </div>
            </div>

            {/* carousel for mobile view */}
            {
                isMobile && <Carousel />
            }

            {show ? loadWork() : null}

            {loading ? loadingFun() : (
                slizeValue == 0 || slizeValue != data.length ? (
                    <div className={styles.sec4Div3}>
                        <button className={styles.sec4btn} onClick={() => setLoading(!loading)} >LOAD MORE</button>
                    </div>
                    
                ) : (
                    <p style={{textAlign: "center"}}>Opps this is all i've got on the system now. But there's more</p>
                )
            )}
        </>
    )
}

export default Section4
