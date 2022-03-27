import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { BiMusic } from 'react-icons/bi';
import { Artists } from './Artists';
import { Songs } from './Songs';
import {Performances} from './Performances'
import { FaMicrophone } from "react-icons/fa";
import { GiMusicalScore } from "react-icons/gi";
import { MdLogin } from "react-icons/md";
import { AddLoginModal } from './Login';
import { Container, NavbarBrand } from 'react-bootstrap';

export class MyNavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLoginModal: false,
            screen: "performance",
            first_name: "",
            last_name: "",

        }

        this.renderMainView= this.renderMainView.bind(this)
        this.handleSelected = this.handleSelected.bind(this)
    }

    handleSelected(selectedKey) {
        console.log(`selected ${selectedKey}`)
        this.setState({selectedKey: selectedKey})
    }

    

    renderMainView() {
        switch (this.state.selectedKey) {
            case "artist":
                return <Artists />
             case "song":
                return <Songs/>
            case "login":
                return <AddLoginModal   />
            case "performance":
                  return <Performances/>
            default:
                return null
        }
    }
    
    render() {
      return(
    
        <div>
            
      <Navbar bg="dark" variant="dark">
      <Container>
       
      <NavbarBrand eventKey="performance"> <BiMusic/> Home</NavbarBrand>
          
        <Nav.Link eventKey="artist"> <FaMicrophone style={{fontSize:'110%'}} />Artist</Nav.Link>
      
        <Nav.Link eventKey= "song"> <GiMusicalScore style={{fontSize:'120%'}} /> Songs</Nav.Link>
 
        <Nav.Link eventKey= "login" onClick= {() => this.setState({showLoginModal: true})} > <MdLogin/> LogIn</Nav.Link>
        <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="#login">{this.state.first_name + ' ' + this.state.last_name}</a>
                </Navbar.Text>
              </Navbar.Collapse>
        
        </Container>
     </Navbar>

     {this.renderMainView()} 
        
     <AddLoginModal 
                    show={this.state.showLoginModal}
                    onLoginClose={()=> this.setState({showLoginModal: false})}
                    />   



     </div> 
      )
      }
    }