import React from 'react';



export class SongDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {

      return (
          
      <div  >
                
                      <h5>song writer:</h5>
                      <p>{this.props.song.song_writer.name}</p>
                      <h5>song composer:</h5>
                      <p>{this.props.song.song_composer.name}</p>

                    <h5>lyrics:</h5>
                    <p> {this.props.song.lyrics}</p>
                    
                
        <br></br>
      </div>
      )
    }
}
