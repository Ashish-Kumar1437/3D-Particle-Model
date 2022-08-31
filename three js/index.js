import * as THREE from 'three';
import { Points, PointsMaterial } from 'three';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import { CSSRulePlugin } from 'gsap/all';


const renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);


const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,0,40);
// const orbitContol=new OrbitControls(camera,renderer.domElement);
// orbitContol.update();


const figureGeometry=new THREE.BoxGeometry(10,10,10,10,10,10);
const figureMaterial=new THREE.PointsMaterial({size:0.15});
const figure=new THREE.Points(figureGeometry,figureMaterial);
figure.position.y=6;
scene.add(figure);

const particleGeometry=new THREE.BufferGeometry();
const particleCount=5000;
const particlePos=new Float32Array(particleCount*3);
for(var i=0;i<particleCount*3;i++){
    particlePos[i]=(Math.random() -0.5) * 500 
}
const particleMaterial=new PointsMaterial({size:0.005});
particleGeometry.setAttribute('position',new THREE.BufferAttribute(particlePos,3))
const particle=new Points(particleGeometry,particleMaterial);
scene.add(particle)

var mouseX=0,mouseY=0;

window.addEventListener('mousemove',(e)=>{
    mouseX=e.clientX;
    mouseY=e.clientY;
})

const clock=new THREE.Clock()
function animate(){
    const elapsedTime=clock.getElapsedTime();
    figure.rotation.y = 0.3 * elapsedTime;
    figure.rotation.x = 0.3 * elapsedTime;
    particle.rotation.y=-0.1 * elapsedTime;
    if(mouseX>0){
    particle.rotation.y = mouseX * (elapsedTime *0.0005);
    particle.rotation.x = -mouseY * (elapsedTime *0.0005);
    }
    renderer.render(scene,camera);
}
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize',()=>{
    camera.aspect=window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight)
})

window.onload=()=>{
    const line= document.querySelector('span')
    // const line=CSSRulePlugin.getRule('content:before')
    console.log(line)
    const p=document.querySelector('p')
    const h1=document.querySelector('h1')
    const t1=gsap.timeline();
    t1.from(line,{delay:0.5,duration:4,scaleX:'0'})
    t1.to(h1,{duration:2,clipPath:'polygon(0 0, 100% 0, 100% 100%, 0 100%)'},'-=3')
    t1.to(p,{duration:2,clipPath:'polygon(0 0, 100% 0, 100% 100%, 0 100%)'},'-=2')
}