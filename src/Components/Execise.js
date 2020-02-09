import React, { Component } from 'react';
import { graphqlOperation, Auth } from "aws-amplify";

import { Connect } from "aws-amplify-react";
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations'
// import * as subscriptions from './graphql/subscriptions';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { getFormatedDate, getFormatedTime, randomsort } from '../consts/Utilities';

import { ResultPie } from './ResultPie';
import { ResultBar } from './ResultBar';
import { Questions } from './Questions';

class Execise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            results: [],
            currentIndex: 0,
            username: '',
            sendHistory: null,
            addSpacedRepetition: null,
            buttonText: 'Submit',
            selectedOption: '',
            loading: true,
            remainSeconds: 30 // todo, configurable later
        };
      }

    // async 
    async addHistory (sendHistory, tryNum, userAnswer) {
        const currentItem = this.state.items[this.state.currentIndex];
        const date = new Date();
     
        const input = {
         //   id: this.state.username + yyyy + mm + dd + hh + mi + ss + this.state.session + this.state.part + tryNum,
            username: this.state.username,
            result: userAnswer === currentItem.Answer,
            tryNum: tryNum,
            answer: userAnswer,
            itemId: currentItem.id,
            sessionId: currentItem.session,
            partId: currentItem.type,
            index: currentItem.index,
            date: getFormatedDate(date),
            time: getFormatedTime(date),
            genre: 'lesson'
        }
    
        try {
            console.log ('addHistory:', input);
            await sendHistory({input})
        } catch (err) {
            console.error(err);
        }
    }

    async addToSpacedRepetition (addSpacedRepetition) {
        const currentItem = this.state.items[this.state.currentIndex];
        const today = new Date();
        let tomorrow = new Date(today);
        console.log ("today:", today);
        console.log ("tomorrow:", tomorrow);

        tomorrow.setDate(tomorrow.getDate() + 1);
     
        const input = {
         //   id: this.state.username + yyyy + mm + dd + hh + mi + ss + this.state.session + this.state.part + tryNum,
            username: this.state.username,
            contentId: currentItem.id,
            date: getFormatedDate(tomorrow),
            stageIdx: 0, // initial value for SRS item, SRS will update that later
            times: 0 // initial value for SRS item
        }
    
        try {
            console.log ("add to SRS:", input);
            await addSpacedRepetition({input})
        } catch (err) {
            console.error(err);
        }
    }

    handleSubmit = () => {
        let currentItem = this.state.items[this.state.currentIndex];

        if (this.state.buttonText === 'Next') {
            // clear state
            this.setState({
                selectedOption: '',
                buttonText: 'Submit',
            });
            // move to next item
            this.setState({ currentIndex: this.state.currentIndex + 1 });
            this.resetCoundDown();
        }
        // the user made choise / selected one of the radio input
        else if (this.state.selectedOption.length > 0 ) {
            this.setState({ 
                buttonText: 'Next',
                remainSeconds: ''
             });
             clearInterval(this.interval);
             this.state.results[this.state.currentIndex] = (this.state.selectedOption === currentItem.Answer);
            if (this.props.firstTime === true) {
                this.addHistory (this.state.sendHistory, 1, this.state.selectedOption);
                if (this.state.selectedOption !== currentItem.Answer) 
                    this.addToSpacedRepetition (this.state.addSpacedRepetition);
            }
            else 
                this.addHistory (this.state.sendHistory, 2, this.state.selectedOption)
        }
        //console.log("You have submitted:", result);
    }

    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    }

    shuffleItemAnswers(index) {
        let currentItem = this.state.items[index];
        let choises = [currentItem.A, currentItem.B, currentItem.C, currentItem.D];
        // random the choises list sequence
        choises.sort(randomsort);    
        this.state.items[index].A = choises[0];
        this.state.items[index].B = choises[1];
        this.state.items[index].C = choises[2];
        this.state.items[index].D = choises[3];
    }
    
    resetCoundDown = () => {
        clearInterval(this.interval);
        this.setState({remainSeconds: 60});
        this.interval = setInterval(this.tick, 1000);
    }

    timesUp = () => {
        if (this.state.selectedOption === '') {
            this.setState({
                selectedOption: 'Not answered'
            })
        }
        this.handleSubmit ();
    }

    tick = () => {
        // console.log("Countdown:", this.state.remainSeconds);
        
        if (this.state.remainSeconds === '') 
            clearInterval (this.interval);
        else {
            const remainSeconds = this.state.remainSeconds - 1;

            this.setState({remainSeconds});

            if ( remainSeconds <= 0 ) {
                clearInterval(this.interval);
                this.timesUp ();
            }
        }
    }

    componentDidMount() {
            // const {session, part} = this.props.match.params;
            // this.setState({session: 1, part: '1'});

            console.log ('exec flow step:', this.props.location.execiseProps);
            Auth.currentAuthenticatedUser({
                bypassCache: false
            }).then(user => {
                this.setState({username: user.username});
            });

            this.interval = setInterval(this.tick, 1000);

            //todo: search backend whether is first time testing today
    }

    getGraphQLOperation = (flowStep) => {
        switch (flowStep) {
            case 'goover': 
                // return queries.querySynonymsSrsContent;
            case 'audit':
                // return queries.queryFirstTimeCorrectByUsername;
            default :
                return '';
        }
    }

    organiseDate =(flowStep, data) => {
        
        const type = Object.keys(data)[0];
        let itemData = data[type];

        itemData.items.sort(randomsort);

        switch (flowStep) {
            case 'goover':
            break;
            case 'audit': 
                itemData.items = itemData.items.slice(0, 10);
            break;
            default:
                break;
        }

        const itemsLen = itemData.items.length;

         // initiate result.
         for (let index = 0; index < itemsLen; index ++) {
            if (type === 'queryQuestionsByIndex') 
                this.state.items[index] = itemData.items[index]
            else 
                this.state.items[index] = itemData.items[index].content;
            this.state.results[index] = '-';
            this.shuffleItemAnswers (index);
        }

    }
    getGraphQLParam = (flowStep, username) => {
        const today = getFormatedDate(new Date());

        const param1 = {
            "filter": { 
                username: { eq: username},
                date: { le: today}},
            limit: 15000};


        const param2 = {
            "username": username,
            "genre": "lesson",
            limit: 15000};

        switch (flowStep) {
            case 'goover':
                return param1;
            case 'audit':
                return param2;
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        // Data already retrieved, show questions or result summary
        if (this.state.items.length > 0) {
            if (this.state.currentIndex >= this.state.items.length) {
                return (<ResultPie 
                            title=''
                            results={ this.state.results }
                            nextUrl='/workflow'
                            />);
            }
            return (
                <Container>
                    <ResultBar 
                        results={ this.state.results } 
                    />
                    <Questions 
                        contents={ this.state.items[this.state.currentIndex] }
                        handleOptionChange={ this.handleOptionChange }
                        selectedOption={ this.state.selectedOption }
                        onClick={ this.handleSubmit }
                        buttonText={ this.state.buttonText }
                    />
                    <div>
                        { this.state.remainSeconds }
                    </div>
                </Container>
            );
        }

        // no items loaded
        // wait component mount
        if (this.state.username === '')
            return(<Container> Loading </Container>)

        // No data, retrieve it first. 
        return (
            <div>
                <Connect query={graphqlOperation( queries.queryQuestionsByIndex, {index: 5, limit: 60} )}>
                {/* <Connect query={graphqlOperation(
                                    this.getGraphQLOperation(this.props.location.execiseProps.flowStep), 
                                    this.getGraphQLParam(this.props.location.execiseProps.flowStep, 
                                                         this.state.username))}> */}
                    {({ data, loading, errors }) => {
        
                        if (loading || !data) return (<h3>Loading...</h3>);
                        if (errors.lenth > 0 ) return (<h3>Error</h3>);

                        this.organiseDate (this.props.location.execiseProps.flowStep, data);
                       
                        console.log ('result array: ', this.state.results);                   
        
                        return (
                            <Container>
                            <ResultBar 
                                results={ this.state.results }
                            />
                            <Questions 
                                contents={ this.state.items[this.state.currentIndex] }
                                handleOptionChange={ this.handleOptionChange }
                                selectedOption={ this.state.selectedOption }
                                onClick={ this.handleSubmit }
                                buttonText={ this.state.buttonText }
                            />
                            <div>
                                { this.state.remainSeconds }
                            </div>
                            </Container>
                        );
                    }}
                </Connect>

                <Connect mutation={graphqlOperation(mutations.updateGaFiveQList)}>
                  {({mutation}) => {
                      this.state.sendHistory = mutation;
                      return (<div></div>);
                  }}
                </Connect>

                <Connect mutation={graphqlOperation(mutations.updateGaFiveQList)}>
                  {({mutation}) => {
                      this.state.addSpacedRepetition = mutation;
                      return (<div></div>);
                  }}
                </Connect>

            </div>
        );
    }
}

export default withRouter(Execise);