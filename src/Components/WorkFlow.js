
import React, { Component } from '../../node_modules/react';
import { Container, Row, Col, Card } from '../../node_modules/react-bootstrap';
import { Link } from 'react-router-dom';

class WorkFlow extends Component {

    render () {
        
        return (
          <Container className="mx-auto">
              <Row>
                <Col className="mx-auto">
                    <Card className="mt-1" style={{ width: '18rem' }} key='goover'>
                        <Card.Body>
                           <Card.Link as={Link} to={{
                               pathname:'/execise',
                               execiseProps:{
                                   flowStep: 'goover',
                                   firstTime: false
                               }
                               }}>Go Over</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                    <Card className="mt-1" style={{ width: '18rem' }} key='audit'>
                        <Card.Body>
                        <Card.Link as={Link} to={{
                               pathname:'/execise',
                               execiseProps:{
                                   flowStep: 'audit',
                                   round: 1
                               }
                               }}>Correction Check</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                    <Card className="mt-1" style={{ width: '18rem' }} key='new'>
                        <Card.Body>
                           <Card.Link as={Link} to={`/execise`}>New</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
              </Row>
              <Row>
                  <Col>
                  <Card className="mt-1" style={{ width: '18rem' }} key='trends'>
                        <Card.Body>
                           <Card.Link as={Link} to={`/execise`}>Try Again</Card.Link>
                        </Card.Body>
                    </Card>
                  </Col>
              </Row>
              <Row>
                  <Col>
                  <Card className="mt-1" style={{ width: '18rem' }} key='trends'>
                        <Card.Body>
                           <Card.Link as={Link} to={`/summarise`}>Summarises</Card.Link>
                        </Card.Body>
                    </Card>
                  </Col>
              </Row>
          </Container>
        );
    }
}

export default WorkFlow