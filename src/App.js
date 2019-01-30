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
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import Messages from './Forms/Messages';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor() {
    super();
    this.state = {

      FirstName: "",
      LastName: "",
      Email: "",
      OtherContact: "",
      OptionChoose: "",
      MobileNumber: "",
      Region: "",

      AreaOfIncident: "",
      Comment: "",

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
    if (this.state.MobileNumber !== "" && this.state.Region !== "") {
      firebase.database().ref('Communicate').push({
        PhoneNumber: this.state.MobileNumber,
        Region: this.state.Region,

      }).then((data) => {
        this.setState({
          MobileNumber: null,
          Region: null
        })
        //success callback
        alert("Successful!")
      }).catch((error) => {
        //error callback
        alert(
          'Upload Failed, Try Again!'
        )
      })
    }
    else {
      alert(
        'Please Fill Form Proper!'
      )
    }
  }
  ReportIncident() {
    if (this.state.AreaOfIncident !== "" && this.state.Comment !== "") {
      firebase.database().ref('ReportIncident').push({
        AreaIncident: this.state.AreaOfIncident,
        Comment: this.state.Comment,
      }).then((data) => {
        //success callback
        alert("Successful!");
      }).catch((error) => {
        //error callback
        alert(
          'Upload Failed, Try Again!'
        )
      })
    }
    else {
      alert(
        'Please Fill Form Proper!'
      )
    }
  }
  handleClick() {
    if (this.state.FirstName !== "" && this.state.LastName !== "" && this.state.Email !== ""
      && this.state.OtherContact !== "" && this.state.OptionChoose !== "") {
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
    else {
      alert(
        'Please Fill Form Proper!'
      )
    }
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
                <h5 className="Logo">Arise Zimbabwe</h5>
              </MDBNavbarBrand>
              {/* <MDBNavbarNav right>
                <p className="NavText">This bar will disappear when your website is live. This link will expire in 27 days.</p>
              </MDBNavbarNav> */}
            </MDBNavbar>
          </header>
        </Router>



        {/* <div className="Form1Container">

          <Container className="Form1Container2">
            <p className="Heading2"><strong>VOLUNTEER</strong></p>
            <p style={{ color: '#fff', textAlign: "center" }} className="FromLeftSideHeading">This is the dummy text of the form</p>
            <Card className="Form2Card">
              <MDBRow>
                <MDBCol xl="5">
                  <img className="LeftImage2" src={require('./assests/Images/formimage.jpg')} />
                </MDBCol>
                <MDBCol xl="7">

                  <div className="Form1">
                    <h4 className="FromHeading"><strong>VOLUNTEER</strong></h4>
                    <h4 className="FromHeading"><strong>{this.state.VolunteerCount}</strong></h4>
                    <p className="formBottomText">To volunteer with Arise Zimbabwe, enter a few details for the campaign team to contact you.</p>

                    <div>


                      <div className="InputDiv">
                        <input value={this.state.FirstName} onChange={(e) => { this.setState({ FirstName: e.target.value }) }}
                          type="Text" className="form-control" placeholder="First Name" />
                      </div>

                      <div className="InputDiv">
                        <input onChange={(e) => { this.setState({ LastName: e.target.value }) }}
                          type="Text" className="form-control" placeholder="Last Name" />
                      </div>


                      <div className="InputDiv">
                        <input onChange={(e) => { this.setState({ Email: e.target.value }) }}
                          type="email" className="form-control" placeholder="E-mail" />
                      </div>

                      <div className="InputDiv">
                        <input onChange={(e) => { this.setState({ OtherContact: e.target.value }) }}
                          type="Text" className="form-control" placeholder="Other Contacts" />
                      </div>

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
                          <MDBBtn onClick={this.handleClick.bind(this)} color="danger" size="sm">Submit</MDBBtn>


                        </div>
                      </div>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
            </Card>
          </Container>
        </div>

 */}
        {/* <div className="Form1Container">
          <Container>
            <p className="Heading"><strong>Volunteer</strong></p>
            <MDBRow>
              <MDBCol xl="6">
                <div className="Form1TextContainer">
                  <p style={{ color: '#fff' }} className="FromLeftSideHeading">Fill Form for volunteer and help people</p>
                  <p style={{ color: '#fff' }} className="TextForm">To volunteer with Arise Zimbabwe, enter a few details for the campaign team to contact you.</p>
                  <p style={{ color: '#fff' }} className="TextForm">* INDICATES REQUIRED FIELD</p>
                </div>
              </MDBCol>
              <MDBCol xl="4">

                <Card style={{ height: 450 }}>
                  <div className="Form1">
                    <h4 className="FromHeading"><strong>VOLUNTEER</strong></h4>
                    <h4 className="FromHeading"><strong>{this.state.VolunteerCount}</strong></h4>
                    <p className="formBottomText">To volunteer with Arise Zimbabwe, enter a few details for the campaign team to contact you.</p>

                    <div>


                      <div className="InputDiv">
                        <input value={this.state.FirstName} onChange={(e) => { this.setState({ FirstName: e.target.value }) }}
                          type="Text" className="form-control" placeholder="First Name" />
                      </div>

                      <div className="InputDiv">
                        <input onChange={(e) => { this.setState({ LastName: e.target.value }) }}
                          type="Text" className="form-control" placeholder="Last Name" />
                      </div>


                      <div className="InputDiv">
                        <input onChange={(e) => { this.setState({ Email: e.target.value }) }}
                          type="email" className="form-control" placeholder="E-mail" />
                      </div>

                      <div className="InputDiv">
                        <input onChange={(e) => { this.setState({ OtherContact: e.target.value }) }}
                          type="Text" className="form-control" placeholder="Other Contacts" />
                      </div>

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
                          <MDBBtn onClick={this.handleClick.bind(this)} color="danger" size="sm">Submit</MDBBtn>


                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

              </MDBCol>
            </MDBRow>
          </Container>
        </div>*/}


        <div>
          <img className="MainImage" src={require('./assests//Images//background6.jpg')} />
        </div>
        {/* <div className="Form2Container">

          <Container>
            <p className="Heading2"><strong>Add Contact</strong></p>
            <p style={{ color: '#fff', textAlign: "center" }} className="FromLeftSideHeading">This is the dummy text of the form</p>
            <Card className="Form2Card">
              <MDBRow>
                <MDBCol xl="5">
                  <img className="LeftImage" src={require('./assests/Images/formimage.jpg')} />
                </MDBCol>
                <MDBCol xl="7">

                  <div>
                    <h4 className="FromHeading"><strong>ADD CONTACT</strong></h4>
                    <h4 className="FromHeading"><strong>{this.state.CommunicationCount}</strong></h4>
                    <hr></hr>
                    <h4 className="SecondformText"><strong>This will be the title of the form</strong></h4>
                    <p className="SecondFont">To volunteer with Arise Zimbabwe, enter a few details for the campaign team to contact you.</p>

                    <div>

                      <div className="formInput">
                        <input value={this.state.MobileNumber} onChange={(e) => { this.setState({ MobileNumber: e.target.value }) }}
                          type="Text" className="form-control" placeholder="Enter Mobile Number" />
                      </div>
                      <div className="formInput">
                        <input value={this.state.Region} onChange={(e) => { this.setState({ Region: e.target.value }) }}
                          type="Text" className="form-control" placeholder="Region/E.G MANICALAND,MIDLANDS ETC " />
                      </div>
                      <div className="text-center">
                        <MDBBtn onClick={this.Communicate.bind(this)} color="danger" size="sm">Submit</MDBBtn>

                      </div>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
            </Card>
          </Container>
        </div> */}

        <div className="Form1Container">


          <div className="Form1Container2">
            <MDBRow>
              <MDBCol lg="3">


                <Card style={{ height: 470, marginTop: 5 }}>
                  <div className="Form1">
                    <h4 className="FromHeading"><strong>VOLUNTEER</strong></h4>
                    <h4 className="FromHeading"><strong>{this.state.VolunteerCount}</strong></h4>
                    <p className="formBottomText">To volunteer with Arise Zimbabwe, enter a few details for the campaign team to contact you.</p>

                    <div>


                      <div className="InputDiv">
                        <input value={this.state.FirstName} onChange={(e) => { this.setState({ FirstName: e.target.value }) }}
                          type="Text" className="form-control" placeholder="First Name" />
                      </div>

                      <div className="InputDiv">
                        <input onChange={(e) => { this.setState({ LastName: e.target.value }) }}
                          type="Text" className="form-control" placeholder="Last Name" />
                      </div>


                      <div className="InputDiv">
                        <input onChange={(e) => { this.setState({ Email: e.target.value }) }}
                          type="email" className="form-control" placeholder="E-mail" />
                      </div>

                      <div className="InputDiv">
                        <input onChange={(e) => { this.setState({ OtherContact: e.target.value }) }}
                          type="Text" className="form-control" placeholder="Other Contacts" />
                      </div>

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
                          <MDBBtn onClick={this.handleClick.bind(this)} color="danger" size="sm">Submit</MDBBtn>


                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </MDBCol>
              <MDBCol lg="3">

                <Card style={{ height: 470, marginTop: 5 }}>
                  <div className="Form1">
                    <h4 className="FromHeading"><strong>ADD CONTACT</strong></h4>
                    <h4 className="FromHeading"><strong>{this.state.CommunicationCount}</strong></h4>
                    <p className="formBottomText">To volunteer with Arise Zimbabwe, enter a few details for the campaign team to contact you.</p>

                    <div>

                      <div className="formInput">
                        <input value={this.state.MobileNumber} onChange={(e) => { this.setState({ MobileNumber: e.target.value }) }}
                          type="Text" className="form-control" placeholder="Enter Mobile Number" />
                      </div>
                      <div className="formInput">
                        <input value={this.state.Region} onChange={(e) => { this.setState({ Region: e.target.value }) }}
                          type="Text" className="form-control" placeholder="Region/E.G MANICALAND,MIDLANDS ETC " />
                      </div>
                      <div className="text-center">
                        <MDBBtn onClick={this.Communicate.bind(this)} color="danger" size="sm">Submit</MDBBtn>

                      </div>
                    </div>
                  </div>
                </Card>
              </MDBCol>
              <MDBCol lg="3">
                <Card style={{ height: 470, marginTop: 5 }}>

                  <div className="Form1">
                    <h4 className="FromHeading"><strong>REPORT INCIDENTS</strong></h4>
                    <h4 className="FromHeading"><strong>{this.state.ReportCount}</strong></h4>
                    <p className="formBottomText">Enter the Mobile numbers of your friends & relatives so they can receive critical communication via SMS Broadcast during internet black out in Zimbabwe.</p>

                    <div>
                      <div className="formInput">
                        <input onChange={(e) => { this.setState({ AreaOfIncident: e.target.value }) }}
                          type="email" className="form-control" placeholder="Area Of The Incident" />
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
                        <MDBBtn onClick={this.ReportIncident.bind(this)} color="danger" size="sm">Submit</MDBBtn>
                      </div>
                    </div>
                  </div>
                </Card>
              </MDBCol>
            </MDBRow>
        </div>
      </div>

        {/* 
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
                          <input value={this.state.FirstName} onChange={(e) => { this.setState({ FirstName: e.target.value }) }}
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
                  <h4 className="FromHeading"><strong>Add contact</strong></h4>
                  <h4 className="FromHeading"><strong>{this.state.CommunicationCount}</strong></h4>
                  <hr className="Headingdivider" />
                  <div className="FormContent">
                    <p>Enter the Mobile numbers of your friends & relatives so they can receive critical communication via SMS Broadcast during internet black out in Zimbabwe.</p>
                    <p>* INDICATES REQUIRED FIELD</p>
                    <div className="formInput">
                      <input value={this.state.MobileNumber} onChange={(e) => { this.setState({ MobileNumber: e.target.value }) }}
                        type="Text" className="form-control" placeholder="Enter Mobile Number" />
                    </div>
                    <div className="formInput">
                      <input value={this.state.Region} onChange={(e) => { this.setState({ Region: e.target.value }) }}
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
          </div> */}

    {/* <hr style={{ margin: 20 }}></hr> */ }


    <div className="MainContainer2">
      <MDBContainer className="cards">

        <MDBRow>
          <MDBCol md="3" className="cardMargin">
            <Card narrow className="CardBody">
              <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
              <CardBody cascade>
                <CardTitle className="CardTitle">Harare Province</CardTitle>
                <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                <MDBBtn color="amber">Join Now</MDBBtn>
              </CardBody>
            </Card>
          </MDBCol>
          <MDBCol md="3" className="cardMargin">
            <Card narrow>
              <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
              <CardBody cascade>
                <CardTitle className="CardTitle">Bulawayo Province</CardTitle>
                <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                <MDBBtn color="amber">Join Now</MDBBtn>
              </CardBody>
            </Card>
          </MDBCol>
          <MDBCol md="3" className="cardMargin">
            <Card narrow>
              <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
              <CardBody cascade>
                <CardTitle className="CardTitle">Masvingo Province</CardTitle>
                <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                <MDBBtn color="amber">Join Now</MDBBtn>
              </CardBody>
            </Card>
          </MDBCol>

          <MDBCol md="3" className="cardMargin">
            <Card narrow>
              <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
              <CardBody cascade>
                <CardTitle className="CardTitle">Mashonaland Central</CardTitle>
                <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                <MDBBtn color="amber">Join Now</MDBBtn>
              </CardBody>
            </Card>
          </MDBCol>
          <MDBCol md="3" className="cardMargin">
            <Card narrow>
              <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
              <CardBody cascade>
                <CardTitle className="CardTitle">Mashonaland East</CardTitle>
                <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                <MDBBtn color="amber">Join Now</MDBBtn>
              </CardBody>
            </Card>
          </MDBCol>

          <MDBCol md="3" className="cardMargin">
            <Card narrow>
              <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
              <CardBody cascade>
                <CardTitle className="CardTitle">Mashonaland West</CardTitle>
                <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                <MDBBtn color="amber">Join Now</MDBBtn>
              </CardBody>
            </Card>
          </MDBCol>

          <MDBCol md="3" className="cardMargin">
            <Card narrow>
              <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
              <CardBody cascade>
                <CardTitle className="CardTitle">Manicaland Province</CardTitle>
                <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                <MDBBtn color="amber">Join Now</MDBBtn>
              </CardBody>
            </Card>
          </MDBCol>
          <MDBCol md="3" className="cardMargin">
            <Card narrow>
              <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
              <CardBody cascade>
                <CardTitle className="CardTitle">Matebeleland North</CardTitle>
                <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                <MDBBtn color="amber">Join Now</MDBBtn>
              </CardBody>
            </Card>
          </MDBCol>
          <MDBCol md="3" className="cardMargin">
            <Card narrow>
              <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
              <CardBody cascade>
                <CardTitle className="CardTitle">Matebeleland South</CardTitle>
                <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                <MDBBtn color="amber">Join Now</MDBBtn>
              </CardBody>
            </Card>
          </MDBCol>
          <MDBCol md="3" className="cardMargin">
            <Card narrow>
              <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
              <CardBody cascade>
                <CardTitle className="CardTitle">Midlands Province</CardTitle>
                <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                <MDBBtn color="amber">Join Now</MDBBtn>
              </CardBody>
            </Card>
          </MDBCol>

          <MDBCol md="6" className="cardMargin">
            <Card narrow>
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="saurabhnemade"
                options={{ height: 400 }}
              />
            </Card>
          </MDBCol>

        </MDBRow>

        <hr className="divider" />

        <Button href="#">Diaspsora</Button>

        <MDBRow>
          <MDBCol md="3" className="cardMargin">
            <Card narrow>
              <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
              <CardBody cascade>
                <CardTitle className="CardTitle">UK & Europe</CardTitle>
                <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                <MDBBtn color="amber">Join Now</MDBBtn>
              </CardBody>
            </Card>
          </MDBCol>
          <MDBCol md="3" className="cardMargin">
            <Card narrow>
              <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
              <CardBody cascade>
                <CardTitle className="CardTitle">SA & Southern  Africa</CardTitle>
                <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                <MDBBtn color="amber">Join Now</MDBBtn>
              </CardBody>
            </Card>
          </MDBCol>
          <MDBCol md="3" className="cardMargin">
            <Card narrow>
              <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
              <CardBody cascade>
                <CardTitle className="CardTitle">Australia & New Zealand</CardTitle>
                <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                <MDBBtn color="amber">Join Now</MDBBtn>
              </CardBody>
            </Card>
          </MDBCol>
          <MDBCol md="3" className="cardMargin">
            <Card narrow>
              <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
              <CardBody cascade>
                <CardTitle className="CardTitle">USA & Canada</CardTitle>
                <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
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
      </div >
    );
  }
}

export default App;
