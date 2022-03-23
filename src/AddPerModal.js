import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Dropdown } from 'bootstrap';

export class AddPerModal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            Amount_of_views: 0,
            link:"",
            song: "",
            singer:""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.renderSong= this.renderSong.bind(this)
        this.renderArtist = this.renderArtist.bind(this)
    }

    renderSong(song, index){
        return(
          <option key={song.id}>{song.name}</option>
        )
      }

      renderArtist(artist, index){
        return(
          <option key={artist.id}>{artist.name}</option>
        )
      }


    handleSubmit() {
        return this.props.onSubmit(this.state.Amount_of_views, this.state.link, this.state.song, this.state.singer)
    }

render () {
    return(
    <Modal show={this.props.show} onHide={this.props.onAddPerClose}>
    <Modal.Header closeButton>
    <Modal.Title>New Performance</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
    <Form.Group>
            <Form.Label>Singer</Form.Label>
            <Form.Select>
                {this.props.artists.map(
                    this.renderArtist)
                }
            </Form.Select>
        </Form.Group>

        <Form.Group>
            <Form.Label>Song</Form.Label>
            <Form.Select>
                {this.props.songs.map(
                    this.renderSong)
                }
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>link</Form.Label>
            <Form.Text>
                <Form.Control 
                    type="text" placeholder="Enter link here..." 
                    value={this.state.link}
                    onChange={(event) => this.setState({link: event.target.value})}/>
            </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Amount of views</Form.Label>
            <Form.Text>
                <Form.Control 
                    type="text"  
                    value={this.state.Amount_of_views}
                    onChange={(event) => this.setState({link:0})}
                    />
            </Form.Text>
        </Form.Group>

    </Form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="outline-secondary" onClick={this.props.onAddPerClose}>
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