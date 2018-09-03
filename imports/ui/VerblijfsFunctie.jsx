import React, { Component } from 'react';


export class VerblijfsFunctie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fouten: [],
            waarschuwingen: []
        }

        this.verblijfsfunctie = this.getVerblijfsfunctie();
    }

    componentDidMount() {
        this.checkForErrors();
    }

    componentWillReceiveProps() {
        this.checkForErrors();
    }

    checkForErrors = () => {
        const fouten = [];
        const waarschuwingen = [];

        if (this.props.verblijfsfunctie.fouten) {
            this.props.verblijfsfunctie.fouten.forEach((fout, index) => {
                fouten.push(<div className="alert alert-danger" key={`fout_functie_${index}`}>{ fout }</div>);
            });
        }

        if (this.props.verblijfsfunctie.waarschuwingen) {
            this.props.verblijfsfunctie.waarschuwingen.forEach((waarschuwing, index) => {
                waarschuwingen.push(<div className="alert alert-warning" key={`waarschuwing_functie_${index}`}>{ waarschuwing }</div>);
            });
        }

        this.setState({fouten, waarschuwingen});
    }

    /**
     * Get the 'Hoofdfunctie' of this 'Verblijfsobject'
     */
    getVerblijfsfunctie = () => {
        return this.props.tabel.filter((entry, i) => (
            entry['hoofdfunctie BAG'].toLowerCase().indexOf(this.props.verblijfsfunctie['Functie'].toLowerCase()) != -1))[0]['hoofdfunctie BAG'];
    }

    /**
     * Render a dropdown list with all 'Aanvullende indelingen'
     */
    getAanvullendeIndeling = () => {
        const hoofdfunctieObject = this.props.tabel.filter((hoofdObj, i) => hoofdObj['hoofdfunctie BAG'] === this.verblijfsfunctie)[0];
        const aanvullendeIndelingen = hoofdfunctieObject['aanvullende functies'];

        return(
            <select defaultValue={this.props.verblijfsfunctie['aanvullend']} onChange={this.changeAanvullendeIndeling.bind(this)} >
                {aanvullendeIndelingen.map((aanvullend, i) => (<option key={aanvullend['functie'] + "_" + i}>{aanvullend['functie']}</option>))}
            </select>
        );
    }

    getNumPersons = () => {
        const hoofdfunctieObject = this.props.tabel.filter((hoofdObj, i) => hoofdObj['hoofdfunctie BAG'] === this.verblijfsfunctie)[0];
        const aanvullendeIndelingen = hoofdfunctieObject['aanvullende functies'];
        const aanvullendeIndeling = aanvullendeIndelingen.filter(indeling => indeling.functie === this.props.verblijfsfunctie.aanvullend)[0];
        let defaultAantal = this.props.verblijfsfunctie['aantal-personen'];

        if (typeof aanvullendeIndeling.aantal === 'string') {
            if (!defaultAantal > 0.0) {
                defaultAantal = (this.props.verblijfsfunctie['Oppervlakte'] / aanvullendeIndeling['default']).toFixed(2);
            }
            this.props.verblijfsfunctie['aantal-personen'] = defaultAantal;
            return <input type="number" step="0.01" min="0" defaultValue={defaultAantal} onChange={this.changeNumPersons} />;
        } else {
            this.props.verblijfsfunctie['aantal-personen'] = defaultAantal;
            return defaultAantal;
        }
    }

    changeNumPersons = (evt) => {
        this.props.verblijfsfunctie['aantal-personen'] = parseFloat(evt.target.value);
    }

    /**
     * When selecting another value in the dropdown, update the json object accordingly.
     */
    changeAanvullendeIndeling = (evt) => {
        const aanvullendeIndeling = evt.target.value;
        this.props.verblijfsfunctie['aanvullend'] = aanvullendeIndeling;

        if(!document.getElementById('saveButton').classList.contains('disabled')) {
            document.getElementById('saveButton').classList.add('disabled');
        }

        this.forceUpdate();
    }

    /**
     * Remove this 'Verblijfsfunctie' from the 'Verblijfsobject'
     */
    removeVerblijfsfunctie = (evt) => {
        evt.preventDefault();
        this.props.verblijfsfunctie['mutatie'] = 'verwijderd';

        this.props.removeVerblijfsfunctie();
    }

    /**
     * Change the number of woonunits based on the given input
     */
    changeWoonunits = (evt) => {
        this.props.verblijfsfunctie['aantal-woonunits'] = parseInt(evt.target.value);
        if(!this.props.verblijfsfunctie.mutatie) {
            this.props.verblijfsfunctie['mutatie'] = 'gewijzigd';
        }

        this.forceUpdate();
    }

    /**
     * Change the area of the 'Verblijfsfunctie' based on the given input
     */
    changeOppervlakte = (evt) => {
        this.props.verblijfsfunctie['Oppervlakte'] = parseInt(evt.target.value);
        if(!this.props.verblijfsfunctie.mutatie) {
            this.props.verblijfsfunctie['mutatie'] = 'gewijzigd';
        }

        this.forceUpdate();
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

    getClassDisplayColor = () => {
        if (this.props.verblijfsfunctie.fouten && this.props.verblijfsfunctie.fouten.length > 0) {
            return "panel-danger";
        } else if (this.props.verblijfsfunctie.waarschuwingen && this.props.verblijfsfunctie.waarschuwingen.length > 0) {
            return "panel-warning";
        } else {
            return "panel-info";
        }
    }

    render() {
        if(this.props.verblijfsfunctie.mutatie && this.props.verblijfsfunctie.mutatie === 'verwijderd') {
            return null;
        }

        let key = this.props.parentKey + '_' + this.props.verblijfsfunctie['Functie'];
        key = key.split(' ').join('_'); // replace all spaces
        key = key.split('(').join('').split(')').join(''); // replace all braces

        const classDisplayColor = this.getClassDisplayColor();

        return (
            <div className="row verblijfsfunctie">
                <div className={`panel ${classDisplayColor}`}>
                    <div className="panel-heading" id={`heading${key}`} onClick={this.scrollToExpanded.bind(this)}>
                        <h4 className="panel-title" data-toggle="collapse" data-target={`#collapse${key}`} aria-expanded="false" aria-controls={`collapse${key}`}>
                            Verblijfsfunctie: {this.verblijfsfunctie}
                            <button type="button" className="btn btn-danger btn-xs" title="Verwijder verblijfsfunctie" onClick={this.removeVerblijfsfunctie.bind(this)} >
                                <span className="glyphicon glyphicon-minus"></span>
                            </button>
                        </h4>
                    </div>
                    <div id={`collapse${key}`} className="collapse" aria-labelledby={`heading${key}`}>
                        <div className="panel-body">
                            <div className="row">
                                {this.state.fouten}
                            </div>
                            <div className="row">
                                {this.state.waarschuwingen}
                            </div>
                            <div className="row">
                                <div className="col-xs-3">Oppervlakte</div>
                                <div className="col-xs-9"><input type="number" min="0" defaultValue={this.props.verblijfsfunctie['Oppervlakte']} onChange={this.changeOppervlakte.bind(this)} />m2</div>
                            </div>
                            <div className="row">
                                <div className="col-xs-3">Aantal personen</div>
                                <div className="col-xs-9">{this.getNumPersons()}</div>
                            </div>
                            {
                                (this.verblijfsfunctie !== 'Woonfunctie') ? <div></div> :
                                <div className="row">
                                    <div className="col-xs-3">Aantal woonunits</div>
                                    <div className="col-xs-9"><input type="number" defaultValue={1} onChange={this.changeWoonunits.bind(this)} /></div>
                                </div>
                            }
                            <div className="row">
                                <div className="col-xs-3">Aanvullende indeling</div>
                                <div className="col-xs-9">{this.getAanvullendeIndeling(this.props.verblijfsfunctie['aanvullend'])}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}