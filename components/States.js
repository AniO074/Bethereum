import { Component } from "react";
import React from 'react'

class States extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            count:1,
            subcount:0,
        }
    }

    ActChange =  async () =>{
        await this.setState({
            count:this.state.count+1
        })
        console.log(this.state.count)
    }

    ActSubChange = () =>{
        this.setState(prevState=>{
            return(
                {
            subcount:prevState.subcount + 1
                }
            )
        })
    }

    IncrementFive = ()=>{
        this.ActSubChange()
        this.ActSubChange()
        this.ActSubChange()
        this.ActSubChange()
        this.ActSubChange()
    }

    render(){
        return(
        <div>
            <h1>Count:{this.state.count}</h1>
            <button onClick={this.ActChange}>Increment</button>
            <h1>SubCount:{this.state.subcount}</h1>
            <button onClick={this.ActSubChange}>SubChange</button>
            <button onClick={this.IncrementFive}>Increment-5</button>
        </div>
        )
    }
}

export default States