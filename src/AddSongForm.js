import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export class AddSongModal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: "",
            song_writer:"",
            song_composer: "",
            performed_by:"",
            lyrics: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.renderArtist = this.renderArtist.bind(this)
        
    }

    renderArtist(artist, index){
        return(
          <option key={artist.id}>{artist.name}</option>
        )
      }

    handleSubmit() {
        return this.props.onSubmit(this.state.name, this.state.song_writer, this.state.song_composer, this.state.performed_by, this.state.lyrics)
    }

render () {
    return(
    <Modal show={this.props.show} onHide={this.props.onAddSongClose}>
    <Modal.Header closeButton>
    <Modal.Title>New Song</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
        <Form.Group className="mb-3">
             <Form.Label>Song name</Form.Label>
            <Form.Text>
                <Form.Control 
                    type="text" placeholder="Enter title here..." 
                    value={this.state.name}
                    onChange={(event) => this.setState({name: event.target.value})}/>
            </Form.Text> 
        </Form.Group>

        <Form.Group>
            <Form.Label>Writer</Form.Label>
            <Form.Select>
                {this.props.artists.map(
                    this.renderArtist)
                }
            </Form.Select>
        </Form.Group>
        <Form.Group>
            <Form.Label>Composer</Form.Label>
            <Form.Select>
                {this.props.artists.map(
                    this.renderArtist)
                }
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3"> 
         <Form.Label>Lyrics</Form.Label>
            <Form.Text>
                <Form.Control 
                    type="text" placeholder="Enter lyrics here..." 
                    value={this.state.lyrics}
                    onChange={(event) => this.setState({lyrics: event.target.value})}/>
            </Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Performed_by</Form.Label>
            <Form.Select>
                {this.props.artists.map(
                    this.renderArtist)
                }
            </Form.Select>
        </Form.Group>

    </Form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="outline-secondary" onClick={this.props.onAddSongClose}>
        Cancel
    </Button>
    <Button variant="primary"
        onClick={this.handleSubmit}>
        Save Changes
    </Button>
    </Modal.Footer>
    </Modal> 
    )

}
}