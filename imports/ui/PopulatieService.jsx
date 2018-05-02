import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import { EditTool } from '../ui/EditTool';


export const PopulatieService = appProps => (
    <Router>
        <div className="container-fluid">
            <Switch>
                <Route name="edit-tool" exact path="/" component={EditTool} />
            </Switch>
        </div>
    </Router>
);