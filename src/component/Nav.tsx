import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Nav() {
    const [isLogin,setIsLogin] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        const token = sessionStorage.getItem("token")
        if(token){
            setIsLogin(true)
        }else{
            setIsLogin(false)
        }
    },[])

    const logOut = ()=>{
        sessionStorage.removeItem("token")
        setIsLogin(false)
        navigate("/login")
    }

  return (
    <nav>
        <ul className='nav nav-tabs'>
            <li className='nav-item p-3'>
                <a href='/' className='nav-link'>Home</a>
            </li>
            {!isLogin?
            <li className='nav-item p-3'>
                <a href='/login' className='nav-link'>Log in</a>
            </li>
            :<>
                <li className='nav-item p-3'>
                    <a href='/create' className='nav-link'>Create</a>
                </li>
                <li className='nav-item p-3'>
                    <button onClick={()=>logOut()} className='nav-link'>Log Out</button>
                </li>
            </>
            }
        </ul>
    </nav>
  )
}

export default Nav