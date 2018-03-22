import React, { Component } from 'react';


export class VerblijfsObject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            extraBagFuncties: null,
            verblijfsObject: props.verblijfsObject,
            addButtonVisible: true
        }
    }

    getAanvullendDropdown = (searchKey) => {
        const bagFuncties = Object.keys(this.props.indelingen);
        bagFunctie = bagFuncties.filter(functie => functie.toLowerCase().indexOf(searchKey.toLowerCase()) != -1)[0];
        if(bagFunctie) {
            return(
                <select>
                    {this.props.indelingen[bagFunctie].map((aanvullend, i) => {
                        const aanvullendeIndeling = Object.keys(aanvullend)[0];
                        return <option key={aanvullend[aanvullendeIndeling] + "_" + i}>{aanvullendeIndeling}</option>;
                    })}
                </select>
            );
        }
    }

    createAddButton = (verblijfsObject) => (
        <div id={verblijfsObject.hoofdadres} className="row">
            <div className="col-xs-12">
                <button type="button" className="btn btn-success btn-xs" onClick={(evt) => this.addBagFunctie(evt, verblijfsObject)}>
                    <span className="glyphicon glyphicon-plus"></span>
                </button> Voeg BAG functie toe
            </div>
        </div>
    );

    addBagFunctie = (evt) => {
        const objectKeys = Object.keys(this.state.verblijfsObject);
        const bagFuncties = Object.keys(this.props.indelingen);
        const beschikbareFuncties = bagFuncties.filter(functie => {
            let unique = true;
            objectKeys.forEach(key => {
                unique &= functie.toLowerCase().indexOf(key.toLowerCase()) == -1;
            });
            return unique;
        });
        if(beschikbareFuncties.length > 0) {
            const newBagFunctie = (
                <div className="row" key={new Date()}>
                    <div className="col-xs-2">
                        <select defaultValue="disabled" onChange={this.addSelectedFunctie.bind(this)}>
                            <option value="disabled" disabled>-- Kies BAG functie --</option>
                            {beschikbareFuncties.map((functie, i) =>
                                <option key={functie + "_" + i} value={functie}>{functie}</option>
                            )}
                        </select>
                    </div>
                </div>
            );
            this.setState({
                extraBagFuncties: newBagFunctie
            });
        }
        if(beschikbareFuncties.length == 1) {
            this.setState({
                addButtonVisible: false
            });
        }
    }

    addSelectedFunctie = (evt) => {
        const changedVbo = this.state.verblijfsObject;
        changedVbo[evt.target.value] = 0.0;
        this.setState({
            extraBagFuncties: null,
            verblijfsObject: changedVbo
        });
    }

    render() {
        return (
            <div ref={node => this.vbo = node}>
                {Object.keys(this.state.verblijfsObject).map((key, i) =>
                    <div className="row" key={key + "_" + i}>
                        <div className="col-xs-2">{key}</div>
                        <div className="col-xs-2">{this.state.verblijfsObject[key]}</div>
                        <div className="col-xs-8">{this.getAanvullendDropdown(key)}</div>
                    </div>
                )}
                {this.state.extraBagFuncties}
                {this.state.addButtonVisible ?
                <div id={this.state.verblijfsObject.hoofdadres} className="row">
                    <div className="col-xs-12">
                        <button type="button" className="btn btn-success btn-xs" onClick={this.addBagFunctie}>
                            <span className="glyphicon glyphicon-plus"></span>
                        </button> Voeg BAG functie toe
                    </div>
                </div> : null
                }
            </div>
        );
    }
}