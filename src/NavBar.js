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

export class MyNavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLoginModal: false,
            selectedKey: "performance",
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
      
       &nbsp;&nbsp;&nbsp;<Nav className="me-auto" activeKey="performance" onSelect={this.handleSelected} >
      <Nav.Link eventKey="performance"> <BiMusic/> Home</Nav.Link>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Nav.Link eventKey="artist"> <FaMicrophone style={{fontSize:'110%'}} />Artist</Nav.Link>
        &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Nav.Link eventKey= "song"> <GiMusicalScore style={{fontSize:'120%'}} /> Songs</Nav.Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Nav.Link eventKey= "login" onClick= {() => this.setState({showLoginModal: true})} > <MdLogin/> LogIn</Nav.Link>
        </Nav>
        
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