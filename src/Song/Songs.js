import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import {Song} from './Song'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import { ListGroup, Container, ModalBody, ModalFooter } from 'react-bootstrap';
import { Header } from '../Header';
import { FaTrashAlt } from "react-icons/fa";
export const BASE_PATH = "http://127.0.0.1:8000/api"
export const SONGS_URL = `${BASE_PATH}/songs`



export class Songs extends React.Component {
  constructor(props) {
    super(props)

    this.state= {
      songs: [],
      artists: [],
      showaddsongmodal:false,      
      name:"",
      song_composer: "",
      song_writer:"",
      lyrics:"",
      selectedId:null,
      showAlert:false
    }

   this.renderSong= this.renderSong.bind(this);
   this.submitsong = this.submitsong.bind(this);
   this.get_songs = this.get_songs.bind(this);
   this.filterNameArtist = this.filterNameArtist.bind(this);
   this.handleDelete = this.handleDelete.bind(this)
   this.deleteSong = this.deleteSong.bind(this)
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


handleDelete(song){
  console.log('handleDelete')
  this.setState({showAlert:true, selectedId:song.id})
  }


  deleteSong() {
    console.log("deleteSong")
    axios.delete(`${SONGS_URL}/${this.state.selectedId}`,  )
    .then(response => {
      console.log(response)
      if (response.status === 204) {
          this.get_songs()
          this.setState({showAlert:false})
      }
  })
  }


submitsong() {
  console.log("submit songs")
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
          <option value={artist.id} key={artist.id}>{artist.name}</option>
          )}
                         
componentDidMount() {
  this.get_songs()
}

renderSong (song, index){
  return(
    <div key={index} >
      <ListGroup.Item style={{border:'none' }} >
      <Song song={song} /> 
      <Button onClick={() => this.handleDelete(song)}> <FaTrashAlt/> </Button>  &nbsp;&nbsp;   
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
                        <Modal.Title> New song</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <Form>
                        <Form.Group className="mb-3">
                                <Form.Label>Name:</Form.Label>
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
                                  {this.state.artists.map(this.filterNameArtist)}
                                                  
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



                <Modal show={this.state.showAlert} onHide={() => this.setState({showAlert: false})}>
<br></br>
   <Modal.Title>&nbsp; Please note!</Modal.Title>
<Modal.Dialog>
  <Modal.Body>
    <p> All performances associated with the song will also be deleted</p>
    <h5 style={{color:'red'}}>Are you sure you want to continue?</h5>
    <Button variant="secondary" onClick={() => this.setState({showAlert: false})} >No</Button> &nbsp;&nbsp; 
    <Button variant="primary" onClick = {this.deleteSong}>Yes</Button>
  </Modal.Body>
</Modal.Dialog>
</Modal>
        </div>
      )          
        
      }
  }
