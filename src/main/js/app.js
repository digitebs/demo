const React = require('react');
const ReactDOM = require('react-dom')
require('whatwg-fetch')

const Table = require('react-bootstrap').Table;
const Grid = require('react-bootstrap').Grid;
const Row = require('react-bootstrap').Row;
const Form = require('react-bootstrap').Form;
const Col = require('react-bootstrap').Col;
const Button = require('react-bootstrap').Button;
const FormGroup = require('react-bootstrap').FormGroup;
const FormControl = require('react-bootstrap').FormControl;
const ControlLabel = require('react-bootstrap').ControlLabel;
const Navbar = require('react-bootstrap').Navbar;
const Nav = require('react-bootstrap').Nav;
const NavItem = require('react-bootstrap').NavItem;

const Router = require('react-router').Router;
const Route = require('react-router').Route;
const hashHistory = require('react-router').hashHistory;

import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
    render() {
        /**
         <Navbar.Header>
         <a href="#" className="navbarLeft"><img src="https://facebook.github.io/react/img/logo.svg" width="48" height="48"/></a>
         </Navbar.Header>
         */
        return (
            <div>
                <Navbar inverse>
                    <Nav>
                        <NavItem eventKey={1} href="#/add">Add User</NavItem>
                        <NavItem eventKey={2} href="#/search">Search User</NavItem>
                    </Nav>
                </Navbar>
                <Grid>
                    <Row>
                        <Col md={9}>
                            {this.props.children}
                        </Col>
                    </Row>
                </Grid>
                <Navbar fixedBottom>
                    <Nav>

                    </Nav>
                </Navbar>
            </div>
        )
        /**
         *                     <Navbar.Header>Example courtesy <a href="http://martinbean.co.uk">Martin Bean</a> and <a
         href="http://ryanfait.com/sticky-footer/">Ryan Fait</a>.</Navbar.Header>
         */
    }
}

class Add extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            emailAddress: "",
            bioData: "",
            type: "",
            birthDate: "",
            jobResponsibility: "",
            accessCode: ""
        };
        this.baseState = this.state;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const temp = Object.assign({}, this.state); //clone

        if (temp.type == 'NORMAL') {
             temp.jobResponsibility;
             temp.accessCode =null;
        } else if (temp.type == 'ADMIN') {
            temp.birthDate;
        }

        fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(temp)
        }).then(response => {
            if (!response.ok)
                throw Error(response.statusText);
            return response
        }).then(response =>
            response.text()
        ).then((body => {
            this.setState(this.baseState);
            alert(body);
        }).bind(this)).catch(error => {
            alert(error);
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>First Name</Col>
                    <Col sm={8}>
                        <FormControl required type="text" name="firstName" value={this.state.firstName}
                                     onChange={this.handleInputChange}/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>Last Name</Col>
                    <Col sm={8}><FormControl required type="text" name="lastName" value={this.state.lastName}
                                             onChange={this.handleInputChange}/></Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>Email Address</Col>
                    <Col sm={8}><FormControl required type="email" name="emailAddress" value={this.state.emailAddress}
                                             onChange={this.handleInputChange}/></Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>Bio Data</Col>
                    <Col sm={8}><FormControl required componentClass="textarea" name="bioData"
                                             value={this.state.bioData} onChange={this.handleInputChange}/></Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>Type</Col>
                    <Col sm={8}><FormControl required componentClass="select" name="type" value={this.state.type}
                                             onChange={this.handleInputChange}>
                        <option value=""></option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="NORMAL">NORMAL</option>
                    </FormControl></Col>
                </FormGroup>
                <FormGroup required style={this.state.type == "ADMIN" ? {} : {display: 'none'}}>
                    <Col componentClass={ControlLabel} sm={4}>Job Responsibility</Col>
                    <Col sm={8}><FormControl type="text" name="jobResponsibility" value={this.state.jobResponsibility}
                                             onChange={this.handleInputChange}/></Col>
                </FormGroup>
                <FormGroup required style={this.state.type == "ADMIN" ? {} : {display: 'none'}}>
                    <Col componentClass={ControlLabel} sm={4}>Access Code</Col>
                    <Col sm={8}><FormControl type="number" name="accessCode" value={this.state.accessCode}
                                             onChange={this.handleInputChange}/></Col>
                </FormGroup>
                <FormGroup required style={this.state.type == "NORMAL" ? {} : {display: 'none'}}>
                    <Col componentClass={ControlLabel} sm={4}>Birth Date</Col>
                    <Col sm={8}><FormControl required type="date" name="birthDate" value={this.state.birthDate}
                                             onChange={this.handleInputChange}/></Col>
                </FormGroup>
                <Col smOffset={4} sm={8}>
                    <Button type="submit">
                        Add User
                    </Button>
                </Col>
            </Form>
        )
    }
}

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {query: "", users: []};
        this.baseState = this.state;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        fetch('/user?query=' + this.state.query)
            .then(response =>
                response.json()
            ).then((json => {
            this.setState({
                users: json
            })
        }).bind(this));
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col>
                        <Form inline onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <FormControl required size={35} name="query" value={this.state.query}
                                             onChange={this.handleInputChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit">
                                    Search
                                </Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col style={{marginTop: '15px'}}>
                        <UserList users={this.state.users}/>
                    </Col>
                </Row>
            </Grid>
        )
    }

}

class UserList extends React.Component {
    render() {
        var users = this.props.users.map(user =>
            <User key={user.id} user={user}/>
        );
        return (
            <Table striped bordered condensed>
                <tbody>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Bio Data</th>
                    <th>Job Responsibility</th>
                </tr>
                {users}
                </tbody>
            </Table>
        )
    }
}


class User extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.user.firstName}</td>
                <td>{this.props.user.lastName}</td>
                <td>{this.props.user.bioData}</td>
                <td>{this.props.user.jobResponsibility}</td>
            </tr>
        )
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="search" component={Search}/>
            <Route path="add" component={Add}/>
        </Route>
    </Router>,
    document.getElementById('react')
)
