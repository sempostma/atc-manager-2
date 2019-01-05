const languages = require('./speech-recognition-languages.json');
import communications from './communications';
import annyang from 'annyang';

export const parse = text => {

};

const turn = hdg => {
  console.log('turn', hdg);
};

const test = t => {
  console.log('test', t);
}

const addAirplane = a => {
  const callsign = communications.getCallsign(a, false);
  const callsignShort = communications.getCallsign(a, true);
  annyang.addCommands({
    ':airplane :turn :direction :heading :deg': { 'regexp': new RegExp(`^(${callsign}|${callsignShort}) turn (left|right)? (heading)? \w{0,3}`, 'igm'), 'callback': turn }
  })
};

const commands = {
  '*tag2': test,
  '*tag2 turn (left) (heading) *tag': turn,
  '*tag2 turn (right) (heading) *tag': turn,
};

annyang.addCallback('resultMatch', function (userSaid, commandText, phrases) {
  console.log(userSaid); // sample output: 'hello'
  console.log(commandText); // sample output: 'hello (there)'
  console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
});

annyang.addCallback('resultNoMatch', function (phrases) {
  console.log("I think the user said: ", phrases[0]);
  console.log("But then again, it could be any of the following: ", phrases);
});

annyang.debug(true);
annyang.addCommands(commands);
annyang.start({ autoRestart: true, continuous: false });