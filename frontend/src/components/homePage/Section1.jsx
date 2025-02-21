import React from "react";
import {Link} from "react-router-dom"
import portfolio from "../../assets/portfolio.png";
import styles from "../css/main.module.css";
import { FaHome } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
function Section1() {
  return (
    <section className={styles.section1}>
      <div className={styles.flexDiv}>
        <div className={styles.welcomeDiv}>
          <h1>WELCOME</h1>
          <h2>
            I'm a <mark className={styles.mark}>Developer</mark>
          </h2>
          <p>I craft your vision into reality one line of code at a time</p>
          <div className={styles.btnsDiv}>
            <button className={styles.cvBtn}>my Cv</button>
            <Link to="/project">
              <button className={styles.portfolioBtn}>
                projects <FaHome />{" "}
              </button>
            </Link>
          </div>
        </div>

        <div className={styles.mainImgDiv}>
          <img src={portfolio} alt="" />
        </div>
      </div>

      <div className={styles.downBtnDiv}>
        <a href="#section2"><p> <FaChevronDown className={styles.FaChevronCircleDown}/> </p></a>
      </div>
    </section>
  );
}

export default Section1;
