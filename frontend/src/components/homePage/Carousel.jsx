import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';

import image from "../../assets/yellowme.png";
import image2 from "../../assets/flyer.jpg";
import flyer2 from "../../assets/flyer2.jpg";
import tickets from "../../assets/tickets.jpg";
import flyer3 from "../../assets/flyer4.png";
import flyer5 from "../../assets/flyer5.jpg"; 
function Carousel() {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const styles = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
    }

    return (
        <div>
            <ReactSimplyCarousel
                activeSlideIndex={activeSlideIndex}
                onRequestChange={setActiveSlideIndex}
                itemsToShow={1}
                itemsToScroll={1}
                forwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    style: {
                        alignSelf: 'center',
                        background: 'black',
                        border: 'none',
                        borderRadius: '50%',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '20px',
                        height: 30,
                        lineHeight: 1,
                        textAlign: 'center',
                        width: 30,
                    },
                    children: <span>{`>`}</span>,
                }}
                backwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    style: {
                        alignSelf: 'center',
                        background: 'black',
                        border: 'none',
                        borderRadius: '50%',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '20px',
                        height: 30,
                        lineHeight: 1,
                        textAlign: 'center',
                        width: 30,
                    },
                    children: <span>{`<`}</span>,
                }}
                responsiveProps={[
                    {
                        itemsToShow: 2,
                        itemsToScroll: 2,
                        minWidth: 768,
                    },
                ]}
                speed={400}
                easing="linear"
            >
                {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
                <div style={{ width: 300, height: 400, background: '#ff80ed', borderRadius: '10px' }}>
                    <img src={image2} style={styles} alt="" />
                </div>
                <div style={{ width: 300, height: 400, background: '#065535', borderRadius: '10px' }}>
                    <img src={flyer2} style={styles} alt="" />
                </div>
                <div style={{ width: 300, height: 400, background: '#000000', borderRadius: '10px' }}>
                    <img src={flyer3} style={styles}  alt="" />
                </div>
                <div style={{ width: 300, height: 400, background: '#133337', borderRadius: '10px' }}>
                    <img src={flyer5} style={styles}  alt="" />
                </div>
            </ReactSimplyCarousel>
        </div>
    );
}

export default Carousel;