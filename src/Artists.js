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
import { Header } from './Header';
import { FaTrashAlt } from "react-icons/fa";

import { BiEdit } from "react-icons/bi";


export const BASE_PATH = "http://127.0.0.1:8000/api"
export const ARTISTS_URL = `${BASE_PATH}/artists`



export class Artists extends React.Component {
  constructor(props) {
    super(props)

    this.state= {
      artists: [],
      showAddArtistModal: false,
      showUpdateModal:false,
      name: "",
      age: "",
      information:""
      
      
      
      
    }
     
    this.renderArtist= this.renderArtist.bind(this);
    this.submitArtist = this.submitArtist.bind(this)
    this.get_artists = this.get_artists.bind(this)
    // this.filterNameArtist = this.filterNameArtist.bind(this)
    this.deleteArtist = this.deleteArtist.bind(this)
    // this.updateArtist = this.updateArtist.bind(this)
    // this.update = this.update.bind(this)
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

handleAddUpdate() {
  console.log('called handleAddUpdate')
  this.setState({showUpdateModal: true})
}

deleteArtist(artistId) {
  console.log("deleteArtist")
  axios.delete(`${ARTISTS_URL}/${artistId}`,  )
  .then(response => {
    console.log(response)
    if (response.status === 204) {
        this.get_artists()
    }
})
}


// update(artistId) {
//         axios.put(`${ARTISTS_URL}/${artistId}`, {
//           name: 'yyyy',
//           age: 22,
//           information: 'nofar',
//       })
//       .then(response => {
//         console.log(response.data)
//         if (response.status === 200) {
//          this.get_artists()

//        }
//       })
//     }
// updateArtist(artistId,) {
//   console.log("updateArtist")
//   axios.put(`${ARTISTS_URL}/${artistId}`, )
//   .then(response => {
//     console.log(response)
//     if (response.status === 204) {
//         this.get_artists()
//     }
// })
// }


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
        
   
componentDidMount() {
  this.get_artists()
}



renderArtist (artist,index){
  return(
    <div   key={index}>

      <ListGroup.Item key={index} >
      <Artist  artist={artist}  />
      <Button onClick={() => this.deleteArtist(artist.id)}> <FaTrashAlt/> Delete</Button>  &nbsp;&nbsp;   
      <Button > <BiEdit/></Button>  
      </ListGroup.Item>
      
      {/* onClick={this.handleAddUpdate.bind(this)} */}
 </div>
      

 
      
  )
}


    render() {
    
      let artistsObjects = this.state.artists.map(
        this.renderArtist)
      return(
        <div>
          <Header/>
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

                <Modal show={this.state.showUpdateModal} 
                    onHide={() => this.setState({showUpdateModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <Form>                    
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
                         <Button onClick={this.update}>Save</Button> 
                    </ModalFooter>
                </Modal>

        </div>
        
      )          
        
      }
  }
