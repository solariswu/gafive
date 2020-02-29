import React from 'react';

// CSS Styles
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Row, Jumbotron, Fade, Button } from 'react-bootstrap';

export const Questions = (props) => {

        const Title = () => {
            return (
                <div className="text-white bg-dark px-2">
                    {`GA500 index ${props.contents.index}`}
                </div>
            );
        }
        
        const Choises = (props) => {
            const contents = props.contents;

            let choises = [contents.A, contents.B, contents.C, contents.D];
        
            return (
                <fieldset>
                    <Form.Group as={Row}>
                    <Col sm={10}>
                    { choises.map (choise => <Form.Check 
                                            type="radio"
                                            label={choise}
                                            name="answer"
                                            id={choise} 
                                            value={choise}
                                            onChange={props.handleOptionChange}
                                            checked={props.selectedOption === choise}
                                            key={choise}
                                            disabled={props.buttonText === 'Next'} />)}
                    </Col>
                    </Form.Group>
                </fieldset>
            );
        }
        
        const QuestionBody = (props) => {
            const contents = props.contents;
            
            if (contents == null) 
                return (<div></div>);
        
            return (
                    <Jumbotron>
                        <h5> {contents.base} </h5>
                        <br />
                        <Choises 
                            contents={ contents }
                            selectedOption={ props.selectedOption }
                            handleOptionChange={ props.handleOptionChange}
                            buttonText={ props.buttonText }
                        />
                    </Jumbotron>
            );
        }
        
        const Hint = (props) => {

            let translations = [' ', ' '];

            if (props.translation != null)
                translations = props.translation.split(" ");

            console.log ("translations:", translations);
            console.log ("props.translation:", props.translation);

            if (props.show) 
                if (props.positive)
                    return (
                        <div>
                            <div id='hint'> 
                                <p>Correct! </p>
                                {props.content}
                            </div>
                            <div>
                            {translations.map ((translate, idx) => 
                                <p id={idx} className={idx%2 == 0? "text-danger" : "text-dark"}>{translate}</p>) }
                            </div>
                        </div>
                    );
                else
                    return (
                        <div>
                            <div id='hint'> 
                                <p> <font className="text-danger">Not correct! </font> 
                                    The answer is "{props.answer}"</p> 
                                {props.content}
                            </div>
                            <div>
                            { translations.map ((translate, idx) => 
                                <p id={idx} className={idx%2 == 0? "text-danger" : "text-dark"} >{translate}</p>) }
                            </div>
                        </div>
                    );

            return (<Fade in={false}><div id='hint'></div></Fade>)
        }

        // const buttonText = props.selectedOption === ''? 'Submit':'Next';

        return (
            <div>
                <Title />
                <QuestionBody 
                    contents={ props.contents }
                    selectedOption={ props.selectedOption }
                    handleOptionChange={ props.handleOptionChange }
                />
                {/* float button to right */}
                <Row>
                    <Col xs={8}>
                        <Hint 
                            show={ props.buttonText === 'Next' } 
                            content={ props.contents.Hint }
                            positive={ props.selectedOption === props.contents.Answer }
                            answer={ props.contents.Answer }
                            translation={ props.contents.translation }
                        />
                    </Col>
                    <Col xs={4}>
                        <div style={{display: "flex"}}>
                            <Button 
                                style={{ marginLeft: "auto" }} 
                                id="submit" 
                                onClick={props.onClick}> 
                                { props.buttonText } </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
