import React from 'react';
import axios from 'axios';
import './App.css';
import Nav from 'react-bootstrap/Nav'
import { Navbar , Container, NavbarBrand } from 'react-bootstrap';
import { BiMusic } from 'react-icons/bi';
import { FaMicrophone } from "react-icons/fa";
import { GiMusicalScore } from "react-icons/gi";
import Button from 'react-bootstrap/Button'
import { CgProfile } from "react-icons/cg";

import Modal from 'react-bootstrap/Modal';

export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: "",
            last_name: "",
            showProfile: false

        }
    }

    componentDidMount() {
        const token = window.localStorage.getItem('token')
        if (token) {
          axios.get('http://127.0.0.1:8000/api/users/current', {headers: {Authorization: 'Token ' + token}})
          .then(response => {
            if (response.status === 200) {
                console.log("got response for user " + response.data.first_name)
              this.setState({first_name: response.data.first_name, last_name: response.data.last_name})
            } else if (response.status === 401) {
              console.log('401')
            }
          })
          .catch(error => {
            if (error.response.status === 401) {
              console.log("Need to go to login")
              this.setState({screen: "login"})
            }
          })
        } else {
          console.log("Need to go to login")
          window.location.href = "/login"
        }
      }
        render() {
            return(
                
                <div>
                <Navbar bg="dark" variant="dark">
                
                 
                <NavbarBrand href = "/"> <BiMusic/> Home</NavbarBrand>
                    
                  <Nav.Link style={{color:'white'}}  href = "artists"> <FaMicrophone style={{fontSize:'110%'}} />Artist</Nav.Link>
                
                  <Nav.Link style={{color:'white'}} href = "songs"> <GiMusicalScore style={{fontSize:'120%'}} /> Songs</Nav.Link>
                  <Navbar.Collapse className="justify-content-end">
                          <Nav.Link style={{color:'white'}} onClick={() => this.setState({showProfile: true})}>
                            Hello  {this.state.first_name + ' ' + this.state.last_name}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </Nav.Link>
                        </Navbar.Collapse>
                  
                  
               </Navbar>
               <Modal show={this.state.showProfile} onHide={() => this.setState({showProfile: false})}>


               
                  <Modal.Header closeButton>
                  <Modal.Title >My Profile </Modal.Title>
                  </Modal.Header>

                    <Modal.Body >
                      <Container>
                      <img src="profile1.jpg" width="110" height="120" className="center" ></img>
                    
                      <p style={{textAlign:'center'}} >username:</p>
                      <p style={{textAlign:'center'}}>first name: </p>
                      <p style={{textAlign:'center'}}>Last name: </p>
                      <p style={{textAlign:'center'}}>email:</p>
                      </Container>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary">Sign UP</Button>
                    </Modal.Footer>
                  
                  </Modal>
               </div>
            )
        }
    }