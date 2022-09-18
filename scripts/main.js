import * as THREE from './three.module.js';
import {OrbitControls} from './OrbitControls.js';
import {DragControls} from './DragControls.js';


// Scene
const scene = new THREE.Scene();

var loader = new THREE.TextureLoader();
loader.load('../images/fondo2.jpg', function(texture){
    scene.background = texture;
});


// Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 75;


// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// Orbit Controls
var orbit = new OrbitControls(camera, renderer.domElement);


// Responsive
window.addEventListener('resize', redimensionar);

function redimensionar () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );

}


// Clase del Laberinto
class Maze {

    constructor () {

        this.pared = [];
        this.toru = [];

    }

    createWall (width, height, color, x, y, z) {

        let wall = new Wall(width, height, color);
        wall.showWall(width, height, color, x, y, z);

    }

    createToru (radius, tube, radialSegments, tubularSegments, color, x, y, z) {

        let toru = new Toru(radius, tube, radialSegments, tubularSegments, color);
        toru.showToru(radius, tube, radialSegments, tubularSegments, color, x, y, z);
        toru.dragControl();

    }
}


// Clase de la Pared
class Wall {

    constructor (width, height, color) {

        this.width = width;
        this.height = height;
        this.color = color;

    }

    showWall (width, height, color, x, y, z) {

        const geometry = new THREE.PlaneGeometry( width, height );
        const material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide} );
        const plane = new THREE.Mesh( geometry, material );
        plane.position.x = x;
        plane.position.y = y;
        plane.rotation.z = z;
        scene.add( plane );

    }
}


// Clase del Toru
class Toru {

    constructor (radius, tube, radialSegments, tubularSegments, color) {

        this.radius = radius;
        this.tube = tube;
        this.radialSegments = radialSegments;
        this.tubularSegments = tubularSegments;
        this.color = color;

    }

    showToru (radius, tube, radialSegments, tubularSegments, color, x, y, z) {

        const geometry = new THREE.TorusGeometry( radius, tube, radialSegments, tubularSegments );
        const material = new THREE.MeshBasicMaterial( { color: color } );
        const torus = new THREE.Mesh( geometry, material );
        torus.position.x = x;
        torus.position.y = y;
        torus.position.z = z;
        this.torus = torus;
        scene.add( this.torus );

        var changex = 0.0;
        var changey = 0.0;

        var animate = function(){
            requestAnimationFrame(animate); 
        
            torus.rotation.x += 0.017; 
            torus.rotation.y += 0.017;

            torus.position.x = torus.position.x + changex;
            torus.position.y = torus.position.y + changey;

            if(torus.position.x == -48 && torus.position.y >= 0){
                torus.position.y = 0;
                changex = 0.5;
                changey = 0;
            }

            if(torus.position.x == -14 && torus.position.y == 0){
                torus.position.x = -14;
                changex = 0;
                changey = -0.5;
            }

            if(torus.position.x == -14 && torus.position.y == -37){
                torus.position.y = -37
                changex = 0.5;
                changey = 0;
            }

            if(torus.position.x == 27 && torus.position.y == -37){
                torus.position.x = 27;
                changex = 0;
                changey = 0.5;
            }

            if(torus.position.x == 27 && torus.position.y == 0){
                torus.position.y = 0;
                changex = -0.5;
                changey = 0;
            }

            if(torus.position.x == 7 && torus.position.y == 0){
                torus.position.x = 7;
                changex = 0;
                changey = 0.5;
            }

            if(torus.position.x == 7 && torus.position.y == 0){
                torus.position.x = 7;
                changex = 0;
                changey = 0.5;
            }

            if(torus.position.x == 7 && torus.position.y == 36){
                torus.position.y = 36;
                changex = 0.5;
                changey = 0;
            }

            if(torus.position.x == 27 && torus.position.y == 36){
                torus.position.x = 27;
                changex = 0;
                changey = -0.5;
            }

            if(torus.position.x == 27 && torus.position.y == 17){
                torus.position.y = 17;
                changex = 0.5;
                changey = 0;
            }

            if(torus.position.x == 47 && torus.position.y == 17){
                torus.position.x = x;
                torus.position.y = y;
            }

        
            renderer.render(scene, camera); 
        }
        
        animate();
    }

    dragControl() {
        var dControl = new DragControls([this.torus], camera, renderer.domElement);

        dControl.addEventListener('dragstart', () => {
            orbit.enabled = false;
        });

        dControl.addEventListener('dragend', () =>{
            orbit.enabled = true;
        });
    }

}


let maze = new Maze();


//-------- Agregar Paredes --------------------------------------------------------------------------
const width = 2;
const height = 20;
const color = 0x000000;

function wall (width, height, color, x, y, z) {

    maze.createWall(width, height, color, x, y, z);
    renderer.render(scene,camera);

}

function createWalls () {

    wall(width, height, color, -32, -8, 1.57);
    wall(width, height, color, -12, 8, 1.57);
    wall(width, height, color, -32, 8, 1.57);
    
    wall(width, height, color, -23, -18, 6.284);
    wall(width, height, color, -3, -2, 6.284);
    wall(width, height, color, -3, -18, 6.284);

    wall(width, height, color, -32, -48, 1.57);
    wall(width, height, color, -12, -48, 1.57);

    wall(width, height, color, -41, -18, 6.284);
    wall(width, height, color, -41, -38, 6.284);

    wall(width, height, color, 8, -27, 1.57);
    wall(width, height, color, 8, -48, 1.57);

    wall(width, height, color, 17, -18, 6.284);
    wall(width, height, color, 37, -18, 6.284);
    wall(width, height, color, 37, -38, 6.284);

    wall(width, height, color, 28, -48, 1.57);
    wall(width, height, color, 28, 8, 1.57);

    wall(width, height, color, 37, -1, 6.284);
    wall(width, height, color, 18, 17, 6.284);
    wall(width, height, color, -42, 17, 6.284);
    wall(width, height, color, -42, 37, 6.284);
    wall(width, height, color, -22, 35, 6.284);

    wall(width, height, color, -12, 26, 1.57);
    wall(width, height, color, -32, 46, 1.57);
    wall(width, height, color, -12, 46, 1.57);
    wall(width, height, color, 8, 46, 1.57);
    wall(width, height, color, 28, 46, 1.57);

    wall(width, height, color, 37, 35, 6.284);

}

document.addEventListener('DOMContentLoaded', createWalls, false);


//-------- Agregar Torus -----------------------------------------------------------------------------------------------
const radius = 2.5;
const tube = 0.8;
const radialSegments = 16;
const tubularSegments = 100;

function toru (radius, tube, radialSegments, tubularSegments, color, x, y, z) {
    maze.createToru(radius, tube, radialSegments, tubularSegments, color, x, y, z);
    renderer.render(scene,camera);
}

function createToru () {

    toru(radius, tube, radialSegments, tubularSegments, 0xe30000, -48, 0, 0);
    
}

document.addEventListener('DOMContentLoaded', createToru, false);