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
        <h3> {this.props.artist.name} , {this.props.artist.age}  </h3>
        
        {   !this.state.displayMore &&
                    <Nav.Link onClick={() => this.setState({displayMore: !this.state.displayMore})}>more...</Nav.Link>
                }
                {
                    this.state.displayMore &&
                    <ArtistDetails artist= {this.props.artist} />
                }
                {   this.state.displayMore &&
                    <Nav.Link onClick={() => this.setState({displayMore: !this.state.displayMore})}>less...</Nav.Link>}
                
      </div>


  )
      }
    }
