import React, { Component } from 'react';

import { VerblijfsObject } from './VerblijfsObject';

import { getAanvullendeIndelingen } from './testdata';
import { getJson } from './testdata';


export class EditTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: getJson()
        }

        indelingen = getAanvullendeIndelingen();
    }

    loadData = () => (
        <div className="modal-body">
            {this.state.data.verblijfsobjecten.map((verblijfsObject, i) => {
                return(
                    <div className="row" key={verblijfsObject.identificatie}>
                        <h4>Verblijfsobject: {verblijfsObject.hoofdadres}</h4>
                        <VerblijfsObject verblijfsObject={verblijfsObject} indelingen={indelingen} />
                    </div>
                );
            })}
        </div>
    );

    saveValues = (evt) => {
        evt.preventDefault();
        const body = document.body.style.backgroundImage = "url('images/PopulatieService2.png')";
        this.props.closeForm();
    }

    calculateResult = () => {
        const bagFuncties = Object.keys(indelingen);
        const oldData = this.state.data;
        this.state.data.verblijfsobjecten.forEach((verblijfsObject, i) => {
            const keys = Object.keys(verblijfsObject);
            keys.forEach(key => {
                bagFuncties.forEach(functie => {
                    if(functie.toLowerCase().indexOf(key.toLowerCase()) != -1) {
                        oldData.verblijfsobjecten[i][key] = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
                    }
                });
            });
        });
        this.setState({
            data: oldData
        });
    }

    render() {
        return(
            <div className="modal fade in" modal-render="true" tabIndex="-1" role="dialog" modal-animation-class="fade" modal-window="modal-window" index="0" modal-animation="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content" modal-transclude="">
                        <div className="modal-header">
                            <h2>Pand {this.state.data.pand}</h2>
                        </div>
                        {this.loadData()}
                        <div className="modal-footer">
                            <button className="btn btn-info" type="button" onClick={this.calculateResult.bind(this)}>
                                <span className="glypicon glyphicon-stop">&nbsp;</span>
                                Rekenen
                            </button>
                            <button className="btn btn-success" type="button" onClick={this.saveValues.bind(this)}>
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