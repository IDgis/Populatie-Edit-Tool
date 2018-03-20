import React, { Component } from 'react';

import { getAanvullendeIndelingen } from './testdata';
import { getGeoJson } from './testdata';


export class EditTool extends Component {

    constructor(props) {
        super(props);

        data = getGeoJson();
        indelingen = getAanvullendeIndelingen();
    }

    loadData = () => {
        const properties = data.features[0].properties;
        let result = [];
        const keys = Object.keys(properties);
        const filteredKeys = keys.filter(key => key !== "Naam" && key !== "Nodes" && key !== "areafract" && key !== "persnacht" && key !== "persdag");
        const hoofdIndelingen = Object.keys(indelingen);
        
        result = filteredKeys.map((key, i) => {
            let indeling;
            hoofdIndelingen.forEach(hoofdIndeling => {
                if(hoofdIndeling.toLowerCase().indexOf(key.toLowerCase()) != -1 && properties[key] != 0) {
                    indeling = hoofdIndeling;
                }
            });
            const aanvullendeIndelingen = indeling ? indelingen[indeling] : undefined;

            return (
                <div className="row" key={key + "_" + i}>
                    <div className="col-xs-2">{key}</div>
                    <div id={key} className="col-xs-2">{properties[key]}</div>
                    { indeling ? this.createDropdownMenu(aanvullendeIndelingen) : 
                        <div className="col-xs-8">
                            <button id={key + "_" + i} className="btn btn-xs btn-success" type="button" onClick={this.onAddClick.bind(this)}>
                                <span className="glyphicon glyphicon-plus"></span>
                            </button>
                        </div>
                    }
                </div>
            );
        });

        return result;
    }

    onAddClick = (evt) => {
        evt.preventDefault();
        
        const id = evt.target.id;

        const mainIndelingen = Object.keys(indelingen);
        const select = document.createElement("select");
        select.setAttribute("id", id);
        const placeHolder = document.createElement("option");
        placeHolder.textContent = "-- Selecteer BAG Functie --";
        placeHolder.setAttribute("selected", "selected");
        placeHolder.disabled = true;
        select.appendChild(placeHolder);

        mainIndelingen.forEach((mainIndeling, i) => {
            const option = document.createElement("option");
            option.textContent = mainIndeling;
            option.value = mainIndeling;
            option.setAttribute("key", `${mainIndeling}_${i}`);
            
            select.appendChild(option);
        });
        evt.target.outerHTML = select.outerHTML;

        const el = document.getElementById(id);
        el.addEventListener("change", () => {
            this.createSelectDropdownMenu(id, el.value);
        });
    }

    createSelectDropdownMenu = (id, selected) => {
        const element = document.getElementById(id);
        const aanvullendeIndelingen = indelingen[selected];

        const selectList = document.createElement("select");
        selectList.setAttribute("id", id);
        const placeHolder = document.createElement("option");
        placeHolder.textContent = "-- Selecteer aanvullende indeling --";
        placeHolder.setAttribute("selected", "selected");
        placeHolder.disabled = true;
        selectList.appendChild(placeHolder);

        aanvullendeIndelingen.forEach((aanvullendeIndeling, i) => {
            const option = document.createElement("option");
            option.textContent = Object.keys(aanvullendeIndeling)[0];
            option.value = aanvullendeIndeling[Object.keys(aanvullendeIndeling)[0]];

            selectList.appendChild(option);
        });

        element.outerHTML = selectList.outerHTML;
    }

    createDropdownMenu = (aanvullendeIndelingen) => (
        <div className="col-xs-8">
            <select>
                {aanvullendeIndelingen.map((aanvullendeIndeling, i) => 
                    <option key={aanvullendeIndeling[Object.keys(aanvullendeIndeling)[0]] + '_' + i}>
                        {Object.keys(aanvullendeIndeling)[0]}
                    </option>)
                }
            </select>
        </div>
    );

    saveValues = (evt) => {
        evt.preventDefault();
        const body = document.getElementById('body');
        document.body.style.backgroundImage = "url('images/PopulatieService2.png')";
        this.props.closeForm();
    }

    calculateResult = () => {
        const bijeen = document.getElementById('bijeen');
        const gezond = document.getElementById('gezond');
        const woon = document.getElementById('woon');
        const winkel = document.getElementById('winkel');
        const onderwijs = document.getElementById('onderwijs');
        const kinder = document.getElementById('kinder');

        bijeen.textContent = "37.00";
        gezond.textContent = "85.75";
        woon.textContent = "20.25";
        winkel.textContent = "6.7";
        onderwijs.textContent = "45.36";
        kinder.textContent = "69";
    }

    render() {
        return(
            <div className="modal fade in" modal-render="true" tabIndex="-1" role="dialog" modal-animation-class="fade" modal-window="modal-window" index="0" modal-animation="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content" modal-transclude="">
                        <div className="modal-header">
                            <h2>Populatie Edit Tool (Pand {data.features[0].properties.Naam})</h2>
                        </div>
                        <div className="modal-body">
                            {this.loadData()}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-info" type="button" onClick={this.calculateResult.bind(this)}>
                                <span className="glypicon glyphicon-stop">&nbsp;</span>
                                Rekenen
                            </button>
                            <button className="btn btn-success" type="button" onClick={this.saveValues.bind(this)}>
                                <span className="glyphicon glyphicon-download">&nbsp;</span>
                                Bewaren
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}