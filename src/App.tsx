import './App.css';
import React, { useEffect, useState } from 'react';
import Nav from './component/Nav';
import axios from 'axios';
import { Form } from './type/type';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function App() {
  const [blogs,SetBlogs] = useState<Form[]>([])
  const [isLogin,setIsLogin] = useState(false)
  const [tokenn,setTokenn] = useState('')

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API}/blogs`)
    .then(res=>{
      SetBlogs(res.data)
    })
    .catch(err=>{
      alert(err)
    })
    
    const token = sessionStorage.getItem("token")
    if(token){
        setIsLogin(true)
        setTokenn(token)
    }else{
        setIsLogin(false)
    }
// eslint-disable-next-line
  },[])

  const deleteHandle = (slug?:string)=>{
    Swal.fire({
      title:"Are you sure to delete this blog",
      icon: "warning",
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        if(slug){
          axios.delete(`${process.env.REACT_APP_API}/blog/delete/${slug}`,{
            headers:{authorization: `Bearer ${tokenn}`}
          })
          .then(res=>{
            Swal.fire(
              'Delete Success',
              res.data.slug,
              'success'
            )
            const remain = blogs.filter(blog=>blog.slug !== res.data.slug)
            SetBlogs(remain)
          }).catch(err=>{
            alert(err)
          })
        }else{
          Swal.fire(
            'Oops ..',
            'No slug',
            'error'
          )
        }
      }
    })
  }

  return (
    <>
      <Nav/>
      <div className="container my-5">
        {blogs.map((blog,index)=>(
          <div className='row' key={index} style={{borderBottom:"1px solid silver"}} >
            <div className='col p-3'>
              <Link to={`/blog/${blog.slug}`}>
                <h2>{blog.title}</h2>
              </Link>
              <div dangerouslySetInnerHTML={{ __html: blog.content.substring(0,250) }}></div>
              <p className='text-muted'>Author: {blog.author}, create: {blog.createdAt? new Date(blog.createdAt).toLocaleString() : ""}</p>
              {isLogin?  
              <>
                <Link className='btn btn-primary' to={`/blog/edit/${blog.slug}`}>Update</Link>
                <button className='btn btn-danger ms-2' onClick={()=>deleteHandle(blog.slug)}>Delete</button>
              </>
              : null}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
