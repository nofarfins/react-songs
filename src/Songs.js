import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import {Song} from './Song';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import './App.css';
import { ListGroup, Container, ModalBody, ModalFooter } from 'react-bootstrap';
import { Header } from './Header';



export class Songs extends React.Component {
  constructor(props) {
    super(props)

    this.state= {
      songs: [],
      artists: [],
      showaddsongmodal:false,      
      name:'',
      song_composer: "",
      song_writer:"",
      lyrics:"",
      song:""
    }

   this.renderSong= this.renderSong.bind(this);
   this.submitSong = this.submitsong.bind(this);
   this.get_songs = this.get_songs.bind(this);
   this.filterNameArtist = this.filterNameArtist.bind(this);
  }

  get_songs() {
    console.log('called get songs')
    axios
  .get('http://127.0.0.1:8000/api/songs/')
  .then(res => {
      
      this.setState({songs: res.data})
  })
  axios
  .get('http://127.0.0.1:8000/api/artists/')
  .then(res => {
      
      this.setState({artists: res.data})
  })
}



submitsong() {
  console.log("submit songs", {name:this.state.name,
    song_composer:this.state.song_composer,
    song_writer: this.state.song_writer,
    lyrics: this.state.lyrics})
  axios.post('http://127.0.0.1:8000/api/songs/',
  {name:this.state.name,
  song_composer:this.state.song_composer,
  song_writer: this.state.song_writer,
  lyrics: this.state.lyrics})
    .then(response => {
    if (response.status === 201) {
    this.get_songs()}
          })
    this.setState({showaddsongmodal: false})}

filterNameArtist(artist){
    return(
          <option key={artist.id}>{artist.name}</option>
          )
                  }
      
componentDidMount() {
  this.get_songs()
}

renderSong (song, index){
  return(
    <div key={index} >
      <ListGroup.Item >
      <Song song={song} /> 
      </ListGroup.Item>
      <br></br>
    </div>      
  )
}

    render() {
    
      let songsObjects = this.state.songs.map(
        this.renderSong)
      return(
        <div>
          <Header/>
          <Container>
          <br></br>
        <h1>songs list</h1>
        <Button className="m-3" onClick={() => this.setState({showaddsongmodal: true})}> Add new</Button>
        <br></br>
        <br></br>
        
        {songsObjects}
        
        </Container>
        <Modal show={this.state.showaddsongmodal} 
                    onHide={() => this.setState({showaddsongmodal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title> new song</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Song name</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter song name..." 
                                        value={this.state.name}
                                        onChange={(event) => this.setState({name: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3"> 
                                <Form.Label>Song composer</Form.Label>
                                   <Form.Select
                                   value = {this.state.song_composer}
                                   onChange = {(event) => this.setState({song_composer: event.target.value})}>
                                  {this.state.songs.map(this.filterNameArtist)}
                                                  
                                   </Form.Select> 
                                  </Form.Group>

                                  <Form.Group className="mb-3"> 
                                <Form.Label>Song writer</Form.Label>
                                   <Form.Select
                                   placeholder='enter singer:'
                                   value = {this.state.song_writer}
                                   onChange = {(event) => this.setState({song_writer: event.target.value})}>
                                  {this.state.artists.map(this.filterNameArtist)}           
                                   </Form.Select> 
                                  </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Lyrics:</Form.Label>
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
