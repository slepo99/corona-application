import "./Appi.css"
import React, { useEffect, useState } from "react";
import axios from "axios";
import   Accordion  from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'




const Countries = () => {
    
    const [serchTerm, setSearchTerm] = useState('')
    const [countries, setCountries] = useState([])
    const getCountries = () => {
        axios.get('https://api.covid19api.com/summary')
        .then((response) => {
            setCountries(response.data.Countries)
            
        })
        
    }
    
    useEffect(() => {
        getCountries()
    }, [])



    return (
        <div className='app'>
            
          <Navbar bg="primary" className='navbar'>
           <Navbar.Brand href="#home"  >
               Covid-19 statistics
            </Navbar.Brand>
            </Navbar>

            <input className='input'  type='text' placeholder='search country'
            onChange={(event) => {setSearchTerm(event.target.value)}}
             />

            {countries.filter((item) => {
              if(serchTerm === '') {
                  return (item)
                 } else if(item.Country.toLowerCase().includes(serchTerm.toLowerCase())){
                 return (item)
              }
              }).map((item, key )=> {
              return (
               <div key={key} > 
               <Accordion className='accordion'>
                   <Accordion.Item eventKey="0">
                    <Accordion.Header className="header">{item.Country}</Accordion.Header>
                     <Accordion.Body className='body' >
                      <p> Country Code:  {item.CountryCode} </p>
                      <p> Total Confirmed: {item.TotalConfirmed} </p>
                      <p> Total Deaths: {item.TotalDeaths}</p>
                      <p> New Deaths: {item.NewDeaths}</p>
                      <p> New Confirmed: {item.NewConfirmed}</p>
                      <p> Total Deaths: {item.TotalDeaths}</p>
                    </Accordion.Body>
                   </Accordion.Item>
  
               </Accordion>
                   
               </div>
             ) 
              
            })}
        </div>
    )
}
export default Countries;
