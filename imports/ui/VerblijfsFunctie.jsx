import React, { Component } from 'react';


export class VerblijfsFunctie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            verblijfsfunctie: this.getVerblijfsfunctie(props.verblijfsfunctie),
            verblijfsfunctieData: props.verblijfsfunctie
        }
    }

    /**
     * Get the 'Hoofdfunctie' of this 'Verblijfsobject'
     */
    getVerblijfsfunctie = (verblijfsfunctieData) => {
        return this.props.tabel.filter((entry, i) => (
            entry['hoofdfunctie BAG'].toLowerCase().indexOf(verblijfsfunctieData['functie'].toLowerCase()) != -1))[0]['hoofdfunctie BAG'];
    }

    /**
     * Render a dropdown list with all 'Aanvullende indelingen'
     */
    getAanvullendeIndeling = (aanvullend) => {
        const hoofdfunctieObject = this.props.tabel.filter((hoofdObj, i) => hoofdObj['hoofdfunctie BAG'] === this.state.verblijfsfunctie)[0];
        const aanvullendeIndelingen = hoofdfunctieObject['aanvullende functies'];

        return(
            <select defaultValue={aanvullend} onChange={this.changeAanvullendeIndeling.bind(this)} >
                {aanvullendeIndelingen.map((aanvullend, i) => (<option key={aanvullend['functie'] + "_" + i}>{aanvullend['functie']}</option>))}
            </select>
        );
    }

    changeAanvullendeIndeling = (evt) => {
        const aanvullendeIndeling = evt.target.value;
        const verblijfsfunctieData = this.state.verblijfsfunctieData;
        verblijfsfunctieData['aanvullend'] = aanvullendeIndeling;
        //verblijfsfunctieData['mutaties'] = 'gewijzigd';

        if(!document.getElementById('saveButton').classList.contains('disabled')) {
            document.getElementById('saveButton').classList.add('disabled');
        }

        this.setState({verblijfsfunctieData: verblijfsfunctieData});
    }

    /**
     * Remove this 'Verblijfsfunctie' from the 'Verblijfsobject'
     */
    removeVerblijfsfunctie = (evt) => {
        evt.preventDefault();

        const hoofdfunctie = this.state.verblijfsfunctie;
        const vbo = this.props.verblijfsobject;
        const verblijfsfuncties = vbo['verblijfsfuncties'];
        const remainingFuncties = verblijfsfuncties.filter(functie => hoofdfunctie.toLowerCase().indexOf(functie['functie'].toLowerCase()) == -1);
        
        this.props.removeVerblijfsfunctie(remainingFuncties);
    }

    render() {
        const oppervlakte = this.state.verblijfsfunctieData['oppervlakte'];

        return(
            <div className="row verblijfsfunctie">
                <button type="button" className="btn btn-danger btn-xs" onClick={this.removeVerblijfsfunctie.bind(this)} >
                    <span className="glyphicon glyphicon-minus"></span>
                </button>
                {this.state.verblijfsfunctie}:
                <div className="verblijfsfunctie-content">
                    <div className="row">
                        <div className="col-xs-3">Oppervlakte</div>
                        <div className="col-xs-9">{oppervlakte}</div>
                    </div>
                    <div className="row">
                        <div className="col-xs-3">Aantal personen</div>
                        <div className="col-xs-9">{this.state.verblijfsfunctieData['aantal-personen']}</div>
                    </div>
                    <div className="row">
                        <div className="col-xs-3">Aanvullende indeling</div>
                        <div className="col-xs-9">{this.getAanvullendeIndeling(this.state.verblijfsfunctieData['aanvullend'])}</div>
                    </div>
                </div>
            </div>
        );
    }
}