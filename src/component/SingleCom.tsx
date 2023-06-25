import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form } from '../type/type'
import Nav from './Nav'

function SingleCom() {
    const {slug} = useParams()
    const [state,setState] = useState<Form|undefined>(undefined)

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${slug}`)
        .then(res=>{
            setState(res.data)
        })
        .catch(err=>{
            alert(err)
          })

          // eslint-disable-next-line
    },[])
  return (
    <>
        {state? 
        <>
            <Nav/>
            <div className='container my-5'>
                <h1>{state.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: state.content }}></div>
                <p>{state.author}</p>
                <p className='text-muted'>Author: {state.author}, create: {state.createdAt? new Date(state.createdAt).toLocaleString() : ""}</p>
            </div>
        </>
        : null}
    </>
  )
}

export default SingleCom