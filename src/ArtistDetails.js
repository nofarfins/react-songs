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
      <p> {this.props.artist.information}</p>
<br></br>
</div>
      )
    }
}
