import React, { useState } from 'react';
import hireme from '../../assets/hireme.jpg'
import ShowHireForm from './ShowHireForm';

import styles from '../css/main.module.css';

function Hireme() {

    const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
        <div className={styles.hireme}>
            <div className={styles.hiremeTextDiv}>
                <div className={styles.hiremeText}>
                    <h2>HireMe !!!</h2>
                    <p>Hire me today, so that i can turn your ideas into reality one line of code at a time.</p>
                    <p>Or still, hire me so that i can bring light into your projects, with my Design skill.</p>
                    <p>All you have to do is click the button below.</p>
                    <div className={styles.hirmeBtnDiv}>
                        <button onClick={() => setIsFormOpen(true)}>HIRE ME</button>
                    </div>
                </div>
                <div>
                    <img src={hireme} alt="" />
                </div>
            </div>
        </div>

        <ShowHireForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

        {/* <div className={styles.hireForm}>
            <p className={styles.formBgEl}></p>
            <div className={styles.formPart}>
                <h1>Want to take your project to another level? Send me an Email so we can talk.</h1>

                <div className={styles.formDiv}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div>
                        <label htmlFor="message">Message: </label>
                        <textarea name="message" id="message" cols="70" rows="10"></textarea>
                    </div>
                    <div className={styles.formBtnDiv}>
                        <button>Send Message</button>
                    </div>
                </div>
            </div>
        </div> */}
    </>
  )
}

export default Hireme