import React from 'react';
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

<h4>   {this.props.song.name} </h4>
<p> Written by {this.props.song.song_writer.name} , Composed by  {this.props.song.song_composer.name}  </p>
        
        {   !this.state.displayMore &&
                    <Nav.Link onClick={() => this.setState({displayMore: !this.state.displayMore})}>more...</Nav.Link>
                }
                {
                    this.state.displayMore && <p> {this.props.song.lyrics}</p>
                }
                {   this.state.displayMore &&
                    <Nav.Link onClick={() => this.setState({displayMore: !this.state.displayMore})}>less...</Nav.Link>
                }


      </div>
      )
    }
}
