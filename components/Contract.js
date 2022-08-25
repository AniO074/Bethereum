import React from 'react'
import { ethers } from 'ethers'
import {ContractFactory} from 'ethers'
import { ContractByte } from '../ContractRelated/constants'
import { Contractabi } from '../ContractRelated/constants'
export default function Transaction()
{
    const transact = async()=>{
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer =await provider.getSigner()

        const factory = new ContractFactory(Contractabi,ContractByte,signer)
        console.log("Factory Created")
        const contract = await factory.deploy().then((contract)=>{
            console.log(contract.address)
            return(alert(contract.address))},(error)=>console.log(error))

        console.log(contract.address)
        console.log(contract.deployTransaction)
    }

    const InitiateBet = async(team1,team2,yourTeam,Amount)=>
    {
        console.log(Contractabi)
        console.log(ContractByte)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const address = "0x11ec81E5bcb0C46A1C2922f68E794131f38c9444"
        const contract = new ethers.Contract(address,Contractabi,signer)
        // const parsedAmount = ethers.utils.parseEther(`${Amount}`)
        const value =  await contract.Firstplayer(1,2,1,{value:ethers.utils.parseUnits(`${Amount}`,"ether")})
        .then(()=>alert(`First Bet Claimed Successfully` ),(error)=>(console.log(error)))
        console.log(value)
    }


    const AgainstBet = async(team,Amount)=>{
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const address = "0x11ec81E5bcb0C46A1C2922f68E794131f38c9444"
        const contract = new ethers.Contract(address,Contractabi,signer)
        const value = await contract.SecondPlayer(2,{value:ethers.utils.parseUnits(`${Amount}`,"ether")})
        .then(()=>alert(`Second Bet Claimed Successfully` ),(error)=>(console.log(error)))
        console.log(value)
    }

    const Declare = async(team) =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const address = "0x11ec81E5bcb0C46A1C2922f68E794131f38c9444"
        const contract = new ethers.Contract(address,Contractabi,signer)
        const value = await contract.DeclareBet(1).then(()=>alert('Match Declared and Requested to Check Wallets'))
        console.log(value)
    }

    return(
        <div>
            <button onClick={transact}>Deploy</button>
            <button onClick={()=>InitiateBet(1,2,1,3)}>Bet1</button>
            <button onClick={()=>AgainstBet(2,3)}>AgainstBet</button>
            <button onClick={()=>Declare(2)}>Declaration</button>
        </div>
    )
}