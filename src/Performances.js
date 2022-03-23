import React from 'react';
import axios from 'axios';
import { Performance } from './Performance';
import './App.css';
import { AddPerModal } from './AddPerModal';
import Button from 'react-bootstrap/Button'




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
    this.submitperformence = this.submitperformence.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    return this.props.onSubmit(this.state.Amount_of_views, this.state.link, this.state.song, this.state.singer)
}


  submitperformence(new_link, new_song,new_singer,new_amount) {
    console.log("submit performance")
    
    this.setState({

      showAddPerModal: false
    })
    
    axios.post('http://127.0.0.1:8000/api/performance/',{
      Amount_of_views: new_amount,
      link : new_link,
      song : 10,
      singer: 1
    
  }
    )
  .then(response => this.setState({
    performance:response.data
    
    
    
  })
  )}
  
componentDidMount() {
  axios
  .get('http://127.0.0.1:8000/api/performance/')
  .then(res => {
    console.log (res.data)
      
      this.setState({performences: res.data})
  })
  axios
  .get('http://127.0.0.1:8000/api/artists/')
  .then(res => {
      console.log(res.data)
      this.setState({artists: res.data})
  })
  axios
  .get('http://127.0.0.1:8000/api/songs/')
  .then(res => {
      console.log(res.data)
      this.setState({songs: res.data})
  })

}

renderPerformence(performance, index){
  return(
    
    <div>
    <div  className='weather-bordered-div'  >
    <br></br>  
      <Performance key={performance.id} performance={performance} />
      <br></br>
      </div>
      <div></div>
      <br></br>
      </div>
      
  )
}


    render() {
    
      let performencesObjects = this.state.performences.map(
        this.renderPerformence)
      return(
        <div  >
          <br></br>
        <h3> performences list</h3>
        <br></br>
        <Button variant="outline-primary" onClick={() => this.setState({showAddPerModal: true})}>Add performance</Button>
        <br></br>
        <br></br>
        <ul>{performencesObjects}</ul>
        <AddPerModal  
                    show={this.state.showAddPerModal}
                    onAddPerClose={()=> this.setState({showAddPerModal: false})}
                    onSubmit={this.submitperformence} artists= {this.state.artists}
                    songs = {this.state.songs}/>

        </div>
      )          
        
      }
  }
