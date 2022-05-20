import React, {useEffect, useState} from "react"
import axios from "axios"
import {nanoid} from "nanoid"


const Context = React.createContext()

function ContextProvider({children}) {
    const [theme, setTheme] = React.useState(false)
    const [allCountries, setAllCountries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [formData, setFormData] = useState ({
        searchCountry: '',
        filterRegion: ''
    })


    useEffect(()=>{
        axios.get("https://restcountries.com/v3.1/all")
        .then((countries)=> {
            setAllCountries(getCountries(countries.data)) 
            setIsLoading(false)  
        })
    }, [])
    
    function getCountries(listOfCountries){
        const resetCountries = listOfCountries.map(count => {
          return (
            {
              id: nanoid(),
              name:count.name.common,
              nativeName: count.name.nativeName,
              region: count.region,
              capital: count.capital,
              population: count.population,
              flag: count.flags.png
            }
          )
        })
        return resetCountries
    }

    function chooseTheme(){
        setTheme(prevTheme => !prevTheme)
    }
    
    return (
        <Context.Provider 
        value={{theme, chooseTheme, allCountries, isLoading, formData, setFormData, getCountries, setAllCountries}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}