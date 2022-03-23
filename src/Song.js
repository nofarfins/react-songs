import React from 'react';



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

                <h5> name:</h5>
                <p> {this.props.song.name} </p>
                <h5>song writer:</h5>

                <p>{this.props.song.song_writer}</p> 
                <h5>song composer:</h5>
                
                <p>{this.props.song.song_composer}</p>
                <h5>lyrics:</h5>
                <p> {this.props.song.lyrics}</p>

      </div>
      )
    }
}
