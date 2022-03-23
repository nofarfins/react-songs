import React from 'react';



export class ArtistDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {

      return (
          
        <div  >
                
        
        <h5>age:</h5>
        <p>{this.props.artist.age}</p>

      <h5>info:</h5>
      <p> {this.props.artist.information}</p>
      
  
<br></br>
</div>
      )
    }
}
