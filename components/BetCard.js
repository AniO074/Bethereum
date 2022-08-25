import React,{useContext} from 'react'
import { useEffect } from 'react';
import { Context } from '../App';
import 'bootstrap/dist/css/bootstrap.css';
import { ethers } from 'ethers'
import {ContractFactory} from 'ethers'
import { ContractByte } from "../ContractRelated/constants";
import { Contractabi } from '../ContractRelated/constants'
import axios from 'axios'
import { useState } from 'react';
export default function BetCard(props)
{   
    const {currentAccount,connectWallet}=useContext(Context)
    const [ethAmount,setEthAmount]=useState(0)
    const [inputBoxState,setInputBoxState]=useState(false)
    useEffect(()=>(connectWallet),[])
    
    var {betNumber,firstPlayer,secondPlayer,firstTeamNumber,secondTeamNumber,contractAddress,betAmount,PresentBetMatchNumber,refresh} = props
    var dict = {
        1:"CSK",
        2:"MI",
        3:"DC",
        4:"RCB",
        5:"GT",
    }


    const firstPlayerFunc = async(team1,team2)=>{
        // alert(typeof parseInt(ethAmount))
        console.log(PresentBetMatchNumber)
        var URL = `http://127.0.0.1:8000/api/bets/${PresentBetMatchNumber}/${betNumber}/`
        var dumBet={}
        var Caddress
        // var ethAmount = 5
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const factory = new ContractFactory(Contractabi,ContractByte,signer)

        const contract = await factory.deploy()
        .then((response)=>{
            console.log(response.address)
            Caddress = response.address
        })

        await axios.get(URL)
        .then((response)=>{
            console.log(response.data)
            dumBet = response.data
        })

        dumBet.contractAddress = Caddress

      const provider1 = new ethers.providers.Web3Provider(window.ethereum)
      const signer1 = provider1.getSigner()
      const contract1 = new ethers.Contract(Caddress,Contractabi,signer1)
      const value =  await contract1.Firstplayer(team1,team2,{value:ethers.utils.parseUnits(`${ethAmount}`,"ether")})
      .then(alert("Money Sent SuccessFully"))

      dumBet.betAmount = parseInt(ethAmount)
      dumBet.firstTeamStatus = true
      dumBet.firstPlayer = currentAccount
      await axios.put(URL,dumBet)
      .then(()=>{
        alert("BetClaim SuccessFulll...")
        refresh()
        })
    setInputBoxState(!inputBoxState)
    }

    const secondPlayerFunc =async()=>{
        alert("Bidding for Second Player")
        var URL = `http://127.0.0.1:8000/api/bets/${PresentBetMatchNumber}/${betNumber}/`
        var dumBet={}
        var Caddress
        var ethAmount

        await axios.get(URL)
        .then((response)=>{
            // console.log(response.data)
            dumBet=response.data
        })

        Caddress = dumBet.contractAddress
        ethAmount = dumBet.betAmount
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(Caddress,Contractabi,signer)
        await contract.SecondPlayer({value:ethers.utils.parseUnits(`${ethAmount}`,"ether")})
        .then(async()=>{
            dumBet.secondPlayer = currentAccount
            dumBet.secondTeamStatus = true

            await axios.put(URL,dumBet)
            .then(alert("Second Bet Claimed SuccessFully"))

            refresh()
        })


    }
    return(
        <div className='container wx-8 my-2'>
            <div className="card wx-75">
                <div className="card-header">
                    Bet Number:{betNumber}
                </div>
                <div className="card-body">
                    {contractAddress.length===0?(<h5>Contract-Address : <span  className='text-danger font-weight-bold'>BET NOT OPTED</span></h5>):(<h5>Contract-Address : {contractAddress}</h5>)}
                    {betAmount==null?(<h6>Bet Amount : 0 ETH</h6>):(<h6>Bet Amount : {betAmount} ETH</h6>)}
                    <div>
                    <div className='d-flex flex-row justify-content-around'>
                    <div>
                    {
                        firstPlayer.length===0 ? (<button className='btn btn-secondary' onClick={()=>(setInputBoxState(!inputBoxState))}>{dict[firstTeamNumber]}</button>):(<button className='btn' disabled>{dict[firstTeamNumber]}</button>)
                    }
                    <div className='d-flex flex-column'>
                    {
                    inputBoxState?
                    (<div className='d-flex flex-column m-4'>
                        <div>
                        <label for='ethAmount'>Enter Amount:</label>
                        <input name='ethAmount' value={ethAmount} onChange={(e)=>(setEthAmount(e.target.value))}></input>
                        </div>
                        <div className='mt-3 d-flex justify-content-center'>
                        <button className='btn btn-primary'onClick={()=>(firstPlayerFunc(firstTeamNumber,secondTeamNumber))}>Confirm-{dict[firstTeamNumber]}</button>
                        </div>
                    </div>):(null)
                    }
                    </div>
                    </div>
                    <div>
                    {
                        secondPlayer.length===0 ? (<button className='btn btn-secondary' onClick={secondPlayerFunc}>{dict[secondTeamNumber]}</button>):(<button className='btn' disabled>{dict[secondTeamNumber]}</button>)
                    }
                    </div>
                    </div>
                </div>
            </div>
        </div>    
    
    </div>
)}