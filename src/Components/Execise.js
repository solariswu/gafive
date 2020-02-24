import React, { Component } from 'react';
import { graphqlOperation, Auth } from "aws-amplify";

import { Connect } from "aws-amplify-react";
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations'
// import * as subscriptions from './graphql/subscriptions';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { DAILY_NEW_STUDY_ITEMS } from '../consts/Const';
import { getFormatedDate, getFormatedTimestamp, randomsort } from '../consts/Utilities';

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
            mounted: false,
            sendHistory: null,
            updateHistory: null,
            buttonText: 'Submit',
            selectedOption: '',
            loading: true,
            flowStep: "gover",
            round: this.props.location.execiseProps.round,
            remainSeconds: this.props.location.execiseProps.timeoutValue // todo, configurable later
        };
      }

    // async 
    async addHistory (sendHistory, userAnswer) {
        const currentItem = this.state.items[this.state.currentIndex];
        const date = new Date();
     
        const input = {
            timestamp: getFormatedTimestamp(date),
            itemId: currentItem.index,
            response: userAnswer,
            result: userAnswer === currentItem.Answer,
            round: currentItem.round,
            genre: 'test'
        }
    
        try {
            console.log ('addHistory:', input);
            await sendHistory({input})
        } catch (err) {
            console.error(err);
        }
    }

    async updateHistoryReviewed (updateHistory, id) {
        const input = {
            id,
            genre: 'reviewed'
        }

        try {
            await updateHistory({input})
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
             this.addHistory (this.state.sendHistory, this.state.selectedOption);
             if (this.state.items[this.state.currentIndex].historyId !== "") {
                 this.updateHistoryReviewed (this.state.updateHistory, this.state.items[this.state.currentIndex].historyId )
             }
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
        this.setState({remainSeconds: this.props.location.execiseProps.timeoutValue});
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
        console.log ('exec flow step:', this.props.location.execiseProps);
            
        // if (this.props.location.execiseProps.round > 1)
        this.state.flowStep = "goover";
            
        this.state.mounted = true;
            
        this.interval = setInterval(this.tick, 1000);
    }

    organiseDate =(flowStep, data) => {

        const type = Object.keys(data)[0];
        let itemData = data[type];

        switch (flowStep) {
            case 'study':
                // if (itemData.items.length < 60) {
                this.state.flowStep = "done";
                // }
                // else 
                    // this.state.flowStep = "done";
                break;
            case 'goover':
                // if (itemData.items.length + this.state.items.length > 60)
                    // itemData.items = itemData.items.slice(0, 60 - this.state.items.length);
                this.state.flowStep = "study";
                break;
            // case 'audit': 
            //     // randomly pick 20 questions which answered correctly.
            //     itemData.items.sort(randomsort);
            //     itemData.items = itemData.items.slice(0, 20);
            //     this.state.flowStep = "done";
            //     break;
            default:
                break;
        }

        const existingItemsLen = this.state.items.length;
        const date = new Date();
        const today = getFormatedDate(date) + 'T00:00:00Z'; 

         // initiate result.
         for (let index = 0; index < itemData.items.length; index ++) {
            if (type === 'getHistoryItemsList' && itemData.items[index].timestamp >= today) 
                break;

            switch (type) {
                case 'queryQuestionsByIndex' :
                    this.state.items[existingItemsLen + index] = itemData.items[index];
                    this.state.items[existingItemsLen + index].historyId = "";
                    this.state.items[existingItemsLen + index].round = 1;
                break;
                case 'getHistoryItemsList' :                        
                    this.state.items[existingItemsLen + index] = itemData.items[index].content;
                    this.state.items[existingItemsLen + index].historyId = itemData.items[index].id;
                    this.state.items[existingItemsLen + index].round = itemData.items[index].round + 1;
                    break;
                default:
                    break;
            }
            this.state.results[existingItemsLen + index] = '-';
            this.shuffleItemAnswers (existingItemsLen + index);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        // Data already retrieved, show questions or result summary
        if (this.state.flowStep === "done") {
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
        if (!this.state.mounted)
            return(<Container> Loading </Container>);

        // No data, retrieve it first. 
        switch (this.state.flowStep) {
            case "study" :
                return (
                    <div>
                        <Connect mutation={graphqlOperation(mutations.createGafiveHistory)}>
                        {({mutation}) => {
                            this.state.sendHistory = mutation;
                            console.log ('sendHistory assigned.');          
                        }}
                        </Connect>

                        <Connect mutation={graphqlOperation(mutations.updateGafiveHistory)}>
                        {({mutation}) => {
                            this.state.updateHistory = mutation;
                            console.log ('updateHistory assigned.');
                        }}
                        </Connect>

                        <Connect query={graphqlOperation( queries.queryQuestionsByIndex, 
                                            {index: this.props.location.execiseProps.lastFinishedIndex, 
                                            limit: DAILY_NEW_STUDY_ITEMS} )}>
                            {({ data, loading, errors }) => {
                
                                if (loading || !data) return (<h3>Loading...</h3>);
                                if (errors.lenth > 0 ) return (<h3>Error</h3>);

                                this.organiseDate ("study", data);
                            
                                console.log ('result array: ', this.state.results);                   

                            }}
                        </Connect>
                        
                    </div>
                );
            case "goover":
                return (
                    <div>
                        <Connect mutation={graphqlOperation(mutations.createGafiveHistory)}>
                            {({mutation}) => {
                                this.state.sendHistory = mutation;
                                console.log ('sendHistory assigned.');          
                            }}
                            </Connect>

                            <Connect mutation={graphqlOperation(mutations.updateGafiveHistory)}>
                            {({mutation}) => {
                                this.state.updateHistory = mutation;
                                console.log ('updateHistory assigned.');
                            }}
                        </Connect>

                        <Connect query={graphqlOperation( queries.getHistoryItemsList, 
                                                    {filter: { result: {eq: false},
                                                               genre:  {ne: "reviewed"} } , 
                                                    limit: 1000} )}>
                            {({ data, loading, errors }) => {
                                        
                                        if (loading || !data) return (<h3>Loading...</h3>);
                                        if (errors.lenth > 0 ) return (<h3>Error</h3>);

                                        this.organiseDate ("goover", data);
                                    
                                        console.log ('result array: ', this.state.results);
                            }}

                        </Connect>
                    </div>
                );
            // case "audit":
            //     return (
            //         <div>
            //             <Connect mutation={graphqlOperation(mutations.createGafiveHistory)}>
            //             {({mutation}) => {
            //                 this.state.sendHistory = mutation;
            //                 console.log ('sendHistory assigned.');          
            //             }}
            //             </Connect>

            //             <Connect mutation={graphqlOperation(mutations.updateGafiveHistory)}>
            //             {({mutation}) => {
            //                 this.state.updateHistory = mutation;
            //                 console.log ('updateHistory assigned.');
            //             }}
            //             </Connect>

            //             <Connect query={graphqlOperation( queries.getHistoryItemsList, 
            //                                         {filter: { result: {eq: true},
            //                                                 genre: {eq: "test"} } , 
            //                                         limit: 500} )}>
            //                 {({ data, loading, errors }) => {
                                        
            //                             if (loading || !data) return (<h3>Loading...</h3>);
            //                             if (errors.lenth > 0 ) return (<h3>Error</h3>);

            //                             this.organiseDate ("audit", data);
                                    
            //                             console.log ('result array: ', this.state.results);
            //                 }}

            //             </Connect>
            //         </div>
            //     );
            default:
                return (<div></div>);
         }
    }
}

export default withRouter(Execise);