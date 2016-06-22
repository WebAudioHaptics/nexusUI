var util = require('util');
var drawing = require('../utils/drawing');
var widget = require('../core/widget');

/** 
    
    @public
    @class oscilloscope 

    Oscilloscope waveform visualizer.

    ```html
    <canvas nx="oscilloscope"></canvas>
    ```
    <canvas nx="oscilloscope" style="margin-left:25px"></canvas>
*/

var oscilloscope = module.exports = function(target) {

    this.defaultSize = { width: 400, height: 125 };
    widget.call(this, target);
    this.dataArray;
    this.init();

}
util.inherits(oscilloscope, widget);

oscilloscope.prototype.init = function(){
    with (this.context) {
        fillStyle = this.colors.fill;
        fillRect(0,0,this.GUI.w, this.GUI.h);
    }

	this.draw();
}



/** @method setup  
    Connect the oscilloscope to an audio source and start the oscilloscope's graphics.
    @param {audio context} [context] The audio context hosting the source node
    @param {audio node} [source] The audio source node to analyze
    */
oscilloscope.prototype.setup = function(actx,source){
    this.actx = actx;   
    this.source = source;

    this.analyser = this.actx.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.85;
    this.analyser.fftsize = 1024;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Float32Array(this.bufferLength);
    this.source.connect(this.analyser);
    
    this.draw();
}

oscilloscope.prototype.draw = function(){
    
    if(this.dataArray) {
        this.analyser.getFloatTimeDomainData(this.dataArray);

        with (this.context){
            fillStyle = this.colors.fill;
			fillRect(0,0,this.GUI.w, this.GUI.h);

			lineWidth = 2;
			strokeStyle = 'rgb(0, 200, 0)';
			beginPath();
			for (var j=0;j<this.dataArray.length;j++) {
				lineTo(j/this.dataArray.length * this.GUI.w , (1 + this.dataArray[j]) * this.GUI.h / 2 );
			}
			stroke();
        }
    }

    setTimeout(function() {
        window.requestAnimationFrame(this.draw.bind(this));
    }.bind(this), 1) 
    
}
    
    