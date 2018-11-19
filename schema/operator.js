export default {
  'definitions': {},
  '$schema': 'http://json-schema.org/draft-07/schema#',
  '$id': 'http://example.com/root.json',
  'type': 'object',
  'title': 'The Root Schema',
  'required': [
    'id',
    'name',
    'rarity',
    'callsign',
    'shortName',
    'color'
  ],
  'properties': {
    'id': {
      '$id': '#/properties/id',
      'type': 'integer',
      'title': 'Id',
      'default': 0,
      'examples': [
        18
      ]
    },
    'rarity': {
      '$id': '#/items/properties/rarity',
      'type': 'number',
      'title': 'Rarity',
      'default': 1,
      'minimum': 0,
      'maximum': 1,
      'examples': [
        1
      ]
    },
    'name': {
      '$id': '#/properties/name',
      'type': 'string',
      'title': 'Name',
      'default': '',
      'examples': [
        'Cathay Pacific'
      ],
      'pattern': '^([\\w ]+)$'
    },
    'callsign': {
      '$id': '#/properties/callsign',
      'type': 'string',
      'title': 'Callsign',
      'examples': [
        'CPA'
      ],
      'pattern': '^([A-Z]{3})$'
    },
    'shortName': {
      '$id': '#/properties/shortName',
      'type': 'string',
      'title': 'Shortname',
      'examples': [
        'Cathay'
      ],
      'pattern': '^([\\w ]+)$'
    },
    'color': {
      '$id': '#/properties/color',
      'type': 'string',
      'title': 'Color',
      'examples': [
        '#006b6e'
      ],
      'pattern': '^(#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?)$'
    }
  }
};