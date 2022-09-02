import * as THREE from 'three';
import { Points, PointsMaterial, Side } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import img0 from '../img/0.jpg'
import img1 from '../img/1.jpg'
import img2 from '../img/2.jpg'
import img3 from '../img/3.jpg'
import img4 from '../img/4.jpg'
import img5 from '../img/5.jpg'
import img6 from '../img/6.jpg'
import img7 from '../img/7.jpg'
import img8 from '../img/8.jpg'
import img9 from '../img/9.png'

const renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

//scene and camera
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,0,40);
// const orbitContol=new OrbitControls(camera,renderer.domElement);
// orbitContol.update();

//figure
const figureGeometry=new THREE.BoxGeometry(10,10,10,10,10,10);
const figureMaterial=new THREE.PointsMaterial({size:0.15});
const figure=new THREE.Points(figureGeometry,figureMaterial);
figure.position.y=6;
scene.add(figure);

//particle
const particleGeometry=new THREE.BufferGeometry();
const particleCount=1000;
const particlePos=new Float32Array(particleCount*3);
for(var i=0;i<particleCount*3;i++){
    particlePos[i]=(Math.random() -0.5) * 50 
}
const particleMaterial=new PointsMaterial({size:0.005});
particleGeometry.setAttribute('position',new THREE.BufferAttribute(particlePos,3))
const particle=new Points(particleGeometry,particleMaterial);
scene.add(particle)

//mouse
var mouseX=0,mouseY=0;
let mouse=new THREE.Vector2();
window.addEventListener('mousemove',(e)=>{
    mouseX=e.clientX;
    mouseY=e.clientY;
    mouse.set(mouseX/window.innerWidth *2 -1,-mouseY/window.innerHeight *2 +1);
})
//Raycaster

const raycaster=new THREE.Raycaster();

//Texture Loader
const loader=new THREE.TextureLoader();

//imgs
const imgGeometry=new THREE.PlaneBufferGeometry(10,10.3);
const images=[img0,img1,img2,img3,img4,img5,img6,img7,img8,img9]
const imgObj=[];
for(let i=0;i<9;i++){
    const imgMaterial=new THREE.MeshBasicMaterial({
        map:loader.load(images[i]),  
        side:THREE.DoubleSide
    })
    const img=new THREE.Mesh(imgGeometry,imgMaterial);
    img.position.set(8+(Math.random()*5),-25-i*12,0);
    scene.add(img);
    imgObj.push(img);
}

//mouse wheel
let y=0,position=0;
window.addEventListener('wheel',(e)=>{
    y=e.deltaY;
})

//animate
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

    position +=y *0.08;
    y*=0.9;
    position = position < 0 ? 0 : position
    position = position > 125 ? 125 : position
    camera.position.y=-position

    raycaster.setFromCamera(mouse,camera);
    const intersectobj=raycaster.intersectObjects(imgObj);

    for(const intersect of intersectobj){
        gsap.to(intersect.object.scale , {duration:1,y:1.5,x:1.5})
        gsap.to(intersect.object.rotation , {duration:1,y:-Math.PI/4})
    }

    for(const obj of imgObj){
        if(!intersectobj.find(intersect => intersect === obj)){
            gsap.to(obj.scale , {duration:0.5,y:1,x:1})
            gsap.to(obj.rotation , {duration:1,y:0})
        }
    }

    renderer.render(scene,camera);
}


renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

//resize
window.addEventListener('resize',()=>{
    camera.aspect=window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight)
})

window.onload=()=>{
    const line= document.querySelector('span')
    console.log(line)
    const p=document.querySelector('p')
    const h1=document.querySelector('h1')
    const t1=gsap.timeline();
    t1.from(line,{delay:0.5,duration:4,scaleX:'0'})
    t1.to(h1,{duration:2,clipPath:'polygon(0 0, 100% 0, 100% 100%, 0 100%)'},'-=3')
    t1.to(p,{duration:2,clipPath:'polygon(0 0, 100% 0, 100% 100%, 0 100%)'},'-=2')
}