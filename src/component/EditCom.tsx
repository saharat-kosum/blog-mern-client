import React, { SyntheticEvent, useEffect, useState } from 'react'
import Nav from './Nav'
import { Form } from '../type/type'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'

function EditCom() {
    const [state,setState] = useState<Form|undefined>(undefined)
    const [tokenn,setTokenn] = useState('')
    const navigate = useNavigate();
    const {slug} = useParams()

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${slug}`)
        .then(res=>{
            setState(res.data)
        }).catch(err=>{
            alert(err)
          })

        const token = sessionStorage.getItem("token")
          if(!token){
              navigate("/")
          }else{
            setTokenn(token)
          }  
          // eslint-disable-next-line
    },[])

    const editHandle = (e : SyntheticEvent)=>{
        e.preventDefault()
        axios.put(`${process.env.REACT_APP_API}/blog/update/${slug}`,
        state,{
            headers:{authorization: `Bearer ${tokenn}`}
        })
        .then(res=>{
            Swal.fire(
                'Good job',
                'Save complete',
                'success'
            )
        }).catch(err=>{
            Swal.fire(
                'Oops ..',
                err.response.data.error,
                'error'
            )
        })
    }

  return (
    <>    
        {state?     
        <>
            <Nav/>    
            <div className='container my-5'>
                <h1>Edit blog</h1>
                <form onSubmit={(event)=>editHandle(event)}>
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
        : null}
    </>
  )
}

export default EditCom