import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Pand } from './Pand';
import { getTabel } from '../methods/testdata';
import { calculateOutput } from '../methods/rekenmodule';

import * as queryString from 'query-string';


export class EditTool extends Component {

    constructor(props) {
        super(props);
        window.addEventListener('message', this.populatieServiceListener, false);

        this.state = {
            input: null,
            output: null,
            tabel: getTabel()
        }
    }

    /**
     * Listen for incoming Json from the PopulatieService
     */
    populatieServiceListener = (evt) => {
        if(evt.origin === Meteor.settings.public.originUrl) {
            const input = JSON.parse(evt.data);
            const output = JSON.parse(evt.data);
            this.setState({input, output});
        }
    }

    /**
     * Handle event when clicking on the abort button
     */
    abort = (evt) => {
        evt.preventDefault();
        this.state.output.status = "afgebroken";
        window.parent.postMessage(JSON.stringify(this.state.output), Meteor.settings.public.targetUrl);
    }

    /**
     * Save the values and return them to the PopulatieService
     */
    saveValues = (evt) => {
        evt.preventDefault();

        if(!evt.target.classList.contains('disabled')) {
            this.state.output.status = "ok";
            window.parent.postMessage(JSON.stringify(this.state.output), Meteor.settings.public.targetUrl);
        }
    }

    /**
     * Calculate the new values based on the data table
     */
    calculateResult = (evt) => {
        evt.preventDefault();
        const output = calculateOutput(this.state.output, this.state.tabel);

        if(document.getElementById('saveButton').classList.contains('disabled')) {
            document.getElementById('saveButton').classList.remove('disabled');
        }

        this.setState({output});
    }

    render() {
        if(this.state.output) {
            const panden = this.state.output.panden.filter(pand => {
                return (!pand.mutaties || (pand.mutaties && pand.mutaties !== 'verwijderd'));
            });

            return(
                <div className="modal fade in" modal-render="true" tabIndex="-1" role="dialog" modal-animation-class="fade" modal-window="modal-window" index="0" modal-animation="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content" modal-transclude="">
                            <div className="modal-header">
                                <h2>Populatie Edit Tool</h2>
                            </div>
                            <div className="modal-body">
                                {panden.map((pand, index) => (
                                    <Pand pand={pand} key={pand['pandid']} tabel={this.state.tabel} />
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-info" type="button" onClick={this.calculateResult.bind(this)}>
                                    <span className="glyphicon glyphicon-list-alt"></span>&nbsp;
                                    Rekenen
                                </button>
                                <button id="saveButton" className="btn btn-success disabled" type="button" onClick={this.saveValues.bind(this)}>
                                    <span className="glyphicon glyphicon-download"></span>&nbsp;
                                    Bewaren
                                </button>
                                <button id="abortButton" className="btn btn-danger" type="button" onClick={this.abort.bind(this)}>
                                    <span className="glyphicon glyphicon-ban-circle"></span>&nbsp;
                                    Afbreken
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div>Loading Edit Tool...</div>;
        }
    }
}