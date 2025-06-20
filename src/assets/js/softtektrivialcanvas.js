(function (cjs, an) {

    var p; // shortcut to reference prototypes
    var lib={};var ss={};var img={};
    lib.ssMetadata = [];
    
    
    (lib.AnMovieClip = function(){
        this.currentSoundStreamInMovieclip;
        this.actionFrames = [];
        this.soundStreamDuration = new Map();
        this.streamSoundSymbolsList = [];
    
        this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
            cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
        }
        this.gotoAndPlay = function(positionOrLabel){
            this.clearAllSoundStreams();
            this.startStreamSoundsForTargetedFrame(positionOrLabel);
            cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
        }
        this.play = function(){
            this.clearAllSoundStreams();
            this.startStreamSoundsForTargetedFrame(this.currentFrame);
            cjs.MovieClip.prototype.play.call(this);
        }
        this.gotoAndStop = function(positionOrLabel){
            cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
            this.clearAllSoundStreams();
        }
        this.stop = function(){
            cjs.MovieClip.prototype.stop.call(this);
            this.clearAllSoundStreams();
        }
        this.startStreamSoundsForTargetedFrame = function(targetFrame){
            for(var index=0; index<this.streamSoundSymbolsList.length; index++){
                if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
                    for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
                        var sound = this.streamSoundSymbolsList[index][i];
                        if(sound.endFrame > targetFrame){
                            var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
                            var instance = playSound(sound.id);
                            var remainingLoop = 0;
                            if(sound.offset){
                                targetPosition = targetPosition + sound.offset;
                            }
                            else if(sound.loop > 1){
                                var loop = targetPosition /instance.duration;
                                remainingLoop = Math.floor(sound.loop - loop);
                                if(targetPosition == 0){ remainingLoop -= 1; }
                                targetPosition = targetPosition % instance.duration;
                            }
                            instance.loop = remainingLoop;
                            instance.position = Math.round(targetPosition);
                            this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
                        }
                    }
                }
            }
        }
        this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
             this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
        }
        this.clearAllSoundStreams = function(){
            var keys = this.soundStreamDuration.keys();
            for(var i = 0;i<this.soundStreamDuration.size; i++){
                var key = keys.next().value;
                key.instance.stop();
            }
             this.soundStreamDuration.clear();
            this.currentSoundStreamInMovieclip = undefined;
        }
        this.stopSoundStreams = function(currentFrame){
            if(this.soundStreamDuration.size > 0){
                var keys = this.soundStreamDuration.keys();
                for(var i = 0; i< this.soundStreamDuration.size ; i++){
                    var key = keys.next().value; 
                    var value = this.soundStreamDuration.get(key);
                    if((value.end) == currentFrame){
                        key.instance.stop();
                        if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
                        this.soundStreamDuration.delete(key);
                    }
                }
            }
        }
    
        this.computeCurrentSoundStreamInstance = function(currentFrame){
            if(this.currentSoundStreamInMovieclip == undefined){
                if(this.soundStreamDuration.size > 0){
                    var keys = this.soundStreamDuration.keys();
                    var maxDuration = 0;
                    for(var i=0;i<this.soundStreamDuration.size;i++){
                        var key = keys.next().value;
                        var value = this.soundStreamDuration.get(key);
                        if(value.end > maxDuration){
                            maxDuration = value.end;
                            this.currentSoundStreamInMovieclip = key;
                        }
                    }
                }
            }
        }
        this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
            for(var frameIndex in this.actionFrames){
                if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
                    return frameIndex;
                }
            }
            return calculatedDesiredFrame;
        }
    
        this.syncStreamSounds = function(){
            this.stopSoundStreams(this.currentFrame);
            this.computeCurrentSoundStreamInstance(this.currentFrame);
            if(this.currentSoundStreamInMovieclip != undefined){
                var soundInstance = this.currentSoundStreamInMovieclip.instance;
                if(soundInstance.position != 0){
                    var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
                    var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
                    var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
                    if(soundValue.loop > 1){
                        calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
                    }
                    calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
                    var deltaFrame = calculatedDesiredFrame - this.currentFrame;
                    if(deltaFrame >= 2){
                        this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
                    }
                }
            }
        }
    }).prototype = p = new cjs.MovieClip();
    // symbols:
    // helper functions:
    
    function mc_symbol_clone() {
        var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
        clone.gotoAndStop(this.currentFrame);
        clone.paused = this.paused;
        clone.framerate = this.framerate;
        return clone;
    }
    
    function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
        var prototype = cjs.extend(symbol, cjs.MovieClip);
        prototype.clone = mc_symbol_clone;
        prototype.nominalBounds = nominalBounds;
        prototype.frameBounds = frameBounds;
        return prototype;
        }
    
    
    (lib.Símbolo24 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#0372BE").s().p("AgBOJQppgCm0kaQiQhchghqIgCgDQiHiUgqitIAFAAIhAs8IAEAVQAfCDBWB1QAfAqAlAnIADADQAtAwA3AuQAeAZAiAXQAmAbApAbIAFADIAzAeQAuAaAwAZQFkCvHKAXIBSACIAyABIAGAAIAxgBIBTgCQHIgXFjiuQAygaAwgbIAxgdIAHgFQAogZAlgbQAjgZAfgZQA1gsAsgtIACgCIABgDQAmgoAfgqQBYh4AeiHIg/MuIAIAAQgqCuiHCUIgCACIgBADQhhBniOBcQm1EapoACgA4KuHIACAAIAAALIAAAFgAYKuHIABAAIgBAJIAAgJg");
        this.shape.setTransform(154.675,182.6);
    
        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.lf(["#232B68","#0272BE"],[0,1],0,47.3,0,-37.9).s().p("ACCCCIOTEzQg8AvhLArQiwBmjRA3Qi4AwjSALgAoMKsQjSg3ivhmQhLgrg8gvIOTkyIAAJkQjTgLi4gwgAEFAAIOUkyQBuCMAACmQAACnhtCMgAz3B2QgPg5AAg9QAAg8APg6QAZhjBGhZIOVEyIuWEzQhFhZgZhkgACCrmQHCAYFKC/QBLAsA8AvIuTEygAwUm0QA8gvBLgsQFKi/HCgYIAAJkg");
        this.shape_1.setTransform(154.7742,92.625);
    
        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#0099FF").s().p("AgCPFIgxAAIhTgDQnJgXlkiwQgwgYgugaIgzgfIgFgCQgqgbglgbQgigYgegZQg3gtgugwIgCgDQgmgngegqQhWh1gfiEIgEgUQgFgYgEgZQgEgoAAgqIABgbIAAgEIAAgMQABgVADgUQAEgiAIggQAPhAAcg8QAyhtBchiIADgCQBjhqCVhdQHDkZJ/gBIAGAAQJ/ABHDEZQCUBcBjBpIACACIACABQBwB3AyCIQAfBRAHBYIABAPIAAAKIAABHIAAAIQgDAygLAwQgeCIhZB4QgeAqgmAoIgBACIgDACQgrAug1ArQggAagiAZQglAagoAaIgIAEIgwAeQgwAbgyAZQljCvnIAXIhUADIgwAAgACDLAQDTgLC4gwQDRg3CwhmQBLgrA8gvIuTkzgAwUGOQA9AvBKArQCwBmDSA3QC4AwDTALIgBpkgAEFgmIOVEyQBtiMAAimQAAinhtiMgAz3idQgOA6AAA9QAAA8AOA5QAaBkBFBZIOWkyIuVkzQhHBZgZBjgACDipIOTkyQg9gvhKgsQlKi/nCgYgAuNo2QhLAsg7AvIOSEyIAApkQnBAYlLC/g");
        this.shape_2.setTransform(154.7,96.525);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo24, new cjs.Rectangle(0,0,309.4,273.1), null);
    
    
    (lib.Símbolo23 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#0099FF").s().p("AivMFIAAyLIlkAAIAAl9IQoAAIAAF9IlmAAIAASLg");
        this.shape.setTransform(53.45,85.1);
    
        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#0099FF").s().p("ACiMFIi6nZQgkhcgcgbQgmgjgwAAIgfAAIAAJzIlgAAIAA4IIJHAAQCjgBBWAmQBVAnA1BnQA1BmAACUQAACAgoBdQgpBehGA5QgtAlhOAYQA+AdAdAbIA4BRIAxBhICqHAgAjNiSICUAAIBcgVQAigJAXgnQAWgnAAgzQAAhKgjgoQgjgohfAAIiaAAg");
        this.shape_1.setTransform(178.725,85.1);
    
        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#0099FF").s().p("AivMFIAA4IIFfAAIAAYIg");
        this.shape_2.setTransform(264.675,85.1);
    
        this.shape_3 = new cjs.Shape();
        this.shape_3.graphics.f("#0099FF").s().p("Ai5MEImt4HIFvAAID+RWID8xWIFkAAImlYHg");
        this.shape_3.setTransform(357.45,85.175);
    
        this.shape_4 = new cjs.Shape();
        this.shape_4.graphics.f("#0099FF").s().p("AivMEIAA4HIFfAAIAAYHg");
        this.shape_4.setTransform(449.275,85.175);
    
        this.shape_5 = new cjs.Shape();
        this.shape_5.graphics.f("#0099FF").s().p("AD7MEIg5j/ImNAAIg3D/IlmAAIGq4HIF9AAIGqYHgAB5C3Ih8oqIh9IqID5AAg");
        this.shape_5.setTransform(542.3,85.175);
    
        this.shape_6 = new cjs.Shape();
        this.shape_6.graphics.f("#0099FF").s().p("AnAMEIAA4HIFfAAIAASLIIiAAIAAF8g");
        this.shape_6.setTransform(660.025,85.175);
    
        this.shape_7 = new cjs.Shape();
        this.shape_7.graphics.f().s("#232B68").ss(38.4,0,0,3).p("EA3FAF7IojAAIAAzIIlfA9IAAYHIOCBUgEgj4gMQIAAZjIFghcIAApyIAfAAQAwAAAmAkQAcAbAkBbIC7HYIGMAAIiqm/IgxhgIg4hRQgcgcg/gdQBOgYAtglQBGg5AohdQApheAAiAQAAiUg1hmQg1hnhVgmQhWgmijAAgA79nYQBfAAAjAoQAiAoAABKQAAAzgVAnQgXAngiAKIhdAUIiUAAIAAk5gEgmagGTIAAl9IwphMIAAHJIFlAAIAATHIFfg9IAAyKgAozsQIGsYHIF7A9IGl5EIlkAAIj8RXIj+xXgAwetcIAAZTIFfBNIAA5UgAMZsQIAAYHIFfAAIAA4HgAbqCqIB9oqIB8IqgAassQImrYHIFmAAIA4j+IGNAAIAjFDIGFhFImq5Mg");
        this.shape_7.setTransform(352.45,86.1163);
    
        this.shape_8 = new cjs.Shape();
        this.shape_8.graphics.f("#79CC52").s().p("Egj4gMLIJIAAQCjAABVAmQBWAmA1BoQA0BlAACUQAACBgoBdQgoBdhGA5QgtAlhPAYQBAAdAcAcIA3BSIAyBfICqG/ImMAAIi7nXQglhcgbgbQgmgkgwAAIgfAAIAAJyIlgBcgA+YiaICTAAIBegUQAigJAXgoQAVgmAAg0QAAhJgigoQgjgphgAAIiaAAgEApDAL8IAA4HIFfg9IAATJIIjAAIAAHQgAweL8IAA5TIFfBMIAAZUgEAgsAH+ImOAAIg3D+IlmAAIGr4HIF9hEIGqZLImFBGgAfjCwIh9orIh8IrID5AAgAiHL8Imt4HIFvAAID+RXID8xXIFkAAImlZEgEgxegGNIlmAAIAAnKIQqBMIAAF+IllAAIAASJIlfA9gAMYL8IAA4HIFgAAIAAYHg");
        this.shape_8.setTransform(352.45,85.6);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo23, new cjs.Rectangle(-19.1,-23.7,743.2,219.6), null);
    
    
    (lib.Símbolo21 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#232B68").s().p("AAPBSIghg+IgBAAIAAA+IgiAAIAAijIAiAAIAABfIABABIAggvIAmAAIgnAxIApBBg");
        this.shape.setTransform(49.5728,75.4872,9.1768,9.1768);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo21, new cjs.Rectangle(0,0,99.2,151), null);
    
    
    (lib.Símbolo20 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#232B68").s().p("Ag2AAQAAgZAPgRQAOgRAZAAQAkAAANAbQADAIACAMIABAVIhKAAQAAAOAEAGQAEAJALAAQAQAAAFgPIAeAAQgEAlgvAAQg2AAAAg8gAgTgNIAnAAQAAgYgUAAQgSAAgBAYg");
        this.shape.setTransform(50.4481,55.2792,9.1768,9.1768);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo20, new cjs.Rectangle(0,0,100.9,110.6), null);
    
    
    (lib.Símbolo19 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#232B68").s().p("AgLBCQgHgJABgUIAAg3IgXAAIAAgWIAXAAIAAgXIAggMIAAAjIAaAAIAAAWIgaAAIAAA1QAAALADAEQADADAJAAIAKAAIAAATQgGAEgUAAQgSAAgHgKg");
        this.shape.setTransform(37.6359,69.7258,9.1768,9.1768);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo19, new cjs.Rectangle(0,0,75.3,139.5), null);
    
    
    (lib.Símbolo18 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#232B68").s().p("AgLBCQgGgJAAgUIAAg3IgXAAIAAgWIAXAAIAAgXIAhgMIAAAjIAZAAIAAAWIgZAAIAAA1QAAALACAEQADADAIAAIALAAIAAATQgHAEgTAAQgSAAgHgKg");
        this.shape.setTransform(37.6004,69.7258,9.1768,9.1768);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo18, new cjs.Rectangle(0,0,75.3,139.5), null);
    
    
    (lib.Símbolo17 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#232B68").s().p("AgTBUIAAhbIgRAAIAAgXIARAAQgBgbAGgLQAJgPAYAAIASACIAAAVQgRgCgEAIQgDAFAAATIAVAAIAAAXIgVAAIAABbg");
        this.shape.setTransform(33.9653,76.8607,9.1768,9.1768);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo17, new cjs.Rectangle(0,0,67.9,153.7), null);
    
    
    (lib.Símbolo16 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#232B68").s().p("AgrAsQgPgRAAgbQAAgaAPgRQAQgQAbAAQAcAAAQAQQAPARAAAaQAAAbgPARQgQAQgcAAQgbAAgQgQgAgXAAQAAAmAXAAQAYAAAAgmQAAglgYAAQgXAAAAAlg");
        this.shape.setTransform(54.1238,55.2792,9.1768,9.1768);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo16, new cjs.Rectangle(0,0,108.3,110.6), null);
    
    
    (lib.Símbolo15 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#232B68").s().p("AhBAdIAjAAQgBAOAHAIQAIAJANAAQAgAAAAgWQAAgMgNgGIgXgGQg2gNAAgfQAAgbAVgOQATgNAbAAQAYAAAQANQAQANAAAYIgiAAQgCgZgZAAQgKAAgHAGQgIAFAAAKQAAAMAKAFQAEADAPADQAdAHALAGQAVALAAAVQAAAdgWAOQgSAMgdAAQhAAAACg4g");
        this.shape.setTransform(60.8296,78.2372,9.1768,9.1768);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo15, new cjs.Rectangle(0,0,121.7,156.5), null);
    
    
    (lib.Símbolo14 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#0372BE").s().p("A28H4IhOvvMAwVAAAIhOPvg");
        this.shape.setTransform(154.675,50.425);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo14, new cjs.Rectangle(0,0,309.4,100.9), null);
    
    
    (lib.Símbolo13 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#0372BE").s().p("AgCGTQpigBmvkaQiOhdhfhpIgCgCQiGiVgpitIUMAAQBQAGBTAAIAGAAQBTAABPgGIUMAAQgpCuiGCVIgBACIgCACQhfBmiNBdQmvEaphABg");
        this.shape.setTransform(154.725,131.625);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo13, new cjs.Rectangle(8.9,91.4,291.70000000000005,80.5), null);
    
    
    (lib.Símbolo12 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#0099FF").s().p("AgBPFQqAgBnEkaQiUhchjhqIgDgDQglgngfgqQhWh1gfiEQgIgigEgjQgGgoAAgqIABgfQACgbADgaQAEgiAIggQAPhAAdg8QAxhtBdhiIACgCQBjhqCUhdQHEkZKAgBIAFAAQJ/ABHDEZQCUBcBjBpIACACIABABQBxB3AyCIQAeBRAJBYIABBgIAAAIQgOC/h3CjQgfAqgmAoIgCACIgBACQhjBoiVBcQnDEap/ABg");
        this.shape.setTransform(154.65,96.525);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo12, new cjs.Rectangle(0,0,309.3,193.1), null);
    
    
    (lib.Símbolo10 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#A64575").s().p("AgnDNQgGgagFivQgDiKgBhBIABgbIACi0QADAhAJAgQAZBjBEBZIAAIwQhEhfgZhrg");
        this.shape.setTransform(5.45,48.75);
    
        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#BF4F87").s().p("AnGGuIAAowIONkxIABI4IuKEvIgEgGg");
        this.shape_1.setTransform(56.4,46.525);
    
        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#FF69B4").s().p("AnyB3QgIghgEghQgCgbAAgaQAAgZADgfQADgeAIggQAKglARgoQAYg3Asg4IOUEyIgHADIuNEwQhGhagZhig");
        this.shape_2.setTransform(51.325,2.7);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo10, new cjs.Rectangle(0,-28,102.7,118.1), null);
    
    
    (lib.Símbolo9 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#61321B").s().p("AlADbQhKgug7gyIAAo8QA8AuBJArQCxBnDPA2QC2AvDQAMIAAJSQm/galHjNg");
        this.shape.setTransform(45.6,47.75);
    
        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#A0522D").s().p("AHEEyQjQgMi1guQjQg3ixhnQhJgqg8guIgCgCIOSkxIABJjg");
        this.shape_1.setTransform(45.775,2.6);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo9, new cjs.Rectangle(0,-28,91.6,120.8), null);
    
    
    (lib.Símbolo8 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#BF3400").s().p("AnFiQQDOgLC3gwQDPg2CwhnQBLgqA8gvIAAI7Qg8AzhLAuQlHDNm9Aag");
        this.shape.setTransform(46.025,47.75);
    
        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#FF4500").s().p("AnIEyIgBpjIOTExIgBABQg8AvhLArQixBmjOA3Qi3AvjOALg");
        this.shape_1.setTransform(45.75,2.625);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo8, new cjs.Rectangle(0,-28,91.5,120.8), null);
    
    
    (lib.Símbolo7 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#211C40").s().p("Ag1iLQBjiBAIiYIAADrQAAB9gbC5QghDngvBBg");
        this.shape.setTransform(97.175,47.35);
    
        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#28224D").s().p("AnKCDIAAo2IOUEzIABAAIAAIwIgDAEg");
        this.shape_1.setTransform(45.875,46.3);
    
        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#483D8B").s().p("AGUEzIuUkzIOUkyQAqA2AZA5QAkBQAGBaIAAAyQgICZhkCBg");
        this.shape_2.setTransform(51.275,2.7);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo7, new cjs.Rectangle(0,-28,102.6,117.9), null);
    
    
    (lib.Símbolo6 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#267348").s().p("AnIiCIORkzIAAI7IuREwg");
        this.shape.setTransform(45.725,46.325);
    
        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#3CB371").s().p("AnIkxQHCAYFIC/QBMAsA7AuIuREyg");
        this.shape_1.setTransform(45.725,2.6);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo6, new cjs.Rectangle(0,-28,91.5,118.1), null);
    
    
    (lib.Símbolo5 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#BF7C00").s().p("AnHCEIAAo4IOOEyIABI3g");
        this.shape.setTransform(45.8,46.275);
    
        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#FFA500").s().p("AHIEyIuPkyIgBAAIABAAQA+gxBHgpQFJi/HCgYIAAJjg");
        this.shape_1.setTransform(45.725,2.575);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo5, new cjs.Rectangle(0,-28,91.5,118), null);
    
    
    (lib.Símbolo3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#FF4501").s().p("AnJoPIOSIQQg8BRhLBLQivCvjRBfQi4BSjSATg");
        this.shape.setTransform(187.45,203.4);
    
        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#A0522D").s().p("AA/GqQjRheiwiwQhLhKg8hSIOSoPIABQfQjTgTi4hTg");
        this.shape_1.setTransform(69.925,203.45);
    
        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#FF69B4").s().p("AnyDNQgPhkABhpQgBhoAPhkQAZisBGiYIOUIQIuUISQhGiagZirg");
        this.shape_2.setTransform(51.3242,128.1);
    
        this.shape_3 = new cjs.Shape();
        this.shape_3.graphics.f("#FFA500").s().p("AnIAAQA7hQBLhLQFJlKHCgpIAAQdg");
        this.shape_3.setTransform(69.925,52.725);
    
        this.shape_4 = new cjs.Shape();
        this.shape_4.graphics.f("#473D8B").s().p("AoAAAIOUoQQBtDyAAEeQAAEghtDyg");
        this.shape_4.setTransform(206.05,128.1);
    
        this.shape_5 = new cjs.Shape();
        this.shape_5.graphics.f("#3CB371").s().p("AnIoPQHBAqFJFJQBLBMA8BQIuRIPg");
        this.shape_5.setTransform(187.425,52.75);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = getMCSymbolPrototype(lib.Símbolo3, new cjs.Rectangle(0,0,257.4,256.3), null);
    
    
    (lib.Interpolación80 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#232B68").s().p("AjlNnQgngmgVgvQgeg/AAhQQAAiIBchcQBdhfCFAAQCCAABgBgQBeBfAACFQAABOghBAQgWAtgnAmQheBbiEAAQiMABhYhagAkED4IAAhUQAAinAlhQQAmhQBkguIBagnQBpguAAhUQAAgwgigiQgigigwAAQiEAAAAC4InQAAQAAj1BxicQBUhyCFhEQCFhDCNABQD+AACuCoQCtCnAAD4QAAEyj5B6QhQApgSAdQgRAeAABgg");
        this.shape.setTransform(2.225,1.45);
    
        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#0099FF").s().p("ApoRBIp3CfICgp3QigkUAAlVQAAoEFuluQFtltIEAAQIFAAFtFtQFuFuAAIEQAAIFluFtQltFuoFAAQlUAAkUifg");
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-124.8,-124.8,249.6,249.6);
    
    
    (lib.Interpolación79 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#232B68").s().p("AjlNnQgngmgVgvQgeg/AAhQQAAiIBchcQBdhfCFAAQCCAABgBgQBeBfAACFQAABOghBAQgWAtgnAmQheBbiEAAQiMABhYhagAkED4IAAhUQAAinAlhQQAmhQBkguIBagnQBpguAAhUQAAgwgigiQgigigwAAQiEAAAAC4InQAAQAAj1BxicQBUhyCFhEQCFhDCNABQD+AACuCoQCtCnAAD4QAAEyj5B6QhQApgSAdQgRAeAABgg");
        this.shape.setTransform(2.225,1.45);
    
        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#0099FF").s().p("ApoRBIp3CfICgp3QigkUAAlVQAAoEFuluQFtltIEAAQIFAAFtFtQFuFuAAIEQAAIFluFtQltFuoFAAQlUAAkUifg");
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-124.8,-124.8,249.6,249.6);
    
    
    (lib.Interpolación78 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#232B68").s().p("AkfRDQgwgxgbg6QgmhQAAhkQAAiqB0hzQB1h2ClAAQCkAAB4B3QB2B3AACmQAABjgqBQQgcA3gwAwQh2ByimAAQiuAAhvhugAlFE3IAAhqQAAjRAuhkQAwhlB9g4IBxgxQCCg6AAhoQAAg+gqgqQgrgqg7AAQilAAAADlIpFAAQAAkxCNjDQBpiPCmhVQCnhTCxgBQE+AADZDTQDYDRAAE2QAAF/k3CZQhkAzgWAlQgWAmAAB4g");
        this.shape.setTransform(-0.025,0);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-75.4,-120.1,150.8,240.3);
    
    
    (lib.Interpolación77 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#232B68").s().p("AkfRDQgwgxgbg6QgmhQAAhkQAAiqB0hzQB1h2ClAAQCkAAB4B3QB2B3AACmQAABjgqBQQgcA3gwAwQh2ByimAAQiuAAhvhugAlFE3IAAhqQAAjRAuhkQAwhlB9g4IBxgxQCCg6AAhoQAAg+gqgqQgrgqg7AAQilAAAADlIpFAAQAAkxCNjDQBpiPCmhVQCnhTCxgBQE+AADZDTQDYDRAAE2QAAF/k3CZQhkAzgWAlQgWAmAAB4g");
        this.shape.setTransform(0.025,0);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-75.4,-120.1,150.9,240.3);
    
    
    (lib.Interpolación59 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.lf(["#232B68","#0272BE"],[0,1],0,47.4,0,-37.9).s().p("ACCCCIOTEzQg8AvhLArQiwBmjRA3Qi4AwjSALgAoMKsQjSg3ivhmQhLgrg8gvIOTkyIAAJkQjTgLi4gwgAEFAAIOUkyQBuCMAACmQAACnhtCMgAz3B2QgPg5AAg9QAAg8APg6QAZhjBGhZIOVEyIuWEzQhFhZgZhkgACCrmQHCAYFKC/QBLAsA8AvIuTEygAwUm0QA8gvBLgsQFKi/HCgYIAAJkg");
        this.shape.setTransform(0.0242,0.025);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-128.6,-74.2,257.29999999999995,148.5);
    
    
    (lib.Interpolación42 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#FFA500").s().p("AnIAAQA7guBLgsQFJi/HCgYIAAJjg");
        this.shape.setTransform(0.025,0.025);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-45.7,-30.5,91.5,61.1);
    
    
    (lib.Interpolación28 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#3CB371").s().p("AnIkxQHBAYFJC/QBLAsA8AuIuREyg");
        this.shape.setTransform(0.025,0.025);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-45.7,-30.5,91.5,61.1);
    
    
    (lib.Interpolación16 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#473D8B").s().p("AoAAAIOTkyQBuCMAACmQAACnhtCMg");
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-51.3,-30.7,102.6,61.4);
    
    
    (lib.Interpolación14 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#FF69B4").s().p("AnyB3QgPg6ABg9QgBg7APg7QAZhjBGhZIOUEyIuUEzQhGhZgZhjg");
        this.shape.setTransform(0.0242,0);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-51.3,-30.7,102.69999999999999,61.4);
    
    
    (lib.Interpolación9 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#A0522D").s().p("AA/D4QjRg4iwhlQhLgsg8gvIOSkxIABJjQjTgLi4gvg");
        this.shape.setTransform(0.025,0);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-45.7,-30.6,91.5,61.2);
    
    
    (lib.Interpolación1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#FF4501").s().p("AnIkxIORExQg8AvhLAsQiwBmjPA3Qi5AvjSALg");
        this.shape.setTransform(0,0.025);
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
        this._renderFirstFrame();
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-45.7,-30.6,91.5,61.3);
    
    
    (lib.Símbolo22 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Símbolo_21
        this.instance = new lib.Símbolo21();
        this.instance.setTransform(652.1,178.25,1,1,0,0,0,49.6,75.5);
        this.instance.alpha = 0;
        this.instance._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance).wait(26).to({_off:false},0).to({y:78.25,alpha:1},5).to({y:53.25},1).to({y:78.25},3).wait(3));
    
        // Símbolo_20
        this.instance_1 = new lib.Símbolo20();
        this.instance_1.setTransform(539.25,201.1,1,1,0,0,0,50.5,55.2);
        this.instance_1.alpha = 0;
        this.instance_1._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(22).to({_off:false},0).to({y:101.1,alpha:1},5).to({y:76.1},1).to({y:101.1},3).wait(7));
    
        // Símbolo_19
        this.instance_2 = new lib.Símbolo19();
        this.instance_2.setTransform(445.1,186.7,1,1,0,0,0,37.6,69.7);
        this.instance_2.alpha = 0;
        this.instance_2._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(18).to({_off:false},0).to({y:86.7,alpha:1},5).to({y:61.7},1).to({y:86.7},3).wait(11));
    
        // Símbolo_18
        this.instance_3 = new lib.Símbolo18();
        this.instance_3.setTransform(360.25,186.7,1,1,0,0,0,37.6,69.7);
        this.instance_3.alpha = 0;
        this.instance_3._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(14).to({_off:false},0).to({y:86.7,alpha:1},5).to({y:61.7},1).to({y:86.7},3).wait(15));
    
        // Símbolo_17
        this.instance_4 = new lib.Símbolo17();
        this.instance_4.setTransform(283.2,176.9,1,1,0,0,0,34,76.9);
        this.instance_4.alpha = 0;
        this.instance_4._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(10).to({_off:false},0).to({y:76.9,alpha:1},5).to({y:51.9},1).to({y:76.9},3).wait(19));
    
        // Símbolo_16
        this.instance_5 = new lib.Símbolo16();
        this.instance_5.setTransform(192.75,201.1,1,1,0,0,0,54.1,55.2);
        this.instance_5.alpha = 0;
        this.instance_5._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(5).to({_off:false},0).to({y:101.1,alpha:1},5).to({y:76.1},1).to({y:101.1},3).wait(24));
    
        // Símbolo_15
        this.instance_6 = new lib.Símbolo15();
        this.instance_6.setTransform(60.8,178.2,1,1,0,0,0,60.8,78.2);
        this.instance_6.alpha = 0;
    
        this.timeline.addTween(cjs.Tween.get(this.instance_6).to({y:78.2,alpha:1},5).to({y:53.2},1).to({y:78.2},3).wait(29));
    
        this._renderFirstFrame();
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0,-25,701.7,281.5);
    
    
    (lib.Símbolo2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Capa_1
        this.instance = new lib.Símbolo3();
        this.instance.setTransform(128.7,128.1,1,1,0,0,0,128.7,128.1);
    
        this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:668.5732,y:128.05},12).to({_off:true},1).wait(2));
    
        this._renderFirstFrame();
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-0.5,-1.1,258.3,258.40000000000003);
    
    
    (lib.Símbolo4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // Símbolo_2
        this.instance = new lib.Símbolo2("synched",0);
        this.instance.setTransform(155.95,92.6,1,0.5798,0,0,0,128.7,128.1);
        this.instance._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance).wait(57).to({_off:false},0).to({mode:"single"},13,cjs.Ease.get(-1)).to({scaleY:1.0043,y:110.75},5,cjs.Ease.get(-1)).to({startPosition:0},4,cjs.Ease.get(-1)).to({scaleX:0.703,scaleY:0.706,x:155.9,y:110.8},2).to({scaleX:1,scaleY:1.0043,x:155.95,y:110.75},3).to({scaleX:2.0262,scaleY:2.0349,x:155.85,y:110.7},3,cjs.Ease.get(-1)).to({regX:128.6,regY:128.2,scaleX:3.8506,scaleY:3.8671,x:155.6,y:110.9,alpha:0},2).wait(9));
    
        // Capa_13
        this.instance_1 = new lib.Símbolo8();
        this.instance_1.setTransform(214.75,-286.95,1,1,0,0,0,45.8,46.4);
        this.instance_1.alpha = 0;
        this.instance_1._off = true;
    
        this.instance_2 = new lib.Interpolación1("synched",0);
        this.instance_2.setTransform(214.7,179.25);
        this.instance_2._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(26).to({_off:false},0).to({y:123.15,alpha:1},9,cjs.Ease.get(-1)).to({_off:true,regX:0,regY:0,x:214.7,y:179.25,mode:"synched",startPosition:0},1,cjs.Ease.get(-1)).wait(62));
        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(35).to({_off:false},1,cjs.Ease.get(-1)).to({y:136.25},3,cjs.Ease.get(-1)).to({startPosition:0},3,cjs.Ease.get(-1)).to({y:179.25},1,cjs.Ease.get(-1)).to({y:136.25},3,cjs.Ease.get(-1)).to({startPosition:0},3,cjs.Ease.get(-1)).to({y:212.25},2,cjs.Ease.get(-1)).to({y:136.25},5,cjs.Ease.get(-1)).to({_off:true},1).wait(41));
    
        // Capa_16
        this.instance_3 = new lib.Símbolo9();
        this.instance_3.setTransform(97.2,-286.9,1,1,0,0,0,45.8,46.4);
        this.instance_3.alpha = 0;
        this.instance_3._off = true;
    
        this.instance_4 = new lib.Interpolación9("synched",0);
        this.instance_4.setTransform(97.15,179.3);
        this.instance_4._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(35).to({_off:false},0).to({y:123.2,alpha:1},7,cjs.Ease.get(-1)).to({_off:true,regX:0,regY:0,x:97.15,y:179.3,mode:"synched",startPosition:0},1,cjs.Ease.get(-1)).wait(55));
        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(42).to({_off:false},1,cjs.Ease.get(-1)).to({y:136.3},3,cjs.Ease.get(-1)).to({startPosition:0},3,cjs.Ease.get(-1)).to({y:212.3},2,cjs.Ease.get(-1)).to({y:136.3},5,cjs.Ease.get(-1)).to({_off:true},1).wait(41));
    
        // Capa_11
        this.instance_5 = new lib.Símbolo10();
        this.instance_5.setTransform(78.55,-332,1,1,0,0,0,51.3,45.1);
        this.instance_5.alpha = 0;
        this.instance_5._off = true;
    
        this.instance_6 = new lib.Interpolación14("synched",0);
        this.instance_6.setTransform(78.55,168.6);
        this.instance_6._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(42).to({_off:false},0).to({y:78.1,alpha:1},7,cjs.Ease.get(-1)).to({_off:true,regX:0,regY:0,y:168.6,mode:"synched",startPosition:0},2,cjs.Ease.get(-1)).wait(47));
        this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(49).to({_off:false},2,cjs.Ease.get(-1)).to({y:92.6},5,cjs.Ease.get(-1)).to({_off:true},1).wait(41));
    
        // Capa_12
        this.instance_7 = new lib.Símbolo7();
        this.instance_7.setTransform(233.3,-332.1,1,1,0,0,0,51.3,45);
        this.instance_7.alpha = 0;
        this.instance_7._off = true;
    
        this.instance_8 = new lib.Interpolación16("synched",0);
        this.instance_8.setTransform(233.3,135.6);
        this.instance_8._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(18).to({_off:false},0).to({y:78,alpha:1},8,cjs.Ease.get(-1)).to({_off:true,regX:0,regY:0,y:135.6,mode:"synched",startPosition:0},1,cjs.Ease.get(-1)).wait(71));
        this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(26).to({_off:false},1,cjs.Ease.get(-1)).to({y:92.6},3,cjs.Ease.get(-1)).to({startPosition:0},5,cjs.Ease.get(-1)).to({y:135.6},1,cjs.Ease.get(-1)).to({y:92.6},3,cjs.Ease.get(-1)).to({startPosition:0},3,cjs.Ease.get(-1)).to({y:135.6},1,cjs.Ease.get(-1)).to({y:92.6},3,cjs.Ease.get(-1)).to({startPosition:0},3,cjs.Ease.get(-1)).to({y:168.6},2,cjs.Ease.get(-1)).to({y:92.6},5,cjs.Ease.get(-1)).to({_off:true},1).wait(41));
    
        // Capa_10
        this.instance_9 = new lib.Símbolo6();
        this.instance_9.setTransform(214.65,-375.55,1,1,0,0,0,45.7,45.1);
        this.instance_9.alpha = 0;
        this.instance_9._off = true;
    
        this.instance_10 = new lib.Interpolación28("synched",0);
        this.instance_10.setTransform(214.65,81.9);
        this.instance_10._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(10).to({_off:false},0).to({y:34.55,alpha:1},8,cjs.Ease.get(-1)).to({_off:true,regX:0,regY:0,y:81.9,mode:"synched",startPosition:0},1,cjs.Ease.get(-1)).wait(79));
        this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(18).to({_off:false},1,cjs.Ease.get(-1)).to({y:48.9},2,cjs.Ease.get(-1)).to({startPosition:0},5,cjs.Ease.get(-1)).to({y:91.9},1,cjs.Ease.get(-1)).to({y:48.9},3,cjs.Ease.get(-1)).to({startPosition:0},5,cjs.Ease.get(-1)).to({y:91.9},1,cjs.Ease.get(-1)).to({y:48.9},3,cjs.Ease.get(-1)).to({startPosition:0},3,cjs.Ease.get(-1)).to({y:91.9},1,cjs.Ease.get(-1)).to({y:48.9},3,cjs.Ease.get(-1)).to({startPosition:0},3,cjs.Ease.get(-1)).to({y:124.9},2,cjs.Ease.get(-1)).to({y:48.9},5,cjs.Ease.get(-1)).to({_off:true},1).wait(41));
    
        // Capa_8
        this.instance_11 = new lib.Símbolo5();
        this.instance_11.setTransform(97.15,-375.65,1,1,0,0,0,45.7,45);
        this.instance_11.alpha = 0;
        this.instance_11._off = true;
    
        this.instance_12 = new lib.Interpolación42("synched",0);
        this.instance_12.setTransform(97.15,72);
        this.instance_12._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1).to({_off:false},0).to({y:34.45,alpha:1},9,cjs.Ease.get(-1)).to({_off:true,regX:0,regY:0,y:72,mode:"synched",startPosition:0},1,cjs.Ease.get(-1)).wait(87));
        this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(10).to({_off:false},1,cjs.Ease.get(-1)).to({y:48.9},2,cjs.Ease.get(-1)).to({startPosition:0},5,cjs.Ease.get(-1)).to({y:81.9},1,cjs.Ease.get(-1)).to({y:48.9},2,cjs.Ease.get(-1)).to({startPosition:0},5,cjs.Ease.get(-1)).to({y:91.9},1,cjs.Ease.get(-1)).to({y:48.9},3,cjs.Ease.get(-1)).to({startPosition:0},5,cjs.Ease.get(-1)).to({y:91.9},1,cjs.Ease.get(-1)).to({y:48.9},3,cjs.Ease.get(-1)).to({startPosition:0},3,cjs.Ease.get(-1)).to({y:91.9},1,cjs.Ease.get(-1)).to({y:48.9},3,cjs.Ease.get(-1)).to({startPosition:0},3,cjs.Ease.get(-1)).to({y:124.9},2,cjs.Ease.get(-1)).to({y:48.9},5,cjs.Ease.get(-1)).to({_off:true},1).wait(41));
    
        // Símbolo_2
        this.instance_13 = new lib.Interpolación59("synched",0);
        this.instance_13.setTransform(155.9,92.6);
    
        this.timeline.addTween(cjs.Tween.get(this.instance_13).to({startPosition:0},10,cjs.Ease.get(-1)).to({y:115.7},1,cjs.Ease.get(-1)).to({y:92.6},2,cjs.Ease.get(-1)).to({startPosition:0},5,cjs.Ease.get(-1)).to({y:125.6},1,cjs.Ease.get(-1)).to({y:92.6},2,cjs.Ease.get(-1)).to({startPosition:0},5,cjs.Ease.get(-1)).to({y:135.6},1,cjs.Ease.get(-1)).to({y:92.6},3,cjs.Ease.get(-1)).to({startPosition:0},5,cjs.Ease.get(-1)).to({y:135.6},1,cjs.Ease.get(-1)).to({y:92.6},3,cjs.Ease.get(-1)).to({startPosition:0},3,cjs.Ease.get(-1)).to({y:135.6},1,cjs.Ease.get(-1)).to({y:92.6},3,cjs.Ease.get(-1)).to({startPosition:0},3,cjs.Ease.get(-1)).to({y:168.6},2,cjs.Ease.get(-1)).to({y:92.6},5,cjs.Ease.get(-1)).to({_off:true},1).wait(41));
    
        // Símbolo_12
        this.instance_14 = new lib.Símbolo12();
        this.instance_14.setTransform(155.9,96.5,1,1,0,0,0,154.7,96.5);
    
        this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(10).to({y:119.6},1,cjs.Ease.get(-1)).to({y:96.5},2,cjs.Ease.get(-1)).wait(5).to({y:129.5},1,cjs.Ease.get(-1)).to({y:96.5},2,cjs.Ease.get(-1)).wait(5).to({y:139.5},1,cjs.Ease.get(-1)).to({y:96.5},3,cjs.Ease.get(-1)).wait(5).to({y:139.5},1,cjs.Ease.get(-1)).to({y:96.5},3,cjs.Ease.get(-1)).wait(3).to({y:139.5},1,cjs.Ease.get(-1)).to({y:96.5},3,cjs.Ease.get(-1)).wait(3).to({y:172.5},2,cjs.Ease.get(-1)).to({y:96.5},5,cjs.Ease.get(-1)).wait(14).to({scaleY:1.6023,y:110.7},5,cjs.Ease.get(-1)).wait(4).to({scaleX:0.703,scaleY:1.1263,y:110.75},2).to({scaleX:1,scaleY:1.6023,y:110.7},3).wait(14));
    
        // Capa_28
        this.instance_15 = new lib.Símbolo14();
        this.instance_15.setTransform(155.85,142.55,1,1,0,0,0,154.7,50.4);
    
        this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(10).to({y:165.65},1,cjs.Ease.get(-1)).to({y:142.55},2,cjs.Ease.get(-1)).wait(5).to({y:175.55},1,cjs.Ease.get(-1)).to({y:142.55},2,cjs.Ease.get(-1)).wait(5).to({y:185.55},1,cjs.Ease.get(-1)).to({y:142.55},3,cjs.Ease.get(-1)).wait(5).to({y:185.55},1,cjs.Ease.get(-1)).to({y:142.55},3,cjs.Ease.get(-1)).wait(3).to({y:185.55},1,cjs.Ease.get(-1)).to({y:142.55},3,cjs.Ease.get(-1)).wait(3).to({y:218.55},2,cjs.Ease.get(-1)).to({y:142.55},5,cjs.Ease.get(-1)).wait(14).to({regX:154.5,regY:50.6,scaleY:0.0317,x:155.7,y:114.05},5,cjs.Ease.get(-1)).wait(4).to({regY:51.6,scaleX:0.7029,scaleY:0.0223,x:155.75,y:113.1},2).to({regY:50.6,scaleX:1,scaleY:0.0317,x:155.7,y:114.05},3).wait(14));
    
        // Símbolo_13
        this.instance_16 = new lib.Símbolo13();
        this.instance_16.setTransform(155.9,187.15,1.0118,1,0,0,0,154.7,86);
    
        this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(10).to({y:210.25},1,cjs.Ease.get(-1)).to({y:187.15},2,cjs.Ease.get(-1)).wait(5).to({y:220.15},1,cjs.Ease.get(-1)).to({y:187.15},2,cjs.Ease.get(-1)).wait(5).to({y:230.15},1,cjs.Ease.get(-1)).to({y:187.15},3,cjs.Ease.get(-1)).wait(5).to({y:230.15},1,cjs.Ease.get(-1)).to({y:187.15},3,cjs.Ease.get(-1)).wait(3).to({y:230.15},1,cjs.Ease.get(-1)).to({y:187.15},3,cjs.Ease.get(-1)).wait(3).to({y:263.15},2,cjs.Ease.get(-1)).to({y:187.15},5,cjs.Ease.get(-1)).wait(14).to({scaleX:1.0121,scaleY:1.5859,y:106},5,cjs.Ease.get(-1)).to({y:105.95},4,cjs.Ease.get(-1)).to({scaleX:0.7115,scaleY:1.1148,y:107.4},2).to({scaleX:1.0121,scaleY:1.5859,y:106},3).wait(14));
    
        this._renderFirstFrame();
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-339.6,-448.6,991,1054.7);
    
    
    // stage content:
    (lib.softtektrivialcanvas = function(mode,startPosition,loop) {
    if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});
    
        this.actionFrames = [0];
        // timeline functions:
        this.frame_0 = function() {
            this.clearAllSoundStreams();
             
        }
    
        // actions tween:
        this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(196));
    
        // Layer_2
        this.instance = new lib.Interpolación77("synched",0);
        this.instance.setTransform(151.3,138.6,0.091,0.091,0,0,0,0.6,0.6);
        this.instance._off = true;
    
        this.instance_1 = new lib.Interpolación78("synched",0);
        this.instance_1.setTransform(151.3,138.6,0.3682,0.3682,0,0,0,0.1,0.1);
        this.instance_1._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance).wait(94).to({_off:false},0).to({_off:true,regX:0.1,regY:0.1,scaleX:0.3682,scaleY:0.3682},3).wait(99));
        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(94).to({_off:false},3).to({regY:0.2,scaleX:0.4257,scaleY:0.4257,y:138.75},1,cjs.Ease.get(1)).to({regY:0.1,scaleX:0.3682,scaleY:0.3682,y:138.6},2,cjs.Ease.get(1)).to({y:165.4},5,cjs.Ease.get(1)).to({regX:0.4,scaleX:0.3018,scaleY:0.3018,x:151.35,y:102.7},8).to({x:210.6},6).to({startPosition:0},50).to({regY:0,y:68.75},3).to({regY:0.1,y:50.9},1).to({regY:0,y:68.75},6).wait(17));
    
        // Layer_3
        this.instance_2 = new lib.Símbolo24();
        this.instance_2.setTransform(151.3,7.4,0.3682,0.3682,0,0,0,154.8,136.6);
        this.instance_2.alpha = 0;
    
        this.instance_3 = new lib.Símbolo4("synched",0,false);
        this.instance_3.setTransform(150.85,150.6,0.3682,0.3682,0,0,0,154.8,145.6);
        this.instance_3._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance_2).to({y:147.3,alpha:1},6,cjs.Ease.get(1)).to({_off:true,regY:145.6,x:150.85,y:150.6,mode:"synched",startPosition:0,loop:false},1,cjs.Ease.get(1)).wait(189));
        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(6).to({_off:false},1,cjs.Ease.get(1)).wait(90).to({startPosition:89},0).to({regY:145.7,scaleX:0.4257,scaleY:0.4257,x:150.8,y:152.6},1,cjs.Ease.get(1)).to({regY:145.6,scaleX:0.3682,scaleY:0.3682,x:150.85,y:150.6},2,cjs.Ease.get(1)).to({y:177.4,startPosition:91},5,cjs.Ease.get(1)).to({regX:155.1,scaleX:0.3018,scaleY:0.3018,x:151,y:112.55},8).to({regX:154.9,x:210.25},6).to({startPosition:91},50).to({y:78.6},3).to({regY:145.5,y:60.75},1).to({regY:145.6,y:78.6},6).wait(17));
    
        // Layer_4
        this.instance_4 = new lib.Interpolación79("synched",0);
        this.instance_4.setTransform(211.55,100.85,0.1844,0.1844,0,0,0,0.2,0.2);
        this.instance_4._off = true;
    
        this.instance_5 = new lib.Interpolación80("synched",0);
        this.instance_5.setTransform(210.55,101.85,0.3682,0.3682,0,0,0,0.1,0.1);
        this.instance_5._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(119).to({_off:false},0).to({_off:true,regX:0.1,regY:0.1,scaleX:0.3682,scaleY:0.3682,x:210.55,y:101.85},5).wait(72));
        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(119).to({_off:false},5).to({x:211.55,y:100.85},45).to({regY:0,y:66.9},3).to({regY:0.1,y:49.05},1).to({regY:0,y:66.9},6).wait(17));
    
        // Layer_5
        this.instance_6 = new lib.Símbolo22("synched",0,false);
        this.instance_6.setTransform(151.65,173.6,0.3682,0.3682,0,0,0,350.9,78.4);
        this.instance_6._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(113).to({_off:false},0).to({startPosition:37},56).to({regY:78.5,y:139.7},3).to({regY:78.2,y:121.8},1).to({regY:78.5,y:139.7},6).wait(17));
    
        // Layer_6
        this.instance_7 = new lib.Símbolo23();
        this.instance_7.setTransform(151.05,289.35,0.3682,0.3682,0,0,0,352.6,86.4);
        this.instance_7.alpha = 0;
        this.instance_7._off = true;
    
        this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(169).to({_off:false},0).to({regY:86.2,y:212.55,alpha:1},3).to({y:194.7},1).to({y:212.55},6).wait(17));
    
        this._renderFirstFrame();
    
    }).prototype = p = new lib.AnMovieClip();
    p.nominalBounds = new cjs.Rectangle(90.4,50.7,271.79999999999995,297.90000000000003);
    // library properties:
    lib.properties = {
        id: '9CA5F258A997E1439B8F67CEC21A9A77',
        width: 300,
        height: 300,
        fps: 30,
        color: "#FFFFFF",
        opacity: 1.00,
        manifest: [],
        preloads: []
    };
    
    
    
    // bootstrap callback support:
    
    (lib.Stage = function(canvas) {
        createjs.Stage.call(this, canvas);
    }).prototype = p = new createjs.Stage();
    
    p.setAutoPlay = function(autoPlay) {
        this.tickEnabled = autoPlay;
    }
    p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
    p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
    p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
    p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }
    
    p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }
    
    an.bootcompsLoaded = an.bootcompsLoaded || [];
    if(!an.bootstrapListeners) {
        an.bootstrapListeners=[];
    }
    
    an.bootstrapCallback=function(fnCallback) {
        an.bootstrapListeners.push(fnCallback);
        if(an.bootcompsLoaded.length > 0) {
            for(var i=0; i<an.bootcompsLoaded.length; ++i) {
                fnCallback(an.bootcompsLoaded[i]);
            }
        }
    };
    
    an.compositions = an.compositions || {};
    an.compositions['9CA5F258A997E1439B8F67CEC21A9A77'] = {
        getStage: function() { return exportRoot.stage; },
        getLibrary: function() { return lib; },
        getSpriteSheet: function() { return ss; },
        getImages: function() { return img; }
    };
    
    an.compositionLoaded = function(id) {
        an.bootcompsLoaded.push(id);
        for(var j=0; j<an.bootstrapListeners.length; j++) {
            an.bootstrapListeners[j](id);
        }
    }
    
    an.getComposition = function(id) {
        return an.compositions[id];
    }
    
    
    an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
        var lastW, lastH, lastS=1;		
        window.addEventListener('resize', resizeCanvas);		
        resizeCanvas();		
        function resizeCanvas() {	    		
            var w = lib.properties.width, h = lib.properties.height;			
            var iw = window.innerWidth, ih=window.innerHeight;			
            var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
            if(isResp) {                
                if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
                    sRatio = lastS;                
                }				
                else if(!isScale) {					
                    if(iw<w || ih<h)						
                        sRatio = Math.min(xRatio, yRatio);				
                }				
                else if(scaleType==1) {					
                    sRatio = Math.min(xRatio, yRatio);				
                }				
                else if(scaleType==2) {					
                    sRatio = Math.max(xRatio, yRatio);				
                }			
            }			
            domContainers[0].width = w * pRatio * sRatio;			
            domContainers[0].height = h * pRatio * sRatio;			
            domContainers.forEach(function(container) {				
                container.style.width = w * sRatio + 'px';				
                container.style.height = h * sRatio + 'px';			
            });			
            stage.scaleX = pRatio*sRatio;			
            stage.scaleY = pRatio*sRatio;			
            lastW = iw; lastH = ih; lastS = sRatio;            
            stage.tickOnUpdate = false;            
            stage.update();            
            stage.tickOnUpdate = true;		
        }
    }
    an.handleSoundStreamOnTick = function(event) {
        if(!event.paused){
            var stageChild = stage.getChildAt(0);
            if(!stageChild.paused){
                stageChild.syncStreamSounds();
            }
        }
    }
    
    
    })(createjs = createjs||{}, AdobeAn = AdobeAn||{});
    var createjs, AdobeAn;