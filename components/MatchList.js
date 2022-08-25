import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import MatchCard from './MatchCard'
import 'bootstrap/dist/css/bootstrap.css';
import './matchList.css'
import { useContext } from 'react';
import { Context } from '../App';
export default function MatchList()
{
    var [matchArray,setMatchArray]=useState([])
    var [sending,setSending]=useState({matchNumber:'',firstTeamNumber:'',secondTeamNumber:''})
    var {Admin,currentAccount}=useContext(Context)
    const BASEURL = 'http://127.0.0.1:8000/api/matches/'
    const getlist = async()=>{
        await axios.get(BASEURL)
        .then((response)=>{
            setMatchArray(response.data)
        })
        .catch(error=>{
            window.alert('error')
            console.log(error)
        })
    }

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setSending(prevState => ({
            ...prevState,
            [name]:value
        }));
    };

    const handleSubmit = async(e)=>{
        await axios.post(BASEURL,sending).then(()=>{
            getlist();
            alert('Match Added')
        })
    }
    return(
        <div className='container'>
        <div className="d-flex justify-content-end">
        {(currentAccount==(Admin.toLowerCase()))?(
        <button type='button' className='btn btn-secondary mt-4 mx-2' data-bs-toggle="modal" data-bs-target="#exampleModal">Add Match</button>
        ):(null)
        }
        <button className="btn btn-secondary mt-4" onClick={getlist}>Match List</button>
        </div>

        <div>
            {
                matchArray.map((item)=>{
                    return(
                        <MatchCard 
                            key = {item.matchNumber}
                            matchNumber = {item.matchNumber}
                            firstTeam = {item.firstTeamNumber}
                            secondTeam = {item.secondTeamNumber}
                            live = {item.live}
                        />
                    )
                })
            }
        </div>
        
    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
        <div className="modal-header">
        <h3 className="modal-title" id="exampleModalLabel">Adding Match</h3>
        <button type="button" className="btn-close" data-bs-dismiss="modal">
        </button>
      </div>
      <div className="modal-body">
        <form>
            <div>
                <label for='matchNumber' className="lfm mb-3">Match Number: </label>
                <input 
                type='text' 
                name='matchNumber'
                value={sending.matchNumber} 
                onChange={handleChange}
                className="ifm ml-2"
                ></input>
            </div>
            <div>
            <label for='firstTeamNumber' className="lfm">First Team:</label>
            <div className="col-sm-5">
            <select 
            className="form-control input-small ml-6 ism" name='firstTeamNumber' value={sending.firstTeamNumber} onChange={handleChange}>
                <option value='1'>CSK</option>
                <option value='2'>MI</option>
                <option value='3'>DC</option>
                <option value='4'>RCB</option>
                <option value='5'>GT</option>
            </select>
            </div>
            </div>
            <div>
            <label for='secondTeamNumber' className="lfm">Second Team:</label>
            <div className="col-sm-5">
            <select 
            className="form-control input-small ml-6 ism" name='secondTeamNumber' value={sending.secondTeamNumber} onChange={handleChange}>
                <option value='1'>CSK</option>
                <option value='2'>MI</option>
                <option value='3'>DC</option>
                <option value='4'>RCB</option>
                <option value='5'>GT</option>
            </select>
            </div>
            </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="submit" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>submit</button>
      </div>
    </div>
  </div>
</div>
</div>)
}
