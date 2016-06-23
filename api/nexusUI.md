NexusUI API
===========
*&copy; 2011-2014*

**Author:** Ben Taylor, Jesse Allison, Yemin Oh, Sébastien Piquemal

**Overview:** NexusUI is a JavaScript toolkit for easily creating musical interfaces in web browsers. Interfaces are rendered on HTML5 canvases and are ideal for web audio projects, mobile apps, or for sending OSC to external audio applications like Max.

class nx
--------
**Methods**

nx.sendsTo(\[destination\])
---------------------------
```js
nx.sendsTo("ajax")

// or

nx.sendsTo(function(data) {
//define a custom transmission function
})
```


**Parameters**

**[destination]**:  *string or function*,  Protocol for transmitting data from interfaces (i.e. "js", "ajax", "ios", "max", or "node"). Also accepts custom functions.

nx.setAjaxPath(\[path\])
------------------------
**Parameters**

**[path]**:  *string*,  If sending via AJAX, define the path to ajax destination

nx.add(\[type\], \[settings\])
------------------------------
Adds a NexusUI element to the webpage. This will create an HTML5 canvas and draw the interface on it.


**Parameters**

**[type]**:  *string*,  NexusUI widget type (i.e. "dial").

**[settings]**:  *object*,  (Optional.) Extra settings for the new widget. This settings object may have any of the following properties: x (integer in px), y, w (width), h (height), name (widget's OSC name and canvas ID), parent (the ID of the element you wish to add the canvas into). If no settings are provided, the element will be at default size and appended to the body of the HTML document.

nx.transform(\[canvasID\], \[type\])
------------------------------------
Transform an existing canvas into a NexusUI widget.


**Parameters**

**[canvasID]**:  *string*,  The ID of the canvas to be transformed.

**[type]**:  *string*,  (Optional.) Specify which type of widget the canvas will become. If no type is given, the canvas must have an nx attribute with a valid widget type.

nx.transmit(\[data\])
---------------------
The "output" instructions for sending a widget's data to another application or to a JS callback. Inherited by each widget and executed when each widget is interacted with or its value changes. Set using nx.sendsTo() to ensure that all widgets inherit the new function correctly.


**Parameters**

**[data]**:  *object*,  The data to be transmitted. Each property of the object will become its own OSC message. (This works with objects nested to up to 2 levels).

nx.colorize(\[aspect\], \[color\])
----------------------------------
Change the color of all nexus objects, by aspect ([fill, accent, border, accentborder]

```js
nx.colorize("#00ff00") // changes the accent color by default
nx.colorize("border", "#000000") // changes the border color
```



**Parameters**

**[aspect]**:  *string*,  Which part of ui to change, i.e. "accent" "fill", "border"

**[color]**:  *string*,  Hex or rgb color code

nx.setThrottlePeriod(\[throttle)
--------------------------------
Set throttle time of nx.throttle, which controls rapid network transmissions of widget data.


**Parameters**

**[throttle**:  *integer*,  time] Throttle time in milliseconds.

nx.startPulse()
---------------
Start an animation interval for animated widgets (calls nx.pulse() every 30 ms). Executed by default when NexusUI loads.


nx.stopPulse()
--------------
Stop the animation pulse interval.


nx.pulse()
----------
Animation pulse which executes all functions stored in the nx.aniItems array.


nx.setViewport(\[scale\])
-------------------------
Set mobile viewport scale (similar to a zoom)

**Parameters**

**[scale]**:  *integer*,  Zoom ratio (i.e. 0.5, 1, 2)

class widget
------------
**Methods**

widget.sendsTo(\[destination\])
-------------------------------
Set the transmission protocol for this widget individually
```js
dial1.sendsTo("ajax")

// or

dial1.sendsTo(function(data) {
//define a custom transmission function
})
```


**Parameters**

**[destination]**:  *string or function*,  Protocol for transmitting data from this widget (i.e. "js", "ajax", "ios", "max", or "node"). Also accepts custom functions.

widget.transmit(\[data\])
-------------------------
The "output" instructions for sending the widget's data to another application or to a JS callback. Inherited from nx.transmit and executed when each widget is interacted with or during animation. Set using .sendsTo() to use our built-in transmission defintions.


**Parameters**

**[data]**:  *object*,  The data to be transmitted. Each property of the object will become its own OSC message if sending via "ajax" or "max7" protocols. (This works with objects nested to up to 2 levels).

widget.makeOSC(\[callback\], \[data\])
--------------------------------------
Loops through an object (i.e. a widget's data), creates OSC path/value pairs, and executes a callback function with these two arguments.


**Parameters**

**[callback]**:  *function*,  A function defining the action to be taken with each OSC path/value pair. This function should have two parameters, path (string) and data (type depends on widget data type).

**[data]**:  *object*,  The data as an object, to be broken into individual OSC messages.

widget.getOffset()
------------------
Recalculate the computed offset of the widget's canvas and store it in widget.offset. This is useful if a widget has been moved after being created.


widget.init()
-------------
Initialize or re-initialize the widget. Defined separately within each widget.


widget.draw()
-------------
Draw the widget onto the canvas.


widget.click()
--------------
Executes when the widget is clicked on


widget.move()
-------------
Executes on drag (mouse moves while clicked).


widget.release()
----------------
Executes when the mouse releases after having clicked on the widget.


widget.touch()
--------------
Executes when the widget is touched on a touch device.


widget.touchMove()
------------------
Executes on drag (touch then move) on a touch device


widget.touchRelease()
---------------------
Executes when the touch releases after having touched the widget.


widget.erase()
--------------
Erase the widget's canvas.


widget.set(\[data\], \[transmit\])
----------------------------------
Manually set a widget's value (that is, set any properties of a widget's .val). See widget.val or the .val property of individual widgets for more info.
Sets the value of an object.

```js
position1.set({
&nbsp;  x: 100,
&nbsp;  y: 250
})
```

An optional second argument decides whether the object then transmits its new value.
```js
button1.set({
&nbsp;  press: 100
}, true)
```


**Parameters**

**[data]**:  *object*,  Parameter/value pairs in object notation.

**[transmit]**:  *boolean*,  (optional) Whether or not to transmit new value after being set.

widget.destroy()
----------------
Remove the widget object, canvas, and all related event listeners from the document.


widget.saveCanv()
-----------------
Download the widget's current graphical state as an image (png).


class utils
-----------
**Methods**

utils.findPosition(\[element\])
-------------------------------
Returns the offset of an HTML element. Returns an object with 'top' and 'left' properties.
```js
var button1Offset = nx.findPosition(button1.canvas)
```


**Parameters**

**[element]**:  *DOM element*,  


utils.randomColor()
-------------------
Returns a random color string in rgb format


utils.hexToRgb(\[hex\], \[alpha\])
----------------------------------
Converts a hex color code to rgb format


**Parameters**

**[hex]**:  *color code*,  Input color code in hex format

**[alpha]**:  *float*,  Color alpha level

utils.toPolar(\[x\], \[y\])
---------------------------
Receives cartesian coordinates and returns polar coordinates as an object with 'radius' and 'angle' properties.
```js
var ImOnACircle = nx.toPolar({ x: 20, y: 50 }})
```


**Parameters**

**[x]**:  *float*,  


**[y]**:  *float*,  


utils.toCartesian(\[radius\], \[angle\])
----------------------------------------
Receives polar coordinates and returns cartesian coordinates as an object with 'x' and 'y' properties.


**Parameters**

**[radius]**:  *float*,  


**[angle]**:  *float*,  


utils.clip(\[input, \[low, \[high)
----------------------------------
Limits a number to within low and high values.
```js
nx.clip(5,0,10) // returns 5
nx.clip(15,0,10) // returns 10
nx.clip(-1,0,10) // returns 0
```


**Parameters**

**[input**:  *float*,  value]

**[low**:  *float*,  limit]

**[high**:  *float*,  limit]

utils.prune(\[input, \[max)
---------------------------
Limits a float to within a certain number of decimal places
```js
nx.prine(1.2345, 3) // returns 1.234
nx.prune(1.2345, 1) // returns 1.2
```


**Parameters**

**[input**:  *float*,  value]

**[max**:  *integer*,  decimal places]

utils.scale(\[input, \[low1\], \[high1\], \[low2\], \[high2\])
--------------------------------------------------------------
Scales an input number to a new range of numbers
```js
nx.scale(5,0,10,0,100) // returns 50
nx.scale(5,0,10,1,2) // returns 1.5
```


**Parameters**

**[input**:  *float*,  value]

**[low1]**:  *float*,  input range (low)

**[high1]**:  *float*,  input range (high)

**[low2]**:  *float*,  output range (low)

**[high2]**:  *float*,  output range (high)

utils.invert(\[input)
---------------------
Equivalent to nx.scale(input,0,1,1,0). Inverts a normalized (0-1) number.
```js
nx.invert(0.25) // returns 0.75
nx.invert(0) // returns 1
```


**Parameters**

**[input**:  *float*,  value]

utils.mtof(\[MIDI\])
--------------------
MIDI to frequency conversion. Returns frequency in Hz.
```js
nx.mtof(69) // returns 440
```


**Parameters**

**[MIDI]**:  *float*,  MIDI value to convert

utils.random(\[scale\])
-----------------------
Returns a random integer between 0 a given scale parameter.
```js
nx.random(10) // returns a random number from 0 to 9.
```


**Parameters**

**[scale]**:  *float*,  Upper limit of random range.

class banner
------------
class button
------------
**Methods**

button.setImage(\[src\])
------------------------
Turns the button into an image button with custom image. Sets the default (unclicked) button image.

**Parameters**

**[src]**:  *string*,  Image source

button.setTouchImage(\[src\])
-----------------------------
Sets the image that will show when the button is clicked.

**Parameters**

**[src]**:  *string*,  Image source

class colors
------------
class comment
-------------
**Methods**

comment.setSize(\[size\])
-------------------------
Set the font size of the comment text


**Parameters**

**[size]**:  *integer*,  Text size in pixels

class crossfade
---------------
class dial
----------
**Methods**

dial.animate(\[type\])
----------------------
Animates the dial

**Parameters**

**[type]**:  *string*,  Type of animation. Currently accepts "bounce" (bounces between mousedown and mouserelease points) or "none"

class envelope
--------------
**Methods**

envelope.start()
----------------
Start ramp from beginning. If set to loop, will loop the ramp until stopped.

envelope.stop()
---------------
Stop the ramp and set progress to 0.

class ghost (alpha)
-------------------
class ghostlist (alpha)
-----------------------
class joints
------------
**Methods**

joints.animate(\[type\])
------------------------
Add simple physics to the widget


**Parameters**

**[type]**:  *string*,  Currently accepts "bounce" or "none".

class keyboard
--------------
**Methods**

keyboard.toggle(\[key\], \[on/off\])
------------------------------------
Manually toggle a key on or off, and transmit the new state.
```js
// Turns the first key on
keyboard1.toggle( keyboard1.keys[0], true );
```


**Parameters**

**[key]**:  *object*,  A key object (from the .keys array) to be turned on or off

**[on/off]**:  *boolean*,  (Optional) Whether the key should be turned on (true) or off (false). If this parameter is left out, the key will switch to its opposite state.

class matrix
------------
**Methods**

matrix.setCell(\[col\], \[row\], \[on/off\])
--------------------------------------------
Manually set an individual cell on/off and transmit the new value.

```js
// Turns cell on at column 1 row 3
matrix1.setCell(1,3,true);
```


**Parameters**

**[col]**:  *integer*,  The column of the cell to be turned on/off

**[row]**:  *integer*,  The row of the cell to be turned on/off

**[on/off]**:  *boolean*,  Whether the cell should be turned on/off

matrix.sequence(\[bpm\])
------------------------
Turns the matrix into a sequencer.

```js
matrix1.sequence(240);
```


**Parameters**

**[bpm]**:  *float*,  Beats per minute of the pulse

matrix.stop()
-------------
Stops the matrix sequencer.

```js
matrix1.stop();
```


matrix.jumpToCol()
------------------
Jump to a certain column of the matrix, highlight it, and output its values as an array. Column numbers start at 0.

```js
matrix1.jumpToCol(1);
```


matrix.life()
-------------
Alters the matrix according to Conway's Game of Life. Matrix.life() constitutes one tick through the game. To simulate the game, you might use setInterval.

```js
//one tick
matrix1.life();

//repeated ticks at 80ms
setInterval(matrix1.life,80)
```


class message
-------------
class meter
-----------
**Methods**

meter.setup(\[context\], \[source\])
------------------------------------
Connect the meter to an audio source and start the meter's graphics.


**Parameters**

**[context]**:  *audio context*,  The audio context hosting the source node

**[source]**:  *audio node*,  The audio source node to analyze

class metro
-----------
class metroball
---------------
class motion
------------
class mouse
-----------
class multislider
-----------------
**Methods**

multislider.setNumberOfSliders(\[num\])
---------------------------------------
**Parameters**

**[num]**:  *integer*,  New number of sliders in the multislider

multislider.setSliderValue(\[slider\], \[value\])
-------------------------------------------------
Sets a slider to new value and transmits.

**Parameters**

**[slider]**:  *integer*,  Slider to set (slider index starts at 0)

**[value]**:  *integer*,  New slider value

class multitouch
----------------
class number
------------
class position
--------------
**Methods**

position.animate(\[type\])
--------------------------
Adds animation to the widget.


**Parameters**

**[type]**:  *string*,  Type of animation. Currently accepts "none" or "bounce", in which case the touch node can be tossed and bounces.

class range
-----------
class select
------------
class slider
------------
class string
------------
class tabs
----------
class text
----------
class tilt
----------
class toggle
------------
class trace
-----------
class typewriter
----------------
class vinyl
-----------
class waveform
--------------
**Methods**

waveform.setBuffer(\[buffer\])
------------------------------
Load a web audio AudioBuffer into the waveform ui, for analysis and visualization.


**Parameters**

**[buffer]**:  *AudioBuffer*,  The buffer to be loaded.

waveform.select(\[start\], \[end\])
-----------------------------------
Set the selection start and end points.


**Parameters**

**[start]**:  *integer*,  Selection start point in milliseconds

**[end]**:  *integer*,  Selection end point in milliseconds

class wavegrain
---------------
**Methods**

wavegrain.setBuffer(\[buffer\])
-------------------------------
Load a web audio AudioBuffer into the wavegrain ui, for analysis and visualization.


**Parameters**

**[buffer]**:  *AudioBuffer*,  The buffer to be loaded.

wavegrain.select(\[start\], \[end\], obj, opts, ctor, superCtor)
----------------------------------------------------------------
Set the selection start and end points.


**Parameters**

**[start]**:  *integer*,  Selection start point in milliseconds

**[end]**:  *integer*,  Selection end point in milliseconds

**obj**:  *Object*,  The object to print out.

**opts**:  *Object*,  Optional options object that alters the output.

**ctor**:  *function*,  Constructor function which needs to inherit the

**superCtor**:  *function*,  Constructor function to inherit prototype from.

class windows
-------------
