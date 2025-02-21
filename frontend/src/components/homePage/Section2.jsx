import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../css/main.module.css";
import "../css/styles.css";
import ShowHireForm from './ShowHireForm';

// swiper imports

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../../app.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import { FaHockeyPuck } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import projectImg from "../../assets/reactjs.png";
import projectImg2 from "../../assets/mongodb.png";
import projectImg3 from "../../assets/nodejs.png";
import Getprojects from "../project/Getprojects.jsx";

function Section2() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [toggleActive, setToggleActive] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const profDivRef = useRef();

  useEffect(() => {
    // fetching projects from db

    async function fetchData() {
      try {
        let limit = Math.floor(window.innerWidth / 16 / 22);
        console.log(limit);
        const response = await fetch(
          `http://localhost:8000/api/project?limit${limit}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setData(result.message);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Conditional rendering based on data state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.section2} id="section2">
      <div className={styles.section2Btns}>
        <button>My Cv</button>
        <Link to="/project">
          <button className={styles.middleBtn}>
            <span>Projects</span> <FaHockeyPuck />
          </button>
        </Link>
        <button onClick={() => setIsFormOpen(true)}>Hire me</button>
      </div>

      <ShowHireForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      <div className={styles.projectDiv}>
        <div className={styles.projectBar}>
          <h2>Most recent project</h2>
          <Link to="/project">
          <button className={styles.middleBtn}>
          View All <FaHockeyPuck />
          </button>
        </Link>
        </div>

        <div className={styles.allProjects}>
          <div className={styles.subAllProjects} id="subAllProjects">
            <Getprojects data={data} />
          </div>
        </div>

        <div className={styles.toggleProject}>
          <button>
            
            <FaChevronLeft />
          </button>
          <div>
            <p></p>
            <p className={styles.bigToggle}></p>
            <p></p>
          </div>
          <button>  
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className={styles.proficientDiv}>
        <div className={styles.styleProjectBar}>
          <div className={styles.projectBar}>
            <h2>Proficient in</h2>
          </div>
        </div>
      
      {/* swiper */}
        <>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className={`mySwiper ${styles.proficientImgDiv}`}
          >
            <SwiperSlide>
              <div className="proficient">
                <img src={projectImg} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="proficient">
                <img src={projectImg2} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="proficient">
                <img src={projectImg3} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="proficient">
                <img src={projectImg3} alt="" />
              </div>
            </SwiperSlide>
          </Swiper>
        </>

      </div>
    </section>
  );
}

export default Section2;
