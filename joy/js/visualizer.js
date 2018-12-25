var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, $(window).width() / $(window).height(), 1, 1000);
//var renderer = new THREE.WebGLRenderer({antialias: true});
//var cubes = new Array();
var controls;

//var scene = new THREE.Scene();
//var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50 );
camera.position.z = 30;

var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x171717 );

document.body.appendChild(renderer.domElement);


/*var i = 0;
for(var x = 0; x < 10; x += 2) {
	var j = 0;
	cubes[i] = new Array();
	for(var y = 0; y < 10; y += 2) {
		var geometry = new THREE.CubeGeometry(1.5, 1.5, 1.5);
		
		var material = new THREE.MeshPhongMaterial({
			color: 'silver',//randomFairColor(),
			ambient: 0x808080,
			specular: 0xffffff,
			shininess: 20,
			reflectivity: 5.5 
		});
		
		cubes[i][j] = new THREE.Mesh(geometry, material);
		cubes[i][j].position = new THREE.Vector3(x, y, 0);
		
		//scene.add(cubes[i][j]);
		j++;
	}
	i++;
}*/
/*

var light = new THREE.AmbientLight(0x000000);
scene.add(light);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);


directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, -1, -1);
scene.add(directionalLight);

directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(-1, -1, 0);
scene.add(directionalLight);
*/
/*
var light, object;

scene.add( new THREE.AmbientLight( 0x404040 ) );

light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0, 1, 0 );
scene.add( light );*/


/*

var lights = [];
lights[ 0 ] = new THREE.DirectionalLight( 0xffffff, 1, 0 );
lights[ 1 ] = new THREE.DirectionalLight( 0xffffff, 1, 0 );
lights[ 2 ] = new THREE.DirectionalLight( 0xffffff, 1, 0 );

lights[ 0 ].position.set( 0, 2000, 0 );
lights[ 1 ].position.set( 1000, 2000, 1000 );
lights[ 2 ].position.set( - 1000, - 2000, - 1000 );

scene.add( lights[ 0 ] );
scene.add( lights[ 1 ] );
scene.add( lights[ 2 ] );
*/


//var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.3 );
//directionalLight.position.set( 30, -80, -80 );
//directionalLight.position.set(300, 400, 50);
//scene.add( directionalLight );


//var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.4 );
//scene.add( light );

//camera.position.z = 80;
camera.position.set(0,-66,-50);

controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;




//controls = new THREE.OrbitControls(camera);
//controls.addEventListener('change', render);
/*for(var i = 0; i < 7; i++) {
	controls.pan(new THREE.Vector3( 1, 0, 0 ));
	controls.pan(new THREE.Vector3( 0, 1, 0 ));
}*/



var planeGeometry = new THREE.PlaneGeometry( 60, 60, 30, 30);
var planeVertexes = planeGeometry.vertices;
var planeVerticesLen = planeVertexes.length;

var material = new THREE.MeshBasicMaterial( {color: 0xa9a9a9, wireframe: true, side: THREE.DoubleSide, shading: THREE.FlatShading} );

var plane = new THREE.Mesh( planeGeometry, material );

//plane.rotation.x = 2.37;

scene.add( plane );

var geometry = new THREE.BoxGeometry( 10, 10, 10 );
var material2 = new THREE.MeshBasicMaterial( {color: 'purple', wireframe: false} );
var cube = new THREE.Mesh( geometry, material2 );
//scene.add( cube );


//scene.fog = new THREE.Fog('darkred', 1, 100);
/*
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;

//renderer.shadowCameraNear = 10;
//renderer.shadowCameraFar = camera.far;
//renderer.shadowCameraFov = 80;

renderer.shadowMapBias = 0.0039;
renderer.shadowMapDarkness = 0.1;
renderer.shadowMapWidth = 1024;
renderer.shadowMapHeight = 1024;

directionalLight.castShadow = true;
plane.castShadow = true;
plane.receiveShadow = true;*/


//console.log(cubes);
console.log(planeVertexes);


var counter = 0;
var increase = Math.PI * 2 / 270;

var render = function () {


	if(typeof array === 'object' && array.length > 0) {


		if(boost < 10){
			//console.log(boost);

		}

		for ( var i = 0; i < planeVerticesLen; i ++ ) {

			var scale = (array[i] + boost) / 30;
			scale = scale * 0.5 ? scale : 0;
			//console.log(Math.sin( i / scale )
			planeVertexes[ i ].z =  scale * 1.3 * -1;
			//planeVertexes[ i ].z = Math.sin( i / scale ) * 0.5;

			//planeVertexes[ i ].z = Math.sin( (i / 5) + (counter/500)) ;
		}

		//counter += increase;
		plane.geometry.verticesNeedUpdate = true;
		plane.rotation.z += 0.007;

		/*var k = 0;
		for(var i = 0; i < cubes.length; i++) {
			for(var j = 0; j < cubes[i].length; j++) {
				var scale = (array[k] + boost) / 30;
				cubes[i][j].scale.z = (scale < 1 ? 1 : scale);
				k += (k < array.length ? 1 : 0);
			}
		}*/
	}

	requestAnimationFrame(render);
	//controls.update();
	renderer.render(scene, camera);
};

render();
renderer.setSize($(window).width(), $(window).height());




