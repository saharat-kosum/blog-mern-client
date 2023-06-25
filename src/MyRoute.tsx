import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./App"
import FormCom from "./component/FormCom"
import SingleCom from "./component/SingleCom"
import EditCom from "./component/EditCom"
import LoginCom from "./component/LoginCom"


const MyRoute = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={App}/>
                <Route path="/create" Component={FormCom}/>
                <Route path="/blog/:slug" Component={SingleCom}/>
                <Route path="/blog/edit/:slug" Component={EditCom}/>
                <Route path="/login" Component={LoginCom}/>
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoute