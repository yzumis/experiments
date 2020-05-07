function init() {
	var scene = new THREE.Scene();
	var clock = new THREE.Clock();

	// initialize objects
	var plane = getPlane(100, 100);
	var boxA = getBox(1, 30, 1, -10, 15, 0);
	var boxB = getBox(1, 30, 1, 10, 15, 0);
	var topBox = getBox(21, 1, 1, 0, 30.5, 0);
	var directionalLight = getDirectionalLight();
	//var directionalLightSecondary = getDirectionalLightSecondary();
	var dotsMatrix = getDotsMatrix(scene);
	var sticks = getSticks(dotsMatrix, scene);
	getClothe(dotsMatrix, scene);
	// manipulate objects
	plane.rotation.x = Math.PI/2;

	// add objects to the scene
	scene.add(plane);
	scene.add(boxA);
	scene.add(boxB);
	scene.add(topBox);
	scene.add(directionalLight);
	//scene.add(directionalLightSecondary);
	
	// camera
	var camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		1000 // far clipping plane
	);
	camera.position.z = 60;
	camera.position.x = 20;
	camera.position.y = 40;
	var cameraLookAt = new THREE.Vector3(0, 10, 0);
	camera.lookAt(cameraLookAt);

	// renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.renderSingleSided = false;
	document.getElementById('webgl').appendChild(renderer.domElement);

	var controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.target = cameraLookAt;

	update(renderer, scene, camera, controls, clock, dotsMatrix, sticks);

	return scene;
}

function getPlane(sizeX, sizeY) {
	var color = 'rgb(0, 255, 0)';
	var materialOptions = {
		color: color,
		side: THREE.DoubleSide
	};
	var material = new THREE.MeshStandardMaterial(materialOptions);
	var geometry = new THREE.PlaneGeometry(sizeX, sizeY);
	var ret = new THREE.Mesh(geometry, material);
	ret.receiveShadow = true;
	ret.castShadow = true;
	return ret;
}

function getBox(sizeX, sizeY, sizeZ, positionX, positionY, positionZ) {
	var color =  'rgb(255, 0, 0)';
	var materialOptions = {
		color: color
	};
	var material = new THREE.MeshStandardMaterial(materialOptions);
	var geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
	var ret = new THREE.Mesh(geometry, material);
	ret.position.x = positionX;
	ret.position.y = positionY;
	ret.position.z = positionZ;
	ret.receiveShadow = true;
	ret.castShadow = true;
	return ret;
}

function getSphere(size, positionX, positionY, positionZ, name) {
	var color =  'rgb(255, 0, 0)';
	var materialOptions = {
		color: color
	};
	var material = new THREE.MeshStandardMaterial(materialOptions);
	var geometry = new THREE.SphereGeometry(size, 32, 32 );
	var ret = new THREE.Mesh(geometry, material);
	ret.position.x = positionX;
	ret.position.y = positionY;
	ret.position.z = positionZ;
	ret.receiveShadow = true;
	ret.castShadow = true;
	ret.name = name;
	return ret;
}

function getDirectionalLight() {
	var ret = new THREE.DirectionalLight( 'rgb(255, 255, 255)', 5); // color + shinning
	ret.position.set(200, 200, 200);
	ret.castShadow = true;
	ret.shadow.mapSize.width = 2048;
	ret.shadow.mapSize.height = 2048;
	ret.shadow.camera.left = -100;
	ret.shadow.camera.right = 100;
	ret.shadow.camera.top = 100;
	ret.shadow.camera.bottom = -100;
	ret.target.position.set(new THREE.Vector3(0, 0, 0));
	ret.shadow.bias = -0.003;
	return ret;
}

function getDirectionalLightSecondary() {
	var ret = new THREE.DirectionalLight( 'rgb(255, 255, 255)', 2); // color + shinning
	ret.position.set(200, 200, -200);
	ret.castShadow = true;
	ret.shadow.mapSize.width = 2048;
	ret.shadow.mapSize.height = 2048;
	ret.shadow.camera.left = -100;
	ret.shadow.camera.right = 100;
	ret.shadow.camera.top = 100;
	ret.shadow.camera.bottom = -100;
	ret.target.position.set(new THREE.Vector3(0, 0, 0));
	ret.shadow.bias = -0.003;
	return ret;
}


function getDotsMatrix(scene) {
	var ret = [];
	for(var i = 0; i < 20; i++) {
		var dotsVector = [];
		for (var j = 0; j < 20; j++) {
			var pinned = j === 0;
			var x = i - 10;
			var y = 30 - j;
			var z = 0;
			var dot = new Dot(x, y, z, 0.1, pinned);
			dotsVector.push(dot);
		}
		ret.push(dotsVector);
	}
	return ret;
};

