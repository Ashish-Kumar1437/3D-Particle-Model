import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);


const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,0,40);
const orbitContol=new OrbitControls(camera,renderer.domElement);
orbitContol.update();

const figureGeometry=new THREE.BoxGeometry(10,10,10,10,10,10);
const figureMaterial=new THREE.PointsMaterial({size:0.01});
const figure=new THREE.Points(figureGeometry,figureMaterial);
scene.add(figure);

const clock=new THREE.Clock()
function animate(){
    figure.rotation.y += 0.005;
    figure.rotation.x += 0.005;
    renderer.render(scene,camera);
}
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);