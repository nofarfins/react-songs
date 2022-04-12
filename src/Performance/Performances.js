import React from 'react';
import axios from 'axios';
import { Performance } from './Performance';
import Button from 'react-bootstrap/Button'
import { Container , ListGroup, ModalBody, ModalFooter } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from '../Header';
import { FaTrashAlt, FaRegComment } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
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
      users:[],
      showAddPerModal: false,
      Amount_of_views: 0,
      link:"",
      song: "",
      singer:"",
      review_text:"",
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
    this.reviewsDetails = this.reviewsDetails.bind(this)
    this.AddReview = this.AddReview.bind(this)
  }

  validate_review(){;
    let errors = {};
    let isValid = true;

    if (!this.state.review_text) {
      isValid = false;
      errors["review_text"] = "Please write your opinion!";
    }
    this.setState({
      errors: errors
    });

    return isValid;
  }



  validate_per(){;
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
  axios
  .get('http://127.0.0.1:8000/api/user/')
  .then(res => {
      
      this.setState({users: res.data})
  
  })
  
}

handleAddNew() {
  console.log('called handleAddNew')
  this.setState({showAddPerModal: true})
}

handleSubmitReview(performance){
  console.log('calles handleSubmit review')
  this.setState({showAddreview:true, selectedId:performance.id})
  
}

handleAddReviews(performance) {
  console.log('called handleAddReviews')
  this.setState({showReviews: true, selectedId: performance.id})
}



handleAddUpdate(performance) {
  console.log('called handleAddUpdate')
  this.setState({showUpdateModal: true, selectedId: performance.id,
  song:performance.song, singer: performance.singer, link : performance.link, Amount_of_views:performance.Amount_of_views })
}


update() {
 
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

AddReview(){
  if((this.validate_review())){
    console.log("submit Add  new review")
    axios.post('http://127.0.0.1:8000/api/reviews/',{
      Performance_id: this.state.selectedId,
      review_text: this.state.review_text,
      user: 3})
      .then(response => {
        if (response.status === 201) {
         this.get_performance()
       }
      })
        this.setState({showAddreview: false, selectedId:null, review_text:""})
    
    }
  }



reviewsDetails(review, index){
return(
  <div key={index} >
  
  <h6> <CgProfile style={{fontSize:'140%'}}/> {review.user.first_name}  </h6>
  <p> {review.review_text} </p>
  </div>
)

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
  if((this.validate_per())){
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
  console.log('renderPerformance')

  return(
    
    <div key={index} >
    <ListGroup.Item style={{ border:'none' }}>
       <Performance  key={performance.id} performance={performance} />

      
      <Button onClick= {()=> this.handleAddReviews(performance)} >View all comments</Button>  &nbsp;&nbsp;
      <br></br>
      <br></br>
      <Button onClick={() => this.deletePerformance(performance.id)}><FaTrashAlt/></Button>  &nbsp;&nbsp;
      <Button onClick={()=> this.handleAddUpdate(performance)}  >  <BiEdit/></Button>   &nbsp;&nbsp;
      <Button onClick={()=> this.handleSubmitReview(performance)} > <FaRegComment/></Button> 
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
                                  this.filterNameSong)}
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
                                  this.filterNameSinger)}
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
                                         <div className="text-danger">{this.state.errors.Amount_of_views}</div>
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
                        <Modal.Title>Add new comment</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>text</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="enter your opinion.." 
                                        value={this.state.review_text}
                                        onChange={(event) => this.setState({review_text: event.target.value})}/>
                                        <div className="text-danger">{this.state.errors.review_text}</div>
                                </Form.Text>
                            </Form.Group>
                           </Form>
                            </ModalBody>
                         <ModalFooter>
                            <Button onClick={this.AddReview}>Save</Button> 
                             </ModalFooter>
                          </Modal>



<Modal show={this.state.showReviews}  
                    onHide={() => this.setState({showReviews: false, reviews:[]})}>

                    <Modal.Header closeButton>
                      <h1>comments</h1>
                    </Modal.Header>
                    <ModalBody>
                        <Form>              
                           {this.state.reviews.map(this.reviewsDetails)}      
                        <Button onClick={this.get_reviews}>Click here</Button>
                        </Form>
                    </ModalBody>
                </Modal>
        </div>
      )          
        
      }
  }



  
<Modal.Dialog>
  <Modal.Body>
    <p>Please note!</p>
    <p> all performances and songs associated with the artist will also be deleted</p>
    <h4>Are you sure you want to continue?</h4>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary">Close</Button>
    <Button variant="primary">Yes</Button>
  </Modal.Footer>
</Modal.Dialog>