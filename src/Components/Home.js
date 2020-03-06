
import React, { Component } from '../../node_modules/react';
import { Container, Row, Col, Card } from '../../node_modules/react-bootstrap';
import { Link } from 'react-router-dom';
import { graphqlOperation } from "aws-amplify";

import { Connect } from "aws-amplify-react";
import * as queries from '../graphql/queries';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      round: 0,
      lastFinishedIndex: -2,
      timeoutValue: 30 // todo, configurable later
    };
  }

  render () {
        if (this.state.lastFinishedIndex === -2) 
          return (
            <Connect query={graphqlOperation( queries.queryLastestIndex, {} )}>
              {({ data, loading, errors }) => {
                console.log ('rendering 1', data, loading, errors);
                if (loading || !data) return (<h3>Loading...</h3>);
                if (errors.lenth > 0 ) return (<h3>Error</h3>);

                console.log ('rendering 2', data, loading, errors);
                
                const type = Object.keys(data)[0];
                let itemData = data[type];

                if (itemData.items.length === 0) 
                  this.setState({
                    lastFinishedIndex: 0,
                    round:1
                  });
                else 
                  this.setState({
                    lastFinishedIndex: itemData.items[0].itemId,
                    round: itemData.items[0].round
                  });
              }}
            </Connect>
          );

        return (
          <Container>
              <Row>
              <Col>
                    <Card className="mt-1" style={{ width: '18rem' }} key='goover'>
                        <Card.Body>
                           <Card.Link as={Link} to={{
                               pathname:'/execise',
                               execiseProps:{
                                   flowStep: 'goover',
                                   round: 1,//this.state.round,
                                   lastFinishedIndex: 646,
                                   timeoutValue: this.state.timeoutValue
                               }
                               }}>Review</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="mt-1" style={{ width: '18rem' }} key='study'>
                        <Card.Body>
                           <Card.Link as={Link} to={{
                               pathname:'/execise',
                               execiseProps:{
                                   flowStep: 'study',
                                   round: 1,//this.state.round,
                                   lastFinishedIndex: this.state.lastFinishedIndex,
                                   timeoutValue: this.state.timeoutValue
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