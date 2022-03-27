import React from 'react';
import axios from 'axios';
import { Performance } from './Performance';
import './App.css';
import Button from 'react-bootstrap/Button'
import { Container , ListGroup, ModalBody, ModalFooter } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './Header';
import { FaTrashAlt } from "react-icons/fa";
export const BASE_PATH = "http://127.0.0.1:8000/api"
export const PERFORMANCE_URL = `${BASE_PATH}/performance`




export class Performances extends React.Component {
  constructor(props) {
    super(props)

    this.state= {
      performences: [],
      songs: [],
      artists : [],
      showAddPerModal: false,
      Amount_of_views: 0,
      link:"",
      song: "",
      singer:""
    }
     
    this.renderPerformence= this.renderPerformence.bind(this)
    // this.submitperformence = this.submitperformence.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddNew = this.handleAddNew.bind(this)
    this.get_performance = this.get_performance.bind(this)
    this.submitper = this.submitper.bind(this)
    this.deletePerformance = this.deletePerformance.bind(this)
    // this.filterNameSong = this.filterNameSong.bind(this)
  }

  get_performance() {
    console.log('called get')
    axios
  .get('http://127.0.0.1:8000/api/performance/')
  .then(res => {
      
      this.setState({performences: res.data})
  })
   axios
  .get('http://127.0.0.1:8000/api/songs/')
  .then(res => {
      
      this.setState({songs: res.data})
  })
}

handleAddNew() {
  console.log('called handleAddNew')
  this.setState({showAddPerModal: true})
}


deletePerformance(performanceId) {
  console.log("deleteArtist")
  axios.delete(`${PERFORMANCE_URL}/${performanceId}`,  )
  .then(response => {
    console.log(response)
    if (response.status === 204) {
        this.get_performance()
    }
})
}


// filterNameSong(song, index){
//   return(
//           <option key={song.id}>{song.id}</option>
//          )
//           }


submitper() {
  console.log("submit performance")
  axios.post('http://127.0.0.1:8000/api/performance/',{
    song: this.state.song,
    singer: this.state.singer,
    link: this.state.link,
    Amount_of_views: 0 ,})
    .then(response => {
        if (response.status === 201) {
         this.get_performance()
       }
      })
        this.setState({showAddPerModal: false})
         }
      
  
componentDidMount() {
  this.get_performance()

}



renderPerformence(performance, index){
  return(
    
    <div key={index} >
    
    <ListGroup.Item>
      <Performance key={performance.id} performance={performance} />
      <Button onClick={() => this.deletePerformance(performance.id)}><FaTrashAlt/> Delete</Button>  &nbsp;&nbsp;
      <Button>Add Review</Button>
      </ListGroup.Item>
      <br></br>
      </div>
      
  )
}


    render() {
    
      let performencesObjects = this.state.performences.map(
        this.renderPerformence)
      return(
        <div  >
         
          
          <Header/>
          <br></br>
        <Container>
        <h1> Performences</h1>
        <br></br>
        <Button className="m-3" onClick={() => this.setState({showAddPerModal: true})}>Add performance</Button>
        <br></br>
        <br></br>
        <ListGroup.Item>
        {performencesObjects}
        </ListGroup.Item>
        </Container>
        
        <Modal show={this.state.showAddPerModal} 
                    onHide={() => this.setState({showAddPerModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new performance</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <Form>
                            {/* <Form.Group className="mb-3"> */}
                                {/* <Form.Label>Song</Form.Label>
                                   <Form.Select
                                   value = {this.state.song}
                                   onChange = {(event) => this.setState({song: event.target.value})}>
                                  {this.state.songs.map(
                                  this.filterNameSong)
                                    } */}
                                    
                                                  
                                  {/* </Form.Select> 
                                  </Form.Group> */}
                    
                            <Form.Group className="mb-3">
                                <Form.Label>song</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="number" placeholder="Enter song..." 
                                        value={this.state.song}
                                        onChange={(event) => this.setState({song: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>singer</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="number" placeholder="Enter singer..." 
                                        value={this.state.singer}
                                        onChange={(event) => this.setState({singer: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Link</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter link..." 
                                        value={this.state.link}
                                        onChange={(event) => this.setState({link: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Amount of views</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="0" 
                                        value={this.state.Amount_of_views}
                                        onChange={(event) => this.setState({link: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                         <Button onClick={this.submitper}>Save</Button> 
                    </ModalFooter>
                </Modal>
               


       


        </div>
      )          
        
      }
  }
