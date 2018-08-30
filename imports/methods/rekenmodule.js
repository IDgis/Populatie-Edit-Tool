/**
 * Calculates the number of persons for the entire input object
 * 
 * @param {Object} input The input JSON
 * @param {Object} table The table with all BAG data
 */
export function calculateOutput(input, table) {
    const panden = input['panden'].map(pand => {
        const verblijfsobjecten = calculcateVerblijfsobjecten(pand, table);
        const totalArea = calculateTotalArea(pand);

        pand['verblijfsobjecten'] = verblijfsobjecten;
        pand['geregistreerd totaal bruto vloeroppervlak'] = totalArea;
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
    const huishoudensgrootte = pand['huishoudensgrootte'];
    return pand['verblijfsobjecten'].map(verblijfsobject => {
        if(!(verblijfsobject.mutatie && verblijfsobject.mutatie === 'verwijderd')) {
            const verblijfsfuncties = calculateVerblijfsfuncties(verblijfsobject, table, huishoudensgrootte);
            const totalArea = calculateVerblijfsObjectArea(verblijfsfuncties);

            verblijfsobject['verblijfsfuncties'] = verblijfsfuncties;
            verblijfsobject['Oppervlakte'] = totalArea;
        }
        return verblijfsobject;
    });
}

/**
 * Calculates the number of persons for the entire Verblijfsobject object
 * 
 * @param {Object} verblijfsobject The verblijfsobject within the Pand JSON
 * @param {Object} table The table with all BAG data
 * @param {Number} huishoudensgrootte The huishoudensgrootte to calculate
 */
function calculateVerblijfsfuncties(verblijfsobject, table, huishoudensgrootte) {
    return verblijfsobject['verblijfsfuncties'].map(verblijfsfunctie => {
        if(!(verblijfsfunctie.mutatie && verblijfsfunctie.mutatie === 'verwijderd')) {
            const hoofdfunctieObject = getHoofdfunctieObject(verblijfsfunctie, table);
            const hoofdfunctie = hoofdfunctieObject['hoofdfunctie BAG'];
            const aanvullendeIndelingen = hoofdfunctieObject['aanvullende functies'];
            const aanvullendeIndeling = verblijfsfunctie['aanvullend'] === '' ? aanvullendeIndelingen[0]['functie'] : verblijfsfunctie['aanvullend'];
            const numPersons = calculateNumPersons(verblijfsfunctie, huishoudensgrootte, hoofdfunctieObject);

            if(verblijfsfunctie['aantal-personen'] !== parseFloat(numPersons) &&
                    !(verblijfsfunctie.mutatie && verblijfsfunctie.mutatie === 'toegevoegd')) {
                verblijfsfunctie['mutatie'] = 'gewijzigd';
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
 * @param {Object} verblijfsfunctie The verblijfsfunctie of which the number of persons are calculated
 * @param {Number} huishoudensgrootte The huishoudensgrootte to calculate
 * @param {Object} hoofdfunctieBag The hoofdfunctie BAG from the rekentabel
 */
function calculateNumPersons(verblijfsfunctie, huishoudensgrootte, hoofdfunctieBag) {
    const defaultAantal = verblijfsfunctie['aantal-personen'];
    const aanvullendeIndelingenBag = hoofdfunctieBag['aanvullende functies'];
    const aanvullendeIndelingBag = verblijfsfunctie.aanvullend === '' ? aanvullendeIndelingenBag[0]['functie'] : verblijfsfunctie.aanvullend;
    const rekenindicator = hoofdfunctieBag.rekenindicator;
    const oppervlakte = verblijfsfunctie.Oppervlakte;
    const aanvullendeIndelingObject = aanvullendeIndelingenBag.filter(indeling => indeling.functie === aanvullendeIndelingBag)[0];
    const rekenfactor = aanvullendeIndelingObject.aantal;

    if (aanvullendeIndelingObject.functie === "Woonfunctie gezin" && huishoudensgrootte > 0.0) {
        return huishoudensgrootte;
    } else if (rekenindicator === "personen per vbo" && typeof rekenfactor === 'number') {
        return rekenfactor;
    } else if (rekenindicator === "m2 vbo per persoon" && typeof rekenfactor === 'number') {
        let numDecimals = 2;
        if (defaultAantal > 0.0) {
            const tempAantal = defaultAantal.toString();
            if (tempAantal.indexOf('.') != -1) {
                numDecimals = tempAantal.split('.')[1].length;
            }
        }
        
        return (oppervlakte / rekenfactor).toFixed(numDecimals);
    } else {
        // Maatwerk, return default aantal-personen. Edit in Verblijfsfunctie itself
        return defaultAantal;
    }
}

/**
 * Calculate the total oppervlakte for a Pand based on all oppervlaktes of the Verblijfsobjecten
 * 
 * @param {Object} pand The pand to calculate the total area based on the Verblijfsobjecten
 */
function calculateTotalArea(pand) {
    let totalArea = 0;

    pand.verblijfsobjecten.forEach(verblijfsobject => {
        totalArea += parseFloat(verblijfsobject['Oppervlakte']);
    });

    return totalArea;
}

/**
 * Calculate the total oppervlakte for a Verblijfsobject based on all oppervlaktes of the Verblijfsfuncties
 * 
 * @param {Array} verblijfsfuncties An array of all Verblijfsfuncties for a Verblijfsobject
 */
function calculateVerblijfsObjectArea(verblijfsfuncties) {
    let totalArea = 0;

    verblijfsfuncties.forEach(verblijfsfunctie => {
        if(isVerblijfsfunctiePresent(verblijfsfunctie)) {
            totalArea += parseFloat(verblijfsfunctie['Oppervlakte']);
        }
    });

    return totalArea;
}

/**
 * Check whether a verblijfsfunctie isn't removed from a verblijfsobject
 * 
 * @param {Object} functie The verblijfsfunctie to check
 */
function isVerblijfsfunctiePresent(functie) {
    return (!functie.mutatie || (functie.mutatie && functie.mutatie !== 'verwijderd'));
}