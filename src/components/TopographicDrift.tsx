"use client";

import React, { useEffect, useRef } from "react";

const CELL = 14;
const LEVELS = 14;
const BG = "#020617";
const LINE = "#4da3ff";
const PEAK = "#ff2e9c";

function lerp(a: number, b: number, iso: number) {
  return (iso - a) / (b - a);
}

export default function TopographicDrift() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    const parent = canvas.parentElement;
    let frame = 0;
    let running = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function size() {
      if (!canvas || !parent) return { w: 0, h: 0, cols: 0, rows: 0 };
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return {
        w,
        h,
        cols: Math.ceil(w / CELL) + 1,
        rows: Math.ceil(h / CELL) + 1,
      };
    }

    let dims = size();

    function fieldVal(gx: number, gy: number, t: number, w: number, h: number) {
      const x = gx * CELL;
      const y = gy * CELL;
      const s = 0.0034;
      const v =
        Math.sin(x * s + t) * Math.cos(y * s * 1.2 - t * 0.5) +
        Math.sin((x - y) * s * 0.8 + t * 0.6) * 0.8 +
        Math.cos(Math.hypot(x - w / 2, y - h / 2) * s * 1.1 - t) * 0.6 +
        Math.sin(x * s * 2.1 - y * s * 1.7 + t * 0.3) * 0.4;
      return (v / 2.8) * 0.5 + 0.5;
    }

    function step(t: number) {
      const { w, h, cols, rows } = dims;
      if (!w || !h) return;
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);
      const grid = new Float32Array(cols * rows);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          grid[j * cols + i] = fieldVal(i, j, t, w, h);
        }
      }
      for (let l = 1; l < LEVELS; l++) {
        const iso = l / LEVELS;
        const isPeak = l >= LEVELS - 3;
        ctx.strokeStyle = isPeak ? PEAK : LINE;
        ctx.globalAlpha = isPeak ? 1 : 0.55 + (l / LEVELS) * 0.4;
        ctx.lineWidth = isPeak ? 2.4 : 1.6;
        ctx.beginPath();
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const tl = grid[j * cols + i];
            const tr = grid[j * cols + i + 1];
            const br = grid[(j + 1) * cols + i + 1];
            const bl = grid[(j + 1) * cols + i];
            let ci = 0;
            if (tl > iso) ci |= 8;
            if (tr > iso) ci |= 4;
            if (br > iso) ci |= 2;
            if (bl > iso) ci |= 1;
            if (ci === 0 || ci === 15) continue;
            const x0 = i * CELL;
            const y0 = j * CELL;
            const T = { x: x0 + lerp(tl, tr, iso) * CELL, y: y0 };
            const R = { x: x0 + CELL, y: y0 + lerp(tr, br, iso) * CELL };
            const Bt = { x: x0 + lerp(bl, br, iso) * CELL, y: y0 + CELL };
            const L = { x: x0, y: y0 + lerp(tl, bl, iso) * CELL };
            const seg = (p: { x: number; y: number }, q: { x: number; y: number }) => {
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
            };
            switch (ci) {
              case 1:
              case 14:
                seg(L, Bt);
                break;
              case 2:
              case 13:
                seg(Bt, R);
                break;
              case 3:
              case 12:
                seg(L, R);
                break;
              case 4:
              case 11:
                seg(T, R);
                break;
              case 5:
                seg(L, T);
                seg(Bt, R);
                break;
              case 6:
              case 9:
                seg(T, Bt);
                break;
              case 7:
              case 8:
                seg(L, T);
                break;
              case 10:
                seg(T, R);
                seg(L, Bt);
                break;
            }
          }
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    const onResize = () => {
      dims = size();
      if (reduced) step(1.5);
    };
    window.addEventListener("resize", onResize);

    if (reduced) {
      step(1.5);
    } else {
      let t = 0;
      const loop = () => {
        if (!running) return;
        t += 0.004;
        step(t);
        frame = window.requestAnimationFrame(loop);
      };
      frame = window.requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
