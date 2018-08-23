import React, { Component } from 'react';

import { VerblijfsFunctie } from './VerblijfsFunctie';


export class VerblijfsObject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addButtonVisible: true
        }
    }

    componentDidMount = () => {
        const allHoofdfuncties = this.props.tabel.map(functie => functie['hoofdfunctie BAG']);
        const verblijfsfuncties = this.props.verblijfsobject['verblijfsfuncties'].map(functie => functie['Functie']);

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
        const verblijfsfuncties = this.props.verblijfsobject['verblijfsfuncties'].map(functie => functie['Functie']);

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
        const verblijfsfuncties = this.props.verblijfsobject['verblijfsfuncties']
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
                    <input type="number" min="0" defaultValue="50" />m2
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
        const verblijfsfunctie = {
            "aantal-personen": 0,
            "aanvullend": "",
            "Functie": selectedBagFunctie,
            "Oppervlakte": parseFloat(selectedOppervlakte),
            "mutaties": "toegevoegd"
        }
        this.props.verblijfsobject['verblijfsfuncties'].push(verblijfsfunctie);

        if(!document.getElementById('saveButton').classList.contains('disabled')) {
            document.getElementById('saveButton').classList.add('disabled');
        }

        this.forceUpdate();
    }

    /**
     * Removes this 'VerblijfsObject'
     */
    removeVerblijfsObject = (evt) => {
        evt.preventDefault();
        this.props.verblijfsobject['mutaties'] = 'verwijderd';
        this.props.removeVerblijfsObject();
    }

    /**
     * Remove 'Verblijfsfuncties' from this 'Verblijfsobject'
     */
    removeVerblijfsfunctie = () => {
        if(!document.getElementById('saveButton').classList.contains('disabled')) {
            document.getElementById('saveButton').classList.add('disabled');
        }

        this.forceUpdate();
    }

    /**
     * Change the area of the 'Verblijfsobject' based on the given input
     */
    changeOppervlakte = (evt) => {
        const verblijfsobject = this.props.verblijfsobject;
        verblijfsobject['Oppervlakte'] = parseFloat(evt.target.value);
        if(!verblijfsobject.mutaties) {
            verblijfsobject['mutaties'] = 'gewijzigd';
        }

        if(!document.getElementById('saveButton').classList.contains('disabled')) {
            document.getElementById('saveButton').classList.add('disabled');
        }

        this.forceUpdate();
    }

    /**
     * Scroll automatically when the Verblijfsobject container is expanded
     */
    scrollToExpanded = (evt) => {
        if(evt.target.attributes['aria-expanded'] && evt.target.attributes['aria-expanded'].value === "true") {
            const container = evt.target.parentNode.parentNode;
            container.scrollIntoView({
                behavior: 'smooth', // auto  | instant | smooth.          Default: auto
                block: 'start',     // start | center  | end   | nearest. Default: center
                inline: 'nearest'   // start | center  | end   | nearest. Default: nearest
            });
        }
    }

    render() {
        if(this.props.verblijfsobject.mutaties && this.props.verblijfsobject.mutaties === 'verwijderd') {
            return null;
        }

        const verblijfsobject = this.props.verblijfsobject;
        const straat = verblijfsobject.Adres.straat;
        const huisnr = verblijfsobject.Adres.huisnummer;
        const huisltr = verblijfsobject.Adres.huisletter;
        const huisnrtoev = verblijfsobject.Adres['huisnummer-toevoeging'];
        const postcode = verblijfsobject.Adres.postcode;
        const woonplaats = verblijfsobject.Adres.woonplaats;

        const partialKey = (straat + huisnr + huisltr + huisnrtoev + postcode + woonplaats).replace(' ', '');

        return (
            <div className="row verblijfsobject">
                <div className="panel panel-primary">
                    <div className="panel-heading" id={`heading${partialKey}`} onClick={this.scrollToExpanded.bind(this)}>
                        <h4 className="panel-title" data-toggle="collapse" data-target={`#collapse${partialKey}`} aria-expanded="false" aria-controls={`collapse${partialKey}`}>
                            Verblijfsobject: {`${straat} ${huisnr}${huisltr}${huisnrtoev}, ${postcode} ${woonplaats}`}   
                            <button type="button" className="btn btn-danger btn-xs" title="Verwijder verblijfsobject" onClick={this.removeVerblijfsObject.bind(this)} >
                                <span className="glyphicon glyphicon-minus"></span>
                            </button>                         
                        </h4>
                    </div>
                    <div id={`collapse${partialKey}`} className="collapse" aria-labelledby={`heading${partialKey}`}>
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
                                <div className="col-xs-10">{verblijfsobject['Oppervlakte']} m2</div>
                                {/*<div className="col-xs-10"><input type="number" min="0" defaultValue={verblijfsobject['oppervlakte']} onChange={this.changeOppervlakte.bind(this)} />m2</div>*/}
                            </div>
                            <div className="row">
                                {verblijfsobject.verblijfsfuncties.map((verblijfsfunctie, index) => (
                                    <VerblijfsFunctie 
                                        verblijfsfunctie={verblijfsfunctie} 
                                        index={index}
                                        key={partialKey + '_verblijfsfunctie_' + index} 
                                        tabel={this.props.tabel}
                                        removeVerblijfsfunctie={this.removeVerblijfsfunctie.bind(this)}
                                        parentKey={partialKey + '_verblijfsfunctie_' + index}
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