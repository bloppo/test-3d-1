import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

import GUI from 'lil-gui'

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

const fontLoader = new FontLoader()

const donuts = []

fontLoader.load('/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const textGeometry = new TextGeometry(
      'Hello Three.js',
      {
        font: font,
        size: 0.45,
        depth: 0.1,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      }
    )
    //const textMaterial = new THREE.MeshBasicMaterial()
    const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
    matcapTexture.colorSpace = THREE.SRGBColorSpace

    const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

    const text = new THREE.Mesh(textGeometry, material)
    text.position.y = 1
    text.position.x = -2

    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
    //const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

      for(let i = 0; i < 100; i++)
      {
          const donut = new THREE.Mesh(donutGeometry, material)

          donut.position.x = (Math.random() - 0.5) * 10
          donut.position.y = (Math.random() - 0.5) * 10
          donut.position.z = (Math.random() - 0.5) * 10

          donut.rotation.x = Math.random() * Math.PI
          donut.rotation.y = Math.random() * Math.PI

          const scale = Math.random()
          donut.scale.set(scale, scale, scale)

          donuts.push(donut)

          scene.add(donut)
      }

    scene.add(text)
  }
  )


const gui = new GUI();

const debugObject = {};

let time = Date.now();

function animate() {
  // Time
  const currentTime = Date.now()
  const deltaTime = (currentTime - time)*0.0025
  const donutDeltaTime = (currentTime - time)*0.005
  time = currentTime

  sphere.rotation.y += 0.1 * deltaTime;
  plane.rotation.y += 0.1 * deltaTime;
  torus.rotation.y += 0.1 * deltaTime;

  sphere.rotation.x += - 0.15 * deltaTime;
  plane.rotation.x += - 0.15 * deltaTime;
  torus.rotation.x += - 0.15 * deltaTime;

  sphere2.rotation.y += 0.2 * deltaTime;
  plane2.rotation.y += 0.2 * deltaTime;
  torus2.rotation.y += 0.2 * deltaTime;

  sphere2.rotation.x += - 0.15 * deltaTime;
  plane2.rotation.x += - 0.15 * deltaTime;
  torus2.rotation.x += - 0.15 * deltaTime;

  for (let i = 0; i < donuts.length; i++){
    donuts[i].rotation.x += (Math.random()) * donutDeltaTime;
    donuts[i].rotation.y += (Math.random()) * donutDeltaTime;
  }

  controls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(animate);

}

const can = document.getElementById('can');
let wx = window.innerWidth;
let wy = window.innerHeight;

console.log(wx," ",wy);

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

//const material = new THREE.MeshBasicMaterial();
//material.map = doorColorTexture;
//material.color = new THREE.Color('green')
//material.wireframe = true;
//material.transparent = true;
//material.opacity = 0.5;
//material.alphaMap = doorAlphaTexture
//material.sides = THREE.DoubleSide;

// const material = new THREE.MeshNormalMaterial();
// material.map = doorColorTexture;

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture;

//const material = new THREE.MeshDepthMaterial()

//const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 10
// material.specular =new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7;
material.roughness = 0;
material.map = doorColorTexture;
material.aomap = doorAmbientOcclusionTexture;
material.aoMapIntensity = 1;
material.displacementMap = doorHeightTexture
material.displacementScale = 0.01

gui.add(material,'metalness').min(0).max(1).step(0.0001)
gui.add(material,'roughness').min(0).max(1).step(0.0001)

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  material
)

sphere.position.x = -1.5

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1,1),
  material
)

plane.position.x = 0

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
)

torus.position.x = 1.5

const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  material
)

sphere2.position.x = 3.0

const plane2 = new THREE.Mesh(
  new THREE.PlaneGeometry(1,1),
  material
)

plane2.position.x = 4.5

const torus2 = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
)

  torus2.position.x = 6.0

scene.add(sphere,plane,torus,sphere2,plane2,torus2)

// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
//
// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
//
// scene.add(ambientLight, pointLight);

const rgbeLoader = new RGBELoader()
rgbeLoader.load('/textures/environmentMap/2k.hdr',(envMap)=>{
  console.log("envMap")
  material.envMap = envMap;
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = envMap
  scene.environmentMap = envMap;
})

document.addEventListener('keydown', (event) => {
  //console.log("key down",event.key," ",event.code)
  switch(event.code){
    case 'ArrowUp':
      camera.position.z += 0.1
      break;
    case 'ArrowDown':
      camera.position.z -= 0.1
      break;
    case 'ArrowLeft':
      camera.position.x += 0.1
      camera.rotation.x += 0.1
      break;
    case 'ArrowRight':
      camera.position.x -= 0.1
      camera.rotation.x -= 0.1
      break;
  }
})

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.addEventListener('click', (event) => {
  mouse.x = (event.clientX / wx) * 2 - 1;
  mouse.y = -(event.clientY / wy) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    //intersects[0].object.material.color.set(0xff0000); // Highlight object
    //intersects[0].object.position.x += 1
    console.log(intersects);
  }
});

//scene.add(text);

const camera = new THREE.PerspectiveCamera(75, wx / wy, 0.1, 1000);

camera.position.z = 5;

scene.add(camera);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(wx, wy);

const controls = new OrbitControls(camera,can) ; //renderer.domElement);

renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

can.appendChild(renderer.domElement);

animate();
