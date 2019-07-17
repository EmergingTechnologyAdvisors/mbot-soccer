# Bluetooth controlled mBot SoccerBot

Using the [mBot Bluetooth version](http://www.makeblock.cc/mbot/) and
[mBot NodeBots](https://github.com/Makeblock-official/mbot_nodebots/blob/master/README.md).

## Getting Started

If you're using Windows or Mac, ensure that you have the USB driver:

* Install USB Serial [driver](https://github.com/Makeblock-official/mbot_nodebots/tree/master/drivers) for your platform

### Install Dependencies

* Install git
* Install Node 8.16.0 (or greater)

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

* Slide the mBot power switch to Off

* Reinstall the Bluetooth modules

* Slide the mBot power switch to On

* Pair the MakeBlock Bluetooth module using your OS settings

  The MakeBlock's Bluetooth UUID will appear in the list of available devices.

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
  npm run controls
```

* Control the mBot using the right keyboard keys and spacebar

## Controlling with the game controller
##### For this example we will be using the [Logitech F310 Gamepad](http://gaming.logitech.com/en-us/product/f310-gamepad)
![alt text](/images/gamepad.jpeg)

*This image is a registered trademark of Logitech and is only being used to demonstrate the capabilities with the Mbot*
* Connect the controller to the usb port before you pair your Mbot to your computer.
* Make sure on the back of the controller, the switch is in the **D** position
* Pair your Mbot with Bluetooth or USB
* Type the below command into your terminal

```
npm run gamepad
```
* The controls for the Mbot are as follows:
```
D-PAD Left:  Turns the Mbot Left
D-PAD Right:  Turns the Mbot right
X Button: Moves Mbot forward
A Button: Moves Mbot forward faster (turbo)
B Button: Moves Mbot backwards
Y Button: Spins Mbot
L1 Button:  Quits your controller and stops the program
```

* To move the Mbot you must hold the button down like you would in a race car game
