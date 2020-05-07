class Vector3D {
				
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	};
				
	substract(vector3D) {
		return new Vector3D(this.x - vector3D.x, this.y - vector3D.y, this.z - vector3D.z);
	};
				
	add(vector3D) {
		return new Vector3D(this.x + vector3D.x, this.y + vector3D.y, this.z + vector3D.z);
	}
				
	multiply(value) {
		this.x = value * this.x;
		this.y = value * this.y;
		this.z = value * this.z;
	};
				
	magSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	};
				
	mag() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	};
				
	distance(vector3D) {
		var distanceX = this.x - vector3D.x;
		var distanceY = this.y - vector3D.y;
		var distanceZ = this.z - vector3D.z;
		return Math.sqrt(distanceX * distanceX + distanceY * distanceY + distanceZ * distanceZ);
	};
	
	getX(){
		return this.x;
	};
	
	getY(){
		return this.y;
	};
	
	getZ(){
		return this.z;
	};
			
}