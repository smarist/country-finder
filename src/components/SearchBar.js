import React, {useContext} from "react"
import {Context} from "../Context"

export default function SearchBar(){
    const {theme, formData, setFormData} = useContext(Context)
   


    function updateForm(event){
        const {name, value,type, checked} = event.target
      
        setFormData(prevFormData => {
          return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
          }
        }
          )
    }

   

    return(
        <section className={theme? "main-dark": "main"}>
            <form className="form">
                <div className= {theme? "search search-dark": "search"}>
                    <i class={theme? "ri-search-line search-icon search-icon-dark": "ri-search-line search-icon"}></i>
                    <input 
                    placeholder="search for a country" className= {theme? "search-input select-dark": "search-input"}
                    onChange={updateForm}
                    name= "searchCountry"
                    value= {formData.searchCountry}/>
                </div>
                <div>
                    <select 
                    value={formData.filterRegion}
                    name="filterRegion"
                    onChange={updateForm}
                    className={theme? "select-dark": ""}
                    >
                        <option defaultValue="Filter by Region">Filter by Region</option>
                        <option value="africa">Africa</option>
                        <option value="americas">Americas</option>
                        <option value="antarctic">Antarctic</option>

                        <option value="asia">Asia</option>
                        <option value="europe">Europe</option>
                    </select>
                </div>
            </form>
        </section>
    )
}