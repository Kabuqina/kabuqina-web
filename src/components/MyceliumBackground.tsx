import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  #define MAX_STEPS 80
  #define MAX_DIST 20.0
  #define SURF_DIST 0.001

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float n = mix(
      mix(mix(hash(i.xy + vec2(0.0, 0.0)), hash(i.xy + vec2(1.0, 0.0)), f.x),
      mix(hash(i.xy + vec2(0.0, 1.0)), hash(i.xy + vec2(1.0, 1.0)), f.x),
      f.y
    );
    return n;
  }

  float fbm(vec3 p, float freq) {
    float val = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      val += amp * noise(p * freq);
      freq *= 2.0;
      amp *= 0.5;
    }
    return val;
  }

  float smoothMin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  float sdOrganicCluster(vec3 p, float t) {
    float dCluster = smoothMin(
      smoothMin(
        length(p - vec3(0.0, 0.0, 0.0)) - (0.7 + 0.1 * sin(t)),
        length(p - vec3(-0.8, -0.6, 0.3)) - (0.7 + 0.1 * sin(t * 0.9 + 0.5)),
        0.5
      ),
      length(p - vec3(0.7, 0.5, -0.2)) - (0.7 + 0.1 * sin(t * 1.1 + 1.0)),
      0.5
    );

    float dSecondary = smoothMin(
      length(p - vec3(0.2, -1.2, 0.1)) - (0.4 + 0.1 * sin(t * 1.3 + 1.0)),
      length(p - vec3(1.2, 0.0, 0.4)) - (0.4 + 0.1 * sin(t * 1.2 + 2.0)),
      0.5
    );

    return smoothMin(dCluster, dSecondary, 0.4);
  }

  vec3 generateClusterWaveSample(vec3 p, vec3 samplePoint, float noiseSampleCoeff, float displacement) {
    vec3 sample = vec3(
      fbm(p + samplePoint, noiseSampleCoeff),
      fbm(p + 100.0 * sin(noiseSampleCoeff * 0.2) + samplePoint, noiseSampleCoeff),
      fbm(p + 200.0 * cos(noiseSampleCoeff * 0.2) + samplePoint, noiseSampleCoeff)
    ) * exp(displacement * 0.7);
    return sample;
  }

  float sdGyroid(vec3 p, float scale, float thickness, float bias) {
    p *= scale;
    return abs(dot(sin(p), cos(p.zxy)) - bias) / scale - thickness;
  }

  float sceneSDF(vec3 p) {
    float t = uTime * 0.2;
    float cluster = sdOrganicCluster(p, t);
    float gyroid = sdGyroid(p + vec3(t * 0.1, t * 0.15, 0.0), 3.0, 0.02, 0.0);
    return smoothMin(cluster, gyroid, 0.3);
  }

  vec3 calcNormal(vec3 p) {
    vec2 e = vec2(0.001, 0.0);
    return normalize(vec3(
      sceneSDF(p + e.xyy) - sceneSDF(p - e.xyy),
      sceneSDF(p + e.yxy) - sceneSDF(p - e.yxy),
      sceneSDF(p + e.yyx) - sceneSDF(p - e.yyx)
    ));
  }

  void shadeSurface(inout vec3 col, vec3 p, vec3 normal, vec3 rayDir) {
    float t = uTime * 0.2;
    vec3 lightPos = vec3(uMouse.x * 4.0, uMouse.y * 4.0, 4.0);
    vec3 toLight = normalize(lightPos - p);
    float diff = max(dot(normal, toLight), 0.0);
    float specular = pow(max(dot(reflect(-toLight, normal), -rayDir), 0.0), 30.0);

    // Blue-gray color palette
    vec3 mainColor = vec3(0.20, 0.35, 0.65);
    vec3 sssColor = vec3(0.15, 0.28, 0.55);

    float fresnel = pow(1.0 - max(dot(normal, -rayDir), 0.0), 3.0);
    vec3 subsurface = sssColor * fresnel * 0.8;

    float pulse = sin(t * 2.0) * 0.5 + 0.5;
    col = mainColor * (diff * 0.7 + 0.3) + subsurface;
    col = mix(col, col * vec3(0.6, 0.75, 1.0), specular * 3.0);
    col += mix(vec3(0.25, 0.45, 0.85), vec3(0.0), pulse) * 0.15;
  }

  void main() {
    vec2 uv = (vUv - 0.5) * uResolution / uResolution.y;
    vec3 ro = vec3(0.0, 0.0, 4.0);
    vec3 rd = normalize(vec3(uv, -1.0));

    float d = 0.0;
    vec3 p = ro;
    for (int i = 0; i < MAX_STEPS; i++) {
      float dist = sceneSDF(p);
      d += dist;
      p = ro + rd * d;
      if (dist < SURF_DIST || d > MAX_DIST) break;
    }

    vec3 color = vec3(0.05, 0.08, 0.15);
    if (d < MAX_DIST) {
      vec3 normal = calcNormal(p);
      shadeSurface(color, p, normal, rd);
    }

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function MyceliumBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(container.offsetWidth, container.offsetHeight) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      uniforms.uTime.value = elapsed;

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;
      uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
