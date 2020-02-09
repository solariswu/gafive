import React, { Component } from "react";
import Amplify from "aws-amplify";
import awsconfig from './appconfig';
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import MasterChoises from "./Components/QAFiveChoises";
import Home from "./Components/Home";
// import Trends from "./Components/Trends";
// import Lessons from "./Components/Lessons";
import Settings from "./Components/Settings";
import WorkFlow from "./Components/WorkFlow";
import Execise from "./Components/Execise"

import { withAuthenticator } from "aws-amplify-react";

Amplify.configure(awsconfig);

class App extends Component {
    render () {
        Amplify.Logger.LOG_LEVEL = 'VERBOSE';

        // console.log("Your process.env.PUBLIC_URL", process.env.PUBLIC_URL);

        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Switch>
                    {/* <Route exact path="/questions/:round/:startidx" component={MasterChoises} /> */}
                    {/* <Route path="/lessons" component={Lessons} />
                    <Route path="/trends" component={Trends} /> */}
                    <Route path="/settings" component={Settings} />
                    <Route path="/workflow" component={WorkFlow} />
                    <Route path="/execise" component={Execise} />
                    <Route path="/" component={Home} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default withAuthenticator(App);