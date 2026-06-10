"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Petal {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  size: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
}

export function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let petals: Petal[] = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let isHovering = false;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const getColors = () => {
      // In dark mode we want bright ethereal colors for screen blending, 
      // in light mode we want deeper saturated colors for multiply blending
      const isDark = resolvedTheme === "dark" || resolvedTheme === "midnight-garden";
      
      if (isDark) {
        return [
          "rgba(255, 200, 220, 0.8)", // Light pink
          "rgba(220, 180, 255, 0.7)", // Lavender
          "rgba(255, 230, 180, 0.6)", // Warm gold
        ];
      }
      
      return [
        "rgba(230, 130, 150, 0.7)", // Muted rose
        "rgba(200, 110, 140, 0.6)", // Deep pink
        "rgba(180, 130, 220, 0.5)", // Soft purple
        "rgba(240, 160, 180, 0.8)", // Bright blush
      ];
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);
    resize();

    const createPetal = (): Petal => {
      const colors = getColors();
      return {
        x: Math.random() * width,
        y: Math.random() * height - height,
        z: Math.random() * 0.6 + 0.4,
        vx: (Math.random() - 0.5) * 1,
        vy: Math.random() * 1 + 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: (Math.random() - 0.5) * 0.05,
        size: Math.random() * 15 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.05 + 0.01,
      };
    };

    const petalCount = 24;
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        ...createPetal(),
        y: Math.random() * height
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      mouseX = -1000;
      mouseY = -1000;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        isHovering = true;
      }
    };
    
    const handleTouchEnd = () => {
      isHovering = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    const drawPetal = (petal: Petal) => {
      ctx.save();
      
      const currentSize = petal.size * petal.z;
      
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      ctx.scale(Math.cos(petal.flip), 1);

      // Realistic 3D shadow
      ctx.shadowColor = resolvedTheme === "dark" ? "rgba(0,0,0,0.8)" : "rgba(0, 0, 0, 0.2)";
      ctx.shadowBlur = 10 * petal.z;
      ctx.shadowOffsetX = 8 * Math.cos(petal.flip) * petal.z;
      ctx.shadowOffsetY = 15 * petal.z;

      ctx.beginPath();
      ctx.fillStyle = petal.color;
      
      // Draw organic petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(currentSize / 1.5, currentSize / 2, currentSize / 2, currentSize, 0, currentSize * 1.2);
      ctx.bezierCurveTo(-currentSize / 2, currentSize, -currentSize / 1.5, currentSize / 2, 0, 0);
      
      ctx.fill();
      ctx.closePath();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((petal) => {
        petal.wobble += petal.wobbleSpeed;
        
        let currentVx = petal.vx + Math.sin(petal.wobble) * 0.5;
        let currentVy = petal.vy;

        // Interaction logic (mouse/touch repulsion)
        if (isHovering) {
          const dx = mouseX - petal.x;
          const dy = mouseY - petal.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 180) {
            const force = (180 - dist) / 180;
            currentVx -= (dx / dist) * force * 4;
            currentVy -= (dy / dist) * force * 4;
            petal.rotationSpeed += (Math.random() - 0.5) * 0.1 * force;
            petal.flipSpeed += (Math.random() - 0.5) * 0.1 * force;
          }
        }

        petal.x += currentVx * petal.z;
        petal.y += currentVy * petal.z;
        petal.rotation += petal.rotationSpeed;
        petal.flip += petal.flipSpeed;

        petal.rotationSpeed *= 0.95; // dampening
        petal.flipSpeed *= 0.95;

        // Reset if out of bounds
        if (petal.y > height + 100) {
          Object.assign(petal, createPetal(), { y: -50, x: Math.random() * width });
        }
        if (petal.x > width + 100) petal.x = -50;
        if (petal.x < -100) petal.x = width + 50;

        drawPetal(petal);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100] transition-opacity duration-1000 mix-blend-multiply dark:mix-blend-screen midnight-garden:mix-blend-screen opacity-45"
      aria-hidden="true"
    />
  );
}
