/**
 * Calculates the number of persons for the entire input object
 * 
 * @param {Object} input The input JSON
 * @param {Object} table The table with all BAG data
 */
export function calculateOutput(input, table) {
    const panden = input['panden'].map(pand => {
        const verblijfsobjecten = calculcateVerblijfsobjecten(pand, table);

        pand['verblijfsobjecten'] = verblijfsobjecten;
        return pand;
    });

    input['panden'] = panden;
    return input;
}

/**
 * Calculates the number of persons for the entire Pand object
 * 
 * @param {Object} pand The pand object of the input JSON
 * @param {Object} table The table with all BAG data
 */
function calculcateVerblijfsobjecten(pand, table) {
    return pand['verblijfsobjecten'].map(verblijfsobject => {
        if(!(verblijfsobject.mutaties && verblijfsobject.mutaties === 'verwijderd')) {
            const verblijfsfuncties = calculateVerblijfsfuncties(verblijfsobject, table);

            verblijfsobject['verblijfsfuncties'] = verblijfsfuncties;
        }
        return verblijfsobject;
    });
}

/**
 * Calculates the number of persons for the entire Verblijfsobject object
 * 
 * @param {Object} verblijfsobject The verblijfsobject within the Pand JSON
 * @param {Object} table The table with all BAG data
 */
function calculateVerblijfsfuncties(verblijfsobject, table) {
    return verblijfsobject['verblijfsfuncties'].map(verblijfsfunctie => {
        if(!(verblijfsfunctie.mutaties && verblijfsfunctie.mutaties === 'verwijderd')) {
            const hoofdfunctieObject = getHoofdfunctieObject(verblijfsfunctie, table);
            const hoofdfunctie = hoofdfunctieObject['hoofdfunctie BAG'];
            const aanvullendeIndelingen = hoofdfunctieObject['aanvullende functies'];
            const aanvullendeIndeling = verblijfsfunctie['aanvullend'] === '' ? aanvullendeIndelingen[0]['functie'] : verblijfsfunctie['aanvullend'];
            const rekenIndicator = hoofdfunctieObject['rekenindicator'];
            const oppervlakte = verblijfsfunctie['Oppervlakte']
            const rekenObject = aanvullendeIndelingen.filter(indeling => indeling['functie'] === aanvullendeIndeling)[0];
            const numPersons = calculateNumPersons(rekenIndicator, oppervlakte, rekenObject, verblijfsobject);

            if(verblijfsfunctie['aantal-personen'] !== parseFloat(numPersons) &&
                    !(verblijfsfunctie.mutaties && verblijfsfunctie.mutaties === 'toegevoegd')) {
                verblijfsfunctie['mutaties'] = 'gewijzigd';
            }

            verblijfsfunctie['Functie'] = hoofdfunctie;
            verblijfsfunctie['aanvullend'] = aanvullendeIndeling;
            verblijfsfunctie['aantal-personen'] = parseFloat(numPersons);
        }
        return verblijfsfunctie;
    });
}

/**
 * Return the Functie Object from the table matching the given Verblijfsfunctie
 * 
 * @param {Object} verblijfsfunctie The Verblijfsfunctie within the Verblijfsobject JSON
 * @param {Object} table The table with all BAG data
 */
function getHoofdfunctieObject(verblijfsfunctie, table) {
    const functie = verblijfsfunctie['Functie'];
    return table.filter(entry => entry['hoofdfunctie BAG'].toLowerCase().indexOf(functie.toLowerCase()) != -1)[0];
}

/**
 * Calculates the number of persons
 * 
 * @param {String} rekenindicator Defines the way the number of persons should be calculated by either "personen per vbo" or "m2 vbo per persoon"
 * @param {Number} opp The oppervlakte of the verblijfsfunctie
 * @param {Object} indelingObject The aanvullende indelingen object from the BAG data tabel
 * @param {Object} verblijfsobject The Verblijfsobject that contains the Verblijfsfunctie to be calculated
 */
function calculateNumPersons(rekenindicator, opp, indelingObject, verblijfsobject) {
    const aantal = indelingObject['aantal'];

    if(rekenindicator === "personen per vbo" && typeof aantal === 'number') {
        return aantal;
    } else if(rekenindicator === "m2 vbo per persoon" && typeof aantal === 'number') {
        return (opp / aantal).toFixed(2);
    } else {
        const straatnaam = verblijfsobject['Adres']['straat'];
        const nr = verblijfsobject['Adres']['huisnummer'];
        const letter = verblijfsobject['Adres']['huisletter'];
        const toevoeging = verblijfsobject['Adres']['huisnummer-toevoeging'];
        const postcode = verblijfsobject['Adres']['postcode'];
        const woonplaats = verblijfsobject['Adres']['woonplaats'];

        const adres = `${straatnaam} ${nr}${letter}${toevoeging}, ${postcode} ${woonplaats}`;
        const functie = indelingObject['functie'];
        const maatwerkText = `Maatwerk voor: ${adres}. \nVerblijfsfunctie: ${functie}. \n\nVul hier handmatig het aantal personen in voor het bvo van ${opp}m2!`;
        const maatwerk = prompt(maatwerkText);
        return maatwerk ? maatwerk : 0;
    }
}