import React from 'react'
// import {Component} from 'react'
// import Child from './Child'
// function Properties({values})
// {
//     return(
//         <h1>{values} a.k.a {}</h1>

//     )
// }

// class Properties extends Component
// {
//     render(){
//     const {value} = this.props

//     return(
//         <h1>{value}</h1>
//     )
//     }
// }

// function Properties()
// {
//     function ClickHandle()
//     {
//         window.alert()
//     }
//     return(
//         <button onClick={ClickHandle()}>Button</button>
//     )
// }

// class Properties extends Component
// {
//     constructor(props)
//     {
//         super(props)
//         this.state = {
//             message:"Passing methods as props"
//         }

//         this.clickhandler = this.clickhandler.bind(this)
//     }

//      clickhandler(){
//         this.setState({
//             message:"Good Bye...!"
//         })
//         alert(this.state.message)
//      }
//     render()
//     {
//          return (
//             <div>
//                 <h1>{this.state.message}</h1>
//                 <Child clicksHandler={this.clickhandler} />
//             </div>
//          )
//     }
// }

function Properties()
{
    const list = ['Anil','Mani','Meera','Bhai','Anil']
    const names = list.map((item)=>(<h1 key={item}>{item}</h1>))
    return(
        <div>
            {names}
        </div>
    )
}
export default Properties