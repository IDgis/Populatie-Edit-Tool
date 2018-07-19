import React, { Component } from 'react';


export class HelpPage extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal-content" modal-transclude="">
                <div id="help-modal-header" className="modal-header">
                    <h2>Help bij Pand Editen &ldquo;Populatie Edit Tool&ldquo;</h2>
                </div>
                <div className="modal-body">
                    <div id="help-area">
						<h2>Algemene uitleg</h2>
						<ul>
							<li>
								<p>Met de Populatie Edit Tool kunt u per pand een aantal parameters aanpassen, die worden gebruikt om de populatie in een pand te berekenen.</p>
							</li>
							<li>
								<p>Een pand bestaat uit 0,1 of meer verblijfsobjecten. Elk verblijfsobject heeft per definitie een uniek adres.</p>
							</li>
							<li>
								<p>Een verblijfsobject heeft 0,1 of meer verblijfsfuncties.</p>
							</li>
							<li>
								<p>U kunt verblijfsobjecten en verblijfsfuncties verwijderen, toevoegen en aanpassen.</p>
							</li>
							<li>
								<p>U kunt aan een pand meerdere verblijfsfuncties toekennen (zie tabel onder). De woonfunctie kunt u meerdere keren aan een pand toekennen, de overige functies maximaal 1 keer.</p>
							</li>
						</ul>
						<p>Als u aanpassingen doet moet u het resultaat eerst laten doorrekenen via de knop <strong>Rekenen.</strong> U kunt de aanpassingen vervolgens opslaan door te klikken op de knop <strong>Bewaren</strong> of u kunt annuleren (knop <strong>Afbreken</strong>).</p>
						<h3>Verblijfsobject aanpassen:</h3>
						<p>Klik op het <strong>verblijfsobject</strong>, zodat de eigenschappen van het object worden weergegeven.</p>
						<p>U kunt vervolgens:</p>
						<ul>
							<li>
								<p>de totale oppervlakte van het verblijfsobject aanpassen</p>
							</li>
							<li>
								<p>een verblijfsfunctie verwijderen (klik op het <strong>minnetje)</strong></p>
							</li>
							<li>
								<p>een verblijfsfunctie toevoegen (kies de <strong>functie</strong> via het dropdown menu en klik vervolgens op het<strong> plusje</strong>). De verblijfsfunctie wordt toegevoegd en vervolgens kunt u ook deze verblijfsfunctie aanpassen</p>
							</li>
							<li>
								<p>een reeds toegevoegde verblijfsfunctie aanpassen (klik op de betreffende <strong>verblijfsfunctie</strong>)</p>
							</li>
						</ul>
						<h3>Overzicht verblijfsfuncties:</h3>
						<p>
							Bij alle functies kunt u de <strong>oppervlakte</strong> aanpassen. Bij de woonfunctie kunt u het aantal <strong>woonuits</strong> opgeven. 
							Bij bijna alle verblijfsfuncties kunt u een <strong>Aanvullende indeling</strong> kiezen. 
							In onderstaande tabel ziet u welke aanvullende indelingen u kunt kiezen per verblijfsfunctie.
						</p>
						<table className="simpelTabel">
							<tbody>
								<tr>
									<td><kolomtitel>Functies</kolomtitel></td>
									<td><kolomtitel>Aanvullende indeling</kolomtitel></td>
								</tr>
								<tr>
									<td>Woonfunctie</td>
									<td>
										<ul>
											<li>niet-gezin (&lt;60m2 bvo)</li>
											<li>gezin</li>
										</ul>
									</td>
								</tr>
								<tr>
									<td>Bijeenkomstfunctie</td>
									<td>
										<ul>
											<li>klein (personeel en bezoekers)</li>
											<li>groot (personeel en bezoekers)</li>
										</ul>
									</td>
								</tr>
								<tr>
									<td>Celfunctie</td>
									<td>
										<ul>
											<li>(inclusief gehuisvesten)</li>
										</ul>
									</td>
								</tr>
								<tr>
									<td>Gezondheidsfunctie</td>
									<td>
										<ul>
											<li>kliniek, artsenpraktijk</li>
											<li>ziekenhuis en verzorgingshuis</li>
										</ul>
									</td>
								</tr>
								<tr>
									<td>Industriefunctie</td>
									<td>
										<ul>
											<li>klein (milieucategorie 3.1 en lager)</li>
											<li>groot (milieucategorie 3.2 en hoger)</li>
										</ul>
									</td>
								</tr>
								<tr>
									<td>Kantoorfunctie</td>
									<td>
										<ul>
											<li>klein</li>
											<li>groot (&gt; 6000m2 bvo)</li>
											<li>groot (&gt; 6000m2 bvo met atrium, parkeergarage of andere grote collectieve ruimtes)</li>
										</ul>
									</td>
								</tr>
								<tr>
									<td>Kinderdagverblijf</td>
									<td>geen</td>
								</tr>
								<tr>
									<td>Logiesfunctie</td>
									<td>
										<ul>
											<li>klein (personeel en gasten)</li>
											<li>groot : hotel (personeel en gasten))</li>
										</ul>
									</td>
								</tr>
								<tr>
									<td>Onderwijsfunctie</td>
									<td>
										<ul>
											<li>(lagere/middelbare/mbo school)</li>
											<li>(hbo/universiteit)</li>
										</ul>
									</td>
								</tr>
								<tr>
									<td>Sportfunctie (gebouw)</td>
									<td>
										<ul>
											<li>klein (inclusief bezoekers)</li>
											<li>groot (inclusief bezoekers)</li>
										</ul>
									</td>
								</tr>
								<tr>
									<td>Winkelfunctie</td>
									<td>
										<ul>
											<li>(inclusief bezoekers) klein</li>
											<li>(inclusief bezoekers) groot: bouwmarkt, tuincentrum, megastore</li>
										</ul>
									</td>
								</tr>
							</tbody>
						</table>
                    </div>
                </div>
                <div className="modal-footer">
                    <button id="backHelp" className="btn btn-primary" type="button" onClick={this.props.toggleHelp}>
                        <span className="glyphicon glyphicon-triangle-left"></span>&nbsp;
                        Terug
                    </button>
                </div>
            </div>
        );
    }
}