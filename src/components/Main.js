import React, {useContext, useEffect} from "react"
import {Context} from "../Context"
//pages
import Country from "../Pages/Country"
import SearchBar from "./SearchBar"
import axios from "axios"

export default function Main(){
    const {
        theme, 
        allCountries,
        setAllCountries, 
        isLoading, 
        formData,
        getCountries} = useContext(Context)


    useEffect(()=>{
        axios.get(`https://restcountries.com/v3.1/region/${formData.filterRegion}`)
        .then((countries)=> {
            setAllCountries(getCountries(countries.data)) 
        }).catch(function (error) {
            if (error.response) {
              console.log(error.response);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
        
          })
    }, [formData, getCountries, setAllCountries])

    
    useEffect(()=>{
        axios.get(`https://restcountries.com/v3.1/name/${formData.searchCountry}?fullText=true`)
        .then((countries)=> {
            console.log(countries.data)
            setAllCountries(getCountries(countries.data))
        }).catch((error) => {
            if(error.response.statusText === 'Not Found'){
                 console.log(error.response.statusText)
            } else {
                console.log("we made")
            }
        
          })
    }, [setAllCountries, formData, getCountries])

    
    return( 
        <main>
            <SearchBar/>
            {
                isLoading? 
                <h2 className="height1">Loading ....</h2> :
                <section className={theme? "main-dark grid": "main grid"}>
                    { allCountries.map((country) => {
                        return(
                            <Country 
                            key={country.id}
                            name={country.name}
                            nativeName={country.nativeName}
                            region={country.region}
                            capital= {country.capital}
                            population={country.population}
                            flag={country.flag}
                            />
                        )
                        })}
                </section>
            }
        </main>  
    )
}