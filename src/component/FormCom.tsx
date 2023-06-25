import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Form } from '../type/type'
import Nav from './Nav'
import axios from 'axios'
import Swal from 'sweetalert2'
import "react-quill/dist/quill.snow.css"
import ReactQuill from 'react-quill'
import { useNavigate } from 'react-router-dom'

const defaultState = {
    title : '',
    content : '',
    author : ''
}

function FormCom() {
    const [state,setState] = useState<Form>(defaultState)
    const navigate = useNavigate();
    const [tokenn,setTokenn] = useState('')

    const submitHandle = (e : SyntheticEvent)=>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API}/create`,state,{
            headers:{authorization: `Bearer ${tokenn}`}
        })
        .then(res=>{    
            Swal.fire(
                'Good job',
                'Save complete',
                'success'
            )
            setState(defaultState)
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
        if(!token){
            navigate("/")
        }else{
            setTokenn(token)
          } 
        // eslint-disable-next-line
    },[])

  return (
    <>
        <Nav/>    
        <div className='container my-5'>
            <h1>Create blog</h1>
            <form onSubmit={(event)=>submitHandle(event)}>
                <div className='form-group'>
                    <label>Title</label>
                    <input type='text' className='form-control' value={state.title} onChange={(e)=>setState({...state, title: e.target.value})}></input>
                </div>
                <div className='form-group'>
                    <label>Content</label>
                    <ReactQuill value={state.content} onChange={(e)=>setState({...state, content: e})} theme='snow'/>
                </div>
                <div className='form-group'>
                    <label>Author</label>
                    <input type='text' className='form-control' value={state.author} onChange={(e)=>setState({...state, author: e.target.value})}></input>
                </div>
                <input type='submit' value={"Save"} className='btn btn-primary mt-3'></input>
            </form>
        </div>
    </>
  )
}

export default FormCom