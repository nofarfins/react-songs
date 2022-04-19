import React from 'react';
import { ImPlay2 } from "react-icons/im";


export class Performance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          displayMore:false,
          displayViews:false,
        }
    }

    render() {

      return (
          
      <div     >
        <br></br>

                 <div >
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <iframe
        src={this.props.performance.link}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
      />{" "}
    </div>
    <h6 style={{textAlign:'center'}}>{this.props.performance.song.name}, {this.props.performance.singer.name}</h6>
                <h6 style={{textAlign:'center'}}>Views: {this.props.performance.Amount_of_views}  </h6>  
                   <br></br>
      </div>
      )
    }
}
