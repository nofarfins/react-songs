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
          <br></br>

<h4 style={{textAlign:'center'}}>   {this.props.song.name} </h4>
<br></br>
<p style={{textAlign:'center'}}> Written by {this.props.song.song_writer.name} , Composed by  {this.props.song.song_composer.name}  </p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a style={{textAlign:'center' , color:'black', fontSize:'20px'}} href={this.props.song.lyrics}> Click here to see lyrics</a>
<br></br>
<br></br>
&nbsp;  &nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;&nbsp;  
<img  alt="Artist image" src={this.props.song.picture} style={{width:'70%', height:"70%", }}  ></img>

      </div>
      )
    }
}
