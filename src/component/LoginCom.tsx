import React, { SyntheticEvent, useEffect, useState } from 'react'
import Nav from './Nav'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom';

function LoginCom() {
    const [state,setState] = useState({
        username : "",
        password : ""
    })
    const navigate = useNavigate();

    const submitHandle = (e : SyntheticEvent)=>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API}/login`,state)
        .then(res=>{    
            Swal.fire(
                'Good job',
                'Login complete',
                'success'
            )
            sessionStorage.setItem("token", res.data.token)
            navigate("/")
        }).catch(err=>{
            Swal.fire(
                'Oops ..',
                err.response.data.error,
                'error'
            )
        })
    }

    useEffect(()=>{
        const token = sessionStorage.getItem("token")
        if(token){
            navigate("/")
        }
        // eslint-disable-next-line
    },[])

  return (
    <>
        <Nav />
        <div className='container my-5'>
            <h1>Log in</h1>
            <form onSubmit={(event)=>submitHandle(event)}>
                <div className='form-group'>
                    <label>Username</label>
                    <input type='text' className='form-control' value={state.username} onChange={(e)=>setState({...state, username: e.target.value})}></input>
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type='password' className='form-control' value={state.password} onChange={(e)=>setState({...state, password: e.target.value})}></input>
                </div>
                <input type='submit' value={"Save"} className='btn btn-primary mt-3'></input>
            </form>
        </div>
    </>
  )
}

export default LoginCom