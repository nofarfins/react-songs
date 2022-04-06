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
import { BiMessageRounded } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { ImPlay2 } from "react-icons/im";
import { FormSearch } from './TrySearchFilter';
import { Nav } from 'react-bootstrap';
export const BASE_PATH = "http://127.0.0.1:8000/api"
export const PERFORMANCE_URL = `${BASE_PATH}/performance`



export class Performances extends React.Component {
  constructor(props) {
    super(props)

    this.state= {
      performences: [],
      songs:[],
      reviews: [],
      artists : [],
      showAddPerModal: false,
      Amount_of_views: 0,
      link:"",
      song: "",
      singer:"",
      title:"",
      text:"",
      showUpdateModal:false,
      selectedId: null,
      errors:"",
      showAddreview:false,
      search_line : "",
      displayViews:false,
      displayMore:false,
      showReviews : false
    }
     
    this.renderPerformence= this.renderPerformence.bind(this)
    this.handleAddNew = this.handleAddNew.bind(this)
    this.get_performance = this.get_performance.bind(this)
    this.submitper = this.submitper.bind(this)
    this.deletePerformance = this.deletePerformance.bind(this)
    this.filterNameSong = this.filterNameSong.bind(this)
    this.update = this.update.bind(this)
    this.handleAddUpdate = this.handleAddUpdate.bind(this)
    this.filterNameSinger = this.filterNameSinger.bind(this)
    this.handleSubmitReview= this.handleSubmitReview.bind(this)
    this.get_reviews = this.get_reviews.bind(this)
    this.handleAddReviews = this.handleAddReviews.bind(this) 
  }



