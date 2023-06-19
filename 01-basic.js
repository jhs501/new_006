import * as THREE from 'https://threejs.org/build/three.module.js';

class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupModel();
        this._setupCamera();
        this._setupLight();

        window.addEventListener('resize', this.resize.bind(this));
        this.resize();

        const cameraDistanceInput = document.querySelector("#camera-distance");
        cameraDistanceInput.addEventListener('input', () => {
            this._camera.position.z = cameraDistanceInput.value;
        });

        const textureButton = document.querySelector("#texture-button");
        textureButton.addEventListener('click', () => {
            if (this._currentTexture === './4.png') {
                this._currentTexture = './5.png';
            } else {
                this._currentTexture = './4.png';
            }
            const texture = new THREE.TextureLoader().load(this._currentTexture);
            this._cube.material.map = texture;
            this._cube.material.needsUpdate = true;
        });

        const lightIntensityInput = document.querySelector("#light-intensity");
        lightIntensityInput.addEventListener('input', () => {
            const intensity = lightIntensityInput.value;
            this._light.intensity = intensity;
        });

        this._currentTexture = './4.png';

        requestAnimationFrame(this.render.bind(this));
    }

    _setupModel() {
        const geometry = new THREE.BoxGeometry(2, 1, 1);
        const texture = new THREE.TextureLoader().load('./4.png');
        const material = new THREE.MeshPhongMaterial({ map: texture });
        const cube = new THREE.Mesh(geometry, material);
        this._scene.add(cube);
        this._cube = cube;
    }

    _setupCamera() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        camera.position.z = 5;
        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 3;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
        this._light = light;
    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(width, height);
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }

    update(time) {
        time *= 0.001;
        this._cube.rotation.x = time;
        this._cube.rotation.y = time;
    }
}

window.onload = function () {
    new App();
}
