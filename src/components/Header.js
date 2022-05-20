import React from "react"
import {Context} from "../Context"
import {Link} from "react-router-dom"



export default function Header(){
    const {chooseTheme, theme} = React.useContext(Context)
    
    
    return(
        <header className= {theme ? "flex-row header-dark": "flex-row header"}>
            <Link to = "/"><h1>Where in the world?</h1></Link>
            <nav className="flex-row">
                <h3><i className= {theme? "ri-moon-fill":"ri-moon-line"} onClick={()=> chooseTheme()}></i></h3>
                <h4 onClick={()=> chooseTheme()}>Mode</h4>
            </nav>
        </header>
    )
}