  validate(){;
    let errors = {};
    let isValid = true;

    if (!this.state.song) {
      isValid = false;
      errors["song"] = "Please choose song";
    }

    if (!this.state.singer) {
      isValid = false;
      errors["singer"] = "Please choose singer";
    }

    if (!this.state.Amount_of_views) {
      isValid = false;
      errors["Amount_of_views"] = "Please enter views number";
    }

    this.setState({
      errors: errors
    });

    return isValid;
}


get_reviews(){
  console.log('get_reviews')
  axios
  .get(`${PERFORMANCE_URL}/${this.state.selectedId}/review`)
  .then(res => {
      
      console.log('get_performence', this.state.selectedId)
      this.setState({reviews: res.data})
      console.log(this.state.reviews)

  
  })
}
  get_performance() {
    console.log('called get')
    axios
  .get('http://127.0.0.1:8000/api/performance/')
  .then(res => {
    console.log(res)
      
      this.setState({performences: res.data})
  })
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

handleAddNew() {
  console.log('called handleAddNew')
  this.setState({showAddPerModal: true})
}

handleSubmitReview(){
  console.log('calles handleSubmit')
  this.setState({showAddreview:true})
}

handleAddReviews(performance) {
  console.log(performance.id)
  
  console.log('called handleAddReviews')
  this.setState({showReviews: true, selectedId: performance.id})
}



handleAddUpdate(performance) {
  console.log(performance.id)
  console.log('called handleAddUpdate')
  this.setState({showUpdateModal: true, selectedId: performance.id,
  song:performance.song, singer: performance.singer, link : performance.link, Amount_of_views:performance.Amount_of_views })
}


update() {
  if((this.validate())){
  console.log("update")
  console.log()
  axios.put(`${PERFORMANCE_URL}/${this.state.selectedId}`,  {
         
          song: this.state.song,
          singer:this.state.singer,
          link: this.state.link,
          Amount_of_views: this.state.Amount_of_views
      })
      .then(response => {
        console.log(response.data)
        if (response.status === 200) {
         this.get_performance()

         this.setState({showUpdateModal:false, song:"", singer:"", link:"", Amount_of_views:0, selectedId:null})

       }
      
      })
    }
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


filterNameSong(song){
  return(
          <option value={song.id}  key={song.id}>{song.name}</option>
         )
          }


filterNameSinger(artist){
  return(
    <option value={artist.id}  key={artist.id}>{artist.name}</option>
   )
    }


submitper() {
    if((this.validate())){
    console.log("submit performance", {song: this.state.song,
    singer: this.state.singer,
    link: this.state.link,
    Amount_of_views: 0})
    axios.post('http://127.0.0.1:8000/api/performance/',{
      song: this.state.song,
      singer: this.state.singer,
      link: this.state.link,
      Amount_of_views: 0})
      .then(response => {
        if (response.status === 201) {
         this.get_performance()
       }
      })
        this.setState({showAddPerModal: false, singer:"", song:"", link:"", Amount_of_views:0})
    }
         }
      
  
componentDidMount() {
  this.get_performance()}




renderPerformence(performance, index){
  console.log('renderPerformance', performance.id)

  return(
    
    <div key={index} >
    
    <ListGroup.Item>
       <Performance  key={performance.id} performance={performance} />
      {/* <Nav.Link onClick={() => this.get_reviews(performance)}  >{this.state.displayViews?'Hide Reviews':'Display Reviews'}</Nav.Link> */}
      {this.state.displayViews && <p>{this.state.reviews.length}</p>}  
      <Button onClick= {()=> this.handleAddReviews(performance)} >display reviews</Button>  &nbsp;&nbsp;
      <Button onClick={() => this.deletePerformance(performance.id)}><FaTrashAlt/></Button>  &nbsp;&nbsp;
      <Button onClick={()=> this.handleAddUpdate(performance)}  >  <BiEdit/></Button>  
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
          
        <Container>
        <br></br>
        <h1> Performences</h1>
        {/* <input type="search" value= {this.state.search_line} onChange = {(event) => this.setState({search_line: event.target.value})}></input> */}
        {/* <Button  >search</Button> */}
        <Button className="m-3" onClick={() => this.handleAddNew()}>Add performance</Button>
        <br></br>
        <br></br>
        
        {performencesObjects}
        
        </Container>
        
        <Modal show={this.state.showAddPerModal} 
                    onHide={() => this.setState({showAddPerModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new performance</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <Form>
                            <Form.Group className="mb-3"> 
                                <Form.Label>Song</Form.Label>
                                   <Form.Select
                                   value = {this.state.song}
                                   onChange = {(event) => this.setState({song: event.target.value})}>
                                
                                  {this.state.songs.map(
                                  this.filterNameSong)
                                    }
                                    
                                                  
                                   </Form.Select> 
                                  </Form.Group>
                                  <div className="text-danger">{this.state.errors.song}</div>
                                  <Form.Group className="mb-3"> 
                                <Form.Label>singer</Form.Label>
                                   <Form.Select
                                   placeholder='enter singer:'
                                   value = {this.state.singer}
                                   onChange = {(event) => this.setState({singer: event.target.value})}>
                                  
                                  {this.state.artists.map(
                                  this.filterNameSinger)
                                    }
                                    
                                                  
                                   </Form.Select> 
                                  </Form.Group>
                                  <div className="text-danger">{this.state.errors.singer}</div>
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
                                        type="number" placeholder="please enter number" 
                                        value={this.state.Amount_of_views}
                                        onChange={(event) => this.setState({Amount_of_views: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                         <Button onClick={this.submitper}>Save</Button> 
                    </ModalFooter>
                </Modal>




                <Modal show={this.state.showUpdateModal}  
                    onHide={() => this.setState({showUpdateModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit performance</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <Form>                    
                            <Form.Group className="mb-3">
                                <Form.Label>Amount_of_views</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="number" placeholder="Enter song..." 
                                        value={this.state.Amount_of_views}
                                        onChange={(event) => this.setState({Amount_of_views: event.target.value})}/>
                                         <div className="text-danger">{this.state.errors.Amount_of_views}</div>
                                </Form.Text>
                            </Form.Group>


                        </Form>
                    </ModalBody>
                    <ModalFooter>
                         <Button onClick={this.update}>Save</Button> 
                    </ModalFooter>
                </Modal>



                <Modal show={this.state.showAddreview} 
                    onHide={() => this.setState({showAddreview: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new review</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter title for your review..." 
                                        value={this.state.title}
                                        onChange={(event) => this.setState({title: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>text</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="enter your opinion.." 
                                        value={this.state.text}
                                        onChange={(event) => this.setState({text: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                         <Button >Save</Button> 
                    </ModalFooter>
                </Modal>



<Modal show={this.state.showReviews}  
                    onHide={() => this.setState({showReviews: false})}>
                    
                    <Modal.Header closeButton>
                        <Modal.Title>reviews</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <Form>                    
                           <p> Total reviews: {this.state.reviews.length}</p>
                           
                           <p>{this.state.reviews.id}</p>


                        </Form>
                    </ModalBody>
                    <ModalFooter>
                         <Button onClick={this.get_reviews}>see reviews</Button>
                         <Button onClick={()=> this.handleSubmitReview(performance)} >add reviews</Button> 
                    </ModalFooter>
                </Modal>


        </div>
      )          
        
      }
  }
