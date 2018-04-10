import React, { Component } from 'react';

import { VerblijfsObject } from './VerblijfsObject';


export class Pand extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            pand: props.pand
        }
    }

    render() {
        const pand = this.state.pand;

        return (
            <div className="row pand" key={pand['pandid']}>
                <h3>Pand {pand['pandid']}</h3>
                {pand['verblijfsobjecten'].map((verblijfsobject, index) => (
                    <VerblijfsObject key={verblijfsobject['verblijfsobjectid']} verblijfsobject={verblijfsobject} tabel={this.props.tabel} />
                ))}
            </div>
        );
    }
}