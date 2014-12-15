function rgb(){
	this.next = function() {return(Math.floor((Math.random() * 255)))};
	this.col = function() {return({'r': this.next(), 'g': this.next(), 'b':this.next()})};
	}
function rgbtostr(rgb){
	return("rgb("+String(rgb.r)+","+String(rgb.g)+","+String(rgb.b)+")")
	}
function HueShift(h, s){
		return ((h + s)%360)
		}