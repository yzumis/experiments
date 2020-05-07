class Stick {
			
	constructor(startDot, endDot, length) {
		this.startDot = startDot;
		this.endDot = endDot;
		this.stiffness = 2;
		this.color = 'black';
		// if the length is not given then calculate the distance based on position
		if (!length) {
			this.length = this.startDot.currentPosition.distance(this.endDot.currentPosition);
		} else {
			this.length = length;
		}
	};
				
	update() {
		let distanceX = this.endDot.currentPosition.x - this.startDot.currentPosition.x;
		let distanceY = this.endDot.currentPosition.y - this.startDot.currentPosition.y;
		let distanceZ = this.endDot.currentPosition.z - this.startDot.currentPosition.z;
		// pythagoras theorem
		let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY + distanceZ * distanceZ);
		// calculate the resting distance betwen the dots
		let difference = (this.length - distance) / distance * this.stiffness;

		// getting the offset of the points
		let offsetX = distanceX * difference * 0.5;
		let offsetY = distanceY * difference * 0.5;
		let offsetZ = distanceZ * difference * 0.5;

		// calculate mass
		let m1 = this.startDot.mass + this.endDot.mass;
		let m2 = this.startDot.mass / m1;
		m1 = this.endDot.mass / m1;

		// and finally apply the offset with calculated mass
		if (!this.startDot.pinned) {
			this.startDot.currentPosition.x -= offsetX * m1;
			this.startDot.currentPosition.y -= offsetY * m1;
			this.startDot.currentPosition.z -= offsetZ * m1;
		}
		
		if (!this.endDot.pinned) {
			this.endDot.currentPosition.x += offsetX * m2;
			this.endDot.currentPosition.y += offsetY * m2;
			this.endDot.currentPosition.z += offsetZ * m2;
		}
	};
	
	getStartDot() {
		this.startDot;
	};
	
	getEndDot() {
		this.endDot;
	};
	
};