const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);


const GRID_SIZE = 20;

let matrice= new Array();

Http.listen(3000, () => {
    console.log("Listening at :3000...");
	
	for(let i = 0; i < GRID_SIZE; i++){
	  for(let j = 0; j < GRID_SIZE; j++){
		if (!matrice[j]) matrice[j] = new Array(); 
		matrice[j][i] = new Case(i, j, null) ;
	  }	
	}
});


Socketio.on("connection", socket => {
	
	socket.emit("matrice", matrice);
	
	 setInterval(() => {
		socket.emit("matrice", matrice);
	  },1000);
	
	socket.on("changeColor", data => {
		matrice[data.j][data.i] = new Case(data.i, data.j, 'red');
    });
	
});

	
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
	color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class Case {
	i; 
	j; 
	color; 

	
	constructor(i, j, color){
		this.i = i;
		this.j = j;
		if(color) {
			this.color = color;
		} else {
			this.color = getRandomColor();
		}
	}

}