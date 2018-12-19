export default {
  'default': {
    'id': 'default',
    'name': 'Default',
    'ta': 18,
    'outboundWaypoints': [
      'LAIKA',
      'PLM',
      'DAVOT',
      'EZOS',
      'EDOS'
    ],
    'inboundWaypoints': [
      'EVKOS',
      'ELROS',
      'KTDOS',
      'QEDOS'
    ],
    'ga': 1,
    'commercial': 1,
    'waypoints': {
      'EVKOS': {
        'x': 0,
        'y': 360,
        'class': 'intersection'
      },
      'QEDOS': {
        'x': 1280,
        'y': 400,
        'class': 'intersection'
      },
      'KTDOS': {
        'x': 250,
        'y': 0,
        'class': 'intersection'
      },
      'EKOS': {
        'x': 20,
        'y': 20,
        'class': 'intersection'
      },
      'EDOS': {
        'x': 20,
        'y': 720,
        'class': 'intersection'
      },
      'ELROS': {
        'x': 1280,
        'y': 710,
        'class': 'intersection'
      },
      'EBOS': {
        'x': 100,
        'y': 600,
        'class': 'intersection'
      },
      'ESOS': {
        'x': 1200,
        'y': 90,
        'class': 'intersection'
      },
      'ELOS': {
        'x': 220,
        'y': 200,
        'class': 'intersection'
      },
      'EZOS': {
        'x': 1270,
        'y': 0,
        'class': 'intersection'
      },
      'EDROS': {
        'x': 290,
        'y': 820,
        'class': 'intersection'
      },
      'KOS': {
        'x': 80,
        'y': 90,
        'class': 'ndb'
      },
      'PLM': {
        'x': 1280,
        'y': 70,
        'class': 'vor/dme'
      },
      'DAVOT': {
        'x': 0,
        'y': 90,
        'class': 'intersection'
      },
      'LAIKA': {
        'x': 900,
        'y': 0,
        'class': 'intersection'
      },
      'RUNAW': {
        'x': 30,
        'y': 0,
        'class': 'intersection'
      },
      'EH11': {
        'x': 623.268587103299,
        'y': 111.60881397780415,
        'class': 'intersection'
      },
      'EH13': {
        'x': 666.731412896701,
        'y': 608.3911860221958,
        'class': 'intersection'
      },
      'EH26': {
        'x': 635.2208641964845,
        'y': 248.22396629001187,
        'class': 'intersection'
      },
      'EH9': {
        'x': 659.1254183828556,
        'y': 521.4542709144273,
        'class': 'intersection'
      }
    },
    'sids': {
      'LAIKA1': '18->EH26->EH11->LAIKA',
      'PLM1': '36->EH26->EH11->PLM',
      'EZOS1': '36->EH26->EH11->EZOS',
      'DAVOT1': '36->EH26->EH11->DAVOT',
      'EDOS1': '36->EH26->EH11->EDOS',
      'LAIKA2': '36->EH9->EH13->LAIKA',
      'PLM2': '36->EH9->EH13->PLM',
      'EZOS2': '36->EH9->EH13->EZOS',
      'DAVOT2': '36->EH9->EH13->DAVOT',
      'EDOS2': '36->EH9->EH13->EDOS'
    },
    'stars': {
      'EVKOS1': 'EVKOS->EH13->EH9/3000->18',
      'ELROS1': 'ELROS->EH13->EH9/3000->18',
      'KTDOS1': 'KTDOS->EH13->EH9/3000->18',
      'QEDOS1': 'QEDOS->EH13->EH9/3000->18',
      'EVKOS2': 'EVKOS->EH11->EH26/3000->36',
      'ELROS2': 'ELROS->EH11->EH26/3000->36',
      'KTDOS2': 'KTDOS->EH11->EH26/3000->36',
      'QEDOS2': 'QEDOS->EH11->EH26/3000->36',
    },
    'msa': {
      'base': [
        {
          'dir': 360,
          'alt': 2000
        }
      ],
      'polygons': []
    },
    'airport': {
      'blacklist': [],
      'elevation': 22,
      'rwyusage': [
        {
          'dir': 95,
          'rwys': [
            '18'
          ]
        },
        {
          'dir': 275,
          'rwys': [
            '36'
          ]
        }
      ],
      'callsign': 'EHZM',
      'x': 0,
      'y': 0,
      'class': 'intersection',
      'runways': [
        {
          'x': 5,
          'y': 0,
          'class': 'intersection',
          'length': 12467,
          'length1': 12467,
          'length2': 12467,
          'surface': 'asphalt',
          'size': 150,
          'hdg1': 5,
          'hdg2': 185,
          'labelSpread1': 1.1,
          'labelSpread2': 1.1,
          'elevation1': 25,
          'elevation2': 23,
          'name1': '36',
          'name2': '18'
        }
      ]
    }
  },
  'heathrow': {
    'ta': 6,
    'id': 'heathrow',
    'name': 'Heathrow',
    'ga': 0,
    'commercial': 1,
    'outboundWaypoints': [
      'FOS',
      'BIG',
      'LAM'
    ],
    'inboundWaypoints': [
      'BLC',
      'BENSU',
      'EPM',
      'LCY'
    ],
    'waypoints': {
      'BLC': {
        'x': 40,
        'y': 0,
        'class': 'intersection'
      },
      'WOD': {
        'x': 0,
        'y': 400,
        'class': 'intersection'
      },
      'BENSU': {
        'x': 0,
        'y': 600,
        'class': 'intersection'
      },
      'BUR': {
        'x': 100,
        'y': 500,
        'class': 'intersection'
      },
      'FRK': {
        'x': 550,
        'y': 20,
        'class': 'intersection'
      },
      'FOS': {
        'x': 580,
        'y': 0,
        'class': 'intersection'
      },
      'OCK': {
        'x': 640,
        'y': 0,
        'class': 'intersection'
      },
      'EPM': {
        'x': 730,
        'y': 0,
        'class': 'intersection'
      },
      'BIG': {
        'x': 1280,
        'y': 0,
        'class': 'intersection'
      },
      'LCY': {
        'x': 1280,
        'y': 360,
        'class': 'intersection'
      },
      'LAM': {
        'x': 1280,
        'y': 720,
        'class': 'intersection'
      },
      'GOXUL': {
        'x': 900,
        'y': 90,
        'class': 'intersection'
      },
      'FINCH': {
        'x': 880,
        'y': 800,
        'class': 'intersection'
      },
      'CHT': {
        'x': 600,
        'y': 1050,
        'class': 'intersection'
      },
      'D175F': {
        'x': 680,
        'y': 220,
        'class': 'intersection'
      },
      'EGWU': {
        'x': 690,
        'y': 960,
        'class': 'intersection'
      },
      'RICHY': {
        'x': 939.9543085469174,
        'y': 344.7642780688151
      },
      'BARNS': {
        'x': 939.9543085469174,
        'y': 364.7642780688151
      },
      'WINSR': {
        'x': 340.0456914530826,
        'y': 355.235721931185
      },
      'MARLO': {
        'x': 340.0456914530826,
        'y': 375.235721931185
      },
      '40LO2': {
        'x': 490.0228457265413,
        'y': 352.6178609655925
      },
      '40LOC': {
        'x': 490.0228457265413,
        'y': 372.6178609655925
      },
      '40LO3': {
        'x': 789.9771542734587,
        'y': 347.38213903440754
      }
    },
    'msa': {
      'base': [
        {
          'dir': 360,
          'alt': 2000
        }
      ],
      'polygons': []
    },
    sids: {},
    stars: {},
    'airport': {
      'elevation': 77,
      'blacklist': [],
      'rwyusage': [
        {
          'dir': 1,
          'rwys': [
            '09R',
            '09L'
          ]
        },
        {
          'dir': 181,
          'rwys': [
            '27R',
            '27L'
          ]
        }
      ],
      'callsign': 'EGLL',
      'x': 0,
      'y': 0,
      'class': 'intersection',
      'runways': [
        {
          'x': 0,
          'y': -10,
          'length': 12802,
          'length1': 12802,
          'length2': 12802,
          'surface': 'asphalt',
          'size': 164,
          'hdg1': 91,
          'hdg2': 271,
          'name1': '09R',
          'name2': '27L',
          'elevation1': 77,
          'elevation2': 77,
          'labelSpread1': 1.1,
          'labelSpread2': 1.1
        },
        {
          'x': 0,
          'y': 10,
          'length': 12008,
          'length1': 12008,
          'length2': 12008,
          'surface': 'asphalt',
          'size': 164,
          'hdg1': 91,
          'hdg2': 271,
          'name1': '09L',
          'name2': '27R',
          'elevation1': 77,
          'elevation2': 77,
          'labelSpread1': 1.1,
          'labelSpread2': 1.1
        }
      ]
    }
  },
  'klax': {
    'ta': 6,
    'id': 'klax',
    'name': 'Los Angeles',
    'ga': 0,
    'commercial': 1,
    'outboundWaypoints': [
      'LIMBO',
      'WEEZL',
      'ELMOO',
      'VNY'
    ],
    'inboundWaypoints': [
      'VTU',
      'DOYLE',
      'SLI',
      'BERRI'
    ],
    'waypoints': {
      'VTU': {
        'x': 0,
        'y': 650,
        'class': 'vor/dme'
      },
      'SADDE': {
        'x': 200,
        'y': 550,
        'class': 'vor/dme'
      },
      'WEEZL': {
        'x': 0,
        'y': 320,
        'class': 'intersection'
      },
      'EXERT': {
        'x': 155.726924179339,
        'y': 309.0653282974263,
        'class': 'intersection'
      },
      'MERMA': {
        'x': 304.6088469255373,
        'y': 327.34572980819837,
        'class': 'intersection'
      },
      'DOWNE': {
        'x': 949.7638454923966,
        'y': 406.56080302154413,
        'class': 'intersection'
      },
      'DODGER': {
        'x': 920,
        'y': 370,
        'class': 'intersection'
      },
      'VNY': {
        'x': 600,
        'y': 720,
        'class': 'vor/dme'
      },
      'BERRI': {
        'x': 700,
        'y': 720,
        'class': 'intersection'
      },
      'SLI': {
        'x': 1280,
        'y': 120,
        'class': 'vor/dme'
      },
      'LIMBO': {
        'x': 640,
        'y': 0,
        'class': 'intersection'
      },
      'DOYLE': {
        'x': 100,
        'y': 0,
        'class': 'intersection'
      },
      'TANDY': {
        'x': 250,
        'y': 0,
        'class': 'intersection'
      },
      'INISH': {
        'x': 450,
        'y': 0,
        'class': 'intersection'
      },
      'ELMOO': {
        'x': 1280,
        'y': 620,
        'class': 'intersection'
      },
      'NATHN': {
        'x': 439.4907696717356,
        'y': 345.6261313189705,
        'class': 'intersection'
      },
      'OTTES': {
        'x': 441.4907696717356,
        'y': 343.6261313189705,
        'class': 'intersection',
        'textRotation': 1
      },
      'FEKIL': {
        'x': 451.4907696717356,
        'y': 327.6261313189705,
        'class': 'intersection'
      },
      'TIMSE': {
        'x': 453.4907696717356,
        'y': 325.6261313189705,
        'class': 'intersection',
        'textRotation': 1
      },
      'SUTIE': {
        'x': 808.7328457790247,
        'y': 388.717788378875,
        'class': 'intersection',
        'textRotation': 1
      },
      'JETSA': {
        'x': 806.7328457790247,
        'y': 390.717788378875,
        'class': 'intersection'
      },
      'LIMMA': {
        'x': 820.7328457790247,
        'y': 370.717788378875,
        'class': 'intersection',
        'textRotation': 1
      },
      'FOGLA': {
        'x': 818.7328457790247,
        'y': 372.717788378875,
        'class': 'intersection'
      }
    },
    sids: {},
    stars: {},
    'msa': {
      'base': [
        {
          'dir': 360,
          'alt': 2000
        }
      ],
      'polygons': []
    },
    'routes': {},
    'airport': {
      'blacklist': [],
      'elevation': 127,
      'rwyusage': [
        {
          'dir': 1,
          'rwys': [
            '07L',
            '07R',
            '06L',
            '06R'
          ]
        },
        {
          'dir': 181,
          'rwys': [
            '25L',
            '25R',
            '24L',
            '24R'
          ]
        }
      ],
      'callsign': 'KLAX',
      'x': 0,
      'y': 0,
      'runways': [
        {
          'x': 10,
          'y': -8,
          'length': 12923,
          'length1': 12923,
          'length2': 12923,
          'surface': 'asphalt',
          'size': 150,
          'hdg1': 83,
          'hdg2': 263,
          'name1': '07L',
          'name2': '25R',
          'elevation1': 115,
          'elevation2': 94,
          'labelSpread1': 1.1,
          'labelSpread2': 1.1
        },
        {
          'x': 12,
          'y': -10,
          'length': 11095,
          'length1': 11095,
          'length2': 11095,
          'surface': 'asphalt',
          'size': 200,
          'hdg1': 83,
          'hdg2': 263,
          'name1': '07R',
          'name2': '25L',
          'elevation1': 121,
          'elevation2': 97,
          'labelSpread1': 1.1,
          'labelSpread2': 1.1
        },
        {
          'x': 0,
          'y': 8,
          'length': 10885,
          'length1': 10885,
          'length2': 10885,
          'surface': 'concrete',
          'size': 150,
          'hdg1': 83,
          'hdg2': 263,
          'name1': '06R',
          'name2': '24L',
          'elevation1': 110,
          'elevation2': 113,
          'labelSpread1': 1.1,
          'labelSpread2': 1.1
        },
        {
          'x': -2,
          'y': 10,
          'length': 8926,
          'length1': 8926,
          'length2': 8926,
          'surface': 'asphalt',
          'size': 150,
          'hdg1': 83,
          'hdg2': 263,
          'name1': '06L',
          'name2': '24R',
          'elevation1': 113,
          'elevation2': 119,
          'labelSpread1': 1.1,
          'labelSpread2': 1.1
        }
      ]
    }
  },
  'schiphol': {
    'id': 'schiphol',
    'name': 'Schiphol',
    'ga': 0,
    'ta': 3,
    'commercial': 1,
    'outboundWaypoints': [
      'EH610',
      'SPY',
      'OMORU',
      'IVLET'
    ],
    'inboundWaypoints': [
      'EH040',
      'LILSI',
      'SUSET',
      'TULIP'
    ],
    'waypoints': {
      'NV': {
        'x': 670,
        'y': 5,
        'class': 'intersection'
      },
      'CH': {
        'x': 400,
        'y': 100,
        'class': 'intersection'
      },
      'EKROS': {
        'x': 500,
        'y': 150,
        'class': 'intersection'
      },
      'BASNO': {
        'x': 410,
        'y': 390,
        'class': 'intersection'
      },
      'EH040': {
        'x': 300,
        'y': 10,
        'class': 'intersection'
      },
      'EH610': {
        'x': 15,
        'y': 100,
        'class': 'intersection'
      },
      'SPY': {
        'x': 400,
        'y': 720,
        'class': 'intersection'
      },
      'OA': {
        'x': 640,
        'y': 550,
        'class': 'intersection'
      },
      'LILSI': {
        'x': 1280,
        'y': 600,
        'class': 'intersection'
      },
      'PAM': {
        'x': 600,
        'y': 360,
        'class': 'intersection'
      },
      'OMORU': {
        'x': 1280,
        'y': 360,
        'class': 'intersection'
      },
      'IVLET': {
        'x': 1280,
        'y': 200,
        'class': 'intersection'
      },
      'SUSET': {
        'x': 1100,
        'y': 20,
        'class': 'intersection'
      },
      'TULIP': {
        'x': 5,
        'y': 640,
        'class': 'intersection'
      },
      'EH639': {
        'x': 794.794430213186,
        'y': 387.85039343644166
      },
      'EH633': {
        'x': 605.3459322519757,
        'y': 80.38373026871932
      },
      'EH635': {
        'x': 645.3459322519757,
        'y': 73.38373026871932
      },
      'EH126': {
        'x': 585.3459322519757,
        'y': 100.38373026871932
      },
      'EH642': {
        'x': 365.3837302687193,
        'y': 365.3459322519757
      },
      'EH047': {
        'x': 611.5139103734476,
        'y': 599.6984976460062
      },
      'EH626': {
        'x': 634.6540677480242,
        'y': 639.6162697312807
      },
      'EH616': {
        'x': 404.5465330762007,
        'y': 201.62260601470263
      },
      'EH654': {
        'x': 879.4534669237993,
        'y': 498.37739398529743
      }
    },
    'msa': {
      'base': [
        {
          'dir': 360,
          'alt': 2000
        }
      ],
      'polygons': []
    },
    sids: {},
    stars: {},
    'airport': {
      'blacklist': [],
      'elevation': -11,
      'rwyusage': [
        {
          'dir': 45,
          'rwys': [
            '09'
          ]
        },
        {
          'dir': 135,
          'rwys': [
            '36L',
            '36C'
          ]
        },
        {
          'dir': 220,
          'rwys': [
            '24',
            '27'
          ]
        },
        {
          'dir': 330,
          'rwys': [
            '18L',
            '36R'
          ]
        }
      ],
      'callsign': 'EHAM',
      'x': 0,
      'y': 0,
      'class': 'intersection',
      'runways': [
        {
          'x': -40,
          'y': 20,
          'length': 12468,
          'length1': 12468,
          'length2': 12468,
          'surface': 'asphalt',
          'size': 164,
          'hdg1': 3,
          'hdg2': 183,
          'name1': '36L',
          'name2': '18R',
          'elevation1': -11,
          'elevation2': -11,
          'labelSpread1': 1.2,
          'labelSpread2': 1.2
        },
        {
          'x': 2,
          'y': -10,
          'length': 11483,
          'length1': 11483,
          'length2': 11483,
          'surface': 'asphalt',
          'size': 164,
          'hdg1': 58,
          'hdg2': 238,
          'name1': '06',
          'name2': '24',
          'elevation1': -11,
          'elevation2': -11,
          'labelSpread1': 1,
          'labelSpread2': 0.5
        },
        {
          'x': 5,
          'y': 20,
          'class': 'intersection',
          'length': 11329,
          'length1': 11329,
          'length2': 11329,
          'surface': 'asphalt',
          'size': 164,
          'hdg1': 87,
          'hdg2': 267,
          'name1': '09',
          'name2': '27',
          'elevation1': -11,
          'elevation2': -11,
          'labelSpread1': 2,
          'labelSpread2': 2
        },
        {
          'x': 20,
          'y': -7,
          'length': 11155,
          'length1': 11155,
          'length2': 11155,
          'surface': 'asphalt',
          'size': 164,
          'hdg1': 3,
          'hdg2': 183,
          'name1': '36R',
          'name2': '18L',
          'elevation1': -11,
          'elevation2': -11,
          'labelSpread1': 2,
          'labelSpread2': 3
        },
        {
          'x': -20,
          'y': 0,
          'length': 10827,
          'length1': 10827,
          'length2': 10827,
          'surface': 'asphalt',
          'size': 164,
          'hdg1': 3,
          'hdg2': 183,
          'name1': '36C',
          'name2': '18C',
          'elevation1': -11,
          'elevation2': -11,
          'labelSpread1': 2,
          'labelSpread2': 2
        },
        {
          'x': 35,
          'y': -5,
          'length': 10827,
          'length1': 10827,
          'length2': 10827,
          'surface': 'asphalt',
          'size': 164,
          'hdg1': 41,
          'hdg2': 221,
          'name1': '04',
          'name2': '22',
          'elevation1': -11,
          'elevation2': -11,
          'labelSpread1': 1,
          'labelSpread2': 1.4
        }
      ]
    }
  },
  'kpsp': {
    'id': 'kpsp',
    'name': 'Palm Springs Intl',
    'ga': 0,
    'ta': 18,
    'commercial': 1,
    'outboundWaypoints': [
      'HENOM',
      'OKACO',
      'ARRAN',
      'TANNR'
    ],
    'inboundWaypoints': [
      'MOMAR',
      'CLOWD',
      'DAWNA',
      'SETER'
    ],
    'waypoints': {
      'HENOM': {
        'x': 1200,
        'y': 0,
        'class': 'intersection'
      },
      'MOMAR': {
        'x': 1280,
        'y': 60,
        'class': 'intersection'
      },
      'TRM': {
        'x': 940,
        'y': 170,
        'class': 'intersection'
      },
      'CLOWD': {
        'x': 1280,
        'y': 380,
        'class': 'intersection'
      },
      'CONES': {
        'x': 1200,
        'y': 280,
        'class': 'intersection'
      },
      'SBONO': {
        'x': 1160,
        'y': 370,
        'class': 'intersection'
      },
      'STOWN': {
        'x': 1000,
        'y': 520,
        'class': 'intersection'
      },
      'OKACO': {
        'x': 610,
        'y': 720,
        'class': 'intersection'
      },
      'YUCCA': {
        'x': 640,
        'y': 550,
        'class': 'intersection'
      },
      'FERNN': {
        'x': 600,
        'y': 490,
        'class': 'intersection'
      },
      'PSP': {
        'x': 650,
        'y': 450,
        'class': 'intersection'
      },
      'EMRUD': {
        'x': 850,
        'y': 360,
        'class': 'intersection'
      },
      'DEZZY': {
        'x': 740,
        'y': 370,
        'class': 'intersection'
      },
      'BITTY': {
        'x': 40,
        'y': 590,
        'class': 'intersection'
      },
      'REANS': {
        'x': 0,
        'y': 500,
        'class': 'intersection'
      },
      'DAWNA': {
        'x': 50,
        'y': 720,
        'class': 'intersection'
      },
      'ARRAN': {
        'x': 0,
        'y': 670,
        'class': 'intersection'
      },
      'SETER': {
        'x': 0,
        'y': 360,
        'class': 'intersection'
      },
      'MORON': {
        'x': 300,
        'y': 500,
        'class': 'intersection'
      },
      'DEWAY': {
        'x': 310,
        'y': 440,
        'class': 'intersection'
      },
      'BANDS': {
        'x': 200,
        'y': 410,
        'class': 'intersection'
      },
      'AHLEX': {
        'x': 380,
        'y': 410,
        'class': 'intersection'
      },
      'HEMET': {
        'x': 180,
        'y': 150,
        'class': 'intersection'
      },
      'TANNR': {
        'x': 0,
        'y': 0,
        'class': 'intersection'
      }
    },
    'msa': {
      'base': [
        {
          'dir': 0,
          'alt': 6900
        },
        {
          'dir': 90,
          'alt': 7900
        },
        {
          'dir': 180,
          'alt': 12100
        }
      ],
      'polygons': [
        {
          'alt': 12000,
          'vertices': [[0, 400], [400, 400], [475, 460], [550, 400], [570, 300], [940, 0], [0, 0]]
        },
        {
          'alt': 7000,
          'vertices': [[0, 400], [400, 400], [475, 460], [550, 400], [500, 500], [540, 570], [560, 720], [0, 720]]
        },
        {
          'alt': 5000,
          'vertices': [[540, 570], [700, 530], [920, 330], [1280, 180], [1280, 720], [560, 720]]
        },
        {
          'alt': 3000,
          'vertices': [[550, 400], [560, 500], [700, 530], [540, 570], [500, 500]]
        }
      ]
    },
    stars: {
      CLOWD1: 'CLOWD->TRM',
      SBONO1: 'SBONO->CLOWD->TRM',
      SIZLR3: 'BITTY->MORON->FERNN-PSP->DEZZY'
    },
    sids: {
      TRM6: 'DEZZY->TRM',
      'CATH1': 'EMRUD->DEZZY->PSP',
    },
    'airport': {
      'blacklist': ['super', 'heavy'],
      'elevation': 476,
      'rwyusage': [
        {
          'dir': 40,
          'rwys': [
            '13L',
            '13R'
          ]
        },
        {
          'dir': 220,
          'rwys': [
            '31L',
            '31R'
          ]
        }
      ],
      'callsign': 'KPSP',
      'x': 0,
      'y': 0,
      'class': 'intersection',
      'runways': [
        {
          'x': -1,
          'y': 0,
          'length': 10000,
          'length1': 10000,
          'length2': 10000,
          'surface': 'asphalt',
          'size': 150,
          'hdg1': 312,
          'hdg2': 132,
          'name1': '31L',
          'name2': '13R',
          'elevation1': 398,
          'elevation2': 476,
          'labelSpread1': 1.5,
          'labelSpread2': 1.5
        },
        {
          'x': 1,
          'y': 0,
          'length': 4952,
          'length1': 4952,
          'length2': 4952,
          'surface': 'asphalt',
          'size': 75,
          'hdg1': 312,
          'hdg2': 132,
          'name1': '31R',
          'name2': '13L',
          'elevation1': 407,
          'elevation2': 449,
          'labelSpread1': 1.5,
          'labelSpread2': 1.5
        }
      ]
    }
  }
};