"use client";

import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 a;
void main(){ gl_Position = vec4(a, 0.0, 1.0); }`;

/*
 * Topographic dune field. A domain-warped fbm gives the dune mass, a skewed sine
 * gives the wind-driven ridge direction, and the pointer raises a gaussian hill
 * that the contours visibly route around. Contours are anti-aliased with
 * fwidth so they stay one device pixel wide at any DPR. Every fifth contour is
 * an index line in gold, like a survey map; the rest are sand hairlines.
 */
const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;
uniform float uFade;
out vec4 o;

vec2 hash(vec2 p){
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(dot(hash(i), f), dot(hash(i + vec2(1,0)), f - vec2(1,0)), u.x),
             mix(dot(hash(i + vec2(0,1)), f - vec2(0,1)), dot(hash(i + vec2(1,1)), f - vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++){ v += a * noise(p); p = r * p * 2.03; a *= 0.5; }
  return v;
}

vec2 project(vec2 p){
  // Gentle perspective: rows nearer the top recede, so the field reads as terrain.
  float z = 1.0 / (1.18 - p.y * 0.62);
  return vec2(p.x * z, p.y * z * 1.25);
}

float height(vec2 q, float t){
  vec2 w = vec2(fbm(q * 0.7 + vec2(t * 0.020, t * 0.006)), fbm(q * 0.7 + vec2(5.2, 1.3) - t * 0.012));
  float mass = fbm(q * 1.05 + 1.6 * w);
  float ridge = sin(q.x * 2.4 + q.y * 1.1 + w.x * 5.0 + t * 0.05);
  ridge = 1.0 - abs(ridge);
  ridge = ridge * ridge;
  return mass * 0.85 + ridge * 0.16;
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 p = (frag - 0.5 * uRes) / uRes.y;
  vec2 m = (uMouse - 0.5 * uRes) / uRes.y;
  vec2 q = project(p);
  vec2 qm = project(m);
  float t = uTime;

  float h = height(q, t);
  float d = length(q - qm);
  float hill = exp(-d * d * 9.0) * 0.42 * uHover;
  h += hill;

  float N = 15.0;
  float v = h * N;
  float fw = fwidth(v);
  float f = fract(v);
  float dist = min(f, 1.0 - f);
  float line = 1.0 - smoothstep(0.0, fw * 1.15, dist);
  float idx = mod(floor(v + 0.5), 5.0);
  float major = 1.0 - step(0.5, idx);
  float majorLine = (1.0 - smoothstep(0.0, fw * 1.6, dist)) * major;

  vec3 inkDeep = vec3(0.024, 0.059, 0.114);
  vec3 ink = vec3(0.043, 0.102, 0.188);
  vec3 gold = vec3(0.761, 0.635, 0.420);
  vec3 sand = vec3(0.875, 0.804, 0.667);

  float horizon = smoothstep(-0.6, 0.55, p.y);
  vec3 col = mix(inkDeep, ink, 0.55 * (1.0 - horizon) + 0.25);

  float far = smoothstep(0.62, 0.15, p.y);
  float vign = smoothstep(1.35, 0.25, length(p * vec2(0.75, 1.0)));
  float near = exp(-d * d * 5.0) * uHover;

  float sweep = exp(-pow((p.x - (fract(t * 0.035) * 3.2 - 1.6)) * 3.5, 2.0));

  float minorA = line * (0.10 + 0.10 * sweep + 0.35 * near) * far * vign;
  float majorA = majorLine * (0.34 + 0.25 * sweep + 0.5 * near) * far * vign;

  col = mix(col, sand, minorA);
  col = mix(col, gold, majorA);
  col += gold * near * 0.035;

  o = vec4(col * uFade + inkDeep * (1.0 - uFade), 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function DuneField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl || gl.isContextLost()) {
      canvas.dataset.fallback = "1";
      return;
    }
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      canvas.dataset.fallback = "1";
      return;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uHover = gl.getUniformLocation(prog, "uHover");
    const uFade = gl.getUniformLocation(prog, "uFade");

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dpr = Math.min(devicePixelRatio || 1, 1.75);
    let w = 0,
      h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width * dpr));
      h = Math.max(1, Math.round(r.height * dpr));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pointer in canvas pixels, GL origin bottom-left. Smoothed so the hill glides.
    const target = { x: w * 0.68, y: h * 0.42, on: 0 };
    const cur = { x: target.x, y: target.y, on: 0 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (e.clientY > r.bottom || e.clientY < r.top) {
        target.on = 0;
        return;
      }
      target.x = (e.clientX - r.left) * dpr;
      target.y = (r.bottom - e.clientY) * dpr;
      target.on = 1;
    };
    addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(canvas);

    let raf = 0,
      fade = 0,
      last = performance.now(),
      slow = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      const dt = now - last;
      last = now;
      // Adaptive resolution: if we are consistently slow, render fewer pixels.
      slow = slow * 0.95 + (dt > 26 ? 1 : 0) * 0.05;
      if (slow > 0.6 && dpr > 1) {
        dpr = Math.max(1, dpr - 0.25);
        slow = 0;
        resize();
      }
      const idle = (now - t0) / 1000;
      if (!target.on) {
        target.x = w * (0.62 + 0.12 * Math.sin(idle * 0.21));
        target.y = h * (0.42 + 0.1 * Math.cos(idle * 0.17));
      }
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      cur.on += ((target.on ? 1 : 0.55) - cur.on) * 0.05;
      fade = Math.min(1, fade + 0.012);
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, reduce ? 12 : idle);
      gl.uniform2f(uMouse, cur.x, cur.y);
      gl.uniform1f(uHover, cur.on);
      gl.uniform1f(uFade, fade);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      removeEventListener("pointermove", onMove);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={`block h-full w-full bg-ink-deep data-[fallback=1]:bg-[url(/brand/pattern-ink.svg)] data-[fallback=1]:bg-cover ${className ?? ""}`}
    />
  );
}
