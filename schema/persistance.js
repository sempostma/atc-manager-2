export default {
  '$schema': 'http://json-schema.org/draft-07/schema#',
  'type': 'object',
  'title': 'Persistance',
  'required': [
    'games'
  ],
  'properties': {
    'games': {
      'type': 'object',
      'title': 'Games',
      'required': [],
      'additionalProperties': {
        '$ref': '#/definitions/mapSave'
      }
    }
  },
  'definitions': {
    'mapSave': {
      'type': 'object',
      'title': 'Map',
      'required': [
        'traffic',
        'started',
        'log',
        'selfLog',
        'mapName',
        'arrivals',
        'departures',
        'enroutes',
        'distanceVialations',
        'winddir',
        'windspd',
        'unpermittedDepartures',
        'time'
      ],
      'properties': {
        'traffic': {
          'type': 'array',
          'title': 'Traffic',
          'items': {
            'type': 'object',
            'title': 'Items',
            'required': [
              'tgtAltitude',
              'tgtDirection',
              'tgtSpeed',
              'operatorId',
              'speed',
              'altitude',
              'heading',
              'x',
              'y',
              'flight',
              'path',
              'typeId',
              'routeType',
              'textRotation'
            ],
            'properties': {
              'tgtAltitude': {
                'type': 'integer',
                'title': 'Tgtaltitude',
                'default': 0,
                'examples': [
                  17000
                ]
              },
              'tgtDirection': {
                'type': 'integer',
                'title': 'Tgtdirection',
                'default': 0,
                'examples': [
                  47
                ]
              },
              'tgtSpeed': {
                'type': 'integer',
                'title': 'Tgtspeed',
                'default': 0,
                'examples': [
                  300
                ]
              },
              'operatorId': {
                'type': 'integer',
                'title': 'Operatorid',
                'default': 0,
                'examples': [
                  5
                ]
              },
              'speed': {
                'type': 'integer',
                'title': 'Speed',
                'default': 0,
                'examples': [
                  300
                ]
              },
              'altitude': {
                'type': 'integer',
                'title': 'Altitude',
                'default': 0,
                'examples': [
                  17000
                ]
              },
              'heading': {
                'type': 'integer',
                'title': 'Heading',
                'default': 0,
                'examples': [
                  47
                ]
              },
              'x': {
                'type': 'number',
                'title': 'X',
                'default': 0.0,
                'examples': [
                  252.304
                ]
              },
              'y': {
                'type': 'number',
                'title': 'Y',
                'default': 0.0,
                'examples': [
                  2.148
                ]
              },
              'flight': {
                'type': 'integer',
                'title': 'Flight',
                'default': 0,
                'examples': [
                  665
                ]
              },
              'path': {
                'type': 'array',
                'title': 'Path',
                'items': {
                  'type': 'string',
                  'title': 'Items',
                  'default': ''
                }
              },
              'typeId': {
                'type': 'integer',
                'title': 'Typeid',
                'default': 0,
                'examples': [
                  16
                ]
              },
              'routeType': {
                'type': 'integer',
                'title': 'Routetype',
                'default': 0,
                'examples': [
                  0
                ]
              },
              'textRotation': {
                'type': 'integer',
                'title': 'textRotation',
                'minimum': 0,
                'maximum': 3,
                'default': 0,
                'examples': [
                  0
                ]
              },
              'dirty': {
                'type': 'boolean',
                'title': 'Dirty'
              },
              'rwy': {
                'type': 'string',
                'title': 'Runway'
              },
              'outboundWaypoint': {
                'type': 'string',
                'title': 'Outbound waypoint'
              },
              'waiting': {
                'type': 'boolean',
                'title': 'Waiting'
              },
              'regNum': {
                'type': 'string',
                'title': 'Registration number'
              },
              'tgtVfrState': {
                'type': 'integer',
                'minimum': 0,
                'title': 'Target VFR State'
              },
              'tgs': {
                'type': 'integer',
                'minimum': 0,
                'title': 'Touch and go\'s'
              },
              'landing': {
                'type': 'boolean',
                'title': 'Landing'
              }
            }
          }
        },
        'started': {
          'type': 'boolean',
          'title': 'Started',
          'default': false,
          'examples': [
            true
          ]
        },
        'log': {
          'type': 'array',
          'title': 'Log',
          'items': {
            'type': 'string',
            'title': 'Items',
            'default': '',
            'examples': [
              'American 665: EHZM approach, American 665 at 170.',
              'ATC: American 665, information Oscar is current, altimeter 30.96, maintain current heading.',
              'Delta 888: EHZM approach, Delta 888 at 140.',
              'ATC: Delta 888, information Oscar is current, altimeter 30.96, maintain current heading.',
              'Qatari 1325: EHZM approach, Qatari 1325 at 150.',
              'ATC: Qatari 1325, information Oscar is current, altimeter 30.96, maintain current heading.',
              'Turkish 1391: EHZM approach, with you for 36.',
              'ATC: Turkish 1391, EHZM approach, hold short 36.',
              'Turkish 1391: Roger hold short of 36, Turkish 1391.',
              'KLM 242: EHZM approach, with you for 36.',
              'ATC: KLM 242, EHZM approach, hold short 36.',
              'KLM 242: Roger hold short of 36, KLM 242.'
            ],
            'pattern': '^(.*)$'
          }
        },
        'selfLog': {
          'type': 'array',
          'title': 'Selflog',
          'items': {
            'type': 'string',
            'title': 'Items',
            'default': '',
            'examples': [
              'ATC: American 665, information Oscar is current, altimeter 30.96, maintain current heading.',
              'ATC: Delta 888, information Oscar is current, altimeter 30.96, maintain current heading.',
              'ATC: Qatari 1325, information Oscar is current, altimeter 30.96, maintain current heading.',
              'ATC: Turkish 1391, EHZM approach, hold short 36.',
              'ATC: KLM 242, EHZM approach, hold short 36.'
            ],
            'pattern': '^(.*)$'
          }
        },
        'pathCounter': {
          'type': 'integer',
          'title': 'Pathcounter',
          'default': 0,
          'examples': [
            7
          ]
        },
        'mapName': {
          'type': 'string',
          'title': 'Mapname',
          'default': '',
          'examples': [
            'default'
          ],
          'pattern': '^(.*)$'
        },
        'arrivals': {
          'type': 'integer',
          'title': 'Arrivals',
          'minimum': 0,
          'default': 0,
          'examples': [
            0
          ]
        },
        'departures': {
          'type': 'integer',
          'title': 'Departures',
          'minimum': 0,
          'default': 0,
          'examples': [
            0
          ]
        },
        'enroutes': {
          'type': 'integer',
          'title': 'Enroutes',
          'minimum': 0,
          'default': 0,
          'examples': [
            0
          ]
        },
        'distanceVialations': {
          'type': 'integer',
          'title': 'Distancevialations',
          'minimum': 0,
          'default': 0,
          'examples': [
            0
          ]
        },
        'winddir': {
          'type': 'number',
          'title': 'Winddir',
          'maximum': 360,
          'minimum': 0,
          'default': 0,
          'examples': [
            340
          ]
        },
        'windspd': {
          'type': 'number',
          'title': 'Windspd',
          'default': 0,
          'minimum': 0,
          'maximum': 100,
          'examples': [
            0
          ]
        },
        'unpermittedDepartures': {
          'type': 'integer',
          'title': 'Unpermitteddepartures',
          'default': 0,
          'minimum': 0,
          'examples': [
            0
          ]
        },
        'time': {
          'type': 'integer',
          'title': 'Time',
          'default': 0,
          'minimum': 0,
          'maximum': 86400,
          'examples': [
            0
          ]
        }
      }
    }
  }
};