# Bluetooth controlled mBot SoccerBot

Using the [mBot Bluetooth version](http://www.makeblock.cc/mbot/) and
[mBot NodeBots](https://github.com/Makeblock-official/mbot_nodebots/blob/master/README.md).

## Getting Started

If you're using Windows or Mac, ensure that you have the USB driver:

* Install USB Serial [driver](https://github.com/Makeblock-official/mbot_nodebots/tree/master/drivers) for your platform

### Install Dependencies

* Install git
* Install Node 4.4 (or greater)

```
  git clone https://github.com/EmergingTechnologyAdvisors/mbot-soccer
  cd mbot-soccer
  npm i
```

### Install Firmware (only necessary on new bots)

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

### Pair Your Bot

* Pair the MakeBlock Bluetooth module using your OS settings

## Controlling with the Web Application

* Run the bot with Bluetooth or USB:

```
  npm start
```

* Navigate to `http://localhost:8103/` in the browser

* Control the mBot using the right keyboard keys and spacebar

## Controlling with the Server

* Run the bot with Bluetooth or USB:

```
  node run controls
```

* Control the mBot using the right keyboard keys and spacebar
