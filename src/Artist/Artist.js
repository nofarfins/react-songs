import React from 'react';
import Nav from 'react-bootstrap/Nav'
import { ArtistDetails } from './ArtistDetails';

export class Artist extends React.Component{
  constructor(props){
    super(props)
    this.state={
      displayMore: false,
    }
  }


  render() {
      return(
      <div key = {this.props.artist.id}>
        <br></br>

        <h4 style={{textAlign:'center'}}> {this.props.artist.name} , {this.props.artist.age}  </h4>
        <br></br>
        &nbsp;  &nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;&nbsp;
        &nbsp;&nbsp;  <img  src='Photo/rotem.jpg' style={{width:'70%', height:"70%", }}  ></img>
        <br></br>
      <br></br>
                    <ArtistDetails  artist= {this.props.artist} />
              
      </div>


  )
      }
    }
