class Dot {
			
	constructor(x, y, z, radius, pinned) {
		this.currentPosition = new Vector3D(x, y, z);
		this.oldPosition = new Vector3D(x, y, z);
		this.friction = 0.97;
		this.groundFriction = 0.7;
		this.gravity = new Vector3D(0, -1, 0);
		this.radius = radius;
		this.color = 'red';
		this.mass = 1;
		if(!pinned) {
			this.pinned = false;
		} else {
			this.pinned = pinned;
		}
		this.updateNumber = 500;
	};
				
	update() {
		var velocity = this.currentPosition.substract(this.oldPosition);
		velocity.multiply(this.friction);
					
		if (this.currentPosition.y - this.radius / 2 < 0 && velocity.magSq() > 0.000001) {
			var mag = velocity.mag();
			velocity.x /= mag;
			velocity.y /= mag;
			velocity.z /= mag;
			velocity.multiply(mag * this.groundFriction);
		}
		this.oldPosition = new Vector3D(this.currentPosition.x, this.currentPosition.y, this.currentPosition.z);
		this.currentPosition = this.currentPosition.add(velocity);
		this.currentPosition = this.currentPosition.add(this.gravity);
		this.currentPosition = this.currentPosition.add(new Vector3D(0, 0, - Math.random() * 0.5));
	};
				
	constrain() {
		if (this.currentPosition.y - this.radius / 2 < 0) {
			this.currentPosition.y = this.radius / 2;
		}
	};
	
	getCurrentPosition() {
		return this.currentPosition;
	};
				
};