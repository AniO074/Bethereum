import axios from 'axios'
import React from 'react'
import { useState} from 'react'
import { useContext } from 'react'
import { Context } from '../App';
import { useEffect } from 'react'
import '../MatchCard.css'
import BetCard from './BetCard'
import DeclareCard from './DeclareCard';
export default function MatchCard(props)
{
    var {currentAccount,connectWallet,Admin} = useContext(Context)
    var [presentMatchBets,setpresentMatchBets] = useState([])
    var [AddingBets,setAddingBets]=useState({})
    var [DeclareCards,setDeclareCards]=useState(false)
    var [show,setShow]=useState(false)
    const { matchNumber,firstTeam,secondTeam,live } = props
    var bet_dict = {
        "matchNumber": "",
        "betNumber": "",
        "firstPlayer": "",
        "secondPlayer": "",
        "betAmount":"",
        "firstTeamStatus":false,
        "secondTeamStatus":false,
        "contractAddress": ""
    }
    
    
    var dict = {
        1:"CSK",
        2:"MI",
        3:"DC",
        4:"RCB",
        5:"GT",
    }

    useEffect(()=>{
        connectWallet() 
    },[])
    const getBets = async()=>{
        setDeclareCards(false)
        var data =[];
        const URL = 'http://127.0.0.1:8000/api/bets/'
        console.log(matchNumber)
        await axios.get(URL)
        .then((response)=>(data = (response.data)))

        var newData = data.filter((item)=>{
            return item.matchNumber == matchNumber
        })

        setpresentMatchBets(newData)
        console.log(newData)
        setShow(!show)
    }

    const AddBet = async()=>{
        const BetURL = 'http://127.0.0.1:8000/api/bets/'
        const MatchURL = `http://127.0.0.1:8000/api/matches/${matchNumber}/`
        let isExecuted = window.confirm("Are you sure You Add A Bet To Match..?");
        var dupliMatch={}
        var betNum
        if(isExecuted)
        {
            await axios.get(MatchURL)
            .then((response)=>{
                // console.log(response.data)
                dupliMatch=response.data
                betNum = dupliMatch.betCount
                // console.log(betNum)
            })

             bet_dict.matchNumber = matchNumber
             bet_dict.betNumber = betNum + 1
             await axios.post(BetURL,bet_dict)
             .then(console.log("Added a Bet"))

            dupliMatch.betCount = betNum+1
            await axios.put(MatchURL,dupliMatch)
            .then(()=>{
                alert("Successfully Updated the Content toooo...!")
                getBets()
                    }
                )
            window.location('/')
        }
    }

    const Declaration =()=>{
        setShow(false)
        setDeclareCards(!DeclareCards)
    }

    return(
        <div>
        <div className='card wx-10 mx-4 my-4'>
            <div className='card-header'>Match:{matchNumber}</div>
            <div className="card-body d-flex justify-content-between">
            {/* <p className='card-title'>{dict[firstTeam]}</p>vs<p className='card-title'>{dict[secondTeam]</p> */}
            <div>
            <span className="teamName">{dict[firstTeam]}</span><span className="versus">Vs</span><span className="teamName">{dict[secondTeam]}</span>
            </div>
            <div>
                {(live && currentAccount===(Admin.toLowerCase()))?
                (
                <button className='btn btn-primary' onClick={Declaration}>Declare</button>
                ):(null)
                }
            </div>
            <div className="mx-4 d-flex flex-row justify-content-beween">
            <div>
            {live?(
                <button className='btn btn-primary' onClick={()=>getBets()}>Partcipate</button>
            ):(
                <button className='btn btn-warning' disabled>Match Declared</button>
            )}
            </div>
            </div>
            </div>
        </div>
        <div>
           { 
                DeclareCards?(<DeclareCard
                                matchNumber = {matchNumber}
                                firstTeam = {firstTeam} 
                                secondTeam = {secondTeam}
                                live = {live}
                                dict = {dict}/>)
                     :null
            }
        </div>
        <div>
        {show?
        <div className='container border border-top-0 w-90'>
        <div className='d-flex justify-content-end mr-6'>
        {show?<button className='btn btn-secondary col-sm-1 mb-2' onClick={AddBet}>Add Bet</button>:null }
        </div>
        <div>
        {show?

        (
                presentMatchBets.map((item)=>{
                return (
                    <BetCard 
                    key = {item.betNumber}
                    PresentBetMatchNumber ={matchNumber}
                    betAmount = {item.betAmount}
                    betNumber = {item.betNumber}
                    contractAddress = {item.contractAddress}
                    firstPlayer = {item.contractAddress}
                    firstTeamStatus = {item.firstTeamStatus}
                    secondPlayer = {item.secondPlayer}
                    secondTeamStatus = {item.secondTeamStatus}
                    firstTeamNumber = {firstTeam}
                    secondTeamNumber = {secondTeam}
                    refresh = {getBets}
                    />
                )
            })
            
        )
        :null
        }
        </div>
        </div>:null
        }
        </div>
        </div>
    )
}