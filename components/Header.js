import React, { useContext } from 'react'
import './Header.css'
import { Context } from '../App'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
export default function Header()
{
    const {currentAccount,connectWallet} = useContext(Context)
    return(
        <div>
        <div className='navbar'>
                <div className='navname'>Bethereum</div>
                {
                
                currentAccount ? (
                        <div>
                            <p className='currentAcc'>{currentAccount}</p>
                        </div>
                ):(
                <div>
                <button className='navButton rounded' onClick={connectWallet}>Connect</button>
                </div>
                )
                }   
        </div>
        </div>
    )
}