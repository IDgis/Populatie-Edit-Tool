import React, { Component } from 'react';

import { VerblijfsObject } from './VerblijfsObject';


export class Pand extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            pand: props.pand,
            errorMessage: <div></div>
        }
    }

    /**
     * Add a 'Verblijfsobject' to this 'Pand'
     */
    addVerblijfsobject = (evt) => {
        evt.preventDefault();

        const valid = this.validateVerblijfsObject(evt);

        if(valid) {
            const pand = this.state.pand;

            const straat = evt.target[0].value;
            const nr = evt.target[1].value;
            const postcode = evt.target[2].value;
            const plaats = evt.target[3].value;
            const vbo = {
                "verblijfsobjectid": "",
                verblijfsfuncties: [],
                oppervlakte: 0,
                Adres: {
                    "Identificatie": "",
                    "straat": straat,
                    "huisnummer": nr,
                    "huisletter": "",
                    "huisnummer-toevoeging": "",
                    "postcode": postcode,
                    "woonplaats": plaats
                },
                mutaties: "toegevoegd"
            }
            pand['verblijfsobjecten'].push(vbo);

            evt.target[0].value = "";
            evt.target[1].value = "";
            evt.target[2].value = "";
            evt.target[3].value = "";

            if(!document.getElementById('saveButton').classList.contains('disabled')) {
                document.getElementById('saveButton').classList.add('disabled');
            }

            this.setState({pand});
        }
    }

    /**
     * Validate the created 'Verblijfsobject' and show an error message if invalid
     */
    validateVerblijfsObject = (evt) => {
        const straat = evt.target[0].value;
        const nr = evt.target[1].value;
        const postcode = evt.target[2].value.replace(" ", "");
        const plaats = evt.target[3].value;

        if(!(straat && nr && postcode && plaats)) {
            this.setState({
                errorMessage: <div className="alert alert-danger">Niet alle velden zijn ingevuld!</div>
            });
            return false;
        }

        const pand = this.state.pand;
        const dubbelePanden = pand.verblijfsobjecten.filter(verblijfsobject => {
            const adres = verblijfsobject.Adres;
            return (adres.straat.toLowerCase() == straat.toLowerCase() &&
                    adres.huisnummer == nr &&
                    adres.postcode.toLowerCase() == postcode.toLowerCase() &&
                    adres.woonplaats.toLowerCase() == plaats.toLowerCase());
        });

        if(dubbelePanden.length > 0) {
            this.setState({
                errorMessage: <div className="alert alert-danger">Verblijfsobject bestaat al!</div>
            });
            return false;
        } else {
            this.setState({
                errorMessage: <div></div>
            });
            return true;
        }
    }

    /**
     * Removes the given 'VerblijfsObject'
     * 
     * @param verblijfsobject - The 'VerblijfsObject' to remove
     */
    removeVerblijfsObject = (verblijfsobjecten) => {
        const pand = this.state.pand;
        pand['verblijfsobjecten'] = verblijfsobjecten;

        if(!document.getElementById('saveButton').classList.contains('disabled')) {
            document.getElementById('saveButton').classList.add('disabled');
        }

        this.setState({pand});
    }

    render() {
        const pand = this.state.pand;
        const verblijfsobjecten = pand.verblijfsobjecten.filter(verblijfsobject => {
            return (!verblijfsobject.mutaties || (verblijfsobject.mutaties && verblijfsobject.mutaties !== 'verwijderd'));
        });

        return (
            <div className="row pand" key={pand['Identificatie']}>
                <h3>Pand {pand['Identificatie']}</h3>
                <div className="row">
                    <div className="col-xs-4">Aantal verblijfsobjecten</div>
                    <div className="col-xs-8">{pand['aantal verblijfsobjecten']}</div>
                </div>
                <div className="row">
                    <div className="col-xs-4">Gemiddelde hoogte (BAG3D)</div>
                    <div className="col-xs-8">{pand['gemiddelde hoogte (BAG3D)']}</div>
                </div>
                <div className="row">
                    <div className="col-xs-4">Geregistreerd totaal bruto vloeroppervlak</div>
                    <div className="col-xs-8">{pand['geregistreerd totaal bruto vloeroppervlak']}</div>
                </div>
                <div className="row">
                    <div className="col-xs-4">Geschat aantal etages</div>
                    <div className="col-xs-8">{pand['geschat aantal etages']}</div>
                </div>
                <div className="row">
                    <div className="col-xs-4">Geschat totaal bruto vloeroppervlak</div>
                    <div className="col-xs-8">{pand['geschat totaal bruto vloeroppervlak']}</div>
                </div>
                <div className="row">
                    <div className="col-xs-4">Geschatte hoogte etage</div>
                    <div className="col-xs-8">{pand['geschatte hoogte etage']}</div>
                </div>
                <div className="row">
                    <div className="col-xs-4">Grondoppervlak</div>
                    <div className="col-xs-8">{pand['grondoppervlak']}</div>
                </div>
                <div className="row">
                    <div className="col-xs-4">Huishoudensgrootte</div>
                    <div className="col-xs-8">{pand['huishoudensgrootte']}</div>
                </div>
                <div className="row">
                    <div className="col-xs-4">Status</div>
                    <div className="col-xs-8">{pand['status']}</div>
                </div>
                {verblijfsobjecten.map((verblijfsobject, index) => (
                    <VerblijfsObject 
                        key={verblijfsobject['Identificatie'] + index} 
                        verblijfsobject={verblijfsobject} 
                        pand={pand}
                        tabel={this.props.tabel} 
                        removeVerblijfsObject={this.removeVerblijfsObject.bind(this)} 
                    />
                ))}
                <div className="row verblijfsobject-add">
                    <strong><em>Voeg Verblijfsobject toe</em></strong>
                    <form className="verblijfsobject-form" onSubmit={this.addVerblijfsobject.bind(this)} >
                        <div className="row">
                            <div className="form-group">
                                <label className="col-xs-1" htmlFor="inputStraat">Straat: </label>
                                <input className="col-xs-4" type="text" id="inputStraat" name="straat" placeholder="Straatnaam" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <label className="col-xs-1" htmlFor="inputNr">Nr: </label>
                                <input className="col-xs-4" type="number" id="inputNr" name="nummer" placeholder="Huisnummer" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <label className="col-xs-1" htmlFor="inputPostcode">Postcode: </label>
                                <input className="col-xs-4" type="text" id="inputPostcode" name="postcode" placeholder="Postcode" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <label className="col-xs-1" htmlFor="inputPlaats">Plaats: </label>
                                <input className="col-xs-4" type="text" id="inputPlaats" name="plaats" placeholder="Plaats" />
                            </div>
                        </div>
                        <div className="row">
                            <button type="submit" className="btn btn-success btn-sm col-xs-5" title="Voeg verblijfsobject toe">
                                <span className="glyphicon glyphicon-plus"></span>
                            </button>
                        </div>
                    </form>
                    {this.state.errorMessage}
                </div>
                <div className="scroll-space"></div>
            </div>
        );
    }
}