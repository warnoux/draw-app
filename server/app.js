const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);

const height = 25;
const width = 25;

const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(height, width)
const ctx = canvas.getContext('2d')

let matrice= new Array();

Http.listen(3000, () => {
    console.log("Listening at :3000...");
	
	// Draw cat with lime helmet
	loadImage('dl2.jpg').then((image) => {
	  ctx.drawImage(image, 0, 0, width, height)
	 
		for(let i = 0; i < width; i++){ 
		  for(let j = 0; j < height; j++){
			   var pixel = ctx.getImageData(i, j, 1, 1);
            var data = pixel.data;
			if (!matrice[j]) matrice[j] = new Array(); 
			matrice[j][i] = new Case(i, j, "rgb("+data[0] + ',' + data[1] + ',' + data[2]+")", null) ;
		  }
		}
	})
});

Socketio.on("connection", socket => {
	
	socket.emit("matrice", matrice);
	
	 setInterval(() => {
		socket.emit("matrice", matrice);
	  },1000);
	
	socket.on("changeColor", data => {
			matrice[data.j][data.i] = new Case(data.i, data.j, null, data.color);
		
    });
	
});

class Case {
	i; 
	j; 
	color; 
	selectedColor;

	
	constructor(i, j, color, selectedColor){
		this.i = i;
		this.j = j;
		if ( color ) {
			this.color = color;
		}
		
		if ( selectedColor != null ) {
			this.selectedColor = selectedColor;
		}
	}

}