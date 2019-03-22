import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router';
import Home from "./../page/Home";
import Course from "./../page/Course";
import { getProfile } from './../services/API';
import PlanLesson from './PlanLesson';


class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: !!localStorage.token,
            account:{
                user_name: "test1",
                id: 8,
                avatar: null,
                name: "loading...",
                email: "loading...",
                point: null,
                description: null,
              }
        }

        getProfile().then(object => {
            console.log(object.success);
            if (object.success) {
                console.log(object.data.user);
                localStorage.name=object.data.user.name;
                localStorage.user_name=object.data.user_name;
                this.setState({ account: object.data.user });
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                localStorage.removeItem("user_name");
                this.setState({ auth: false });
            }
        })
    }
    render() {
        if (!this.state.auth) {
            return (<Redirect to="/" />);
        } else
            return (
                <div>
                    <Switch>
                        <Route exact path="/me" render={() => <Home userdata={this.state.account} />} />
                        <Route path="/me/course-intro/:slug" component={Course} />
                        <Route path="/me/course/:slug/:type/:id" component={PlanLesson} />
                    </Switch>
                </div>

            );
    }

}

export default Auth;