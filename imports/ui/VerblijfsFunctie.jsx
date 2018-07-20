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
            entry['hoofdfunctie BAG'].toLowerCase().indexOf(verblijfsfunctieData['Functie'].toLowerCase()) != -1))[0]['hoofdfunctie BAG'];
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

    /**
     * When selecting another value in the dropdown, update the json object accordingly.
     */
    changeAanvullendeIndeling = (evt) => {
        const aanvullendeIndeling = evt.target.value;
        const verblijfsfunctieData = this.state.verblijfsfunctieData;
        verblijfsfunctieData['aanvullend'] = aanvullendeIndeling;

        if(!document.getElementById('saveButton').classList.contains('disabled')) {
            document.getElementById('saveButton').classList.add('disabled');
        }

        this.setState({verblijfsfunctieData});
    }

    /**
     * Remove this 'Verblijfsfunctie' from the 'Verblijfsobject'
     */
    removeVerblijfsfunctie = (evt) => {
        evt.preventDefault();
        const hoofdfunctie = this.state.verblijfsfunctieData;
        hoofdfunctie['mutaties'] = 'verwijderd';
        const vbo = this.props.verblijfsobject;

        this.props.removeVerblijfsfunctie(vbo['verblijfsfuncties']);
    }

    /**
     * Change the number of woonunits based on the given input
     */
    changeWoonunits = (evt) => {
        const verblijfsfunctieData = this.state.verblijfsfunctieData;
        verblijfsfunctieData['aantal-woonunits'] = parseInt(evt.target.value);
        if(!verblijfsfunctieData.mutaties) {
            verblijfsfunctieData['mutaties'] = 'gewijzigd';
        }

        this.setState({verblijfsfunctieData});
    }

    /**
     * Change the area of the 'Verblijfsfunctie' based on the given input
     */
    changeOppervlakte = (evt) => {
        const verblijfsfunctieData = this.state.verblijfsfunctieData;
        verblijfsfunctieData['Oppervlakte'] = parseInt(evt.target.value);
        if(!verblijfsfunctieData.mutaties) {
            verblijfsfunctieData['mutaties'] = 'gewijzigd';
        }

        this.setState({verblijfsfunctieData});
    }

    /**
     * Scroll automatically when the Verblijfsfunctie container is expanded
     */
    scrollToExpanded = (evt) => {
        if(evt.target.attributes['aria-expanded'] && evt.target.attributes['aria-expanded'].value === "true") {
            const container = evt.target.parentNode.parentNode;
            container.scrollIntoView({
                behavior: 'smooth', // auto  | instant | smooth.          Default: auto
                block: 'center',     // start | center  | end   | nearest. Default: center
                inline: 'nearest'   // start | center  | end   | nearest. Default: nearest
            });
        }
    }

    render() {
        const oppervlakte = this.state.verblijfsfunctieData['Oppervlakte'];
        let key = this.props.verblijfsobject['Identificatie'] + '_' + this.props.verblijfsfunctie['Functie'] + "_" + this.props.parentKey;
        key = key.split(' ').join('_'); // replace all spaces
        key = key.split('(').join('').split(')').join(''); // replace all braces

        return (
            <div className="row verblijfsfunctie">
                <div className="panel panel-info">
                    <div className="panel-heading" id={`heading${key}`} onClick={this.scrollToExpanded.bind(this)}>
                        <h4 className="panel-title" data-toggle="collapse" data-target={`#collapse${key}`} aria-expanded="false" aria-controls={`collapse${key}`}>
                            Verblijfsfunctie: {this.state.verblijfsfunctie}
                            <button type="button" className="btn btn-danger btn-xs" title="Verwijder verblijfsfunctie" onClick={this.removeVerblijfsfunctie.bind(this)} >
                                <span className="glyphicon glyphicon-minus"></span>
                            </button>
                        </h4>
                    </div>
                    <div id={`collapse${key}`} className="collapse" aria-labelledby={`heading${key}`}>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-xs-3">Oppervlakte</div>
                                <div className="col-xs-9"><input type="number" min="0" defaultValue={oppervlakte} onChange={this.changeOppervlakte.bind(this)} />m2</div>
                            </div>
                            <div className="row">
                                <div className="col-xs-3">Aantal personen</div>
                                <div className="col-xs-9">{this.state.verblijfsfunctieData['aantal-personen']}</div>
                            </div>
                            {
                                (this.state.verblijfsfunctie !== 'Woonfunctie') ? <div></div> :
                                <div className="row">
                                    <div className="col-xs-3">Aantal woonunits</div>
                                    <div className="col-xs-9"><input type="number" defaultValue={1} onChange={this.changeWoonunits.bind(this)} /></div>
                                </div>
                            }
                            <div className="row">
                                <div className="col-xs-3">Aanvullende indeling</div>
                                <div className="col-xs-9">{this.getAanvullendeIndeling(this.state.verblijfsfunctieData['aanvullend'])}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}