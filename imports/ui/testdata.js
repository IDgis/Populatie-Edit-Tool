export function getGeoJson() {
    return {
        "type": "FeatureCollection",
        "name": "Test",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::28992" } },
        "features": [
        { "type": "Feature", "properties": { "bijeen": 30.65, "areafract": 1.0, "persnacht": 3.0, "sport": 0.0, "Naam": "04021000001618169", "gezond": 97.72, "woon": 69.77, "kantoor": 0.0, "industrie": 0.0, "persdag": 1.5, "Nodes": 6.0, "cel": 0.0, "winkel": 9.3, "onderwijs": 41.35, "kinder": 72.0, "logies": 0.0 } }
        ]
    }
}

export function getAanvullendeIndelingen() {
    return {
        "Woonfunctie": [
            {"Woonfunctie niet-gezin (<60m2 BVO)": 1.2},
            {"Woonfunctie gezin": 2.4}
        ],
        "Bijeenkomstfunctie": [
            {"Bijeenkomstfunctie klein (personeel en bezoekers)": 5},
            {"Bijeenkomstfunctie groot (personeel en bezoekers)": 5},
            {"Kinderdagverblijf": 10}
        ],
        "Celfunctie": [
            {"Celfunctie (inclusief gehuisvesten)": 40}
        ],
        "Gezondheidsfunctie": [
            {"Gezondheidszorgfunctie (kliniek, artsenpraktijk)": 30},
            {"Gezondheidszorgfunctie (ziekenhuis en verzorgingshuis)": 30}
        ],
        "Industriefunctie": [
            {"Industriefunctie klein (milieucategorie 3.1 en lager)": 50},
            {"Industriefunctie groot (milieucategorie 3.2 en hoger)": 100}
        ],
        "Kantoorfunctie": [
            {"Kantoorfunctie klein": 30},
            {"Kantoorfunctie groot (>6000m2 bvo)": 30},
            {"Kantoorfunctie groot (>6000m2 bvo met atrium, parkeergarage of andere grote collectieve ruimtes)": "maatwerk"}
        ],
        "Logiesfunctie": [
            {"Logiesfunctie klein (personeel en gasten)": 15},
            {"Logiesfunctie groot: hotel (personeel en gasten)": 25}
        ],
        "Onderwijsfunctie": [
            {"Onderwijsfunctie (lager/middelbare/mbo school)": 10},
            {"Onderwijsfunctie (hbo/universiteit)": 10}
        ],
        "Sportfunctie (gebouw)": [
            {"Sportfunctie klein (inclusief bezoekers)": 20},
            {"Sportfunctie groot (inclusief bezoekers)": "maatwerk"}
        ],
        "Winkelfunctie": [
            {"Winkelfunctie (inclusief bezoekers) klein": 10},
            {"Winkelfunctie (inclusief bezoekers) groot: bouwmarkt, tuincentrum, megastore": "maatwerk"}
        ]
    }
}