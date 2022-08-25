import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './New.css'
import { useState } from 'react';
import axios from 'axios'
function Admin(){
    const [matches,setMatches] = useState({matchNumber:'',firstTeamNumber:'',secondTeamNumber:''})
    const BaseURL = 'http://127.0.0.1:8000/api/matches/'
    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setMatches(prevState => ({
            ...prevState,
            [name]:value
        }));
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        await axios.post(BaseURL,matches).then((response)=>console.log(response),(error)=>console.log(error))
    }
    return(
        <div className='container-fluid justify-content-center w-25 mt-4 form-floating border border-secondary'> 
        <h2>Declaring the Match</h2>
        <form onSubmit={handleSubmit} className='container d-flex justify-content-center flex-column'>
            <div className="form-group col-lg-12">
                <label for='matchNumber'>Match Number:</label>
                <input type='text' name='matchNumber' class="form-control" value={matches.matchNumber} onChange={handleChange}></input>
            </div>
            <div className="form-group col-lg-12">
            <label for='firstTeam'>First Team:</label>
            <select class="form-control" name='firstTeamNumber' value={matches.firstTeamNumber} onChange={handleChange}>
                <option value='1'>CSK</option>
                <option value='2'>MI</option>
                <option value='3'>DC</option>
                <option value='4'>RCB</option>
                <option value='5'>GT</option>
            </select>
            </div>
            <div className="form-group col-lg-12">
            <label for='secondteam'>First Team:</label>
            <select class="form-control" name='secondTeamNumber' value={matches.secondTeamNumber} onChange={handleChange} placeholder='Select Team'>
                <option value='1'>CSK</option>
                <option value='2'>MI</option>
                <option value='3'>DC</option>
                <option value='4'>RCB</option>
                <option value='5'>GT</option>
            </select>
            </div>
            <div className="d-flex justify-content-center my-2">
                <button type='submit' className="justify-content-center btn btn-secondary">Submit</button>
            </div>
        </form>
        </div>
    )
}

export default {Admin}