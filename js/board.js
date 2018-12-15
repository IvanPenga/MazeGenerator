class Board{

	constructor(sizeHorizontal, sizeVertical){
		
		this.PointDistance = 20;
		
		this.SizeVertical = sizeVertical;
		this.SizeHorizontal = sizeHorizontal;
		this.EdgeDistance = 10;
		
		this.Points = [];	
		
		this.VerticalCount = this.SizeVertical / this.PointDistance;
		this.HorizontalCount = this.SizeHorizontal / this.PointDistance;
		
		this.VisitedCount = 0;
		this.HasUnvisited = true;
		
		this.createGrid();
	}

	createGrid(){
		var count = 0;
		for (var i = 0; i < this.VerticalCount; i++){
			for (var j = 0; j < this.HorizontalCount; j++){
				this.Points.push(new Point(j,i, count));
				count++;
			}
		}
	}
	
	getUnvisitedNeighbours(elem){
		
		var neighbours = [];
		//top
		if (elem - this.HorizontalCount >= 0 && this.Points[elem - this.HorizontalCount].Visited == false)
			neighbours.push(this.Points[elem - this.HorizontalCount]);
		//bot
		if (elem + this.HorizontalCount < this.Points.length && this.Points[elem + this.HorizontalCount].Visited == false)
			neighbours.push(this.Points[elem + this.HorizontalCount]);
		//left
		if ((elem + 1) % this.HorizontalCount != 0 && this.Points[elem + 1].Visited == false)
			neighbours.push(this.Points[elem + 1]);
		//right
		if (elem % (this.HorizontalCount) != 0 && this.Points[elem - 1].Visited == false)
			neighbours.push(this.Points[elem - 1]);
		
		return neighbours;
	}
	
	getRandomNeighbour(rectangle){
		var elem = rectangle.Position;
		var neighbours = this.getUnvisitedNeighbours(elem);		
		return neighbours[this.getRndInteger(0,neighbours.length - 1)];
	}
	
	getRndInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1) ) + min;
	}
	
	drawLine(fromRect, toRect, ctx){
		ctx.moveTo(fromRect.X * this.PointDistance + this.EdgeDistance, fromRect.Y * this.PointDistance + this.EdgeDistance);
		ctx.lineTo(toRect.X * this.PointDistance + this.EdgeDistance, toRect.Y * this.PointDistance + this.EdgeDistance);
		ctx.stroke();
		toRect.Visited = true;
		
		this.VisitedCount++;
		if (this.VisitedCount >= this.Points.length - 1){
			this.HasUnvisited = false;
		}
	}
	
	getRandomStartingPoint(){
		var point = this.Points[this.getRndInteger(0, this.Points.length - 1)];
		point.Visited = true;
		return point;
	}
	
	

}