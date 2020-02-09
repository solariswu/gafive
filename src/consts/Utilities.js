import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
        <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
          </div>
    );
}

// Change date object to String YYYY-MM-DD format
export const getFormatedDate = (date) => {
    
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    return (yyyy + '-' + mm + '-' + dd);

 };

 // Change date object to String HH:MM:SSZ format
export const getFormatedTime = (date) => {
    
    let hh = String(date.getHours()).padStart(2, '0');
    let mi = String(date.getMinutes()).padStart(2, '0');
    let ss = String(date.getSeconds()).padStart('2', 0);

    return (hh + ':' + mi + ':' + ss + 'Z');

 };

 export const randomsort = (a, b) => {
    return Math.random()>.5 ? -1 : 1;
}