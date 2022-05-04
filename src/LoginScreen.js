import React from 'react';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {useNavigate, useLocation,} from "react-router-dom";

export class LoginScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            errors:""
        }

        this.handleSubmit = this.handleSubmit.bind(this)}
      
    handleSubmit(event) {
        event.preventDefault()
        axios.post('http://127.0.0.1:8000/api/token/', {
            username: this.state.username,
            password: this.state.password
        })
        .then(result => {
            window.localStorage.setItem("token", result.data.token)
            console.log(result)
            this.props.navigate('/')
        })
        .catch(error => window.alert("Please try again"))
        
    }

    render() {
        return(
            <div>
            <br></br>
            <br></br>
            
            <div  style={{ width:'800px', margin:'0 auto', border:'solid' ,borderColor:"DarkGrey",borderRadius:'25px'}}>
            <h1 style={{textAlign:'center'}}>Welcome!</h1>
        <Form onSubmit={this.handleSubmit} style={{width: '50%', margin: "auto", marginTop: '5%'}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <h5>Username</h5>
                <Form.Control type="text" placeholder="Enter username" 
                value={this.state.username}
                onChange={(event) => this.setState({username: event.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <h5>Password</h5>
                <Form.Control type="password" placeholder="Password" 
                value={this.state.password}
                onChange={(event) => this.setState({password: event.target.value})}/>
            </Form.Group>
            
            <Button variant="outline-secondary"  className="m-3" type="submit">
                Login
            </Button>
            <Button variant="outline-secondary"  className="m-3"  >
                Add new account
            </Button>
        </Form>
        </div>
        </div>
        )
    }
}

export const WrappedLoginScreen = props => {

    const location = useLocation()
    const navigate = useNavigate()
  
    return <LoginScreen navigate={navigate} location={location} {...props} />
  }