import React from 'react';
import axios from 'axios';
import {Artist} from './Artist';
import './App.css';

import { AddArtistModal } from './AddArtistForm';
import Button from 'react-bootstrap/Button'




export class Artists extends React.Component {
  constructor(props) {
    super(props)

    this.state= {
      artists: [],
      showAddArtistModal: false,
      name: "",
      age: "",
      information:""
      
      
      
      
    }
     
    this.renderArtist= this.renderArtist.bind(this);
    this.submitArtist = this.submitArtist.bind(this)
  }


  submitArtist(new_name, new_age,new_information) {
    console.log("submit artist")
    this.state.artists.push({
        name: new_name, 
        age: new_age, 
        information: new_information,})
    this.setState({
      artists: this.state.artists.slice(),
      showAddArtistModal: false
    })
    console.log(this.state.artists)
    axios.post('http://127.0.0.1:8000/api/artists/',{
      name: new_name,
      age : new_age,
      information : new_information
    })
    

     
  }

   

componentDidMount() {
  axios
  .get('http://127.0.0.1:8000/api/artists/')
  .then(res => {
      
      this.setState({artists: res.data})
  })
}

renderArtist (artist, index){
  return(
    <div>
    <div className='weather-bordered-div'>

      <br></br>
      <Artist key={artist.id} artist={artist} />
      
      </div>
      
        <br></br>
      </div>
 
      
  )
}


    render() {
    
      let artistsObjects = this.state.artists.map(
        this.renderArtist)
      return(
        <div>
        <div >
        <h3> artists list</h3>
        <Button variant="outline-primary" onClick={() => this.setState({showAddArtistModal: true})}>Add Artist</Button>
        <br></br>
        <br></br>
        <ul>{artistsObjects}</ul>
        </div>
        <AddArtistModal  
                    show={this.state.showAddArtistModal}
                    onAddArtistClose={()=> this.setState({showAddArtistModal: false})}
                    onSubmit={this.submitArtist} artists={this.state.artists}/>


        </div>
        
      )          
        
      }
  }
