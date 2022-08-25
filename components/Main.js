import React from 'react'
import { useContext } from 'react'
import { Context } from '../App'
import './Main.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
export default function Main()
{
    const {currentAccount,connectWallet,Deployment,FirstPlayer,SecondPlayer,Declaration,ContractAddress,ChangeContractAddress} = useContext(Context)
    return(
        <div>
            <div>
                <button onClick={()=>FirstPlayer(1,2,1,10)}>Go For 1</button>
                <button onClick={()=>SecondPlayer(2,10)}>Go For 2</button>
            </div>
            <div>
                <button onClick={Deployment}>Deploy The Bet</button>
            </div>
            <div>
                <button onClick={Declaration}>Declare Bet</button>
            </div>
        </div>
    )
}