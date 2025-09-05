import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../css/admin.module.css'

function Aside() {

  return (
    <div className={styles.asideCon}>
        <Link className={styles.link} to={'/admin/'}>Dashboard</Link>
        <Link className={styles.link}  to={'/admin/addproject'}>Add project</Link>
        <Link className={styles.link}  to={'/admin/projectType'}>Add skills</Link>
        <Link className={styles.link}  to={'/admin/services'}>Services</Link>
        <Link className={styles.link}  to={'/admin/logout'}>Logout</Link>
    </div>
  )
}

export default Aside