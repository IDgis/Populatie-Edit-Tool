export function getInputJson() {
    return {
        "panden": [{
            "pandid": "0402010001618440",
            "verblijfsobjecten": [
                {
                    "verblijfsobjectid": "0402010001618442",
                    "adres": {
                        "identificatie": "0402010001618444",
                        "openbareruimte": "Egelantierstraat",
                        "huisnummer": 17,
                        "huisletter": "",
                        "huisnummertoevoeging": "",
                        "postcode": "1214EH",
                        "woonplaatsnaam": "Hilversum"
                    },
                    "oppervlakte": 274,
                    "verblijfsfuncties": [
                        {
                            "oppervlakte": 99,
                            "functie": "woon",
                            "aantal-personen": 2.4,
                            "aanvullend": "Woonfunctie gezin"
                        },
                        {
                            "oppervlakte": 175,
                            "functie": "gezond",
                            "aantal-personen": 60,
                            "aanvullend": ""
                        }
                    ]
                },
                {
                    "verblijfsobjectid": "0402010001618446",
                    "adres": {
                        "identificatie": "0402010001618448",
                        "openbareruimte": "Egelantierstraat",
                        "huisnummer": 19,
                        "huisletter": "",
                        "huisnummertoevoeging": "",
                        "postcode": "1214EH",
                        "woonplaatsnaam": "Hilversum"
                    },
                    "oppervlakte": 175,
                    "verblijfsfuncties": [{
                        "oppervlakte": 99,
                        "functie": "bijeen",
                        "aantal-personen": 15,
                        "aanvullend": ""
                    }]
                }
            ]
        }]
    }
}

