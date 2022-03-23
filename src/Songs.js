import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import {Song} from './Song';
import Button from 'react-bootstrap/Button'
import { ModalBody } from 'react-bootstrap';
import { ModalFooter } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import './App.css';


export class Songs extends React.Component {
  constructor(props) {
    super(props)

    this.state= {
      songs: [],
      artists: [],
      showaddsongmodal:false,
      
      name: "",
      song_writer:"",
      song_composer: "",
      performed_by:"",
      lyrics:""
    }
   this.renderSong= this.renderSong.bind(this);
   this.submitSong = this.submitsong.bind(this)
   this.get_songs = this.get_songs.bind(this) 
  }

  get_songs() {
    console.log('called get songs')
    axios
  .get('http://127.0.0.1:8000/api/songs/')
  .then(res => {
      
      this.setState({songs: res.data})
  })
  
}

handleAddNew() {
  console.log('called handleAddNew')
  this.setState({showaddsongmodal: true})
}

submitsong() {
  console.log("submit songs")
  axios.post('http://127.0.0.1:8000/api/songs/',{
    name: 1,
    lyrics:'bla',
    song_composer: this.state.song_composer,
    song_writer:2,
  })
    .then(response => {
        if (response.status === 201) {
            console.log("finish")
       }
     
      })
    }

// filterNameArtist(artist, index){
//     return(
//           <option key={artist.id}>{artist.name}</option>
//           )
//                   }
      
componentDidMount() {
  this.get_songs()
}

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
        <Button className="m-3" onClick={this.handleAddNew.bind(this)}> Add new</Button>
        <br></br>
        <ul>{songsObjects}</ul>

        <Modal show={this.state.showaddsongmodal} 
                    onHide={() => this.setState({showaddsongmodal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new song</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter age..." 
                                        value={this.state.name}
                                        onChange={(event) => this.setState({name: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>


                            <Form.Group className="mb-3">
                                <Form.Label>song composer:</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="number" placeholder="Enter information..." 
                                        value={this.state.song_composer}
                                        onChange={(event) => this.setState({song_composer: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                        
                            <Form.Group className="mb-3">
                                <Form.Label>lyrics:</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter information..." 
                                        value={this.state.lyrics}
                                        onChange={(event) => this.setState({lyrics: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                         <Button onClick={this.submitsong}>Save</Button> 
                    </ModalFooter>
                </Modal>
        </div>
      )          
        
      }
  }
