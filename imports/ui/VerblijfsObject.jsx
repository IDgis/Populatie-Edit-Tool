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
        const verblijfsfuncties = this.state.verblijfsobject['verblijfsfuncties'].map(functie => functie['Functie']);

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
        const verblijfsfuncties = this.state.verblijfsobject['verblijfsfuncties'].map(functie => functie['Functie']);

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
        const verblijfsfuncties = this.state.verblijfsobject['verblijfsfuncties']
            .filter(functie => (!functie.mutaties || (functie.mutaties && functie.mutaties !== 'verwijderd')))
            .map(functie => functie['Functie']);
        const allHoofdfuncties = this.props.tabel.map(functie => functie['hoofdfunctie BAG']);

        // Check which BAG functie aren't used yet.
        const available = allHoofdfuncties.filter(hoofdfunctie =>
            verblijfsfuncties.filter(functie =>
                hoofdfunctie.toLowerCase().indexOf(functie.toLowerCase()) != -1 && hoofdfunctie !== 'Woonfunctie'
            ).length == 0
        );

        return(
            <div className="row verblijfsfunctie-add">
                <strong><em>Voeg Verblijfsfunctie toe</em></strong>
                <form className="verblijfsfunctie-form" onSubmit={this.addBagFunctie.bind(this)}>
                    <button type="submit" className="btn btn-success btn-xs" title="Voeg verblijfsfunctie toe">
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
            "Functie": selectedBagFunctie,
            "Oppervlakte": parseFloat(selectedOppervlakte),
            "mutaties": "toegevoegd"
        }
        vbo['verblijfsfuncties'].push(verblijfsfunctie);

        if(!document.getElementById('saveButton').classList.contains('disabled')) {
            document.getElementById('saveButton').classList.add('disabled');
        }

        this.setState({
            verblijfsobject: vbo
        });
    }

    /**
     * Removes this 'VerblijfsObject'
     */
    removeVerblijfsObject = (evt) => {
        evt.preventDefault();
        const verblijfsobject = this.state.verblijfsobject;
        verblijfsobject['mutaties'] = 'verwijderd';
        const pand = this.props.pand;
        
        this.props.removeVerblijfsObject(pand['verblijfsobjecten']);
    }

    /**
     * Remove 'Verblijfsfuncties' from this 'Verblijfsobject'
     * 
     * @param remainingFuncties - The 'Verblijfsfuncties' to keep in this 'Verblijfsobject'
     */
    removeVerblijfsfunctie = (remainingFuncties) => {
        const vbo = this.state.verblijfsobject;
        vbo['verblijfsfuncties'] = remainingFuncties;

        if(!document.getElementById('saveButton').classList.contains('disabled')) {
            document.getElementById('saveButton').classList.add('disabled');
        }

        this.setState({verblijfsobject: vbo});
    }

    /**
     * Change the area of the 'Verblijfsobject' based on the given input
     */
    changeOppervlakte = (evt) => {
        const verblijfsobject = this.state.verblijfsobject;
        verblijfsobject['Oppervlakte'] = parseFloat(evt.target.value);
        if(!verblijfsobject.mutaties) {
            verblijfsobject['mutaties'] = 'gewijzigd';
        }

        if(!document.getElementById('saveButton').classList.contains('disabled')) {
            document.getElementById('saveButton').classList.add('disabled');
        }

        this.setState({verblijfsobject});
    }

    render() {
        const verblijfsobject = this.state.verblijfsobject;
        const straat = verblijfsobject.Adres.straat;
        const huisnr = verblijfsobject.Adres.huisnummer;
        const huisltr = verblijfsobject.Adres.huisletter;
        const huisnrtoev = verblijfsobject.Adres['huisnummer-toevoeging'];
        const postcode = verblijfsobject.Adres.postcode;
        const woonplaats = verblijfsobject.Adres.woonplaats;

        const verblijfsfuncties = verblijfsobject.verblijfsfuncties.filter(verblijfsfunctie => {
            return (!verblijfsfunctie.mutaties || (verblijfsfunctie.mutaties && verblijfsfunctie.mutaties !== 'verwijderd'));
        });

        return (
            <div className="row verblijfsobject">
                <div className="panel panel-primary">
                    <div className="panel-heading" id={`heading${verblijfsobject['Identificatie']}`}>
                        <h4 className="panel-title" data-toggle="collapse" data-target={`#collapse${verblijfsobject['Identificatie']}`} aria-expanded="false" aria-controls={`collapse${verblijfsobject['Identificatie']}`}>
                            Verblijfsobject: {`${straat} ${huisnr}${huisltr}${huisnrtoev}, ${postcode} ${woonplaats}`}   
                            <button type="button" className="btn btn-danger btn-xs" title="Verwijder verblijfsobject" onClick={this.removeVerblijfsObject.bind(this)} >
                                <span className="glyphicon glyphicon-minus"></span>
                            </button>                         
                        </h4>
                    </div>
                    <div id={`collapse${verblijfsobject['Identificatie']}`} className="collapse" aria-labelledby={`heading${verblijfsobject['Identificatie']}`}>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-xs-2">Verblijfsobjectid</div>
                                <div className="col-xs-10">{verblijfsobject['Identificatie']}</div>
                            </div>
                            <div className="row">
                                <div className="col-xs-2">Status</div>
                                <div className="col-xs-10">{verblijfsobject['status']}</div>
                            </div>
                            <div className="row">
                                <div className="col-xs-2">Oppervlakte</div>
                                <div className="col-xs-10"><input type="number" defaultValue={verblijfsobject['oppervlakte']} onChange={this.changeOppervlakte.bind(this)} />m2</div>
                            </div>
                            <div className="row">
                                {verblijfsfuncties.map((verblijfsfunctie, index) => (
                                    <VerblijfsFunctie 
                                        verblijfsfunctie={verblijfsfunctie} 
                                        index={index}
                                        key={verblijfsobject['Identificatie'] + '_' + verblijfsfunctie['Functie'] + '_' + index + '_' + verblijfsfunctie['Oppervlakte']} 
                                        tabel={this.props.tabel} verblijfsobject={this.state.verblijfsobject}
                                        removeVerblijfsfunctie={this.removeVerblijfsfunctie.bind(this)}
                                        parentKey={verblijfsobject['Identificatie'] + '_' + verblijfsfunctie['Functie'] + '_' + index}
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