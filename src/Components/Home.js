
import React, { Component } from '../../node_modules/react';
import { Container, Row, Col, Card } from '../../node_modules/react-bootstrap';
import { Link } from 'react-router-dom';

class Home extends Component {

    render () {
        
        return (
          <Container>
              <Row>
                <Col>
                    <Card className="mt-1" style={{ width: '18rem' }} key='study'>
                        <Card.Body>
                           <Card.Link as={Link} to={{
                               pathname:'/execise',
                               execiseProps:{
                                   flowStep: 'goover',
                                   round: 1
                               }
                               }}>Study</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                  <Card className="mt-1" style={{ width: '18rem' }} key='trends'>
                        <Card.Body>
                           <Card.Link as={Link} to={`/trends`}>Trends</Card.Link>
                        </Card.Body>
                    </Card>
                  </Col>
                <Col>
                  <Card className="mt-1" style={{ width: '18rem' }} key='setting'>
                        <Card.Body>
                           <Card.Link as={Link} to={`/settings`}>Settings</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
              </Row>
          </Container>
        );
    }
}

export default Home