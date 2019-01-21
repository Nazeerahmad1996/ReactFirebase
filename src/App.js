import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebaseConfig from './Firebase';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import * as firebase from 'firebase';
import {
  MDBContainer, MDBNavbar, MDBNavbarBrand, Button, Card, CardBody, CardImage, CardTitle, CardText,
  MDBBtn, MDBRow, MDBCol, MDBIcon, Carousel, CarouselInner, CarouselItem, Container, Row, Col,
  MDBAlert, Tooltip
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor() {
    super();
    this.state = {

      FirstName: "",
      LastName: null,
      Email: null,
      OtherContact: null,
      OptionChoose: null,
      MobileNumber: null,
      Region: null,

      AreaOfIncident: null,
      Comment: null,

      CommunicationCount: '',
      ReportCount: '',
      VolunteerCount: '',
    };
  }


  componentDidMount() {
    var that = this;
    var starCountRef = firebase.database().ref('Communicate');
    starCountRef.on('value', function (snapshot) {

      var number = snapshot.numChildren();
      console.log("There are>>>>>>>>>>>>>>> " + number + " messages");
      that.setState({
        CommunicationCount: number,
      })

    });

    var starCountRef1 = firebase.database().ref('ReportIncident');
    starCountRef1.on('value', function (snapshot) {

      var number = snapshot.numChildren();
      console.log("There are>>>>>>>>>>>>>>> " + number + " messages");
      that.setState({
        ReportCount: number,
      })

    });

    var starCountRef2 = firebase.database().ref('Volunteer');
    starCountRef2.on('value', function (snapshot) {

      var number = snapshot.numChildren();
      console.log("There are>>>>>>>>>>>>>>> " + number + " messages");
      that.setState({
        VolunteerCount: number,
      })

    });


  }
  Communicate() {
    firebase.database().ref('Communicate').push({
      PhoneNumber: this.state.MobileNumber,
      Region: this.state.Region,

    }).then((data) => {
      //success callback
      alert("Successful!")
    }).catch((error) => {
      //error callback
      alert(
        'Upload Failed, Try Again!'
      )
    })
  }
  ReportIncident() {
    firebase.database().ref('ReportIncident').push({
      AreaIncident: this.state.AreaOfIncident,
      Comment: this.state.Comment,
    }).then((data) => {
      //success callback
      alert("Successful!")
    }).catch((error) => {
      //error callback
      alert(
        'Upload Failed, Try Again!'
      )
    })
  }
  handleClick() {
    firebase.database().ref('Volunteer').push({
      Name: this.state.FirstName,
      Last: this.state.LastName,
      Email: this.state.Email,
      OtherContact: this.state.OtherContact,
      OptionChoose: this.state.OptionChoose,
    }).then((data) => {
      //success callback
      alert("Successful!")
    }).catch((error) => {
      //error callback
      alert(
        'Upload Failed  ' + error
      )
    })
  }


  render() {
    const bgPink = { backgroundColor: '#e91e63' }
    const container = { height: 1300 }
    return (
      <div className="App">
        <Router>
          <header>
            <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="top">
              <MDBNavbarBrand href="/">
                <strong>Arise Zimbabwe</strong>
              </MDBNavbarBrand>
              {/* <MDBNavbarNav right>
                <p className="NavText">This bar will disappear when your website is live. This link will expire in 27 days.</p>
              </MDBNavbarNav> */}
            </MDBNavbar>
          </header>
        </Router>

        <div>

          <img className="MainImage" src={require('./assests/Images/Main.png')} />
        </div>
        <div className="MainContainer">

          <div className="FormContainer">


            <MDBRow className="FormCard">
              <MDBCol xl="4" className="form-group">
                <div>
                  <h4 className="FromHeading"><strong>VOLUNTEER</strong></h4>
                  <h4 className="FromHeading"><strong>{this.state.VolunteerCount}</strong></h4>

                  <hr className="Headingdivider" />
                  <div className="FormContent">
                    <p>To volunteer with Arise Zimbabwe, enter a few details for the campaign team to contact you.</p>
                    <p>* INDICATES REQUIRED FIELD</p>
                    <MDBRow>
                      <MDBCol xl="6">
                        <div>
                          <input onChange={(e) => { this.setState({ FirstName: e.target.value }) }}
                            type="Text" className="form-control" placeholder="First Name" />
                        </div>
                      </MDBCol>
                      <MDBCol xl="6">
                        <div>
                          <input onChange={(e) => { this.setState({ LastName: e.target.value }) }}
                            type="Text" className="form-control" placeholder="Last Name" />
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="formInput">
                      <MDBCol xl="6">
                        <div>
                          <input onChange={(e) => { this.setState({ Email: e.target.value }) }}
                            type="email" className="form-control" placeholder="e-mail" />
                        </div>
                      </MDBCol>
                      <MDBCol xl="6">
                        <div>
                          <input onChange={(e) => { this.setState({ OtherContact: e.target.value }) }}
                            type="Text" className="form-control" placeholder="Other Contacts" />
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <div className="formInput">
                      <select onChange={(e) => { this.setState({ OptionChoose: e.target.value }) }} className="browser-default custom-select">
                        <option>Choose your option</option>
                        <option value="Writing">Writing</option>
                        <option value="Legal">Legal</option>
                        <option value="Finance">Finance</option>
                        <option value="Policy">Policy</option>
                        <option value="Adminstration">Adminstration</option>
                        <option value="Information/PR">Information/PR</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Security">Security</option>
                        <option value="Constitution">Constitution</option>
                        <option value="Youth">Youth</option>
                        <option value="Gender">Gender</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Journalism">Journalism</option>
                        <option value="Research">Research</option>
                        <option value="Health">Health</option>
                        <option value="Transport">Transport</option>
                        <option value="Humanitarinan">Humanitarinan</option>
                        <option value="Housing">Housing</option>
                        <option value="Policing">Policing</option>
                        <option value="Strategy">Strategy</option>

                      </select>

                      <div className="text-center">
                        <MDBBtn outline color="info" onClick={this.handleClick.bind(this)}>
                          Sumbit <MDBIcon icon="paper-plane-o" className="ml-1" />
                        </MDBBtn>
                      </div>
                    </div>
                  </div>


                </div>
              </MDBCol>
              <MDBCol xl="4" className="form-group">
                <div>
                  <h4 className="FromHeading"><strong>COMMUNICATE</strong></h4>
                  <h4 className="FromHeading"><strong>{this.state.CommunicationCount}</strong></h4>
                  <hr className="Headingdivider" />
                  <div className="FormContent">
                    <p>Enter the Mobile numbers of your friends & relatives so they can receive critical communication via SMS Broadcast during internet black out in Zimbabwe.</p>
                    <p>* INDICATES REQUIRED FIELD</p>
                    <div className="formInput">
                      <input onChange={(e) => { this.setState({ MobileNumber: e.target.value }) }}
                        type="Text" className="form-control" placeholder="Enter Mobile Number" />
                    </div>
                    <div className="formInput">
                      <input onChange={(e) => { this.setState({ Region: e.target.value }) }}
                        type="Text" className="form-control" placeholder="REGION/E.G MANICALAND,MIDLANDS ETC " />
                    </div>
                    <div className="text-center">
                      <MDBBtn onClick={this.Communicate.bind(this)} outline color="info">
                        Sumbit <MDBIcon icon="paper-plane-o" className="ml-1" />
                      </MDBBtn>
                    </div>
                  </div>
                </div>
              </MDBCol>

              <MDBCol xl="4" className="form-group">
                <div >
                  <h4 className="FromHeading"><strong>REPORT INCIDENTS</strong></h4>
                  <h4 className="FromHeading"><strong>{this.state.ReportCount}</strong></h4>

                  <hr className="Headingdivider" />
                  <div className="FormContent">
                    <p>Enter the Mobile numbers of your friends & relatives so they can receive critical communication via SMS Broadcast during internet black out in Zimbabwe.</p>
                    <p>* INDICATES REQUIRED FIELD</p>

                    <div className="formInput">
                      <input onChange={(e) => { this.setState({ AreaOfIncident: e.target.value }) }}
                        type="email" className="form-control" placeholder="AREA OF THE INCIDENT" />
                    </div>

                    <div className="formInput">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon">
                            <i className="fa fa-pencil prefix"></i>
                          </span>
                        </div>
                        <textarea onChange={(e) => { this.setState({ Comment: e.target.value }) }}
                          className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                      </div>
                    </div>

                    <div className="text-center">
                      <MDBBtn onClick={this.ReportIncident.bind(this)} outline color="info">
                        Sumbit <MDBIcon icon="paper-plane-o" className="ml-1" />
                      </MDBBtn>
                    </div>
                  </div>
                </div>
              </MDBCol>

            </MDBRow>
          </div>
        </div>

        {/* <hr style={{ margin: 20 }}></hr> */}


        <div className="MainContainer2">
          <MDBContainer className="cards">

            <MDBRow>
              <MDBCol md="4" className="cardMargin">
                <Card narrow className="CardBody">
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle>Harare Province</CardTitle>
                    <CardText>Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>
              <MDBCol md="4" className="cardMargin">
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle>Bulawayo Province</CardTitle>
                    <CardText>Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>
              <MDBCol md="4" className="cardMargin">
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle>Masvingo Province</CardTitle>
                    <CardText>Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>

            </MDBRow>

            <MDBRow>
              <MDBCol md="4" className="cardMargin">
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle>Mashonaland Central</CardTitle>
                    <CardText>Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>
              <MDBCol md="4" className="cardMargin">
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle>Mashonaland East</CardTitle>
                    <CardText>Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>
              <MDBCol md="4" className="cardMargin">
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle>Mashonaland West</CardTitle>
                    <CardText>Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>

            </MDBRow>

            <MDBRow>
              <MDBCol md="4" className="cardMargin">
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle>Manicaland Province</CardTitle>
                    <CardText>Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>
              <MDBCol md="4" className="cardMargin">
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle>Matebeleland North</CardTitle>
                    <CardText>Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>
              <MDBCol md="4" className="cardMargin">
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle>Matebeleland South</CardTitle>
                    <CardText>Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>
              <MDBCol md="4" className="cardMargin">
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle>Midlands Province</CardTitle>
                    <CardText>Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>

              <MDBCol md="8" className="cardMargin">
                <Card narrow>
                  <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="saurabhnemade"
                    options={{ height: 420 }}
                  />
                </Card>
              </MDBCol>

            </MDBRow>

            <hr className="divider" />

            <Button href="#">Diaspsora</Button>

            <MDBRow>
              <MDBCol md="4" className="cardMargin">
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle>UK & Europe</CardTitle>
                    <CardText>Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>
              <MDBCol md="4" className="cardMargin">
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle>SA & Southern  Africa</CardTitle>
                    <CardText>Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>
              <MDBCol md="4" className="cardMargin">
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle>Australia & New Zealand</CardTitle>
                    <CardText>Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>
              <MDBCol md="4" className="cardMargin">
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle>USA & Canada</CardTitle>
                    <CardText>Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>

            </MDBRow>


          </MDBContainer>

          <Container className="imageSliderContainers">
            <Carousel activeItem={1} length={3} slide={true} showControls={true} showIndicators={true} multiItem={true} testimonial={true}>
              <CarouselInner>
                <MDBContainer>
                  <Row>
                    <CarouselItem itemId="1">
                      <MDBRow>
                        <MDBCol md="6" className="cardMargin">
                          <Card className="imageSliderContainer">
                            <CardImage
                              top
                              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg"
                              overlay="white-slight"
                              hover
                              waves
                              alt="Card image cap"
                            />
                            <CardBody>
                              <CardTitle>Card Title</CardTitle>
                              <hr />
                              <CardText>
                                Some quick example text to build on the card title and make
                                up the bulk of the card&apos;s content.
              </CardText>
                              <p className="featuredText">FEATURED</p>
                            </CardBody>
                          </Card>
                        </MDBCol>
                        <MDBCol md="6" className="cardMargin">
                          <Card>
                            <CardImage
                              top
                              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg"
                              overlay="white-slight"
                              hover
                              waves
                              alt="Card image cap"
                            />
                            <CardBody>

                              <CardTitle>Card Title</CardTitle>
                              <hr />
                              <CardText>
                                Some quick example text to build on the card title and make
                                up the bulk of the card&apos;s content.
              </CardText>
                              <p className="featuredText">FEATURED</p>

                            </CardBody>
                          </Card>
                        </MDBCol>

                      </MDBRow>
                    </CarouselItem>
                    <CarouselItem itemId="2">
                      <MDBRow>
                        <MDBCol md="4" className="cardMargin">
                          <Card className="imageSliderContainer">
                            <CardImage
                              top
                              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg"
                              overlay="white-slight"
                              hover
                              waves
                              alt="Card image cap"
                            />
                            <CardBody>

                              <CardTitle>Card Title</CardTitle>
                              <hr />
                              <CardText>
                                Some quick example text to build on the card title and make
                                up the bulk of the card&apos;s content.
              </CardText>

                            </CardBody>
                          </Card>
                        </MDBCol>
                        <MDBCol md="4" className="cardMargin">
                          <Card>
                            <CardImage
                              top
                              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg"
                              overlay="white-slight"
                              hover
                              waves
                              alt="Card image cap"
                            />
                            <CardBody>

                              <CardTitle>Card Title</CardTitle>
                              <hr />
                              <CardText>
                                Some quick example text to build on the card title and make
                                up the bulk of the card&apos;s content.
              </CardText>

                            </CardBody>
                          </Card>
                        </MDBCol>

                        <MDBCol md="4" className="cardMargin">
                          <Card>
                            <CardImage
                              top
                              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg"
                              overlay="white-slight"
                              hover
                              waves
                              alt="Card image cap"
                            />
                            <CardBody>

                              <CardTitle>Card Title</CardTitle>
                              <hr />
                              <CardText>
                                Some quick example text to build on the card title and make
                                up the bulk of the card&apos;s content.
              </CardText>

                            </CardBody>
                          </Card>
                        </MDBCol>

                      </MDBRow>
                    </CarouselItem>
                    <CarouselItem itemId="3">
                      <MDBRow>
                        <MDBCol md="4" className="cardMargin">
                          <Card className="imageSliderContainer">
                            <CardImage
                              top
                              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg"
                              overlay="white-slight"
                              hover
                              waves
                              alt="Card image cap"
                            />
                            <CardBody>

                              <CardTitle>Card Title</CardTitle>
                              <hr />
                              <CardText>
                                Some quick example text to build on the card title and make
                                up the bulk of the card&apos;s content.
              </CardText>

                            </CardBody>
                          </Card>
                        </MDBCol>
                        <MDBCol md="4" className="cardMargin">
                          <Card>
                            <CardImage
                              top
                              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg"
                              overlay="white-slight"
                              hover
                              waves
                              alt="Card image cap"
                            />
                            <CardBody>

                              <CardTitle>Card Title</CardTitle>
                              <hr />
                              <CardText>
                                Some quick example text to build on the card title and make
                                up the bulk of the card&apos;s content.
              </CardText>

                            </CardBody>
                          </Card>
                        </MDBCol>

                        <MDBCol md="4" className="cardMargin">
                          <Card>
                            <CardImage
                              top
                              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg"
                              overlay="white-slight"
                              hover
                              waves
                              alt="Card image cap"
                            />
                            <CardBody>

                              <CardTitle>Card Title</CardTitle>

                              <hr />
                              <CardText>
                                Some quick example text to build on the card title and make
                                up the bulk of the card&apos;s content.
              </CardText>

                            </CardBody>
                          </Card>
                        </MDBCol>

                      </MDBRow>
                    </CarouselItem>
                  </Row>
                </MDBContainer>
              </CarouselInner>
            </Carousel>
          </Container>


          <div className="VideoSliderContainers">
            <Container>
              <Carousel activeItem={1} interval={200000} length={3} slide={true} showControls={true} showIndicators={true} multiItem={true} testimonial={true}>
                <CarouselInner>
                  <MDBContainer>
                    <Row>
                      <CarouselItem itemId="1">
                        <MDBRow>
                          <MDBCol md="6" className="cardMargin">
                            <Card className="imageSliderContainer">
                              <video className="video-fluid" autoPlay loop>
                                <source src="https://mdbootstrap.com/img/video/Agua-natural.mp4" type="video/mp4" />
                              </video>
                              <CardBody>

                                <CardTitle>Card Title</CardTitle>
                                <hr />
                                <CardText>
                                  Some quick example text to build on the card title and make
                                  up the bulk of the card&apos;s content.
              </CardText>

                              </CardBody>
                            </Card>
                          </MDBCol>
                          <MDBCol md="6" className="cardMargin">
                            <Card className="imageSliderContainer">
                              <video className="video-fluid" autoPlay loop>
                                <source src="https://mdbootstrap.com/img/video/Agua-natural.mp4" type="video/mp4" />
                              </video>
                              <CardBody>

                                <CardTitle>Card Title</CardTitle>
                                <hr />
                                <CardText>
                                  Some quick example text to build on the card title and make
                                  up the bulk of the card&apos;s content.
              </CardText>

                              </CardBody>
                            </Card>
                          </MDBCol>

                        </MDBRow>
                      </CarouselItem>

                      <CarouselItem itemId="2">
                        <MDBRow>
                          <MDBCol md="6" className="cardMargin">
                            <Card className="imageSliderContainer">
                              <video className="video-fluid" autoPlay loop>
                                <source src="https://mdbootstrap.com/img/video/Agua-natural.mp4" type="video/mp4" />
                              </video>
                              <CardBody>

                                <CardTitle>Card Title</CardTitle>
                                <hr />
                                <CardText>
                                  Some quick example text to build on the card title and make
                                  up the bulk of the card&apos;s content.
              </CardText>

                              </CardBody>
                            </Card>
                          </MDBCol>
                          <MDBCol md="6" className="cardMargin">
                            <Card className="imageSliderContainer">
                              <video className="video-fluid" autoPlay loop>
                                <source src="https://mdbootstrap.com/img/video/Agua-natural.mp4" type="video/mp4" />
                              </video>
                              <CardBody>

                                <CardTitle>Card Title</CardTitle>
                                <hr />
                                <CardText>
                                  Some quick example text to build on the card title and make
                                  up the bulk of the card&apos;s content.
              </CardText>

                              </CardBody>
                            </Card>
                          </MDBCol>

                        </MDBRow>
                      </CarouselItem>

                      <CarouselItem itemId="3">
                        <MDBRow>
                          <MDBCol md="6" className="cardMargin">
                            <Card className="imageSliderContainer">
                              <video className="video-fluid" autoPlay loop>
                                <source src="https://mdbootstrap.com/img/video/Agua-natural.mp4" type="video/mp4" />
                              </video>
                              <CardBody>

                                <CardTitle>Card Title</CardTitle>
                                <hr />
                                <CardText>
                                  Some quick example text to build on the card title and make
                                  up the bulk of the card&apos;s content.
              </CardText>

                              </CardBody>
                            </Card>
                          </MDBCol>
                          <MDBCol md="6" className="cardMargin">
                            <Card className="imageSliderContainer">
                              <video className="video-fluid" autoPlay loop>
                                <source src="https://mdbootstrap.com/img/video/Agua-natural.mp4" type="video/mp4" />
                              </video>
                              <CardBody>

                                <CardTitle>Card Title</CardTitle>
                                <hr />
                                <CardText>
                                  Some quick example text to build on the card title and make
                                  up the bulk of the card&apos;s content.
              </CardText>

                              </CardBody>
                            </Card>
                          </MDBCol>

                        </MDBRow>
                      </CarouselItem>


                    </Row>
                  </MDBContainer>
                </CarouselInner>
              </Carousel>
            </Container>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
