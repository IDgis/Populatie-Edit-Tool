import React, { Component } from 'react';

import { VerblijfsObject } from './VerblijfsObject';


export class Pand extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
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
            const straat = evt.target[0].value;
            const nr = evt.target[1].value;
            const letter = evt.target[2].value;
            const postcode = evt.target[3].value;
            const plaats = evt.target[4].value;
            const vbo = {
                "verblijfsobjectid": "",
                verblijfsfuncties: [],
                oppervlakte: 0,
                Adres: {
                    "Identificatie": "",
                    "straat": straat,
                    "huisnummer": parseInt(nr),
                    "huisletter": letter,
                    "huisnummer-toevoeging": "",
                    "postcode": postcode,
                    "woonplaats": plaats
                },
                mutaties: "toegevoegd"
            }
            this.props.pand['verblijfsobjecten'].push(vbo);

            evt.target[0].value = "";
            evt.target[1].value = "";
            evt.target[2].value = "";
            evt.target[3].value = "";
            evt.target[4].value = "";

            if(!document.getElementById('saveButton').classList.contains('disabled')) {
                document.getElementById('saveButton').classList.add('disabled');
            }

            this.forceUpdate();
        }
    }

    /**
     * Validate the created 'Verblijfsobject' and show an error message if invalid
     */
    validateVerblijfsObject = (evt) => {
        const straat = evt.target[0].value;
        const nr = evt.target[1].value;
        const letter = evt.target[2].value;
        const postcode = evt.target[3].value.replace(" ", "");
        const plaats = evt.target[4].value;

        if(!(straat && nr && postcode && plaats)) {
            this.setState({
                errorMessage: <div className="alert alert-danger alert-error-message">Niet alle velden zijn ingevuld!</div>
            });
            return false;
        }

        const dubbelePanden = this.props.pand.verblijfsobjecten.filter(verblijfsobject => {
            const adres = verblijfsobject.Adres;
            return (adres.straat.toLowerCase() == straat.toLowerCase() &&
                    adres.huisnummer == nr &&
                    adres.huisletter == letter &&
                    adres.postcode.toLowerCase() == postcode.toLowerCase() &&
                    adres.woonplaats.toLowerCase() == plaats.toLowerCase());
        });

        if(dubbelePanden.length > 0) {
            this.setState({
                errorMessage: <div className="alert alert-danger alert-error-message">Verblijfsobject bestaat al!</div>
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
     */
    removeVerblijfsObject = () => {
        if(!document.getElementById('saveButton').classList.contains('disabled')) {
            document.getElementById('saveButton').classList.add('disabled');
        }

        this.forceUpdate();
    }

    render() {
        const pand = this.props.pand;
        const adres = pand.verblijfsobjecten[0].Adres;
        const straat = adres.straat ? adres.straat : "";
        const postcode = adres.postcode ? adres.postcode : "";
        const plaats = adres.woonplaats ? adres.woonplaats : "";

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
                {pand.verblijfsobjecten.map((verblijfsobject, index) => {
                    const adres = verblijfsobject['Adres'];
                    const partialKey = (adres['straat'] + adres['huisnummer'] + adres['postcode'] + adres['woonplaats'] + '_verblijfsobject_').replace(' ', '');

                    return <VerblijfsObject 
                        key={partialKey + index} 
                        verblijfsobject={verblijfsobject} 
                        pand={pand}
                        tabel={this.props.tabel} 
                        removeVerblijfsObject={this.removeVerblijfsObject.bind(this)} 
                    />
                })}
                <div className="row verblijfsobject-add">
                    <strong><em>Voeg Verblijfsobject toe</em></strong>
                    <form className="verblijfsobject-form" onSubmit={this.addVerblijfsobject.bind(this)} >
                        <div className="row">
                            <div className="form-group">
                                <label className="col-xs-2" htmlFor="inputStraat">Straat: </label>
                                <input className="col-xs-4" type="text" id="inputStraat" name="straat" placeholder="Straatnaam" defaultValue={straat} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <label className="col-xs-2" htmlFor="inputNr">Huisnummer: </label>
                                <input className="col-xs-4" type="number" id="inputNr" name="nummer" placeholder="Huisnummer" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <label className="col-xs-2" htmlFor="inputLetter">Huisletter: </label>
                                <input className="col-xs-4" type="text" id="inputLetter" name="nummer" placeholder="Huisletter" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <label className="col-xs-2" htmlFor="inputPostcode">Postcode: </label>
                                <input className="col-xs-4" type="text" id="inputPostcode" name="postcode" placeholder="Postcode" defaultValue={postcode} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <label className="col-xs-2" htmlFor="inputPlaats">Plaats: </label>
                                <input className="col-xs-4" type="text" id="inputPlaats" name="plaats" placeholder="Plaats" defaultValue={plaats} />
                            </div>
                        </div>
                        <div className="row">
                            {this.state.errorMessage}
                            <button type="submit" className="btn btn-success btn-sm col-xs-6" title="Voeg verblijfsobject toe">
                                <span className="glyphicon glyphicon-plus"></span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="scroll-space"></div>
            </div>
        );
    }
}