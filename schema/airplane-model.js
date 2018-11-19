export default {
  'definitions': {},
  '$schema': 'http://json-schema.org/draft-07/schema#',
  '$id': 'http://example.com/root.json',
  'type': 'object',
  'title': 'Root',
  'required': [
    'id',
    'commercial',
    'takeoffMinRunwayLength',
    'landingMinRunwayLength',
    'ceiling',
    'name',
    'shortName',
    'topSpeed',
    'landingSpeed',
    'climbSpeed',
    'descendSpeed',
    'accelerationSpeed',
    'deAccelerationSpeed',
    'minSpeed',
    'turningRate',
    'operators',
    'descendRatioWhileDecelerating',
    'ga',
    'class',
    'rarity'
  ],
  'properties': {
    'id': {
      '$id': '#/properties/id',
      'type': 'number',
      'title': 'Id',
      'default': 0,
      'examples': [
        0
      ]
    },
    'commercial': {
      '$id': '#/items/properties/commercial',
      'type': 'number',
      'title': 'Commercial',
      'minimum': 0,
      'maximum': 1,
      'default': 1,
      'examples': [
        1
      ]
    },
    'descendRatioWhileDecelerating': {
      '$id': '#/items/properties/descendRatioWhileDecelerating',
      'type': 'number',
      'title': 'Descendratiowhiledecelerating',
      'default': 0.5,
      'examples': [
        0.5
      ]
    },
    'ga': {
      '$id': '#/items/properties/ga',
      'type': 'number',
      'title': 'The Ga Schema',
      'minimum': 0,
      'maximum': 1,
      'default': 0,
      'examples': [
        0
      ]
    },
    'class': {
      '$id': '#/items/properties/class',
      'type': 'string',
      'title': 'The Class Schema',
      'default': 'medium',
      'enum': ['light', 'medium', 'heavy', 'super']
    },
    'rarity': {
      '$id': '#/items/properties/rarity',
      'type': 'number',
      'title': 'The Rarity Schema',
      'default': 1,
      'minimum': 0,
      'maximum': 1,
      'examples': [
        1
      ]
    },
    'takeoffMinRunwayLength': {
      '$id': '#/items/properties/takeoffMinRunwayLength',
      'type': 'integer',
      'title': 'Takeoffminrunwaylength',
      'default': 5000,
      'maximum': 10000,
      'examples': [
        6000
      ]
    },
    'landingMinRunwayLength': {
      '$id': '#/items/properties/landingMinRunwayLength',
      'type': 'integer',
      'title': 'Landingminrunwaylength',
      'default': 5000,
      'maximum': 10000,
      'examples': [
        5000
      ]
    },
    'ceiling': {
      '$id': '#/properties/ceiling',
      'type': 'integer',
      'title': 'Ceiling',
      'default': 37,
      'minimum': 2,
      'maximum': 60,
      'examples': [
        37
      ]
    },
    'name': {
      '$id': '#/properties/name',
      'type': 'string',
      'title': 'Name',
      'default': '',
      'examples': [
        'Boeing 737'
      ],
      'pattern': '^(.*)$'
    },
    'shortName': {
      '$id': '#/properties/shortName',
      'type': 'string',
      'title': 'Shortname',
      'default': '',
      'examples': [
        'B737'
      ],
      'pattern': '^(.*)$'
    },
    'topSpeed': {
      '$id': '#/properties/topSpeed',
      'type': 'integer',
      'title': 'Topspeed',
      'default': 320,
      'examples': [
        320
      ]
    },
    'landingSpeed': {
      '$id': '#/properties/landingSpeed',
      'type': 'integer',
      'title': 'Landingspeed',
      'default': 140,
      'examples': [
        140
      ]
    },
    'climbSpeed': {
      '$id': '#/properties/climbSpeed',
      'type': 'integer',
      'title': 'Climbspeed',
      'default': 1,
      'examples': [
        1
      ]
    },
    'descendSpeed': {
      '$id': '#/properties/descendSpeed',
      'type': 'integer',
      'title': 'descendSpeed',
      'default': 1,
      'examples': [
        1
      ]
    },
    'accelerationSpeed': {
      '$id': '#/properties/accelerationSpeed',
      'type': 'integer',
      'title': 'Accelerationspeed',
      'default': 1,
      'examples': [
        1
      ]
    },
    'deAccelerationSpeed': {
      '$id': '#/properties/deAccelerationSpeed',
      'type': 'integer',
      'title': 'Deaccelerationspeed',
      'default': 1,
      'examples': [
        1
      ]
    },
    'minSpeed': {
      '$id': '#/properties/minSpeed',
      'type': 'integer',
      'title': 'Minspeed',
      'minimum': 0,
      'maximum': 250,
      'default': 0,
      'examples': [
        160
      ]
    },
    'turningRate': {
      '$id': '#/properties/turningRate',
      'type': 'array',
      'title': 'Turningrate',
      'items': {
        '$id': '#/properties/turningRate/items',
        'type': 'integer',
        'title': 'Items',
        'default': 0,
        'examples': [
          2,
          3,
          5
        ]
      }
    },
    'operators': {
      '$id': '#/properties/operators',
      'type': 'array',
      'title': 'Operators',
      'items': {
        '$id': '#/properties/operators/items',
        'type': 'integer',
        'title': 'Items',
        'default': 0,
        'examples': [
          0,
          1,
          2,
          3,
          4,
          7,
          10,
          11,
          12,
          13,
          14,
          22,
          23
        ]
      }
    }
  }
};