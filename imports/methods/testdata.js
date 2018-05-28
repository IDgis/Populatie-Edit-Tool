export function getTabel() {
    return [
        {
            "hoofdfunctie BAG": "Woonfunctie",
            "rekenindicator": "personen per vbo",
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
            "rekenindicator": "m2 vbo per persoon",
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
                }
            ]
        },
        {
            "hoofdfunctie BAG": "Kinderdagverblijf",
            "rekenindicator": "m2 vbo per persoon",
            "aanvullende functies": [
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
            "rekenindicator": "m2 vbo per persoon",
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
            "rekenindicator": "m2 vbo per persoon",
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
            "rekenindicator": "m2 vbo per persoon",
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
            "rekenindicator": "m2 vbo per persoon",
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
            "rekenindicator": "m2 vbo per persoon",
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
            "rekenindicator": "m2 vbo per persoon",
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
            "rekenindicator": "m2 vbo per persoon",
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
            "rekenindicator": "m2 vbo per persoon",
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
            "rekenindicator": "m2 vbo per persoon",
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
            "rekenindicator": "m2 vbo per persoon",
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