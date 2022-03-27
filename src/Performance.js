import React from 'react';
import { ImPlay2 } from "react-icons/im";
import { Nav } from 'react-bootstrap';

export class Performance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          displayMore:false,
          displayViews:false
        }
    }

    render() {

      return (
          
      <div  >
        
                 <h4>{this.props.performance.song.name}, {this.props.performance.singer.name}</h4>
                 
                 <p>   <a href={this.props.performance.link}><ImPlay2 style={{fontSize:'200%'}} /></a> 
                   &nbsp;&nbsp;&nbsp; views: {this.props.performance.Amount_of_views}  </p>
{/*                   
                {
                    this.state.displayMore &&
                    !this.props.reviews.length ? 'No reviews yet':
                    <Nav.Link onClick={() => this.setState({displayViews:!this.state.displayViews})}>{this.state.displayViews?'Hide Reviews':'Display Reviews'}</Nav.Link>
                }
                  {this.state.displayViews && <ReviewsList reviews={this.props.reviews}/>} */}
                <br></br>
                
        <br></br>
      </div>
      )
    }
}
