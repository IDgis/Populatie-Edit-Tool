import React, { Component } from 'react';

import { EditTool } from './EditTool';


export class PopulatieService extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            formVisible: false
        }
    }

    onEditButtonClick = (evt) => {
        evt.preventDefault();
        evt.target.style.display = 'none';
        this.toggleForm();
    }

    toggleForm = () => {
        this.setState((prevState, props) => {
            return {
                formVisible: !prevState.formVisible
            }
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <button type="button" id="edit-tool-button" className="btn btn-primary" onClick={this.onEditButtonClick.bind(this)}>Edit Tool</button>
                {this.state.formVisible ? <EditTool closeForm={this.toggleForm.bind(this)} /> : <div style={{display:'none'}} ></div>}
            </div>
        );
    }
}