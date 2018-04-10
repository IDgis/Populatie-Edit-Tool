import React, { Component } from 'react';

import { VerblijfsObject } from './VerblijfsObject';


export class Pand extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            pand: props.pand
        }
    }

    /**
     * Add a 'Verblijfsobject' to this 'Pand'
     */
    addVerblijfsobject = (evt) => {
        evt.preventDefault();
        const pand = this.state.pand;

        const straat = evt.target[1].value;
        const nr = evt.target[2].value;
        const postcode = evt.target[3].value;
        const plaats = evt.target[4].value;
        const vbo = {
            "verblijfsobjectid": "",
            verblijfsfuncties: [],
            oppervlakte: 0,
            adres: {
                "identificatie": "",
                "openbareruimte": straat,
                "huisnummer": nr,
                "huisletter": "",
                "huisnummertoevoeging": "",
                "postcode": postcode,
                "woonplaatsnaam": plaats
            }
        }
        pand['verblijfsobjecten'].push(vbo);

        evt.target[1].value = "";
        evt.target[2].value = "";
        evt.target[3].value = "";
        evt.target[4].value = "";

        if(!document.getElementById('saveButton').classList.contains('disabled')) {
            document.getElementById('saveButton').classList.add('disabled');
        }

        this.setState({pand: pand});
    }

    /**
     * Removes the given 'VerblijfsObject'
     * 
     * @param verblijfsobject - The 'VerblijfsObject' to remove
     */
    removeVerblijfsObject = (verblijfsobject) => {
        const pand = this.state.pand;
        const verblijfsobjectId = verblijfsobject['verblijfsobjectid'];
        const remainingVbos = pand['verblijfsobjecten'].filter(vbo => vbo['verblijfsobjectid'] != verblijfsobjectId);

        pand['verblijfsobjecten'] = remainingVbos;

        if(!document.getElementById('saveButton').classList.contains('disabled')) {
            document.getElementById('saveButton').classList.add('disabled');
        }
        
        this.setState({pand: pand});
    }

    render() {
        const pand = this.state.pand;

        return (
            <div className="row pand" key={pand['pandid']}>
                <h3>Pand {pand['pandid']}</h3>
                {pand['verblijfsobjecten'].map((verblijfsobject, index) => (
                    <VerblijfsObject key={verblijfsobject['verblijfsobjectid']} verblijfsobject={verblijfsobject} tabel={this.props.tabel} removeVerblijfsObject={this.removeVerblijfsObject.bind(this)} />
                ))}
                <div className="row verblijfsobject-add">
                <strong><em>Voeg Verblijfsobject toe</em></strong>
                <form className="verblijfsobject-form" onSubmit={this.addVerblijfsobject.bind(this)} >
                    <button type="submit" className="btn btn-success btn-xs" title="Voeg verblijfsobject toe">
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>
                    <input type="text" placeholder="Straat" />
                    <input type="text" placeholder="Nr" />
                    <input type="text" placeholder="Postcode" />
                    <input tpye="text" placeholder="Plaats" />
                </form>
            </div>
            </div>
        );
    }
}