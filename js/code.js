var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

ctx.strokeStyle = "#FFF";
ctx.lineWidth = 7;
ctx.lineCap = "round";

var board = new Board(canvas.width, canvas.height);
var stack = [];

current = board.getRandomStartingPoint();

while(board.HasUnvisited){
	neighbour = board.getRandomNeighbour(current);
	if (neighbour != null){
		stack.push(current);
		board.drawLine(current, neighbour, ctx);
		current = neighbour;
	}
	else if (stack.length != 0){		
		current = stack[stack.length - 1];
		stack.pop();
	}	
}


