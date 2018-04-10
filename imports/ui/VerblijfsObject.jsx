import React, { Component } from 'react';

import { VerblijfsFunctie } from './VerblijfsFunctie';


export class VerblijfsObject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addButtonVisible: true,
            verblijfsobject: props.verblijfsobject
        }
    }

    componentDidMount = () => {
        const allHoofdfuncties = this.props.tabel.map(functie => functie['hoofdfunctie BAG']);
        const verblijfsfuncties = this.state.verblijfsobject['verblijfsfuncties'].map(functie => functie['functie']);

        // Toggle the abillity to add verblijfsfuncties
        if(allHoofdfuncties.length == verblijfsfuncties.length && this.state.addButtonVisible) {
            this.setState({addButtonVisible: false});
        }
        if(allHoofdfuncties.length != verblijfsfuncties.length && !this.state.addButtonVisible) {
            this.setState({addButtonVisible: true});
        }
    }

    componentDidUpdate = () => {
        const allHoofdfuncties = this.props.tabel.map(functie => functie['hoofdfunctie BAG']);
        const verblijfsfuncties = this.state.verblijfsobject['verblijfsfuncties'].map(functie => functie['functie']);

        // Toggle the abillity to add verblijfsfuncties
        if(allHoofdfuncties.length == verblijfsfuncties.length && this.state.addButtonVisible) {
            this.setState({addButtonVisible: false});
        }
        if(allHoofdfuncties.length != verblijfsfuncties.length && !this.state.addButtonVisible) {
            this.setState({addButtonVisible: true});
        }
    }

    /**
     * Render the 'Voeg Verblijfsfunctie toe' element
     */
    getAddBagFunctie = () => {
        const verblijfsfuncties = this.state.verblijfsobject['verblijfsfuncties'].map(functie => functie['functie']);
        const allHoofdfuncties = this.props.tabel.map(functie => functie['hoofdfunctie BAG']);

        // Check which BAG functie aren't used yet.
        const available = allHoofdfuncties.filter(hoofdfunctie => 
            verblijfsfuncties.filter(functie => hoofdfunctie.toLowerCase().indexOf(functie.toLowerCase()) != -1).length == 0);        

        return(
            <div className="row verblijfsfunctie-add">
                <strong><em>Voeg Verblijfsfunctie toe</em></strong>
                <form className="verblijfsfunctie-form" onSubmit={this.addBagFunctie.bind(this)}>
                    <button type="submit" className="btn btn-success btn-xs">
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>
                    <select>
                        {available.map((functie, i) => (<option key={functie + "_" + i}>{functie}</option>))}
                    </select>
                    <input type="number" defaultValue="50" />m2
                </form>
            </div>
        );
    }

    /**
     * Add a BAG functie when the user clicks on the green + button with the specified area.
     */
    addBagFunctie = (evt) => {
        evt.preventDefault();
        const selectedBagFunctie = evt.target[1].value;
        const selectedOppervlakte = evt.target[2].value;
        const vbo = this.state.verblijfsobject;
        const verblijfsfunctie = {
            "aantal-personen": 0,
            "aanvullend": "",
            "functie": selectedBagFunctie,
            "oppervlakte": selectedOppervlakte,
            "mutaties": "toegevoegd"
        }
        vbo['verblijfsfuncties'].push(verblijfsfunctie);

        this.setState({
            verblijfsobject: vbo
        });
    }

    /**
     * Remove 'Verblijfsfuncties' from this 'Verblijfsobject'
     * 
     * @param remainingFuncties - The 'Verblijfsfuncties' to keep in this 'Verblijfsobject'
     */
    removeVerblijfsfunctie = (remainingFuncties) => {
        const vbo = this.state.verblijfsobject;
        vbo['verblijfsfuncties'] = remainingFuncties;
        this.setState({verblijfsobject: vbo});
    }

    render() {
        const verblijfsobject = this.state.verblijfsobject;
        const straat = verblijfsobject.adres.openbareruimte;
        const huisnr = verblijfsobject.adres.huisnummer;
        const huisltr = verblijfsobject.adres.huisletter;
        const postcode = verblijfsobject.adres.postcode;
        const woonplaats = verblijfsobject.adres.woonplaatsnaam;

        return (
            <div className="row verblijfsobject">
                <div className="card">
                    <div className="card-header" id={`heading${verblijfsobject['verblijfsobjectid']}`}>
                        <h4>
                            <button className="btn btn-link" data-toggle="collapse" data-target={`#collapse${verblijfsobject['verblijfsobjectid']}`} aria-expanded="false" aria-controls={`collapse${verblijfsobject['verblijfsobjectid']}`}>
                                Verblijfsobject: {`${straat} ${huisnr}${huisltr}, ${postcode} ${woonplaats}`}
                            </button>
                        </h4>
                    </div>
                    <div id={`collapse${verblijfsobject['verblijfsobjectid']}`} className="collapse" aria-labelledby={`heading${verblijfsobject['verblijfsobjectid']}`}>
                        <div className="card-body verblijfsobject-content">
                            <div className="row">
                                <div className="col-xs-2">Verblijfsobjectid</div>
                                <div className="col-xs-10">{verblijfsobject['verblijfsobjectid']}</div>
                            </div>
                            <div className="row">
                                <div className="col-xs-2">Oppervlakte</div>
                                <div className="col-xs-10">{verblijfsobject['oppervlakte']}</div>
                            </div>
                            <div className="row">
                                {verblijfsobject['verblijfsfuncties'].map((verblijfsfunctie, index) => (
                                    <VerblijfsFunctie 
                                        verblijfsfunctie={verblijfsfunctie} 
                                        key={verblijfsobject['verblijfsobjectid'] + '_' + verblijfsfunctie['functie']} 
                                        tabel={this.props.tabel} verblijfsobject={this.state.verblijfsobject}
                                        removeVerblijfsfunctie={this.removeVerblijfsfunctie.bind(this)}
                                    />
                                ))}
                            </div>
                            {this.state.addButtonVisible ? this.getAddBagFunctie() : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}