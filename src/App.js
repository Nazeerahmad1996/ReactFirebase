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
  MDBAlert, Tooltip, MDBCollapse
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

      collapseID: "",
    };
  }

  toggleCollapse = collapseID => () => {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
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
        {/* <div>
          <img style={{width:'100%',height:'auto'}} src={require('./assests//Images//arise2.jpg')} />
        </div> */}
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


                <Card style={{ height: 435, marginTop: 5 }}>
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

                <Card style={{ height: 435, marginTop: 5 }}>
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

                <Card style={{ height: 375, marginTop: 5 }}>
                  <div className="Form1">
                    <h4 className="FromHeading"><strong>CONTACT YOU MP OR MEP</strong></h4>
                    {/* <h4 className="FromHeading"><strong>{this.state.CommunicationCount}</strong></h4> */}
                    {/* <p className="formBottomText">To volunteer with Arise Zimbabwe, enter a few details for the campaign team to contact you.</p> */}

                    <div>

                      <div className="formInput">
                        <input value={this.state.MobileNumber} onChange={(e) => { this.setState({ MobileNumber: e.target.value }) }}
                          type="Text" className="form-control" placeholder="Enter Post Code" />
                      </div>
                      <div className="formInput">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon">
                              <i className="fa fa-pencil prefix"></i>
                            </span>
                          </div>
                          <textarea onChange={(e) => { this.setState({ Comment: e.target.value }) }}
                            className="form-control" placeholder="Message" id="exampleFormControlTextarea1" rows="5"></textarea>
                        </div>
                      </div>
                      <div className="formInput">
                        <input value={this.state.Region} onChange={(e) => { this.setState({ Region: e.target.value }) }}
                          type="Text" className="form-control" placeholder="First Name" />
                      </div>
                      <div className="formInput">
                        <input value={this.state.Region} onChange={(e) => { this.setState({ Region: e.target.value }) }}
                          type="Text" className="form-control" placeholder="Last Name" />
                      </div>
                      <div className="text-center">
                        <MDBBtn color="danger" size="sm">Submit</MDBBtn>

                      </div>
                    </div>
                  </div>
                </Card>
              </MDBCol>
              <MDBCol lg="3">
                <Card style={{ height: 435, marginTop: 5 }}>

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

        {/* <hr style={{ margin: 20 }}></hr> */}



        <div className="MainContainer2">
          <MDBContainer className="cards">

            <MDBRow>
              <MDBCol md="3" className="cardMargin" onClick={this.toggleCollapse("basicCollapse")}>
                <Card narrow className="CardBody">
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle className="CardTitle">Harare Province</CardTitle>
                    <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>

              <MDBCollapse style={{ width: '100%' }} id="basicCollapse" isOpen={this.state.collapseID}>
                <div style={{ marginTop: 20, padding: 30 }}>
                  <Card style={{ paddingTop: 25, paddingBottom: 25 }}>
                    <p className="Heading"><strong>Harare</strong></p>
                    <MDBRow>
                      <MDBCol lg="4">
                        <img style={{ height: 370, width: 250 }} src={require('./assests/Images/arise.jpg')} />
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Budiriro <br />
                          Chitungwiza North<br />
                          Chitungwiza South<br />
                          Epworth<br />
                          Dzivarasekwa<br />
                          Glen Norah<br />
                          Glen View North<br />
                          Glen View South<br />
                          Harare Central<br />
                          Harare East<br />
                          Harare North<br />
                          Harare South<br />
                          Harare West<br />
                          Hatfield<br />
                          Highfield East<br />

                        </p>
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Highfield West<br />
                          Kambuzuma<br />
                          Kuwadzana<br />
                          Kuwadzana East<br />
                          Mabvuku<br />
                          Tafara<br />
                          Mbare<br />
                          Mt Pleasant<br />
                          Mufakose<br />
                          Southerton<br />
                          St Mary’s<br />
                          Sunningdale<br />
                          Warren Park<br />
                          Zengeza East<br />
                          Zengeza West<br />

                        </p>
                      </MDBCol>

                    </MDBRow>
                  </Card>
                </div>
              </MDBCollapse>



              <MDBCol md="3" className="cardMargin" onClick={this.toggleCollapse("basicCollapse2")}>
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle className="CardTitle">Bulawayo Province</CardTitle>
                    <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>
              <MDBCollapse style={{ width: '100%' }} id="basicCollapse2" isOpen={this.state.collapseID}>
                <div style={{ marginTop: 20, padding: 30 }}>
                  <Card style={{ paddingTop: 25, paddingBottom: 25 }}>
                    <p className="Heading"><strong>Bulawayo</strong></p>
                    <MDBRow>
                      <MDBCol lg="4">
                        <img style={{ height: 370, width: 250 }} src={require('./assests/Images/arise.jpg')} />
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Bulawayo Central<br />
                          Bulawayo East<br />
                          Bulawayo South<br />
                          Emakhandeni<br />
                          Entumbane<br />
                          Lobengula<br />
                          Luveve<br />
                          Magwegwe<br />
                          Makokoba<br />
                          Nketa<br />
                          Nkulumane<br />
                          Mpopoma<br />
                          Pelandaba<br />
                          Matshobana<br />
                          Pumula<br />


                        </p>
                      </MDBCol>

                    </MDBRow>
                  </Card>
                </div>
              </MDBCollapse>

              <MDBCol md="3" className="cardMargin" onClick={this.toggleCollapse("basicCollapse3")}>
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle className="CardTitle">Masvingo Province</CardTitle>
                    <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>

              <MDBCollapse style={{ width: '100%' }} id="basicCollapse3" isOpen={this.state.collapseID}>
                <div style={{ marginTop: 20, padding: 30 }}>
                  <Card style={{ paddingTop: 25, paddingBottom: 25 }}>
                    <p className="Heading"><strong>Masvingo</strong></p>
                    <MDBRow>
                      <MDBCol lg="4">
                        <img style={{ height: 370, width: 250 }} src={require('./assests/Images/arise.jpg')} />
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Bikita East<br />
                          Bikita South<br />
                          Bikita West<br />
                          Chiredzi East<br />
                          Chiredzi North<br />
                          Chiredzi South<br />
                          Chiredzi West<br />
                          Chivi Central<br />
                          Chivi North<br />
                          Chivi South<br />
                          Gutu Central<br />
                          Gutu East<br />
                          Gutu North<br />
                          Gutu South<br />
                          Gutu West<br />



                        </p>
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Masvingo Central<br />
                          Masvingo North<br />
                          Masvingo South<br />
                          Masvingo Urban<br />
                          Masvingo West<br />
                          Mwenezi East<br />
                          Mwenezi West<br />
                          Zaka Central<br />
                          Zaka East<br />
                          Zaka North<br />
                          Zaka West<br />

                        </p>
                      </MDBCol>

                    </MDBRow>
                  </Card>
                </div>
              </MDBCollapse>


              <MDBCol md="3" className="cardMargin" onClick={this.toggleCollapse("basicCollapse4")}>
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle className="CardTitle">Mashonaland Central</CardTitle>
                    <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>

              <MDBCollapse style={{ width: '100%' }} id="basicCollapse4" isOpen={this.state.collapseID}>
                <div style={{ marginTop: 20, padding: 30 }}>
                  <Card style={{ paddingTop: 25, paddingBottom: 25 }}>
                    <p className="Heading"><strong>Mashonaland Central</strong></p>
                    <MDBRow>
                      <MDBCol lg="4">
                        <img style={{ height: 370, width: 250 }} src={require('./assests/Images/arise.jpg')} />
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Bindura North<br />
                          Bindura South<br />
                          Guruve North<br />
                          Guruve North<br />
                          Guruve South<br />
                          Mazowe Central<br />
                          Mazowe North<br />
                          Mazowe South<br />
                          Mazowe West<br />
                          Mbire<br />
                          Mt. Darwin East<br />
                          Mt. Darwin North<br />
                          Mt. Darwin South<br />
                          Mt. Darwin West<br />
                          Muzarabani North<br />



                        </p>
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Muzarabani South<br />
                          Rushinga<br />
                          Shamva North<br />
                          Shamva South<br />
                          Rushinga<br />
                          Shamva North<br />
                          Shamva South<br />
                        </p>
                      </MDBCol>

                    </MDBRow>
                  </Card>
                </div>
              </MDBCollapse>

              <MDBCol md="3" className="cardMargin" onClick={this.toggleCollapse("basicCollapse5")}>
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle className="CardTitle">Mashonaland East</CardTitle>
                    <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>

              <MDBCollapse style={{ width: '100%' }} id="basicCollapse5" isOpen={this.state.collapseID}>
                <div style={{ marginTop: 20, padding: 30 }}>
                  <Card style={{ paddingTop: 25, paddingBottom: 25 }}>
                    <p className="Heading"><strong>Mashonaland East</strong></p>
                    <MDBRow>
                      <MDBCol lg="4">
                        <img style={{ height: 370, width: 250 }} src={require('./assests/Images/arise.jpg')} />
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Chikomba Central<br />
                          Chikomba East<br />
                          Chikomba West<br />
                          Goromonzi North<br />
                          Goromonzi South<br />
                          Goromonzi West<br />
                          Marondera Central<br />
                          Marondera East<br />
                          Marondera West<br />
                          Murehwa North<br />
                          Murehwa South<br />
                          Murehwa West<br />
                          Mutoko East<br />
                          Mutoko North<br />



                        </p>
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Mutoko South<br />
                          Mutoko South<br />
                          Mudzi North<br />
                          Mudzi South<br />
                          Mudzi West<br />
                          Seke<br />
                          Maramba-Pfungwe<br />
                          Wedza North<br />
                          Wedza South<br />
                          Uzumba<br />

                        </p>
                      </MDBCol>

                    </MDBRow>
                  </Card>
                </div>
              </MDBCollapse>


              <MDBCol md="3" className="cardMargin" onClick={this.toggleCollapse("basicCollapse6")}>
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle className="CardTitle">Mashonaland West</CardTitle>
                    <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>

              <MDBCollapse style={{ width: '100%' }} id="basicCollapse6" isOpen={this.state.collapseID}>
                <div style={{ marginTop: 20, padding: 30 }}>
                  <Card style={{ paddingTop: 25, paddingBottom: 25 }}>
                    <p className="Heading"><strong>Mashonaland West</strong></p>
                    <MDBRow>
                      <MDBCol lg="4">
                        <img style={{ height: 370, width: 250 }} src={require('./assests/Images/arise.jpg')} />
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Chakari<br />
                          Chegutu East<br />
                          Chegutu West<br />
                          Chinhyoyi<br />
                          Hurungwe Central<br />
                          Hurungwe East<br />
                          Hurungwe North<br />
                          Hurungwe West<br />
                          Kadoma Central<br />
                          Kariba<br />
                          Magunje<br />
                          Makonde<br />
                          Mhangura<br />
                          Mhondoro-Mubaira<br />
                          Mhondoro-Ngezi<br />
                          Muzvezve<br />



                        </p>
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Norton<br />
                          Sanyati<br />
                          Zvimba East<br />
                          Zvimba North<br />
                          Zvimba South<br />
                          Zvimba West<br />

                        </p>
                      </MDBCol>

                    </MDBRow>
                  </Card>
                </div>
              </MDBCollapse>


              <MDBCol md="3" className="cardMargin" onClick={this.toggleCollapse("basicCollapse7")}>
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle className="CardTitle">Manicaland Province</CardTitle>
                    <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>

              <MDBCollapse style={{ width: '100%' }} id="basicCollapse7" isOpen={this.state.collapseID}>
                <div style={{ marginTop: 20, padding: 30 }}>
                  <Card style={{ paddingTop: 25, paddingBottom: 25 }}>
                    <p className="Heading"><strong>Manicaland Province</strong></p>
                    <MDBRow>
                      <MDBCol lg="4">
                        <img style={{ height: 370, width: 250 }} src={require('./assests/Images/arise.jpg')} />
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Buhera Central<br />
                          Buhera North<br />
                          Buhera South<br />
                          Buhera West<br />
                          Chimanimani East<br />
                          Chimanimani West<br />
                          Chipinge Central<br />
                          Chipinge East<br />
                          Chipinge South<br />
                          Chipinge West<br />
                          Dangamvura<br />
                          Chikanga<br />
                          Headlands<br />
                          Makoni Central<br />
                          Makoni North<br />





                        </p>
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Makoni South<br />
                          Makoni West<br />
                          Musikavanhu<br />
                          Mutare Central<br />
                          Mutare North<br />
                          Mutare South<br />
                          Mutare West<br />
                          Mutasa Central<br />
                          Mutasa North<br />
                          Mutasa South<br />
                          Nyanga North<br />
                          Nyanga South<br />


                        </p>
                      </MDBCol>

                    </MDBRow>
                  </Card>
                </div>
              </MDBCollapse>

              <MDBCol md="3" className="cardMargin" onClick={this.toggleCollapse("basicCollapse8")}>
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle className="CardTitle">Matebeleland North</CardTitle>
                    <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>

              <MDBCollapse style={{ width: '100%' }} id="basicCollapse8" isOpen={this.state.collapseID}>
                <div style={{ marginTop: 20, padding: 30 }}>
                  <Card style={{ paddingTop: 25, paddingBottom: 25 }}>
                    <p className="Heading"><strong>Matebeleland North</strong></p>
                    <MDBRow>
                      <MDBCol lg="4">
                        <img style={{ height: 370, width: 250 }} src={require('./assests/Images/arise.jpg')} />
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Binga North<br />
                          Binga South<br />
                          Bubi<br />
                          Lupane East<br />
                          Lupane West<br />
                          Nkayi South<br />
                          Nkayi North<br />
                          Tsholotsho North<br />
                          Tsholotsho South<br />
                          Hwange East<br />
                          Hwange Central<br />
                          Hwange West<br />
                          Umguza<br />
                        </p>
                      </MDBCol>

                    </MDBRow>
                  </Card>
                </div>
              </MDBCollapse>

              <MDBCol md="3" className="cardMargin" onClick={this.toggleCollapse("basicCollapse9")}>
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle className="CardTitle">Matebeleland South</CardTitle>
                    <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>

              <MDBCollapse style={{ width: '100%' }} id="basicCollapse9" isOpen={this.state.collapseID}>
                <div style={{ marginTop: 20, padding: 30 }}>
                  <Card style={{ paddingTop: 25, paddingBottom: 25 }}>
                    <p className="Heading"><strong>Matebeleland South</strong></p>
                    <MDBRow>
                      <MDBCol lg="4">
                        <img style={{ height: 370, width: 250 }} src={require('./assests/Images/arise.jpg')} />
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Beitbridge East<br />
                          Beitbridge West<br />
                          Bulilima East<br />
                          Bulilima West<br />
                          Gwanda North<br />
                          Gwanda Central<br />
                          Gwanda South<br />
                          Insiza North<br />
                          Insiza South<br />
                          Mangwe<br />
                          Matobo North<br />
                          Matobo South<br />
                          Umzingwane<br />

                        </p>
                      </MDBCol>

                    </MDBRow>
                  </Card>
                </div>
              </MDBCollapse>

              <MDBCol md="3" className="cardMargin" onClick={this.toggleCollapse("basicCollapse10")}>
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle className="CardTitle">Midlands Province</CardTitle>
                    <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>

              <MDBCollapse style={{ width: '100%' }} id="basicCollapse10" isOpen={this.state.collapseID}>
                <div style={{ marginTop: 20, padding: 30 }}>
                  <Card style={{ paddingTop: 25, paddingBottom: 25 }}>
                    <p className="Heading"><strong>Midlands Province</strong></p>
                    <MDBRow>
                      <MDBCol lg="4">
                        <img style={{ height: 370, width: 250 }} src={require('./assests/Images/arise.jpg')} />
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Chirumhanzu<br />
                          Chirumhanzu-Zibagwe<br />
                          Chiwundura<br />
                          Gokwe<br />
                          Gokwe-Chireya<br />
                          Gokwe-Gumunyu<br />
                          Gokwe-Kabuyuni<br />
                          Gokwe-Kana<br />
                          Gokwe-Mapfungautsi<br />
                          Gokwe-Nembudziya<br />
                          Gokwe-Sengwa<br />
                          Gokwe-Sasame<br />
                          Gweru Urban<br />
                          Kwekwe Central<br />
                          Mberengwa East<br />



                        </p>
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Mberengwa North<br />
                          Mbrerengwa South<br />
                          Mberengwa West<br />
                          Mbizo<br />
                          Mkoba<br />
                          Redcliff<br />
                          Shurugwi North<br />
                          Shurugwi South<br />
                          Silobela<br />
                          Vungu<br />
                          Zhombe<br />
                          Zvishavane-Ngezi<br />
                          Zvishavane-Runde<br />

                        </p>
                      </MDBCol>

                    </MDBRow>
                  </Card>
                </div>
              </MDBCollapse>


              <MDBCol md="6" className="cardMargin">
                <Card narrow>
                  <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="ZimbabweArise"
                    options={{ height: 400 }}
                  />
                </Card>
              </MDBCol>

            </MDBRow>

            <hr className="divider" />

            <Button href="#">Diaspsora</Button>

            <MDBRow>
              <MDBCol md="3" className="cardMargin" onClick={this.toggleCollapse("basicCollapse13")}>
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle className="CardTitle">UK & Europe</CardTitle>
                    <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>
              <MDBCollapse style={{ width: '100%' }} id="basicCollapse13" isOpen={this.state.collapseID}>
                <div style={{ marginTop: 20, padding: 30 }}>
                  <Card style={{ paddingTop: 25, paddingBottom: 25 }}>
                    <p className="Heading"><strong>UK & Europe</strong></p>
                    <MDBRow>
                      <MDBCol lg="4">
                        <img style={{ height: 370, width: 250 }} src={require('./assests/Images/arise.jpg')} />
                      </MDBCol>
                      <MDBCol xs="5">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Greater London, Middlesex & Essex <br />
                          South of England (Sussex, Surrey) <br />
                          South West of England (Gloucestershine, Somerset, Bristol, Wiltshire, Cornwall, Devon, Dorset shire)<br />
                          <strong>South East of England</strong> Berkshire, Oxfordshire, Kent, Buckinghamshire <br />
                          North West-Greater Manchester, Lancashire, Merseyside, Cheshire <br />
                          Yorkshire/ South/ West/ North-Leeds, Bradford, Halifax, Huddersfield, Batley, Doncaster, Sheffield, Rotherham <br />
                          East Riding of Yorkshire & Humberside, Kingston upon hull, Beverly Halifax <br />
                          North East & Cambria-Newcastle, Sunderland, Middlesbrough, Darham, Darlington, Teeside, Morpeth, Blyrh. <br />
                          Midlands (Northamptonshire, Derbyshire, Leicestershine. Nottinghamshire) <br/>
                          Ruthland shire, Herefordshire, Staffordshire, Shropshire, Worcestershire <br/>
                          <strong>East of England - </strong> Linconshire, Bedfordshire, Cambridgeshire, hertfordshire<br />
                          <strong>South States,</strong> Delaware, Florida, Gerogia, Maryland, North Carolina, South Carolina, Virginia and West Virginia. The East South.<br />
                          <strong>South Coast </strong> Hampshire, Portsmouth, Bournemouth, Southampton<br />
                          East & South Anglia Norfolk Norwick, Suffolk Ipswich
                          
                        </p>
                      </MDBCol>
                      <MDBCol xs="3">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Central Europe <br/>
                          Easter Europe <br/>
                          Northern Europe <br/>
                          Southern Europe <br/>
                          Southeastern Europe <br/>
                          Western Europe <br/>
                          Scandinavia

                        </p>
                      </MDBCol>
                    </MDBRow>

                  </Card>
                </div>
              </MDBCollapse>
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
              <MDBCol md="3" className="cardMargin" onClick={this.toggleCollapse("basicCollapse11")}>
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle className="CardTitle">Australia & New Zealand</CardTitle>
                    <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>
              <MDBCollapse style={{ width: '100%' }} id="basicCollapse11" isOpen={this.state.collapseID}>
                <div style={{ marginTop: 20, padding: 30 }}>
                  <Card style={{ paddingTop: 25, paddingBottom: 25 }}>
                    <p className="Heading"><strong>Australia & New Zealand</strong></p>
                    <MDBRow>
                      <MDBCol lg="4">
                        <img style={{ height: 370, width: 250 }} src={require('./assests/Images/arise.jpg')} />
                      </MDBCol>
                      <MDBCol xs="8">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Australia Capital Territory <br />
                          New South Wales<br />
                          Northern Territory<br />
                          Queensland<br />
                          South Australia<br />
                          Tasmania - Hobart<br />
                          Victoria - Melbourne<br />
                          Western Australia<br />
                          Bay of plenty<br />
                          Hawke's Bay<br />
                          Manawatu-Wanganui<br />
                          Northland<br />
                          Taranaki<br />
                          Walkato<br />
                          Wellington<br />

                        </p>
                      </MDBCol>
                    </MDBRow>
                  </Card>
                </div>
              </MDBCollapse>

              <MDBCol md="3" className="cardMargin" onClick={this.toggleCollapse("basicCollapse12")}>
                <Card narrow>
                  <CardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                  <CardBody cascade>
                    <CardTitle className="CardTitle">USA & Canada</CardTitle>
                    <CardText className="CardDescription">Please contact your respective regions and local Conveners and get on board the unstopable team</CardText>
                    <MDBBtn color="amber">Join Now</MDBBtn>
                  </CardBody>
                </Card>
              </MDBCol>
              <MDBCollapse style={{ width: '100%' }} id="basicCollapse12" isOpen={this.state.collapseID}>
                <div style={{ marginTop: 20, padding: 30 }}>
                  <Card style={{ paddingTop: 25, paddingBottom: 25 }}>
                    <p className="Heading"><strong>USA & Canada</strong></p>
                    <MDBRow>
                      <MDBCol lg="4">
                        <img style={{ height: 370, width: 250 }} src={require('./assests/Images/arise.jpg')} />
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          <strong>Northest, Division 1:</strong>New England(Connecticut, Maine, Massachusetts, New Hampshire, Rhode Island, and Vermont<br />
                          <strong>Midwest States,</strong> Illinois, Indiana, lowa, Kansas, Michigan, Minnesota, Missouri, Nebraska, North Dakota, Ohio, South Dakota, and Wisconsin.<br />
                          <strong>South States,</strong> Delaware, Florida, Gerogia, Maryland, North Carolina, South Carolina, Virginia and West Virginia. The East South.<br />
                          <strong>Central States,</strong> Alabama, Kentucky, Mississipi and Tennessee<br />
                          <strong>Central States,</strong> Montona, Wyoming, Colorado, New Mexico, Idaho, Utah, Arizona, and Nevada. Pacific States.<br />
                          Washington, Oregon, California, Alaska, and Hawaii<br />

                        </p>
                      </MDBCol>
                      <MDBCol xs="4">
                        <p style={{ textAlign: 'left', padding: 10 }}>
                          Atlantic <strong>Region - </strong> Newfoundland and Labrador, Prince Edward Island, Nova Scotia, New Brunswick.<br />
                          Central <strong>Canada - </strong> Quebec, Ontario.<br />
                          Praine <strong>Provinces - </strong> Manitoba, Saskatchewan, Alberta.<br />
                          <strong>West Coast,</strong> British Columbia.<br />
                          <strong>North - ,</strong> Nunavut, Yukon Territory.<br />

                        </p>
                      </MDBCol>
                    </MDBRow>

                  </Card>
                </div>
              </MDBCollapse>

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
              <Carousel activeItem={1} interval={200000} length={3} slide={true} showControls={true} showIndicators={true} multiItem={true} >
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

            <div>
              <img className="MainImage" src={require('./assests//Images//background6.jpg')} />
            </div>

          </div>
        </div>
      </div >
    );
  }
}

export default App;
