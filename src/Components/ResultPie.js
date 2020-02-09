import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Row, Container } from 'react-bootstrap';


export const ResultPie = (title, results, nextUrl) => {

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

    let length = results.length;
    let amountTrue = 0;
    for (let i = 0; i < results.length; i++) {
      if (results[i] === true) 
        amountTrue ++;
    }

    data.datasets[0].data[0] = amountTrue;
    data.datasets[0].data[1] = length - amountTrue;

    return (
        <Container>
            <h4 className="text-center">{title}</h4>
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
                <Col className="col mx-auto">
                <Button as={Link} to={nextUrl}>
                    Back
                </Button>
                </Col>
            </Row>
        </Container>
    );
}