export function getTabel() {
    return [
        {
            "hoofdfunctie BAG": "Woonfunctie",
            "aanvullende functies": [
                {
                    "functie": "Woonfunctie niet-gezin (<60 m2 bvo)",
                    "aantal": 1.2,
                    "dag": 50,
                    "avond": 100,
                    "nacht": 100
                },
                {
                    "functie": "Woonfunctie gezin",
                    "aantal": 2.4,
                    "dag": 50,
                    "avond": 100,
                    "nacht": 100
                }
            ]
        },
        {
            "hoofdfunctie BAG": "Bijeenkomstfunctie",
            "aanvullende functies": [
                {
                    "functie": "Bijeenkomstfunctie klein (personeel en bezoekers)",
                    "aantal": 5,
                    "dag": 100,
                    "avond": 100,
                    "nacht": 100
                },
                {
                    "functie": "Bijeenkomstfunctie groot (personeel en bezoekers)",
                    "aantal": 5,
                    "dag": 100,
                    "avond": 100,
                    "nacht": 100
                },
                {
                    "functie": "Kinderdagverblijf",
                    "aantal": 10,
                    "dag": 100,
                    "avond": 0,
                    "nacht": 0
                }
            ]
        },
        {
            "hoofdfunctie BAG": "Celfunctie",
            "aanvullende functies": [
                {
                    "functie": "Celfunctie (inclusief gehuisvesten)",
                    "aantal": 40,
                    "dag": 100,
                    "avond": 100,
                    "nacht": 100
                }
            ]
        },
        {
            "hoofdfunctie BAG": "Gezondheidsfunctie",
            "aanvullende functies": [
                {
                    "functie": "Gezondheidsfunctie (kliniek, artsenpraktijk)",
                    "aantal": 30,
                    "dag": 100,
                    "avond": 0,
                    "nacht": 0
                },
                {
                    "functie": "Gezondheidsfunctie (ziekenhuis en verzorgingshuis)",
                    "aantal": 30,
                    "dag": 100,
                    "avond": 100,
                    "nacht": 60
                }
            ]
        },
        {
            "hoofdfunctie BAG": "Industriefunctie",
            "aanvullende functies": [
                {
                    "functie": "Industriefunctie klein (milieucategorie 3.1 en lager)",
                    "aantal": 50,
                    "dag": 100,
                    "avond": 0,
                    "nacht": 0
                },
                {
                    "functie": "Industriefunctie groot (milieucategorie 3.2 en hoger)",
                    "aantal": "100 (maatwerk)",
                    "dag": 100,
                    "avond": "maatwerk",
                    "nacht": "maatwerk"
                }
            ]
        },
        {
            "hoofdfunctie BAG": "Kantoorfunctie",
            "aanvullende functies": [
                {
                    "functie": "Kantoorfunctie klein",
                    "aantal": 30,
                    "dag": 100,
                    "avond": 0,
                    "nacht": 0
                },
                {
                    "functie": "Kantoorfunctie groot (>6000m2 bvo)",
                    "aantal": 30,
                    "dag": 100,
                    "avond": 20,
                    "nacht": 0
                },
                {
                    "functie": "Kantoorfunctie groot (>6000m2 bvo met atrium, parkeergarage of andere grote collectieve ruimtes",
                    "aantal": "maatwerk",
                    "dag": 100,
                    "avond": 20,
                    "nacht": "maatwerk"
                }
            ]
        },
        {
            "hoofdfunctie BAG": "Logiesfunctie",
            "aanvullende functies": [
                {
                    "functie": "Logiesfunctie klein (personeel en gasten)",
                    "aantal": 15,
                    "dag": 20,
                    "avond": 20,
                    "nacht": 100
                },
                {
                    "functie": "Logiesfunctie groot: hotel (personeel en gasten)",
                    "aantal": 25,
                    "dag": 50,
                    "avond": 50,
                    "nacht": 100
                }
            ]
        },
        {
            "hoofdfunctie BAG": "Onderwijsfunctie",
            "aanvullende functies": [
                {
                    "functie": "Onderwijsfunctie (lagere/middelbare/mbo school)",
                    "aantal": 10,
                    "dag": 100,
                    "avond": 20,
                    "nacht": 0
                },
                {
                    "functie": "Onderwijsfunctie (hbo/universiteit)",
                    "aantal": 10,
                    "dag": 100,
                    "avond": 50,
                    "nacht": 0
                }
            ]
        },
        {
            "hoofdfunctie BAG": "Sportfunctie (gebouw)",
            "aanvullende functies": [
                {
                    "functie": "Sportfunctie klein (inclusief bezoekers)",
                    "aantal": 20,
                    "dag": 100,
                    "avond": 100,
                    "nacht": 0
                },
                {
                    "functie": "Sportfunctie groot (inclusief bezoekers)",
                    "aantal": "maatwerk",
                    "dag": 100,
                    "avond": 100,
                    "nacht": 0
                }
            ]
        },
        {
            "hoofdfunctie BAG": "Winkelfunctie",
            "aanvullende functies": [
                {
                    "functie": "Winkelfunctie (inclusief bezoekers) klein",
                    "aantal": 10,
                    "dag": 100,
                    "avond": 0,
                    "nacht": 0
                },
                {
                    "functie": "Winkelfunctie (inclusief bezoekers) groot: bouwmarkt, tuincentrum, megastore",
                    "aantal": "maatwerrk",
                    "dag": 100,
                    "avond": 20,
                    "nacht": 0
                }
            ]
        },
        {
            "hoofdfunctie BAG": "Gerealiseerde evenemententerreinen",
            "aanvullende functies": [
                {
                    "functie": "Terugkerend evenement (stadion, partycentrum, aangewezen evenemententerrein)",
                    "aantal": "maatwerk",
                    "dag": "maatwerk",
                    "avond": "maatwerk",
                    "nacht": "maatwerk"
                }
            ]
        },
        {
            "hoofdfunctie BAG": "Gerealiseerde recreatie-terreinen",
            "aanvullende functies": [
                {
                    "functie": "Volkstuin, dierentuin, pretpark",
                    "aantal": "maatwerk",
                    "dag": 100,
                    "avond": "maatwerk",
                    "nacht": 0
                }
            ]
        }
    ]
}