function getSticks(dotsMatrix, scene) {
	ret = [];
	for(var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			if(i < 19) {
				ret.push(new Stick(dotsMatrix[i][j], dotsMatrix[i + 1][j]));
			}
			if(j < 19) {
				ret.push(new Stick(dotsMatrix[i][j], dotsMatrix[i][j + 1]));
			}
		}
	}
	return ret;
}

function getClothe(dotsMatrix, scene) {
	for(var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			if(i<19 && j <19) {
				var geometry = new THREE.Geometry();
				geometry.vertices.push(
					new THREE.Vector3(
						dotsMatrix[i][j].getCurrentPosition().getX(),
						dotsMatrix[i][j].getCurrentPosition().getY(),
						dotsMatrix[i][j].getCurrentPosition().getZ()
					),
					new THREE.Vector3(
						dotsMatrix[i + 1][j].getCurrentPosition().getX(),
						dotsMatrix[i + 1][j].getCurrentPosition().getY(),
						dotsMatrix[i + 1][j].getCurrentPosition().getZ()
					),
					new THREE.Vector3(
						dotsMatrix[i][j + 1].getCurrentPosition().getX(),
						dotsMatrix[i][j + 1].getCurrentPosition().getY(),
						dotsMatrix[i][j + 1].getCurrentPosition().getZ()
					),
					new THREE.Vector3(
						dotsMatrix[i + 1][j + 1].getCurrentPosition().getX(),
						dotsMatrix[i + 1][j + 1].getCurrentPosition().getY(),
						dotsMatrix[i + 1][j + 1].getCurrentPosition().getZ()
					),
				);
				geometry.faces.push(
					new THREE.Face3(0, 1, 2),
					new THREE.Face3(1, 3, 2)
				);
				geometry.computeFaceNormals();
				geometry.computeVertexNormals();
				var color = 'rgb(0, 0, 255)';
				var materialOptions = {
					color: color,
					side: THREE.DoubleSide
				};
				var material = new THREE.MeshStandardMaterial(materialOptions);
				var clothePortion = new THREE.Mesh(geometry, material);
				clothePortion.receiveShadow = true;
				clothePortion.castShadow = true;
				var clothePortionName = 'clothePortion-' + i + '-' + j;
				clothePortion.name = clothePortionName;
				scene.add(clothePortion);
			}
			
		}
	}
}

function update(renderer, scene, camera, controls, clock, dotsMatrix, sticks) {
	controls.update();
	
	var elapsedTime = clock.getElapsedTime();
	
	//////
	for (var dotsVector of dotsMatrix) {
		for(var dot of dotsVector) {
			if(!dot.pinned) {
				dot.update();
			}
		}
	}
	for(var i = 0; i < 50; i++) {
		for (var dotsVector of dotsMatrix) {
			for(var dot of dotsVector) {
				dot.constrain();
			}
		}			
		for (var stick of sticks) {
			stick.update();
		}
	}
	////////////
	for(var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			if(i < 19 && j < 19) {
				var clothePortionName = 'clothePortion-' + i + '-' + j;
				var clothePortion = scene.getObjectByName(clothePortionName);
				var clothePortionGeometry = clothePortion.geometry;
				clothePortionGeometry.vertices[0].x = dotsMatrix[i][j].getCurrentPosition().getX();
				clothePortionGeometry.vertices[0].y = dotsMatrix[i][j].getCurrentPosition().getY();
				clothePortionGeometry.vertices[0].z = dotsMatrix[i][j].getCurrentPosition().getZ();
				clothePortionGeometry.vertices[1].x = dotsMatrix[i + 1][j].getCurrentPosition().getX();
				clothePortionGeometry.vertices[1].y = dotsMatrix[i + 1][j].getCurrentPosition().getY();
				clothePortionGeometry.vertices[1].z = dotsMatrix[i + 1][j].getCurrentPosition().getZ();
				clothePortionGeometry.vertices[2].x = dotsMatrix[i][j + 1].getCurrentPosition().getX();
				clothePortionGeometry.vertices[2].y = dotsMatrix[i][j + 1].getCurrentPosition().getY();
				clothePortionGeometry.vertices[2].z = dotsMatrix[i][j + 1].getCurrentPosition().getZ();
				clothePortionGeometry.vertices[3].x = dotsMatrix[i + 1][j + 1].getCurrentPosition().getX();
				clothePortionGeometry.vertices[3].y = dotsMatrix[i + 1][j + 1].getCurrentPosition().getY();
				clothePortionGeometry.vertices[3].z = dotsMatrix[i + 1][j + 1].getCurrentPosition().getZ();
				clothePortionGeometry.verticesNeedUpdate = true;
				
			}
		}
	}
	//////
	renderer.render(scene, camera);
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls, clock, dotsMatrix, sticks);
	});
}

var scene = init();
