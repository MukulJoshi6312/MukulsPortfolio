"use client";
/**
 * Vanilla Three.js scene — no @react-three/fiber, no React internals trickery.
 * A few low-poly geometric "models" floating in space + particle field +
 * mouse-tracking parallax camera. Theme-aware colors that re-read when
 * the html[data-theme] attribute changes.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";

const cssVar = (name: string, fallback: string) => {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
};

const readPalette = () => ({
  a1: new THREE.Color(cssVar("--accent-1", "#34d399")),
  a2: new THREE.Color(cssVar("--accent-2", "#38bdf8")),
  a3: new THREE.Color(cssVar("--accent-3", "#a78bfa")),
});

export const Scene3DPlain = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || typeof window === "undefined") return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch (err) {
      console.warn("[Scene3DPlain] WebGL unavailable", err);
      return;
    }

    const w0 = mount.clientWidth || 1;
    const h0 = mount.clientHeight || 1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(w0, h0);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w0 / h0, 0.1, 100);
    camera.position.set(0, 0, 7);

    const palette = readPalette();

    // ---------- lights ----------
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const l1 = new THREE.PointLight(palette.a1.getHex(), 1.6, 100);
    l1.position.set(5, 5, 5);
    scene.add(l1);
    const l2 = new THREE.PointLight(palette.a2.getHex(), 1.0, 100);
    l2.position.set(-5, -3, -2);
    scene.add(l2);
    const l3 = new THREE.PointLight(palette.a3.getHex(), 0.8, 100);
    l3.position.set(0, 4, -4);
    scene.add(l3);

    // ---------- meshes ----------
    type Spec = {
      geom: THREE.BufferGeometry;
      mat: THREE.MeshStandardMaterial;
      pos: [number, number, number];
      speed: number;
      bobAmp: number;
      bobFreq: number;
      rotAxis: [number, number, number];
    };

    const specs: Spec[] = [
      {
        geom: new THREE.TorusKnotGeometry(0.55, 0.18, 120, 16),
        mat: new THREE.MeshStandardMaterial({
          color: palette.a1,
          metalness: 0.7,
          roughness: 0.2,
          emissive: palette.a1,
          emissiveIntensity: 0.25,
        }),
        pos: [-3.2, 1.0, 0],
        speed: 0.6,
        bobAmp: 0.3,
        bobFreq: 1.1,
        rotAxis: [0.4, 0.6, 0],
      },
      {
        geom: new THREE.TorusKnotGeometry(0.45, 0.14, 120, 16),
        mat: new THREE.MeshStandardMaterial({
          color: palette.a2,
          metalness: 0.7,
          roughness: 0.25,
          emissive: palette.a2,
          emissiveIntensity: 0.22,
        }),
        pos: [3.2, -1.1, -1],
        speed: 0.5,
        bobAmp: 0.32,
        bobFreq: 1.4,
        rotAxis: [0.3, 0.5, 0.2],
      },
      {
        geom: new THREE.IcosahedronGeometry(0.7, 0),
        mat: new THREE.MeshStandardMaterial({
          color: palette.a3,
          wireframe: true,
          metalness: 0.4,
          roughness: 0.5,
        }),
        pos: [0, 1.6, -2.5],
        speed: 0.7,
        bobAmp: 0.4,
        bobFreq: 0.8,
        rotAxis: [0.5, 0, 0.3],
      },
      {
        geom: new THREE.OctahedronGeometry(0.55, 0),
        mat: new THREE.MeshStandardMaterial({
          color: palette.a1,
          wireframe: true,
        }),
        pos: [-2.4, -1.6, 1.2],
        speed: 0.55,
        bobAmp: 0.28,
        bobFreq: 1.6,
        rotAxis: [0.4, 0.4, 0],
      },
      {
        geom: new THREE.DodecahedronGeometry(0.55, 0),
        mat: new THREE.MeshStandardMaterial({
          color: palette.a2,
          wireframe: true,
        }),
        pos: [2.6, 1.7, 1],
        speed: 0.7,
        bobAmp: 0.3,
        bobFreq: 1.2,
        rotAxis: [0.3, 0.3, 0.5],
      },
      {
        geom: new THREE.SphereGeometry(0.34, 32, 32),
        mat: new THREE.MeshStandardMaterial({
          color: palette.a3,
          metalness: 0.85,
          roughness: 0.15,
          emissive: palette.a3,
          emissiveIntensity: 0.4,
        }),
        pos: [-1.4, 0.6, 1.8],
        speed: 0.8,
        bobAmp: 0.4,
        bobFreq: 0.9,
        rotAxis: [0.2, 0.6, 0],
      },
      {
        geom: new THREE.TetrahedronGeometry(0.45, 0),
        mat: new THREE.MeshStandardMaterial({
          color: palette.a1,
          metalness: 0.6,
          roughness: 0.3,
          emissive: palette.a1,
          emissiveIntensity: 0.18,
        }),
        pos: [1.6, -0.7, 1.5],
        speed: 0.9,
        bobAmp: 0.34,
        bobFreq: 1.5,
        rotAxis: [0.5, 0.3, 0.2],
      },
    ];

    const meshes: { mesh: THREE.Mesh; spec: Spec; baseY: number }[] = specs.map((spec) => {
      const mesh = new THREE.Mesh(spec.geom, spec.mat);
      mesh.position.set(spec.pos[0], spec.pos[1], spec.pos[2]);
      scene.add(mesh);
      return { mesh, spec, baseY: spec.pos[1] };
    });

    // ---------- particle field ----------
    const PCOUNT = 260;
    const positions = new Float32Array(PCOUNT * 3);
    for (let i = 0; i < PCOUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 9;
    }
    const pgeo = new THREE.BufferGeometry();
    pgeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pmat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xffffff,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pgeo, pmat);
    scene.add(points);

    // ---------- mouse parallax ----------
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMouse);

    // ---------- resize ----------
    const onResize = () => {
      if (!mount || !renderer) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // ---------- theme-change observer ----------
    const refreshPalette = () => {
      const p = readPalette();
      l1.color.copy(p.a1);
      l2.color.copy(p.a2);
      l3.color.copy(p.a3);
      meshes.forEach(({ mesh, spec }) => {
        const m = mesh.material as THREE.MeshStandardMaterial;
        // assign by index — keep the same color slot pattern
        const idx = specs.indexOf(spec);
        const target = idx % 3 === 0 ? p.a1 : idx % 3 === 1 ? p.a2 : p.a3;
        m.color.copy(target);
        if (m.emissive) m.emissive.copy(target);
      });
    };
    const themeObserver = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.attributeName === "data-theme") {
          refreshPalette();
        }
      }
    });
    themeObserver.observe(document.documentElement, { attributes: true });

    // ---------- pause when off-screen ----------
    let visible = true;
    const visObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => (visible = e.isIntersecting)),
      { threshold: 0 }
    );
    visObserver.observe(mount);

    // ---------- loop ----------
    let raf = 0;
    let t0 = performance.now();
    const loop = (now: number) => {
      const dt = (now - t0) / 1000;
      t0 = now;
      const t = now / 1000;

      // smooth camera
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      camera.position.x = mouse.x * 0.6;
      camera.position.y = mouse.y * 0.4;
      camera.lookAt(0, 0, 0);

      meshes.forEach(({ mesh, spec, baseY }) => {
        const s = spec.speed * dt;
        mesh.rotation.x += s * spec.rotAxis[0];
        mesh.rotation.y += s * spec.rotAxis[1];
        mesh.rotation.z += s * spec.rotAxis[2];
        mesh.position.y = baseY + Math.sin(t * spec.bobFreq) * spec.bobAmp;
      });

      points.rotation.y = t * 0.05;

      if (visible && renderer) renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      themeObserver.disconnect();
      visObserver.disconnect();
      meshes.forEach(({ mesh, spec }) => {
        scene.remove(mesh);
        spec.geom.dispose();
        spec.mat.dispose();
      });
      pgeo.dispose();
      pmat.dispose();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-10 pointer-events-none" />;
};
