import React, {useContext} from "react"
import Header from "./components/Header";
import Main from "./components/Main";
import CountryDetails from "./Pages/CountryDetail";
import {Routes, Route} from "react-router-dom"
import { Context } from "./Context";

function App() {
  const {theme} = useContext(Context)
  return (
    <div className={theme? "app-dark": "app"}>
        <Header/>
        <Routes>
            <Route path="/"  exact element={<Main/>}/>
            <Route exact path="/:name" element={<CountryDetails/>}/>
        </Routes> 
    </div>
  );
}

export default App;



