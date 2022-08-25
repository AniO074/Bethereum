import React, { useState } from "react"
import Header from "./components/Header";
import { createContext } from "react";
import { useEffect } from "react";
import './App.css'
import { ethers } from 'ethers'
import {ContractFactory} from 'ethers'
import { ContractByte } from "./ContractRelated/constants";
import { Contractabi } from './ContractRelated/constants'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./components/Home";
// import Main from "./components/Main";
// import Admin from "./components/Admin";
import MatchList from "./components/MatchList";
import axios from 'axios'
const Context = createContext()

export default function App() {
  const [currentAccount,setCurrentAccount] = useState("")
  const [Address,ChangeAddress] = useState("")
  const [Admin,changeAdmin]=useState("0x7DbE1E02Cbb62a8245ffb64E4e90f3dCe55dFA54")
  const BaseURL = "http://127.0.0.1:8000/api/students/"

  const connectWallet = async()=>{
    if( !(window.ethereum)) return(alert("Please Install Metamask"))
    const account = await window.ethereum.request({method:'eth_requestAccounts'})
    setCurrentAccount(account[0])
    return account[0]
  }

  useEffect( () => {
    window.ethereum.on('accountsChanged',function(accounts){
          setCurrentAccount(accounts[0])
    })
  })

  const Deployment = async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer =await provider.getSigner()
    const factory = new ContractFactory(Contractabi,ContractByte,signer)
    console.log("Factory Created")
    const contract = await factory.deploy().then((contract)=>{
          axios.post(BaseURL,{Address:contract.address}).then(()=>alert(`DataBase item  Saved at ${contract.address}`))
        }
        ,(error)=>console.log(error))
  }

    const FirstPlayer = async(team1,team2,yourTeam,Amount)=>
    {
      await axios.get(BaseURL).then((response)=>
      {
          ChangeAddress(response.data[0].Address)
          console.log(Address)
      },(error)=>console.log(error))
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      console.log(Address)
      const contract = new ethers.Contract(Address,Contractabi,signer)
      // const parsedAmount = ethers.utils.parseEther(`${Amount}`)
      const value =  await contract.Firstplayer(1,2,10,{value:ethers.utils.parseUnits(`${Amount}`,"ether")})
      .then(()=>alert(`First Bet Claimed Successfully` ),(error)=>(console.log(error)))
      // console.log(value)
    }
 
    const SecondPlayer = async(team,Amount)=>{

      await axios.get(BaseURL).then((response)=>
      {
          ChangeAddress(response.data[0].Address)
          console.log(Address)
      },(error)=>console.log(error))
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(Address,Contractabi,signer)
      const value = await contract.SecondPlayer(team,{value:ethers.utils.parseUnits(`${Amount}`,"ether")})
      .then(()=>alert(`Second Bet Claimed Successfully` ),(error)=>(console.log(error)))
      console.log(value)
  }

  const Declaration = async() =>{

    await axios.get(BaseURL).then((response)=>
      {
          ChangeAddress(response.data[0].Address)
          console.log(Address)
      },(error)=>console.log(error))

    const provider = new ethers.providers.Web3Provider(window.ethereum) 
    const signer = provider.getSigner()
    const contract = new ethers.Contract(Address,Contractabi,signer)
    const value = await contract.DeclareBet(2).then(()=>alert('Match Declared and Requested to Check Wallets'))
    console.log(value)
  }

  return (
    
     <Context.Provider value = {{currentAccount,connectWallet,Deployment,FirstPlayer,SecondPlayer,Declaration,Address,ChangeAddress,Admin}}>
        <Header />
        <MatchList />
    </Context.Provider>

  )
}

export {Context};
