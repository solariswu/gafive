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
            offset = parseInt(centerPoint/MAX_RESULT_DISPLAY_IN_BAR);
            if ( (offset + 1) * MAX_RESULT_DISPLAY_IN_BAR >= results.length)
                results = props.results.slice(offset*MAX_RESULT_DISPLAY_IN_BAR);
            else
                results = props.results.slice(offset*MAX_RESULT_DISPLAY_IN_BAR, 
                                              (offset+1)*MAX_RESULT_DISPLAY_IN_BAR);
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
                                                           {offset*MAX_RESULT_DISPLAY_IN_BAR+index+1}
                                                       </Button>) }
            </ButtonGroup>
        </div>
    )
}