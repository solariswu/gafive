import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Row, Container } from 'react-bootstrap';


export const ResultPie = (props) => {

    let data = {
        labels: [
            'Correct',
            'Wrong'
        ],
        datasets: [{
            data: [0,0],
            backgroundColor: [
            '#60ACFB',
            '#AFE39B'
            ],
            hoverBackgroundColor: [
            '#60ACFB',
            '#AFE39B'
            ]
        }]
    };

    console.log ("ResultPie: result - ", props.results);
    let length = props.results.length;
    let amountTrue = 0;
    for (let i = 0; i < props.results.length; i++) {
      if (props.results[i] === true) 
        amountTrue ++;
    }

    data.datasets[0].data[0] = amountTrue;
    data.datasets[0].data[1] = length - amountTrue;

    return (
        <Container>
            <h4 className="text-center">{props.title}</h4>
            <Pie data={data} />
            <Row>
                <Col></Col>
                <Col>
                <ul>
                <li>Correct: {amountTrue}</li>
                <li>Wrong: {length - amountTrue}</li>
                </ul>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col xs={6}>
                <Button style={{ marginLeft: "auto" }} as={Link} to={props.nextUrl}>
                    Back
                </Button>
                </Col>
                <Col className="mx-auto">
                    <div />
                </Col>
            </Row>
        </Container>
    );
}
