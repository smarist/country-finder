import React, {useContext, useEffect, useState}from "react"
import { Context } from "../Context"
import {useParams, Link} from "react-router-dom"
import axios from "axios"
import {nanoid} from "nanoid"

export default function CountryDetails(){
    const {theme} = useContext(Context)
    const {name} = useParams()
    const [country, setCountry] = useState([])
    const [borders, setBorders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(()=>{
        axios.get(`https://restcountries.com/v3.1/name/${name}`)
        .then((response)=> {
            setCountry(getCountries(response.data)) 
            response.data.map(border =>{
                return(
                    setBorders(border.borders)
                )
            })
            setIsLoading(false)   
        })
    }, [name])

    function getCountries(listOfCountries){
        const resetCountries = listOfCountries.map(country => {
          return (
            {
              id: nanoid(),
              name: country.name,
              region: country.region,
              capital: country.capital,
              population: country.population,
              flag: country.flags.png,
              borders: country.borders
            }
          )
        })
        return resetCountries
    }

    console.log(borders)
    const countryElem = country.map((country) => {
        return(
            <section className={theme? "flex-row1 details" : "flex-row1 details"} key={country.id}>
                <figure className="info1">
                    <img src={country.flag} alt={country.name.common} className="img"></img>
                </figure>
                <section className="info2">
                    <div className=" flex-row1">
                        <div className="info1a">
                            <h2>{country.name.common}</h2>
                            <h3> Region: <span>{country.region}</span></h3>
                            <h3> Region: <span>{country.region}</span></h3>
                            <h3> Capital: <span>{country.capital}</span></h3>
                            <h3> Population: <span>{country.population}</span></h3>
                        </div>
                        
                        <div className="info1a">
                            <h3>Top Level Domain: <span></span></h3>
                            <h3> Currrencies: <span></span></h3>
                            <h3> Languages: <span></span></h3>
                        </div>
                    </div>
                    {
                       borders? (borders.map((border)=> (<div className="flex-row">
                       {border} </div>))) : <h1>No borders</h1>
                    }
                    
                </section>
                
            </section>
        )
    })

    console.log(country)
    return(
        <main className={theme? "main-dark height": "main height"}>
             {
                isLoading? 
                <h2 className="height1">Loading ....</h2> :
                <div>
                    <Link to = "/">
                    <h2>Go back</h2>
                    </Link>
                    {countryElem}
                </div>
            }
        </main>
    )

}