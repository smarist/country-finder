import React, {useContext, useEffect, useState}from "react"
import { Context } from "../Context"
import {useParams, Link} from "react-router-dom"
import axios from "axios"
import {nanoid} from "nanoid"
import {getLanguages} from "../Utils/countyData"
import Loader from "../components/Loader"


export default function CountryDetails(){
    const {theme} = useContext(Context)
    const {name} = useParams()
    const [country, setCountry] = useState([])
    const [borders, setBorders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(()=>{
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then((response)=> {
            console.log(response.data)
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
              continent: country.continents,
              region: country.region,
              capital: country.capital,
              population: country.population,
              flag: country.flags.png,
              borders: country.borders,
              timezones: country.timezones,
              currency: country.currencies.DOP,
              languages: country.languages,
              cca3: country.car.cca3
            }
          )
        })
        return resetCountries
    }

    console.log(borders)
    const countryElem = country.map((country) => {
        console.log(country.languages.ara)
        return(
            <section className={theme? "flex-row1" : "flex-row1"} key={country.id}>
                <figure className="info1">
                    <img src={country.flag} alt={country.name.common} className="img"></img>
                </figure>
                <section className="info2">
                    <div className=" flex-row1">
                        <div className="info1a">
                            <h2>{country.name.commond}</h2>
                            <h3>Continent: <span>{country.continent}</span></h3>
                            <h3> Region: <span>{country.region}</span></h3>
                            <h3> Capital: <span>{country.capital !== undefined ? country.capital : "This country has no Capital"}</span></h3>
                            <h3> Population: <span>{country.population}</span></h3>
                        </div>
                        
                        <div className="info1a">
                            <h3>Time Zone: <span>{country.timezones}</span></h3>
                            {
                                country.currencies !== undefined &&  <h3> Currrencies: <span>{country.currency.name} {country.currency.symbol}</span></h3>
                            }
                           
                            <h3> Languages: {getLanguages(country.languages)}</h3>
                        </div>
                    </div>
                    <div className="borders">
                        <h3>Border Countries: <div className="borders" >{
                       borders ? (borders.map((border)=> 
                       (<div className="border" >
                           <Link to={`/${country.cca3}`} key={country.cca3}>
                               <button>{border}</button>
                           </Link>
                       </div>
                       ))) : "N/A"
                       } </div></h3>
                    
                    </div>
                   
                    
                </section>
                
            </section>
        )
    })

    console.log(country)
    return(
        <main className={theme? "main-dark height": "main height"}>
             {
                isLoading? 
                <Loader/>  :
                <div>
                    <Link to = "/">
                    <button className= {theme? "backlink-dark":"backlink"}><i className="ri-arrow-left-fill"/> Back</button>
                    </Link>
                    {countryElem}
                </div>
            }
        </main>
    )

}