# Bluetooth controlled mBot SoccerBot

Using the [mBot Bluetooth version](http://www.makeblock.cc/mbot/) and
[mBot NodeBots](https://github.com/Makeblock-official/mbot_nodebots/blob/master/README.md).

## Getting Started

* Install Node 4
* Install USB [driver](https://github.com/Makeblock-official/mbot_nodebots/tree/master/driver) for your platform

### Install Dependencies

```
  git clone https://github.com/EmergingTechnologyAdvisors/mbot-soccer
  cd mbot-soccer
  npm i
```

### Install Firmware

* Connect the USB cable
* Remove any attached wireless modules (such as Bluetooth)
* Make sure the board switch is "on"

* Install the USB Firmata:

```
  npm run firmata-usb
```

* Install the Bluetooth Firmata:

```
  npm run firmata-bluetooth
```

* Restart the mBot with wireless (Bluetooth) modules installed
* Pair the MakeBlock Bluetooth module (device Bluetooth settings)

## Running the Code

* Run the bot with Bluetooth:

```
  node eg/keyboard-controls.js
```

* Control the mBot using the right keyboard keys and spacebar
