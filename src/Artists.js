import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { ModalBody } from 'react-bootstrap';
import { ModalFooter } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Artist} from './Artist';
import './App.css';
import Button from 'react-bootstrap/Button'
import { ListGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';



export class Artists extends React.Component {
  constructor(props) {
    super(props)

    this.state= {
      artists: [],
      showAddArtistModal: false,
      name: "",
      age: "",
      information:""
      
      
      
      
    }
     
    this.renderArtist= this.renderArtist.bind(this);
    this.submitArtist = this.submitArtist.bind(this)
    this.get_artists = this.get_artists.bind(this)
    this.filterNameArtist = this.filterNameArtist.bind(this)
  }

  get_artists() {
    console.log('called getartists')
    axios
  .get('http://127.0.0.1:8000/api/artists/')
  .then(res => {
      
      this.setState({artists: res.data})
  })
}

handleAddNew() {
  console.log('called handleAddNew')
  this.setState({showAddArtistModal: true})
}



submitArtist() {
    console.log("submit artist")
    axios.post('http://127.0.0.1:8000/api/artists/',{
      name: this.state.name,
      age : this.state.age,
      information : this.state.information})
      .then(response => {
          if (response.status === 201) {
           this.get_artists()
         }
        })
          this.setState({showAddArtistModal: false})
           }
        

filterNameArtist(artist, index){
  return(
          <option key={artist.id}>{artist.name}</option>
         )
          }
   
componentDidMount() {
  this.get_artists()
}

renderArtist (artist, index){
  return(
    <div>
    <div >

      <br></br>
      
      <ListGroup.Item key={artist.id}>
      <Artist  artist={artist} />
      
      </ListGroup.Item>
      
      
      </div>
      
        <br></br>
      </div>
 
      
  )
}


    render() {
    
      let artistsObjects = this.state.artists.map(
        this.renderArtist)
      return(
        <div>
        <Container>
          <br></br>
        <h1  > Artists List</h1>
        <Button  className="m-3" onClick={this.handleAddNew.bind(this)}> Add new</Button>
        <br></br>
        <br></br>
        <ListGroup.Item>
          {artistsObjects}
         </ListGroup.Item>
         </Container>
        
        <Modal show={this.state.showAddArtistModal} 
                    onHide={() => this.setState({showAddArtistModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new artist</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <Form>
                            {/* <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                   <Form.Select>
                                  {this.state.artists.map(
                                  this.filterNameArtist)
                                    }
                                                  
                                  </Form.Select> 
                                  </Form.Group> */}
                    
                            <Form.Group className="mb-3">
                                <Form.Label>Age</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter age..." 
                                        value={this.state.age}
                                        onChange={(event) => this.setState({age: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter name..." 
                                        value={this.state.name}
                                        onChange={(event) => this.setState({name: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Info</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter information..." 
                                        value={this.state.information}
                                        onChange={(event) => this.setState({information: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                         <Button onClick={this.submitArtist}>Save</Button> 
                    </ModalFooter>
                </Modal>

        </div>
        
      )          
        
      }
  }
