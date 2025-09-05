import React, {useState} from 'react'
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Carousel from './Carousel';

function Body() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  window.addEventListener('resize', () => {
    setIsMobile(window.innerWidth < 768);
  });
  // show carousel only on mobile view


  return (
    <>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        
    </>
  )
}

export default Body