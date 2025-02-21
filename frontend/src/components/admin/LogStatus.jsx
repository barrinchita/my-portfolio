import React from 'react'
import { FaClosedCaptioning } from 'react-icons/fa'

function LogStatus({bg, message}) {

    const styles = {
        backgroundColor: bg,
        width: '97.5vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        fontSize: '18px',
        padding: '.5em',
        transition: '1s'
    }

  return (
    <div style={styles}>
        <p> {message} </p>
        <FaClosedCaptioning />
    </div>
  )
}

export default LogStatus