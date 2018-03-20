import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { PopulatieService } from '../../ui/PopulatieService';

Meteor.startup(() => {
    ReactDOM.render(<PopulatieService />, document.getElementById('content'));
});