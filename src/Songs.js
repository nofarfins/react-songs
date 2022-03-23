import React from 'react';
import axios from 'axios';
import {Song} from './Song';
import { AddSongModal } from './AddSongForm';
import Button from 'react-bootstrap/Button'




export class Songs extends React.Component {
  constructor(props) {
    super(props)

    this.state= {
      songs: [],
      artists: [],
      showAddsongModal: false,
      name: "",
      song_writer:"",
      song_composer: "",
      performed_by:"",
      lyrics:""
    }
   this.renderSong= this.renderSong.bind(this);
   this.submitSong = this.submitSong.bind(this)
    
  }

componentDidMount() {
  axios
  .get('http://127.0.0.1:8000/api/songs/')
  .then(res => {
      console.log(res.data)
      this.setState({songs: res.data})
  })
  axios
  .get('http://127.0.0.1:8000/api/artists/')
  .then(res => {
      console.log(res.data)
      this.setState({artists: res.data})
  })
}

submitSong(new_name, new_songWriter,new_songComposer,new_performedBy, new_lyrics) {
  console.log("submit song")
  this.setState({
      showAddsongModal: false
  })
  console.log(this.state.songs)
  axios.post('http://127.0.0.1:8000/api/songs/',{
      name: new_name,
      song_writer : new_songWriter,
      song_composer : new_songComposer,
      performed_by: new_performedBy,
      lyrics: new_lyrics
    
    })
      .then(response => this.setState({
        name: response.data.name,
        song_composer:response.data.song_composer.name,
        song_writer : response.data.song_writer.name,
        performed_by: response.data.performed_by[0].name,
        lyrics: response.data.lyrics
      })
      )}


renderSong (song, index){
  return(
    <div>
      
      <Song key={song.id} song={song} />
      </div>
  )
}


    render() {
    
      let songsObjects = this.state.songs.map(
        this.renderSong)
      return(
        <div>
        <h3> songs list</h3>
        <Button variant="outline-primary" onClick={() => this.setState({showAddsongModal: true})}>Add song</Button>
        <br></br>
        <ul>{songsObjects}</ul>

        <AddSongModal  
                    show={this.state.showAddsongModal}
                    onAddSongClose={()=> this.setState({showAddsongModal: false})}
                    onSubmit={this.submitSong} artists= {this.state.artists}/>
        </div>
      )          
        
      }
  }
