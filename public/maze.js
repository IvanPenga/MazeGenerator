function generate(){
	
	const canvas = document.createElement("canvas");
	const hSize = document.getElementById("hSize").value;
	const vSize = document.getElementById("vSize").value;
	
	canvas.setAttribute("width",hSize);
	canvas.setAttribute("height",vSize);
	
	const ctx = canvas.getContext("2d");
	
	ctx.fillStyle = "#000";
	ctx.fillRect(0,0,hSize,vSize);

	ctx.strokeStyle = "#FFF";
	ctx.lineWidth = 7;
	ctx.lineCap = "round";

	const board = new Board(hSize,vSize);
	const stack = [];
	
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
	
	const img    = canvas.toDataURL("image/png");
	const myimage = document.getElementById("labyrinth");
	
	myimage.setAttribute("src",img);

}


