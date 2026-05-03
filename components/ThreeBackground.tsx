"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/lib/ThemeContext";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // --- Gold color based on theme ---
    const goldColor = new THREE.Color(0xc9a96e);
    const lightGoldColor = new THREE.Color(0xa07840);

    // --- Main torus knot (wireframe) ---
    const torusKnotGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 180, 24, 2, 3);
    const torusKnotMat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? goldColor : lightGoldColor,
      wireframe: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.07 : 0.1,
    });
    const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    torusKnot.position.set(3, 0, -1);
    scene.add(torusKnot);

    // --- Outer ring torus ---
    const torusGeo = new THREE.TorusGeometry(1.9, 0.008, 6, 120);
    const torusMat = new THREE.MeshBasicMaterial({
      color: theme === "dark" ? goldColor : lightGoldColor,
      transparent: true,
      opacity: theme === "dark" ? 0.18 : 0.25,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(3, 0, -1);
    torus.rotation.x = Math.PI / 4;
    scene.add(torus);

    // --- Small floating icosahedra ---
    const floatingMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < 12; i++) {
      const size = Math.random() * 0.08 + 0.04;
      const geo = new THREE.IcosahedronGeometry(size, 0);
      const mat = new THREE.MeshBasicMaterial({
        color: theme === "dark" ? goldColor : lightGoldColor,
        wireframe: true,
        transparent: true,
        opacity: theme === "dark" ? (Math.random() * 0.15 + 0.05) : (Math.random() * 0.2 + 0.1),
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 3 - 2
      );
      scene.add(mesh);
      floatingMeshes.push(mesh);
    }

    // --- Particle field ---
    const particleCount = 220;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: theme === "dark" ? goldColor : lightGoldColor,
      size: theme === "dark" ? 0.025 : 0.03,
      transparent: true,
      opacity: theme === "dark" ? 0.35 : 0.45,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Mouse parallax ---
    let mouseX = 0;
    let mouseY = 0;
    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);

    // --- Resize ---
    const handleResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    // --- Animation loop ---
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Rotate torus knot
      torusKnot.rotation.x = t * 0.08;
      torusKnot.rotation.y = t * 0.12;

      // Orbit the outer ring
      torus.rotation.z = t * 0.05;
      torus.rotation.x = Math.PI / 4 + Math.sin(t * 0.1) * 0.1;

      // Float small meshes
      floatingMeshes.forEach((m, i) => {
        m.rotation.x += 0.005 + i * 0.0003;
        m.rotation.y += 0.007 + i * 0.0002;
        m.position.y += Math.sin(t * 0.4 + i * 1.2) * 0.002;
      });

      // Rotate particles slowly
      particles.rotation.y = t * 0.012;
      particles.rotation.x = t * 0.006;

      // Mouse parallax on camera
      camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 0.25 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouse);
      resizeObserver.disconnect();
      renderer.dispose();
      torusKnotGeo.dispose();
      torusGeo.dispose();
      particleGeo.dispose();
    };
  }, [theme]); // Re-init when theme changes

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
