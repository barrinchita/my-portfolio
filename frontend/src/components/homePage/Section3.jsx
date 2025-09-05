import React, { useEffect, useState } from "react";
import getServices from "../JS/getServices";
import Hireme from "./Hireme";

import { FaHockeyPuck } from "react-icons/fa";
import styles from "../css/main.module.css";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import projectImg from "../../assets/web1.jpeg";

function Section3() {

  const [services, setServices] = useState([]);

    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'all .8s ease-in-out';
                } else {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(100px)';
                    entry.target.style.transition = 'all .8s ease-in-out';
                }
            });
        }, {
            threshold: 0.6
        });

        // use the getServices function to fetch services
        const fetchServices = async () => {
            const response = await getServices();
            console.log("response", response);
            if (response && response.data) {
                console.log('Services fetched:', response.data);
                setServices(response.data);
            }
        }

        fetchServices();
    
        const hidden = document.querySelectorAll('.hidden div');
        hidden.forEach((el) => observer.observe(el));
    }, [])

  return (
    <section className={styles.section3}>
      <div className={styles.serviceAllDiv}>
        <div className={styles.serviceBar}>
          <h2>I provide a wide range of IT services</h2>
        </div>

        <div className={`${styles.servicesDiv} hidden`}>
          {services.map((service, index) => (
            <div className={styles.service} key={index}>
              <img src={service.serviceImage} alt="" />
              <h3> {service.serviceName} </h3>
              <p> { service.serviceDescription }  </p>
            </div>
          ))}
        </div>
      </div>

      <Hireme />

      <div className={styles.projectDiv}>
        <div className={styles.projectBar}>
          <h2>Recent blog posts</h2>
          <button>
            View All <FaHockeyPuck />{" "}
          </button>
        </div>

        <div className={styles.allProjects}>
          <div className={styles.project}>
            <img src={projectImg} alt="" />
            <div className={styles.projectBody}>
              <h1 className={styles.projectTitle}>
                Tittle of blog post goes here.
              </h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
                saepe{" "}
              </p>
              <div>
                <button>View post</button>
              </div>
            </div>
          </div>

          <div className={styles.project}>
            <img src={projectImg} alt="" />
            <div className={styles.projectBody}>
              <h1 className={styles.projectTitle}>
                Tittle of blog post goes here.
              </h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
                saepe{" "}
              </p>
              <div>
                <button>View post</button>
              </div>
            </div>
          </div>

          <div className={styles.project}>
            <img src={projectImg} alt="" />
            <div className={styles.projectBody}>
              <h1 className={styles.projectTitle}>
                Tittle of blog post goes here.
              </h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
                saepe{" "}
              </p>
              <div>
                <button>View post</button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.toggleProject}>
          <button>
            {" "}
            <FaChevronLeft />{" "}
          </button>
          <div>
            <p></p>
            <p className={styles.bigToggle}></p>
            <p></p>
          </div>
          <button>
            {" "}
            <FaChevronRight />{" "}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Section3;
