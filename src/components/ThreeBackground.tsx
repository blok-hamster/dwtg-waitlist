"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    containerRef.current.appendChild(renderer.domElement);

    // 2. Setup Image Sequence & Canvas
    const canvas = document.createElement("canvas");
    // Default size, will be updated when first image loads
    canvas.width = 1920; 
    canvas.height = 1080;
    const ctx = canvas.getContext("2d", { alpha: false });
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const frameCount = 119; // 120 - 2 + 1
    const startFrame = 2;
    const images: HTMLImageElement[] = [];
    let loadedImages = 0;

    const updateTextureMatrix = (imgWidth: number, imgHeight: number) => {
      if (canvas.width !== imgWidth || canvas.height !== imgHeight) {
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        texture.dispose();
      }
      
      const screenAspect = window.innerWidth / window.innerHeight;
      const imageAspect = imgWidth / imgHeight;
      
      texture.matrixAutoUpdate = false;
      
      if (screenAspect < imageAspect) {
        const scaleX = screenAspect / imageAspect;
        texture.matrix.setUvTransform(0, 0, scaleX, 1, 0, 0.5, 0.5);
      } else {
        const scaleY = imageAspect / screenAspect;
        texture.matrix.setUvTransform(0, 0, 1, scaleY, 0, 0.5, 0.5);
      }
    };

    // Preload all images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameNum = String(startFrame + i).padStart(3, '0');
      img.src = `/assets/frames/${frameNum}.png`;
      img.onload = () => {
        loadedImages++;
        setLoadingProgress(Math.round((loadedImages / frameCount) * 100));
        
        if (loadedImages === 1) {
          // Initialize canvas size based on the first loaded image
          updateTextureMatrix(img.width, img.height);
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            texture.needsUpdate = true;
            renderer.render(scene, camera);
          }
        }
        
        if (loadedImages === frameCount) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    }

    let targetFrame = 0;
    let currentFrame = 0;

    // 3. Scroll Logic
    const contentOverlay = document.querySelector(".content-overlay") as HTMLElement;
    const scrollIndicator = document.querySelector(".scroll-indicator") as HTMLElement;

    const onScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const maxScroll = Math.max(scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      
      targetFrame = progress * (frameCount - 1);

      if (scrollIndicator) {
        // Fade out quickly in the first 15% of the scroll
        const indicatorOpacity = Math.max(1 - (progress * 6.6), 0);
        scrollIndicator.style.opacity = indicatorOpacity.toString();
      }

      if (contentOverlay) {
        let opacity = 0;
        if (progress > 0.4) {
          opacity = (progress - 0.4) / 0.6;
        }
        contentOverlay.style.opacity = opacity.toString();
        contentOverlay.style.pointerEvents = opacity > 0.8 ? "auto" : "none";
        
        // Elegant slide-up aesthetic reveal
        const translateY = Math.max(0, (1 - opacity) * 60); 
        contentOverlay.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (images[0] && images[0].complete) {
        updateTextureMatrix(images[0].width, images[0].height);
        renderer.render(scene, camera);
      }
    };
    window.addEventListener("resize", onResize);

    // 4. Render Loop
    let animationFrameId: number;
    const renderLoop = () => {
      // Lerp the frame index for smoothness
      currentFrame += (targetFrame - currentFrame) * 0.3;
      
      const frameIndex = Math.round(currentFrame);
      const img = images[frameIndex];
      
      if (img && img.complete && ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        texture.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {!isLoaded && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--color-cream)",
          color: "var(--color-burgundy)",
          fontFamily: "var(--font-eb-garamond), serif",
          fontSize: "1.2rem"
        }}>
          Loading Experience... {loadingProgress}%
        </div>
      )}
      <div id="canvas-container" ref={containerRef} />
    </>
  );
}
