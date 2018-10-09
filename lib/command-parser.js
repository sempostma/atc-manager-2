const languages = require('./speech-recognition-languages.json');
import annyang from 'annyang';

export const parse = text => {

};

const turn = hdg => {
  console.log('turn', hdg);
};

const commands = {
  'turn left heading *tag': turn,
  'turn right heading *tag': turn,
};

annyang.addCommands(commands);
annyang.start();