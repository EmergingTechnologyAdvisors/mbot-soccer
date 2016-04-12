# Bluetooth controlled mBot SoccerBot

Using the [mBot Bluetooth version](http://www.makeblock.cc/mbot/) and
[mBot NodeBots](https://github.com/Makeblock-official/mbot_nodebots/blob/master/README.md).

## Getting Started

* Install Node 4
* Install USB Serial [driver](https://github.com/Makeblock-official/mbot_nodebots/tree/master/drivers) for your platform

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

## Controlling with the Web Application

IMPORTANT: Pair the MakeBlock Bluetooth module using your OS settings

* Run the bot with Bluetooth or USB:

```
  npm start
```

* Navigate to `http://localhost:8103/` in the browser

## Controlling with the Server

* Run the bot with Bluetooth or USB:

```
  node run controls
```

* Control the mBot using the right keyboard keys and spacebar
