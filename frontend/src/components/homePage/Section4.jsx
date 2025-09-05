import React, { useState, useEffect } from 'react'

import image from "../../assets/yellowme.png";
import image2 from "../../assets/flyer.jpg";
import flyer2 from "../../assets/flyer2.jpg";
import tickets from "../../assets/tickets.jpg";
import flyer3 from "../../assets/flyer3.jpg";
import flyer5 from "../../assets/flyer5.jpg";

import styles from "../css/main.module.css";
import Carousel from './Carousel';
const data = [
    [
        { id: 1, img: image2, desc: "This is a flyer for an organization here in cameroon." },
        { id: 2, img: flyer2, desc: "This is a flyer for an organization here in cameroon."  },
        { id: 3, img: flyer3 },
    ],

    [
        { id: 4, img: image2 },
        { id: 5, img: flyer2 },
        { id: 6, img: flyer3 },
    ],
]

function Section4() {

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [slizeValue, setSlizeValue] = useState(0);

      const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
      window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth < 768);
      });
      // show carousel only on mobile view
    

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false)
                setShow(true);
                setSlizeValue(slizeValue + 1)
            }, 3000);

            loadWork();
        }
    }, [loading])

    const loadWork = () => {
        return (
            data.slice(0, slizeValue).map((item, index) => (
                <div key={index} className={styles.loadWorkDiv}>
                    {
                        item.map((imgItem, idx) => (
                            <div>
                                <img key={idx} src={imgItem.img} alt="" />
                                <p>{imgItem.desc}</p>
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
                    <img src={image2} alt="" />
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

                <div className={styles.sec4Div3}>
                    <button className={styles.sec4btn} onClick={() => setLoading(!loading)} >LOAD MORE</button>
                </div>
            )}
        </>
    )
}

export default Section4
