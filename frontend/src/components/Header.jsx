import { useState } from 'react';

import ShowHireForm from './homePage/ShowHireForm';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'

function Header() {

    const [isFormOpen, setIsFormOpen] = useState(false);

    const [isNavOn, setIsNavOn] = useState(false);

    const toogleNav = () => {
        setIsNavOn(!isNavOn);
    }

  return (
    <header id='up'>
        <nav>
            <div className='logoDiv'>
                {/* <p id='dotUntop'></p>
                <p></p> */}
                <Link to='./' ><h1 className='logo'>Barrin</h1></Link>
            </div>

            <div className={`links ${isNavOn ? 'slideIn' : 'notActive'}`}>
                <Link to="./"  onClick={()=>{setIsNavOn(!isNavOn)}}>Home</Link>
                <Link to="project" onClick={()=>{setIsNavOn(!isNavOn)}}>Project</Link>
                <Link to="skills" onClick={()=>{setIsNavOn(!isNavOn)}}>Skills</Link>
                <Link onClick={()=>{setIsNavOn(!isNavOn)}}>Blog</Link>
                <Link to='./login' className='loginbtn'  onClick={()=>{setIsNavOn(!isNavOn)}}><button>Login</button></Link>
                
            </div>

            <div className='toggleDiv'>
                <button onClick={() => setIsFormOpen(true)}>Hire me</button>
                <button className='toggleBar' onClick={ toogleNav }> <FaBars /> </button>
            </div>

        </nav>
        <ShowHireForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </header>
  )
}

export default Header