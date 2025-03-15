// Scroll Animation using IntersectionObserver
const hiddenElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-up');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

hiddenElements.forEach(el => observer.observe(el));

// Three.js Interactive Particle Background
const canvas = document.getElementById('bg');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Particle System
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 500;
const posArray = new Float32Array(particlesCount * 3);
const velocities = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
    velocities[i] = (Math.random() - 0.5) * 0.02;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.3,
    color: 0xff0000,
    transparent: true,
    opacity: 0.7,
});

const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particleMesh);

camera.position.z = 50;

// Mouse Movement Effect
document.addEventListener('mousemove', (event) => {
    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = -(event.clientY / window.innerHeight) * 2 + 1;
    camera.position.x = x * 5;
    camera.position.y = y * 5;
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    const positions = particlesGeometry.attributes.position.array;
    const velocities = particlesGeometry.attributes.velocity.array;

    for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] += velocities[i];

        if (positions[i] > 50 || positions[i] < -50) {
            velocities[i] = -velocities[i];
        }
    }

    particlesGeometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
}
animate();

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
