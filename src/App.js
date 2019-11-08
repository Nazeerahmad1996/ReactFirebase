import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {
  MDBContainer, MDBNavbar, MDBNavbarBrand, Button, Card, CardBody, CardImage, CardTitle, CardText,
  MDBBtn, MDBRow, MDBCol, MDBIcon, Carousel, CarouselInner, CarouselItem, Container, Row, Col,
  CardFooter, Tooltip
} from 'mdbreact';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
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
                  <hr className="Headingdivider" />
                  <div className="FormContent">
                    <p>To volunteer with Arise Zimbabwe, enter a few details for the campaign team to contact you.</p>
                    <p>* INDICATES REQUIRED FIELD</p>
                    <MDBRow>
                      <MDBCol xl="6">
                        <div>
                          <input type="Text" className="form-control" placeholder="First Name" />
                        </div>
                      </MDBCol>
                      <MDBCol xl="6">
                        <div>
                          <input type="Text" className="form-control" placeholder="Last Name" />
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="formInput">
                      <MDBCol xl="6">
                        <div>
                          <input type="email" className="form-control" placeholder="e-mail" />
                        </div>
                      </MDBCol>
                      <MDBCol xl="6">
                        <div>
                          <input type="Text" className="form-control" placeholder="Other Contacts" />
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <div className="formInput">
                      <select className="browser-default custom-select">
                        <option>Choose your option</option>
                        <option value="1">Writing</option>
                        <option value="2">Legal</option>
                        <option value="3">Finance</option>
                        <option value="4">Policy</option>
                        <option value="5">Adminstration</option>
                        <option value="6">Information/PR</option>
                        <option value="7">Social Media</option>
                        <option value="8">Security</option>
                        <option value="9">Constitution</option>
                        <option value="10">Youth</option>
                        <option value="11">Gender</option>
                        <option value="12">Entertainment</option>
                        <option value="13">Journalism</option>
                        <option value="14">Research</option>
                        <option value="15">Health</option>
                        <option value="16">Transport</option>
                        <option value="17">Humanitarinan</option>
                        <option value="18">Housing</option>
                        <option value="19">Policing</option>
                        <option value="20E">Strategy</option>

                      </select>

                      <div className="text-center">
                        <MDBBtn outline color="info">
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
                  <hr className="Headingdivider" />
                  <div className="FormContent">
                    <p>Enter the Mobile numbers of your friends & relatives so they can receive critical communication via SMS Broadcast during internet black out in Zimbabwe.</p>
                    <p>* INDICATES REQUIRED FIELD</p>
                    <div className="formInput">
                      <input type="Text" className="form-control" placeholder="Enter Mobile Number" />
                    </div>
                    <div className="formInput">
                      <input type="Text" className="form-control" placeholder="REGION/E.G MANICALAND,MIDLANDS ETC " />
                    </div>
                    <div className="text-center">
                      <MDBBtn outline color="info">
                        Sumbit <MDBIcon icon="paper-plane-o" className="ml-1" />
                      </MDBBtn>
                    </div>
                  </div>
                </div>
              </MDBCol>

              <MDBCol xl="4" className="form-group">
                <div >
                  <h4 className="FromHeading"><strong>REPORT INCIDENTS</strong></h4>
                  <hr className="Headingdivider" />
                  <div className="FormContent">
                    <p>Enter the Mobile numbers of your friends & relatives so they can receive critical communication via SMS Broadcast during internet black out in Zimbabwe.</p>
                    <p>* INDICATES REQUIRED FIELD</p>

                    <div className="formInput">
                      <input type="email" className="form-control" placeholder="AREA OF THE INCIDENT" />
                    </div>

                    <div className="formInput">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon">
                            <i className="fa fa-pencil prefix"></i>
                          </span>
                        </div>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                      </div>
                    </div>

                    <div className="text-center">
                      <MDBBtn outline color="info">
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
                    options={{ height: 440 }}
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
