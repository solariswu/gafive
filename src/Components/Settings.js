import React, { Component } from "react";
import { Auth } from 'aws-amplify';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Loading } from '../consts/Utilities';


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            loading: true
        };
    }

    componentDidMount() {
        // const {session, part} = this.props.match.params;
        // this.setState({session: session, part: part});

        Auth.currentAuthenticatedUser({
            bypassCache: false  
        }).then(user => {
            this.setState({username: user.username});
        });
    }
    render () {

        if (this.state.username === '') {
            return (
            <Container>
            <Loading />
            </Container>);
        }

        return (
            <Container>
                <Row>
                  <Col>
                  <Card className="mt-1" style={{ width: '18rem' }} key='trends'>
                        <Card.Body>
                           <Card.Link as={Link} to={`/`}>Home</Card.Link>
                        </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                  <Card className="mt-1" style={{ width: '18rem' }} key='setting'>
                        <Card.Body>
                            <Card.Link as={Link} to={`#`} onClick={() => Auth.signOut()}>Sign Out {this.username}</Card.Link>
                        </Card.Body>
                    </Card>
                 </Col>
              </Row>
            </Container>
        )

    }
}

export default Settings