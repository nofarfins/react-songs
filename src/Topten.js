import React from 'react';
import { AiFillStar } from "react-icons/ai";
import { Header } from './Header';
import axios from 'axios';


export class Topten extends React.Component{
  constructor(props){
    super(props)
    this.state={
      topten:[]
    }
    this.renderTopten = this.renderTopten.bind(this)
    this.get_topten = this.get_topten.bind(this)
  }


  get_topten(){
    console.log('get_reviews')
    axios
    .get('http://127.0.0.1:5000/api/topten')
    .then(res => {
        this.setState({topten: res.data.name})
        console.log(this.state.topten)

    })
  }

  componentDidMount() {
    this.get_topten()}


renderTopten(song, index){
    console.log('renderTopten')
  
    return(
      
      <div style={{textAlign:'center'}} key={index} >
        
        <h5> <AiFillStar/>{song} <AiFillStar/></h5>
        <br></br>
      </div>  
        
    )
  }
  

  render() {
    let renderTopten = this.state.topten.map(
        this.renderTopten)
      return(
          <div>
            <Header/>
            <br></br>
            <h2 style={{textAlign:'center'}}>The best 10 songs of 2021</h2>
            <br></br>
            <br></br>
            {renderTopten}
        </div>
  )

      }
    }
