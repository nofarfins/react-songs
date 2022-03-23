import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export class AddArtistModal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: "",
            age: "",
            information:""
        }

      
    }

    renderArtist(artist, index){
        return(
          <option key={artist.id}>{artist.name}</option>
        )
      }



render () {
    return(
    <Modal show={this.props.show} onHide={this.props.onAddArtistClose}>
    <Modal.Header closeButton>
    <Modal.Title>New Artist</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
    <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Select>
                {this.props.artists.map(
                    this.renderArtist)
                }
            </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Text>
                <Form.Control 
                    type="text" placeholder="Enter age here..." 
                    value={this.state.age}
                    onChange={(event) => this.setState({age: event.target.value})}/>
            </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>info</Form.Label>
            <Form.Text>
                <Form.Control 
                    type="text" placeholder="Enter information here..." 
                    value={this.state.information}
                    onChange={(event) => this.setState({information: event.target.value})}/>
            </Form.Text>
        </Form.Group>

    </Form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick={this.props.onAddArtistClose}>
        Cancel
    </Button>
    <Button variant="primary" 
        onClick={()=> this.props.onSubmit(this.state.name, this.state.age, this.state.information)}>
        Save Changes
    </Button>
    </Modal.Footer>
    </Modal> 
    )

}
}