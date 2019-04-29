/*
  TODO: other animation.
  maybe rotating and wawing flat
  like on prev site but with spheres.
*/
import * as THREE from 'three';

import './style.less';

var scene = new THREE.Scene();

var W = window.innerWidth;
var H = window.innerHeight;

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x17293a);
renderer.setSize(W, H);

var camera = new THREE.PerspectiveCamera(45, W / H, 0.01, 10000);

var planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
var planeMaterial = new THREE.MeshBasicMaterial({wireframe: true, color: '#4d555d'});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -0.5 * Math.PI;

plane.position.set(0, 0, 0);

scene.add(plane);

camera.position.set(0, 90, 100);
camera.lookAt(scene.position);

renderer.domElement.id = 'background';
document.body.appendChild(renderer.domElement);

let move = 0.01;
(function drawFrame(){
  var vLength = plane.geometry.vertices.length;
  var center = new THREE.Vector2();
  window.requestAnimationFrame(drawFrame);
  for (var i = 0; i < vLength; i++) {
    var v = plane.geometry.vertices[i];
    var dist = new THREE.Vector2(v.x, v.y).sub(center);
    var size = 5.0;
    var magnitude = 2.5;
    v.z = Math.sin(dist.length()/-size + (move)) * magnitude;
  }
  plane.geometry.verticesNeedUpdate = true;
  renderer.render(scene, camera);
  move += 0.05;
}());