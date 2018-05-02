export function calculateOutput(input, table) {
    const panden = input['panden'].map(pand => {
        const verblijfsobjecten = calculcateVerblijfsobjecten(pand, table);

        pand['verblijfsobjecten'] = verblijfsobjecten;
        return pand;
    });

    input['panden'] = panden;
    return input;
}

function calculcateVerblijfsobjecten(pand, table) {
    return pand['verblijfsobjecten'].map(verblijfsobject => {
        if(!(verblijfsobject.mutaties && verblijfsobject.mutaties === 'verwijderd')) {
            const verblijfsfuncties = calculateVerblijfsfuncties(verblijfsobject, table);

            verblijfsobject['verblijfsfuncties'] = verblijfsfuncties;
        }
        return verblijfsobject;
    });
}

function calculateVerblijfsfuncties(verblijfsobject, table) {
    return verblijfsobject['verblijfsfuncties'].map(verblijfsfunctie => {
        if(!(verblijfsfunctie.mutaties && verblijfsfunctie.mutaties === 'verwijderd')) {
            console.log(verblijfsfunctie);

            const hoofdfunctieObject = getHoofdfunctieObject(verblijfsfunctie, table);
            const hoofdfunctie = hoofdfunctieObject['hoofdfunctie BAG'];
            const aanvullendeIndelingen = hoofdfunctieObject['aanvullende functies'];
            const aanvullendeIndeling = verblijfsfunctie['aanvullend'] === '' ? aanvullendeIndelingen[0]['functie'] : verblijfsfunctie['aanvullend'];
            const rekenIndicator = hoofdfunctieObject['rekenindicator'];
            const oppervlakte = verblijfsfunctie['oppervlakte']
            const rekenObject = aanvullendeIndelingen.filter(indeling => indeling['functie'] === aanvullendeIndeling)[0];
            const numPersons = calculateNumPersons(rekenIndicator, oppervlakte, rekenObject, verblijfsobject);

            if(verblijfsfunctie['aantal-personen'] !== parseFloat(numPersons) &&
                    !(verblijfsfunctie.mutaties && verblijfsfunctie.mutaties === 'toegevoegd')) {
                verblijfsfunctie['mutaties'] = 'gewijzigd';
            }

            verblijfsfunctie['functie'] = hoofdfunctie;
            verblijfsfunctie['aanvullend'] = aanvullendeIndeling;
            verblijfsfunctie['aantal-personen'] = parseFloat(numPersons);
        }
        return verblijfsfunctie;
    });
}

function getHoofdfunctieObject(verblijfsfunctie, table) {
    const functie = verblijfsfunctie['functie'];
    return table.filter(entry => entry['hoofdfunctie BAG'].toLowerCase().indexOf(functie.toLowerCase()) != -1)[0];
}

function calculateNumPersons(rekenindicator, opp, indelingObject, verblijfsobject) {
    const aantal = indelingObject['aantal'];

    if(rekenindicator === "personen per vbo" && typeof aantal === 'number') {
        return aantal;
    } else if(rekenindicator === "m2 vbo per persoon" && typeof aantal === 'number') {
        return (opp / aantal).toFixed(2);
    } else {
        const straatnaam = verblijfsobject['adres']['openbareruimte'];
        const nr = verblijfsobject['adres']['huisnummer'];
        const letter = verblijfsobject['adres']['huisletter'];
        const toevoeging = verblijfsobject['adres']['huisnummertoevoeging'];
        const postcode = verblijfsobject['adres']['postcode'];
        const woonplaats = verblijfsobject['adres']['woonplaatsnaam'];

        const adres = `${straatnaam} ${nr}${letter}${toevoeging}, ${postcode} ${woonplaats}`;
        const functie = indelingObject['functie'];
        const maatwerkText = `Maatwerk voor: ${adres}. \nVerblijfsfunctie: ${functie}. \n\nVul hier handmatig het aantal personen in voor het bvo van ${opp}m2!`;
        const maatwerk = prompt(maatwerkText);
        return maatwerk ? maatwerk : 0;
    }
}