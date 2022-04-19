import React from 'react';



export class ArtistDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
      return (
       
      <p style={{textAlign:'center'}}> {this.props.artist.information}</p>

      )
    }
}
