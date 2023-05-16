import * as THREE from 'three';

// Create a scene
var scene = new THREE.Scene();

// Create a camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 5);
camera.lookAt(scene.position);

// Create a renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//

// Create a group for the village objects
var villageGroup = new THREE.Group();
scene.add(villageGroup);
villageGroup.position.set(0, 0, 0);

// Create the ground
var groundGeometry = new THREE.PlaneGeometry(10, 10);
var groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
//scene.add(ground);
villageGroup.add(ground);

// Create the water tank
var waterTankGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
var waterTankMaterial = new THREE.MeshBasicMaterial({ color: 'blue' });
var waterTank = new THREE.Mesh(waterTankGeometry, waterTankMaterial);
waterTank.position.set(-3, 0.5, 0);
villageGroup.add(waterTank);

// Create the barn
var barnGeometry = new THREE.BoxGeometry(2, 2, 2);
var barnMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var barn = new THREE.Mesh(barnGeometry, barnMaterial);
villageGroup.add(barn);

// Create the barn roof
var barnRoofGeometry = new THREE.OctahedronGeometry(1.5, 0, 1, 4);
var barnRoofMaterial = new THREE.MeshBasicMaterial({ color: 'orange' });
var barnRoof = new THREE.Mesh(barnRoofGeometry, barnRoofMaterial);
barnRoof.position.y = 1;
barnRoof.rotation.y = 150;

villageGroup.add(barnRoof);

// Create the trees
var treeTrunkGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
var treeTrunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
var treeTopGeometry = new THREE.ConeGeometry(0.5, 1, 32);
var treeTopMaterial = new THREE.MeshBasicMaterial({ color: 'green' });

//NEW
var bottomCone = new THREE.Mesh( treeTopGeometry, treeTopMaterial );
var topCone = new THREE.Mesh( treeTopGeometry, treeTopMaterial );
bottomCone.position.set(-2, 1, 0);
topCone.position.set(-2, 1.5, 0);

var tree1 = new THREE.Group();
//var tree1cone = new THREE.Group();
//var tree1cone2 = new THREE.Group();
tree1.add(new THREE.Mesh(treeTrunkGeometry, treeTrunkMaterial));

//tree1cone.add(new THREE.Mesh(treeTopGeometry, treeTopMaterial));
//tree1cone2.add(new THREE.Mesh(treeTopGeometry, treeTopMaterial));
bottomCone.position.set(0,1,0);
topCone.position.set(0,1.5,0);
tree1.add(bottomCone);
tree1.add(topCone);

tree1.position.set(3, 0.5, 2);
//tree1cone.position.set(-2, 1, 0);
//tree1cone2.position.set(-2, 1.5, 0);


villageGroup.add(tree1);
//villageGroup.add(tree1cone);
//villageGroup.add(tree1cone2);

var tree2 = tree1.clone();
tree2.position.set(2, 0.5, 0);
villageGroup.add(tree2);

var tree3 = tree1.clone();
tree3.position.set(4, 0.5, -2);
villageGroup.add(tree3);

//var tree2 = new THREE.Group();
//tree2.add(new THREE.Mesh(treeTrunkGeometry, treeTrunkMaterial));
//tree2.add(new THREE.Mesh(treeTopGeometry, treeTopMaterial));
//tree2.position.set(2, 0.5, 0);
//villageGroup.add(tree2);

// Set up rotation variables
var isRotating = false;
var rotationDirection = 1;
var rotationSpeed = 0.01;

// Add buttons and sliders
var toggleRotationButton = document.createElement('button');
toggleRotationButton.innerHTML = 'Toggle Rotation';
toggleRotationButton.addEventListener('click', function () {
    isRotating = !isRotating;
});

var toggleDirectionButton = document.createElement('button');
toggleDirectionButton.innerHTML = 'Toggle Direction';
toggleDirectionButton.addEventListener('click', function () {
    rotationDirection *= -1;
});

var speedSlider = document.createElement('input');
speedSlider.type = 'range';
speedSlider.min = '0.01';
speedSlider.max = '0.1';
speedSlider.step = '0.01';
speedSlider.value = '0.01';
speedSlider.addEventListener('input', function () {
rotationSpeed = parseFloat(speedSlider.value);
});

var zoomSlider = document.createElement('input');
zoomSlider.type = 'range';
zoomSlider.min = '1';
zoomSlider.max = '10';
zoomSlider.step = '0.1';
zoomSlider.value = '5';
zoomSlider.addEventListener('input', function () {
//camera.position.z = parseFloat(zoomSlider.value);
//camera.position.x = parseFloat(zoomSlider.value);
//camera.position.y = parseFloat(zoomSlider.value);

camera.zoom = zoomSlider.value;
camera.updateProjectionMatrix();

});

document.body.appendChild(toggleRotationButton);
document.body.appendChild(toggleDirectionButton);
document.body.appendChild(speedSlider);
document.body.appendChild(zoomSlider);
document.body.insertBefore(document.createTextNode('Zoom'), zoomSlider);

// Function to handle animation
function animate() {
requestAnimationFrame(animate);
if (isRotating) {
    villageGroup.rotation.y += rotationDirection * rotationSpeed;
}

renderer.render(scene, camera);
}

// Start the animation
animate();