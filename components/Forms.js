import React from 'react'
import { Component } from 'react'
import axios from 'axios'

class Forms extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            Length:"",
            Diameter:"",
            Weight:"",
            Whole_weight:"",
            Shucked_weight:"",
            Viscera_weight:"",
            Shell_weight:"",
            Gender:"",
        }

    }

     API_URL = "http://127.0.0.1:8000/api/students/";
    formStyles = {  
                    display : 'flex',
                    justifyContent:'center',
                    flexDirection:'column',
                    alignSelf:'center',
                };
    handleLength = (event)=>{
        event.preventDefault()
        this.setState({
            Length:event.target.value
        })
    }

    handleDiameter = (event)=>{
        event.preventDefault()
        this.setState({
            Diameter:event.target.value
        })
    }

    handleWeigth = (event)=>{
        event.preventDefault()
        this.setState({
            Weight:event.target.value
        })
    }

    handleWhole_weight = (event)=>{
        event.preventDefault()
        this.setState({
            Whole_weight:event.target.value
        })
    }

    handleShucked_weigth= (event)=>{
        event.preventDefault()
        this.setState({
            Shucked_weight:event.target.value
        })
    }

    handleViscera_weigth = (event)=>{
        event.preventDefault()
        this.setState({
            Viscera_weigth:event.target.value
        })
    }

    handleShell_weight = (event)=>{
        event.preventDefault()
        this.setState({
            Shell_weight:event.target.value
        })
    }

    handleGender = (event)=>{
        event.preventDefault()
        this.setState({
            Gender:event.target.value
        })
    }
    

    handleSubmit = (event)=>{
        event.preventDefault()
        // alert(`${this.state.Name} ${this.state.IDnumber} ${this.state.skill} ${this.state.comments}`)
        axios.post(this.API_URL,this.state)
        .then((response)=>
            { 
                console.log(response)
            }
            )
        .catch((error=>(console.log(error))))
    }

    render(){
    return(
        <form onSubmit={this.handleSubmit}>
            <div style={this.formStyles}>
                <label>Length:</label>
                <input type='text' value={this.state.Name} onChange={this.handleLength} placeholder='Enter Name'></input>
            </div>
            <div>
                <label>Diameter: </label>
                <input type='text' value={this.state.Diameter} onChange={this.handleDiameter} placeholder='ID number'></input>
            </div>
            <div>
                <label>Weight: </label>
                <input type='text' value={this.state.Weight} onChange={this.handleWeigth} placeholder='ID number'></input>
            </div>
            <div>
                <label>Whole_Weight: </label>
                <input type='text' value={this.state.Whole_weight} onChange={this.handleWhole_weight} placeholder='ID number'></input>
            </div>
            <div>
                <label>Shucked_Weight: </label>
                <input type='text' value={this.state.Shucked_weigth} onChange={this.handleShucked_weigth} placeholder='ID number'></input>
            </div>
            <div>
                <label>Viscera_weight: </label>
                <input type='text' value={this.state.Viscera_weigth} onChange={this.handleViscera_weigth} placeholder='ID number'></input>
            </div>
            <div>
                <label>Shell_Weight: </label>
                <input type='text' value={this.state.Shell_weigth} onChange={this.handleShell_weigth} placeholder='ID number'></input>
            </div>
            <div>
                <label>Gender: </label>
                <select value={this.state.Gender} onChange={this.handleGender}>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option selected value='I'>Infant</option>
                </select>
            </div>
            <div>
                <button type='submit'>submit</button>
            </div>

        </form>
    )
    }
}

export default Forms