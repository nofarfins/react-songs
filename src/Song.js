import React from 'react';
import { SongDetails } from './SongDetails';
import { Nav } from 'react-bootstrap';



export class Song extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          displayMore: false,
        }
    }

    render() {

      return (
          
      <div >

<h3> {this.props.song.name} </h3>
        
        {   !this.state.displayMore &&
                    <Nav.Link onClick={() => this.setState({displayMore: !this.state.displayMore})}>more...</Nav.Link>
                }
                {
                    this.state.displayMore &&
                    <SongDetails song= {this.props.song} />
                }
                {   this.state.displayMore &&
                    <Nav.Link onClick={() => this.setState({displayMore: !this.state.displayMore})}>less...</Nav.Link>
                }


      </div>
      )
    }
}
