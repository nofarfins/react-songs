import React from 'react';
import { ImPlay2 } from "react-icons/im";


export class Performance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {

      return (
          
      <div  >
        
                 <h4>{this.props.performance.song.name}</h4>
                 <p> by: {this.props.performance.singer.name}</p>
                 <p> views: {this.props.performance.Amount_of_views}</p>
                 <a href={this.props.performance.link}><ImPlay2 style={{fontSize:'300%'}} /></a>
                <br></br>
                
        <br></br>
      </div>
      )
    }
}
