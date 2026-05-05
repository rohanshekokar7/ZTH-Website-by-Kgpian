"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ZTHCoin3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let frameId: number;
    let rendererInstance: any = null;
    let ro: ResizeObserver;

    import("three").then(async (THREE) => {
      if (disposed || !mount) return;

      const w = mount.clientWidth || 420;
      const h = mount.clientHeight || 420;

      // ── Renderer ─────────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      rendererInstance = renderer;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.4;
      mount.appendChild(renderer.domElement);

      // ── Scene / Camera ───────────────────────────────────────────────────
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
      camera.position.set(0, 0.3, 5.5);
      camera.lookAt(0, 0, 0);

      // ── Environment map for reflections ──────────────────────────────────
      try {
        const { RoomEnvironment } = await import(
          "three/examples/jsm/environments/RoomEnvironment.js"
        );
        const pmrem = new THREE.PMREMGenerator(renderer);
        const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environment = env;
        pmrem.dispose();
      } catch (_) { /* skip env if import fails */ }

      // ── Lights ───────────────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0xffffff, 0.9));

      // Strong key light from upper-right — catches metallic rim
      const key = new THREE.DirectionalLight(0xfff5e0, 5.0);
      key.position.set(5, 6, 5);
      scene.add(key);

      // Cool fill from left
      const fill = new THREE.DirectionalLight(0x88bbff, 1.5);
      fill.position.set(-5, 1, 3);
      scene.add(fill);

      // Rim/back light
      const rim = new THREE.DirectionalLight(0xffffff, 1.0);
      rim.position.set(0, -4, -4);
      scene.add(rim);

      // Front light — ensures logo face is always illuminated
      const front = new THREE.DirectionalLight(0xffffff, 2.0);
      front.position.set(0, 0, 8);
      scene.add(front);

      // ── Textures ─────────────────────────────────────────────────────────
      const loader = new THREE.TextureLoader();

      // Logo texture — encode space in URL so it loads reliably
      const logoTex = loader.load(
        "/zth%20logo.png",
        (tex) => { tex.colorSpace = THREE.SRGBColorSpace; tex.needsUpdate = true; }
      );
      logoTex.colorSpace = THREE.SRGBColorSpace;

      // ── Materials ────────────────────────────────────────────────────────
      const sideMat = new THREE.MeshStandardMaterial({
        color: 0xc0d4ec,
        metalness: 0.94,
        roughness: 0.08,
        envMapIntensity: 1.5,
      });

      // Face: the logo texture mapped flat
      const faceMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: logoTex,
        metalness: 0.1,
        roughness: 0.5,
        envMapIntensity: 0.5,
        transparent: true,
      });

      const backMat = new THREE.MeshStandardMaterial({
        color: 0x8aaac0,
        metalness: 0.94,
        roughness: 0.10,
        envMapIntensity: 1.2,
      });

      const rimMat = new THREE.MeshStandardMaterial({
        color: 0xe0eeff,
        metalness: 0.98,
        roughness: 0.04,
        envMapIntensity: 2.0,
      });

      // ── Geometry ─────────────────────────────────────────────────────────
      const coinGroup = new THREE.Group();
      scene.add(coinGroup);

      // CylinderGeometry material groups: 0=side, 1=top-cap, 2=bottom-cap
      // After rotation.x = -PI/2: top-cap faces +Z (toward camera)
      const bodyGeo = new THREE.CylinderGeometry(1.0, 1.0, 0.13, 80, 1);
      const body = new THREE.Mesh(bodyGeo, [sideMat, faceMat, backMat]);
      body.rotation.x = -Math.PI / 2;
      coinGroup.add(body);

      // Outer polished rim
      const outerRimGeo = new THREE.TorusGeometry(1.0, 0.024, 20, 100);
      coinGroup.add(new THREE.Mesh(outerRimGeo, rimMat));

      // Decorative inner rings embossed on each face
      const innerRingGeo = new THREE.TorusGeometry(0.86, 0.007, 8, 100);
      const ringF = new THREE.Mesh(innerRingGeo, rimMat);
      ringF.position.z = 0.066;
      coinGroup.add(ringF);
      const ringB = new THREE.Mesh(innerRingGeo, rimMat);
      ringB.position.z = -0.066;
      coinGroup.add(ringB);

      // Soft blue glow halo plane (behind coin)
      const haloGeo = new THREE.PlaneGeometry(3.4, 3.4);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x0077c2,
        transparent: true,
        opacity: 0.055,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.z = -0.3;
      coinGroup.add(halo);

      // Drop shadow on the "floor"
      const shadowGeo = new THREE.CircleGeometry(0.9, 64);
      const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.09,
      });
      const shadowDisc = new THREE.Mesh(shadowGeo, shadowMat);
      shadowDisc.rotation.x = -Math.PI / 2;
      shadowDisc.position.y = -1.58;
      scene.add(shadowDisc);

      // ── Mouse tracking ───────────────────────────────────────────────────
      let mX = 0, mY = 0;
      const onMouse = (e: MouseEvent) => {
        mX = (e.clientX / window.innerWidth - 0.5) * 2;
        mY = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouse, { passive: true });

      // ── Resize ───────────────────────────────────────────────────────────
      ro = new ResizeObserver(() => {
        if (!mount) return;
        const nw = mount.clientWidth;
        const nh = mount.clientHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      });
      ro.observe(mount);

      // ── Animation loop ───────────────────────────────────────────────────
      const clock = new THREE.Clock();

      const animate = () => {
        if (disposed) return;
        frameId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        // Slow elegant spin around Y
        coinGroup.rotation.y = t * 0.42;

        // Gentle float
        const floatY = Math.sin(t * 0.75) * 0.13;
        coinGroup.position.y = floatY;

        // Mouse tilt (smooth lerp on X axis only)
        coinGroup.rotation.x += (mY * 0.20 - coinGroup.rotation.x) * 0.04;

        // Shadow reacts to float position
        shadowDisc.position.y = -1.58 + floatY * 0.35;
        const shadowS = 0.88 - Math.abs(floatY) * 0.25;
        shadowDisc.scale.setScalar(shadowS);

        // Subtle halo pulse
        haloMat.opacity = 0.05 + Math.sin(t * 1.1) * 0.018;

        renderer.render(scene, camera);
      };
      animate();

      // ── Cleanup ──────────────────────────────────────────────────────────
      (mount as any).__coinCleanup = () => {
        disposed = true;
        cancelAnimationFrame(frameId);
        window.removeEventListener("mousemove", onMouse);
        ro?.disconnect();
        [bodyGeo, outerRimGeo, innerRingGeo, haloGeo, shadowGeo].forEach(g => g.dispose());
        [sideMat, faceMat, backMat, rimMat, haloMat, shadowMat].forEach(m => m.dispose());
        logoTex.dispose();
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      (mountRef.current as any)?.__coinCleanup?.();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.45, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.5 }}
      style={{
        width: "100%",
        maxWidth: 460,
        aspectRatio: "1 / 1",
        position: "relative",
      }}
    >
      {/* Three.js mount */}
      <div
        ref={mountRef}
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      />

      {/* CSS radial glow behind canvas */}
      <div style={{
        position: "absolute",
        inset: "15%",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,119,194,0.22) 0%, transparent 70%)",
        filter: "blur(48px)",
        pointerEvents: "none",
        zIndex: -1,
        animation: "pulse-gold 3.5s ease-in-out infinite",
      }} />

      {/* Floating accent dots */}
      {[
        { top: "18%", left: "4%", size: 6, delay: 0 },
        { top: "72%", left: "8%", size: 4, delay: 0.7 },
        { top: "30%", right: "5%", size: 5, delay: 1.2 },
        { top: "65%", right: "10%", size: 4, delay: 0.4 },
        { top: "50%", left: "2%", size: 3, delay: 1.8 },
      ].map((dot, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            background: "rgba(0,119,194,0.55)",
            top: dot.top,
            left: "left" in dot ? dot.left : undefined,
            right: "right" in dot ? (dot as any).right : undefined,
            animation: `float ${3.2 + i * 0.6}s ease-in-out infinite`,
            animationDelay: `${dot.delay}s`,
            pointerEvents: "none",
          }}
        />
      ))}
    </motion.div>
  );
}
