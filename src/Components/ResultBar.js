import React from 'react';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup } from 'react-bootstrap';

import { MAX_RESULT_DISPLAY_IN_BAR } from '../consts/Const';


export const ResultBar = (props) => {
    if (props.results == null)
        return (<div></div>);

    let results = props.results;
    let offset = 0;

    if (results.length > MAX_RESULT_DISPLAY_IN_BAR) {
        let centerPoint = props.results.indexOf('-');
        if (centerPoint >= MAX_RESULT_DISPLAY_IN_BAR) {
            offset = centerPoint;
            if (centerPoint + MAX_RESULT_DISPLAY_IN_BAR > results.length)
                results = props.results.slice(centerPoint);
            else
                results = props.results.slice(centerPoint, MAX_RESULT_DISPLAY_IN_BAR+centerPoint);
        }
        else
            results = props.results.slice(0, MAX_RESULT_DISPLAY_IN_BAR);
    }

    return (
        <div className="bg-light" style={{display: "block"}}>
            <ButtonGroup>
                { results.map ((result, index) => <Button
                                                       variant={result === '-' ?
                                                               'secondary' :
                                                               result === true ?
                                                               'success' : 'danger'}
                                                       size="sm"
                                                       key={index}
                                                       className="mr-1"
                                                       >
                                                           {index+1+offset}
                                                       </Button>) }
            </ButtonGroup>
        </div>
    )
}