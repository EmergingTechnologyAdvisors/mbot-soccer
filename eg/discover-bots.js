const noble = require('noble');
const _ = require('lodash');

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function (peripheral) {
  if (peripheral.advertisement.localName != 'Makeblock_LE') {
    return; // not an mbot
  }
  console.log('I found an mBot!\n');

  const botInfo = {
    id: peripheral.id,
    name: peripheral.advertisement.localName,
    rssi: peripheral.rssi,
    power: peripheral.advertisement.txPowerLevel
  }

  _.forEach(botInfo, function(value, key) {
    console.log(key, ':', value);
  });
});
