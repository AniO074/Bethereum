import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { ContractByte } from "../ContractRelated/constants";
import { Contractabi } from '../ContractRelated/constants'
import { ethers } from 'ethers';
export default function DeclareCard(props)
{
    var {matchNumber,firstTeam,secondTeam,live,dict}=props
    var [winner,setWinner]=useState(firstTeam)

    useEffect(()=>{
        console.log(winner)
    },[winner])

    const FinalDec = async()=>{
        // alert("CLicked On Declaration")
        var isExecuted = window.confirm(`Are you Sure To Declare ${matchNumber} ...?`)
        if(isExecuted){
        var TotBet = []
        var FinBet = []
        var DumMatch={}
        var URL = 'http://127.0.0.1:8000/api/bets/'
        var MatchURL = `http://127.0.0.1:8000/api/matches/${matchNumber}/`
        await axios.get(URL)
        .then((response)=>{
            TotBet = response.data
        })

        // await axios.get(MatchURL).then((response)=>(console.log(response.data)))
        FinBet = TotBet.filter((item)=>{
            return item.matchNumber = matchNumber && item.contractAddress.length !=0
        })

        console.log(FinBet)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        // const contract = new ethers.Contract(FinBet[0].contractAddress,Contractabi,signer)
        console.log(winner)
        // const value = await contract.DeclareBet(winner)
        FinBet.map(async(item)=>{
                const contract = new ethers.Contract(item.contractAddress,Contractabi,signer)
                const value = await contract.DeclareBet(winner).then(async()=>{
                    await axios.get(MatchURL).then((response)=>{
                        // console.log("response")
                        DumMatch = response.data
                    })

                    DumMatch.live = false

                    await axios.put(MatchURL,DumMatch).then((response)=>{
                        alert("Updated the Database")
                        window.location.reload()
                    })
                })
        })
        }
    }
    return(
        <div>
            <div className='card'>
                <div className='card-header d-flex '><h3 className='text-danger'>Declaring the Match : <span className=''>{matchNumber}</span></h3></div>
                <div className='card-body d-flex flex-direction-row justify-content-center'>
                    <p>Choose The Winner     :</p>
                    <div>
                        <select className='form-control input-small ' name='winner' value={winner} onChange={(event)=>
                            (setWinner(event.target.value))
                            }>
                            <option value={firstTeam}>{dict[firstTeam]}</option>
                            <option value={secondTeam}>{dict[secondTeam]}</option>
                        </select>
                    </div>
                </div>
                <div className='d-flex justify-content-center mb-2'>
                    <button className='btn btn-primary' onClick={()=>(FinalDec())}>Declare</button>
                </div>
            </div>
        </div>
    )
}