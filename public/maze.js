function generate(){
	
	var canvas = document.createElement("canvas");
	var hSize = document.getElementById("hSize").value;
	var vSize = document.getElementById("vSize").value;
	
	canvas.setAttribute("width",hSize);
	canvas.setAttribute("height",vSize);
	
	var ctx = canvas.getContext("2d");
	
	ctx.fillStyle = "#000";
	ctx.fillRect(0,0,hSize,vSize);

	ctx.strokeStyle = "#FFF";
	ctx.lineWidth = 7;
	ctx.lineCap = "round";

	var board = new Board(hSize,vSize);
	var stack = [];
	
	current = board.getRandomStartingPoint();
	
	while(board.HasUnvisited){
		neighbour = board.getRandomUnvisitedNeighbour(current);
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
	
	
	ctx.stroke();
	board.setStartAndEnd(ctx);
	
	var img    = canvas.toDataURL("image/png");
	var myimage = document.getElementById("myimage");
	
	myimage.setAttribute("src",img);

}


