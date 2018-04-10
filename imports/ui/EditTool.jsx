import React, { Component } from 'react';

import { Pand } from './Pand';
import { getInputJson, getTabel } from '../methods/testdata';
import { calculateOutput } from '../methods/rekenmodule';


export class EditTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: getInputJson(),
            output: {},
            tabel: getTabel()
        }
    }

    saveValues = (evt) => {
        evt.preventDefault();

        if(!evt.target.classList.contains('disabled')) {
            const body = document.body.style.backgroundImage = "url('images/PopulatieService2.png')";
            this.props.closeForm();
        }
    }

    calculateResult = () => {
        const output = calculateOutput(this.state.input, this.state.tabel);

        if(document.getElementById('saveButton').classList.contains('disabled')) {
            document.getElementById('saveButton').classList.remove('disabled');
        }

        this.setState({output: output});
    }

    render() {
        return(
            <div className="modal fade in" modal-render="true" tabIndex="-1" role="dialog" modal-animation-class="fade" modal-window="modal-window" index="0" modal-animation="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content" modal-transclude="">
                        <div className="modal-header">
                            <h2>Populatie Edit Tool</h2>
                        </div>
                        <div className="modal-body">
                            {this.state.input.panden.map((pand, index) => (
                                <Pand pand={pand} key={pand['pandid']} tabel={this.state.tabel} />
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-info" type="button" onClick={this.calculateResult.bind(this)}>
                                <span className="glypicon glyphicon-stop">&nbsp;</span>
                                Rekenen
                            </button>
                            <button id="saveButton" className="btn btn-success disabled" type="button" onClick={this.saveValues.bind(this)}>
                                <span className="glyphicon glyphicon-download">&nbsp;</span>
                                Bewaren
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}