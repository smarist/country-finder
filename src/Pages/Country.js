import React, {useContext}from "react"
import { Context } from "../Context"
import {Link} from "react-router-dom"




export default function Country({flag, name, region, population, capital, id}){
    const {theme} = useContext(Context)
    return(
        <section className={theme? "flex-col grid-item-dark" : "flex-col grid-item"}>
            <figure className="img-box" key={id}>
                <Link to = {`/${name}`} key={name}>
                    <img src={flag} className="img" alt={name}></img>
                </Link>
                </figure>
            <div className="country-h1">
                <h4 className="country-hh">{name}</h4>
                <h5 className="country-h">Population: <span>{population}</span>{}</h5>
                <h5 className="country-h">Region: <span>{region}</span></h5>
                <h5 className="country-h">Capital: <span>{capital}</span></h5>
            </div>
        </section>
    )
}