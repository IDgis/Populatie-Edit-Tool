import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { HelpPage } from './HelpPage';
import { Pand } from './Pand';
import { calculateOutput } from '../methods/rekenmodule';


export class EditTool extends Component {

    constructor(props) {
        super(props);
        window.addEventListener('message', this.populatieServiceListener, false);

        this.state = {
            input: null,
            output: null,
            errorMessage: null,
            helpOpen: false,
        }

        this.tabel = Meteor.settings.public.rekentabel;
    }

    /**
     * Listen for incoming Json from the PopulatieService
     */
    populatieServiceListener = (evt) => {
        if(evt.origin === Meteor.settings.public.originUrl) {
            try {
                const input = JSON.parse(evt.data);
                const output = JSON.parse(evt.data);
                let errorMessage = null;
                if(!input.panden) {
                    errorMessage = <h2 className="alert alert-danger">Geen panden aanwezig in de input!</h2>;
                }
                this.setState({input, output, errorMessage});
            } catch(e) {
                const errorMessage = <h2 className="alert alert-danger">Input is geen valide JSON!</h2>;
                this.setState({errorMessage});
            }
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
            this.state.output.status = "OK";
            window.parent.postMessage(JSON.stringify(this.state.output), Meteor.settings.public.targetUrl);
        }
    }

    /**
     * Calculate the new values based on the data table
     */
    calculateResult = (evt) => {
        evt.preventDefault();
        const output = calculateOutput(this.state.output, this.tabel);

        if(document.getElementById('saveButton').classList.contains('disabled')) {
            document.getElementById('saveButton').classList.remove('disabled');
        }

        this.setState({output});
    }

    /**
     * Toggle the help state to open and close the help screen.
     */
    toggleHelp = (openState, evt) => {
        evt.preventDefault();

        this.setState({helpOpen: openState});
    }

    render() {
        if(this.state.output && !this.state.errorMessage) {
            const panden = this.state.output.panden.filter(pand => {
                return (!pand.mutatie || (pand.mutatie && pand.mutatie !== 'verwijderd'));
            });

            const modalContent = this.state.helpOpen ? <HelpPage toggleHelp={this.toggleHelp.bind(this, false)} /> :
                <div className="modal-content" modal-transclude="">
                    <div className="modal-header">
                        <h2>Populatie Edit Tool</h2>
                    </div>
                    <div className="modal-body">
                        {panden.map((pand, index) => (
                            <Pand pand={pand} key={pand['Identificatie']} tabel={this.tabel} />
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
                        <button id="helpButton" className="btn btn-info" type="button" onClick={this.toggleHelp.bind(this, true)}>
                            <span className="glyphicon glyphicon-question-sign"></span>&nbsp;
                            Help
                        </button>
                    </div>
                </div>
            ;

            return(
                <div className="modal fade in" modal-render="true" tabIndex="-1" role="dialog" modal-animation-class="fade" modal-window="modal-window" index="0" modal-animation="true">
                    <div className="modal-dialog modal-lg">
                        {modalContent}
                    </div>
                </div>
            );
        } else if(this.state.errorMessage) {
            return this.state.errorMessage;
        } else {
            return <h2 className="alert alert-info">Loading Edit Tool...</h2>;
        }
    }
}