import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export class AddLoginModal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
        }

      
    }

    


render () {
    return(
    <Modal show={this.props.show} onHide={this.props.onLoginClose}>
    <Modal.Header closeButton>
    <Modal.Title>Login</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
        <Form.Group className="mb-3">
            <Form.Label>UserName</Form.Label>
            <Form.Text>
                <Form.Control 
                    type="text" placeholder="Enter user name here..." 
                    value={this.state.username}
                    onChange={(event) => this.setState({username: event.target.value})}/>
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Text>
                <Form.Control 
                    type="text" placeholder="Enter password here..." 
                    value={this.state.password}
                    onChange={(event) => this.setState({password: event.target.value})}/>
            </Form.Text>
        </Form.Group>

    </Form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick={this.props.onLoginClose}>
        Cancel
    </Button>
    <Button variant="primary" 
        onClick={()=> this.props.onSubmit(this.state.username, this.state.password)}>
        Save Changes
    </Button>
    </Modal.Footer>
    </Modal> 
    )

}
}