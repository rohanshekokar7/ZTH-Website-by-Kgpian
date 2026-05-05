"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/ThemeContext";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let frameId: number;
    let disposed = false;

    // Dynamic import — removes ~600KB from initial bundle
    import("three").then((THREE) => {
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({
        canvas, antialias: false, alpha: true, powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      camera.position.set(0, 0, 5);

      const color = theme === "dark" ? new THREE.Color(0xc9a96e) : new THREE.Color(0xa07840);

      // Torus knot (reduced: 128×16 vs 180×24)
      const tkGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 16, 2, 3);
      const tkMat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: theme === "dark" ? 0.07 : 0.1 });
      const tk = new THREE.Mesh(tkGeo, tkMat);
      tk.position.set(3, 0, -1);
      scene.add(tk);

      // Outer ring
      const rGeo = new THREE.TorusGeometry(1.9, 0.008, 6, 80);
      const rMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: theme === "dark" ? 0.18 : 0.25 });
      const ring = new THREE.Mesh(rGeo, rMat);
      ring.position.set(3, 0, -1);
      ring.rotation.x = Math.PI / 4;
      scene.add(ring);

      // Floating icosahedra (8 vs 12)
      const floats: InstanceType<typeof THREE.Mesh>[] = [];
      const fMats: InstanceType<typeof THREE.MeshBasicMaterial>[] = [];
      for (let i = 0; i < 8; i++) {
        const g = new THREE.IcosahedronGeometry(Math.random() * 0.08 + 0.04, 0);
        const m = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: Math.random() * 0.15 + 0.05 });
        const mesh = new THREE.Mesh(g, m);
        mesh.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 3 - 2);
        scene.add(mesh);
        floats.push(mesh);
        fMats.push(m);
      }

      // Particles (140 vs 220)
      const pCount = 140;
      const pos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 16;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pMat = new THREE.PointsMaterial({ color, size: 0.025, transparent: true, opacity: 0.35, sizeAttenuation: true });
      const pts = new THREE.Points(pGeo, pMat);
      scene.add(pts);

      let mouseX = 0, mouseY = 0;
      const onMouse = (e: MouseEvent) => { mouseX = (e.clientX / window.innerWidth - 0.5) * 2; mouseY = (e.clientY / window.innerHeight - 0.5) * 2; };
      window.addEventListener("mousemove", onMouse, { passive: true });

      const onResize = () => { camera.aspect = canvas.clientWidth / canvas.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(canvas.clientWidth, canvas.clientHeight, false); };
      const ro = new ResizeObserver(onResize);
      ro.observe(canvas);

      const clock = new THREE.Clock();
      const animate = () => {
        if (disposed) return;
        frameId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        tk.rotation.x = t * 0.08; tk.rotation.y = t * 0.12;
        ring.rotation.z = t * 0.05; ring.rotation.x = Math.PI / 4 + Math.sin(t * 0.1) * 0.1;
        floats.forEach((m, i) => { m.rotation.x += 0.005 + i * 0.0003; m.rotation.y += 0.007 + i * 0.0002; m.position.y += Math.sin(t * 0.4 + i * 1.2) * 0.002; });
        pts.rotation.y = t * 0.012; pts.rotation.x = t * 0.006;
        camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.04;
        camera.position.y += (-mouseY * 0.25 - camera.position.y) * 0.04;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      };
      animate();

      // Cleanup: dispose ALL geometries + materials
      const cleanup = () => {
        disposed = true;
        cancelAnimationFrame(frameId);
        window.removeEventListener("mousemove", onMouse);
        ro.disconnect();
        renderer.dispose();
        [tkGeo, rGeo, pGeo].forEach(g => g.dispose());
        [tkMat, rMat, pMat].forEach(m => m.dispose());
        floats.forEach(m => m.geometry.dispose());
        fMats.forEach(m => m.dispose());
      };
      // Store cleanup for the outer return
      (canvas as any).__threeCleanup = cleanup;
    });

    return () => { disposed = true; cancelAnimationFrame(frameId); (canvas as any).__threeCleanup?.(); };
  }, [theme]);

  return (
    <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} aria-hidden="true" />
  );
}
