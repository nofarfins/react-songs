import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { ModalBody } from 'react-bootstrap';
import { ModalFooter } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Artist } from './Artist';
import Button from 'react-bootstrap/Button'
import { ListGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Header } from '../Header';
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
      showAlert: false,
      name: "",
      age: "",
      information:"",
      selectedId:null,
      errors:{}      
    }
     
    this.renderArtist= this.renderArtist.bind(this);
    this.submitArtist = this.submitArtist.bind(this)
    this.get_artists = this.get_artists.bind(this)
    this.deleteArtist = this.deleteArtist.bind(this)
    this.update = this.update.bind(this)
    this.handleAddUpdate = this.handleAddUpdate.bind(this)
    this.validate = this.validate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  
  }

  validate(){;
    let errors = {};
    let isValid = true;

    if (!this.state.name) {
      isValid = false;
      errors["name"] = "Please enter artist name.";
    }

    if (!this.state.age) {
      isValid = false;
      errors["age"] = "Please enter artist age.";
    }

    if (!this.state.information) {
      isValid = false;
      errors["information"] = "Please enter artist information.";
    }
    this.setState({
      errors: errors
    });

    return isValid;
}

  get_artists() {
    console.log('called getartists')
    axios
  .get('http://127.0.0.1:8000/api/artists/')
  .then(res => {
      
      this.setState({artists: res.data})
  })
}


handleDelete(artist){
console.log('handleDelete')
this.setState({showAlert:true, selectedId:artist.id})
}

handleAddNew() {
  console.log('called handleAddNew')
  this.setState({showAddArtistModal: true})
}

handleAddUpdate(artist) {
  console.log('called handleAddUpdate')
  this.setState({showUpdateModal: true, selectedId: artist.id, name:artist.name, age:artist.age, information:artist.information})
}

deleteArtist() {
  console.log("deleteArtist")
  axios.delete(`${ARTISTS_URL}/${this.state.selectedId}`,  )
  .then(response => {
    console.log(response)
    if (response.status === 204) {
        this.get_artists()
        this.setState({showAlert:false})
    }
})
}




update() {
  console.log("update")
  console.log()
  axios.put(`${ARTISTS_URL}/${this.state.selectedId}`,  {
         
          name: this.state.name,
          age:this.state.age,
          information: this.state.information,
      })
      .then(response => {
        console.log(response.data)
        if (response.status === 200) {
         this.get_artists()

         this.setState({showUpdateModal:false , name:"", age:"", information:""})

       }
      
      })
    }

submitArtist() {
    if((this.validate())){
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
          this.setState({showAddArtistModal: false , name:"", age:"", information:""})
           }
          }
          
          
   
componentDidMount() {
  this.get_artists()
}





renderArtist (artist,index){
  return(
    <div   key={index}>

      <ListGroup.Item key={index} style={{ border:'none' }} >
      <Artist  artist={artist}  />
      <Button onClick={() => this.handleDelete(artist)}> <FaTrashAlt/> </Button>  &nbsp;&nbsp;   
      <Button onClick={() => this.handleAddUpdate(artist)}  >  <BiEdit/></Button>  
      </ListGroup.Item>
      <br></br>
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
        
          {artistsObjects}
        
         </Container>
        
        <Modal show={this.state.showAddArtistModal}  id = {this.state.id}
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
                                        type="number" placeholder="Enter age..." 
                                        value={this.state.age}
                                        onChange={(event) => this.setState({age: event.target.value})}/>
                                        <div className="text-danger">{this.state.errors.age}</div>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter name..." 
                                        value={this.state.name}
                                        onChange={(event) => this.setState({name: event.target.value})}/>
                                        <div className="text-danger">{this.state.errors.name}</div>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Info</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter information..." 
                                        value={this.state.information}
                                        onChange={(event) => this.setState({information: event.target.value})}/>
                                        <div className="text-danger">{this.state.errors.information}</div>
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
                        <Modal.Title>Edit artist</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <Form>                    
                            <Form.Group className="mb-3">
                                <Form.Label>Age</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="number" placeholder="Enter age..." 
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


<Modal show={this.state.showAlert} onHide={() => this.setState({showAlert: false})}>
<br></br>
   <Modal.Title>&nbsp; Please note!</Modal.Title>
<Modal.Dialog>
  <Modal.Body>
    <p> All performances and songs associated with the artist will also be deleted</p>
    <h5 style={{color:'red'}}>Are you sure you want to continue?</h5>
    <Button variant="secondary" onClick={() => this.setState({showAlert: false})} >No</Button> &nbsp;&nbsp; 
    <Button variant="primary" onClick = {this.deleteArtist}>Yes</Button>
  </Modal.Body>
</Modal.Dialog>
</Modal>                
        


          
        </div>


          
      )          
        
      }
  }

  
