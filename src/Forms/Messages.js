import React, { Component } from 'react';
import '../App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {
  MDBContainer, MDBNavbar, MDBNavbarBrand, Button, Card, CardBody, CardImage, CardTitle, CardText,
  MDBBtn, MDBRow, MDBCol, MDBIcon, Carousel, CarouselInner, CarouselItem, Container, Row, Col,
  MDBAlert, Tooltip
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';


class Messages extends Component {
    constructor() {
        super();
        this.state = {
    
          
        };
      }

      render() {
        
        return (
            <div>
                <p>Messages</p>
            </div>
        );
      }
}

export default Messages;
