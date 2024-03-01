<template>
  <teleport to="body">
    <canvas
      class="w-100vw h-100vh fixed left-0 top-0 z-1 pointer-events-none"
      ref="canvas"
      id="canvas"
    ></canvas>
  </teleport>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { ref, onMounted } from 'vue';

const canvas = ref<HTMLCanvasElement>();
const circleList = ref<Circle[]>([]);

const random = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

class Circle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  a: number;
  size: number;
  // cacheCanvas: [];

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
    this.a = 1;
    this.size = 2;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.fillStyle = this.color;
    context.globalAlpha = this.a;
    context.globalCompositeOperation = 'lighter';
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();

    this.update();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.a *= 0.95;
    this.size += 0.3;
  }
}

const render = () => {
  const context = canvas.value?.getContext('2d');
  if (canvas.value && context) {
    context.clearRect(0, 0, canvas.value.width, canvas.value.height);

    circleList.value.forEach((ele: Circle, i) => {
      ele.draw(context);

      if (ele.a < 0.05) {
        circleList.value.splice(i, 1);
      }
    });
  }

  requestAnimationFrame(render);
};

const throttle = (fn: (...args: any) => void, delay: number) => {
  let last = 0;
  return (...args: any) => {
    const now = Date.now();
    if (now - last > delay) {
      last = now;
      fn(...args);
    }
  };
};

const onMouseMove = throttle((e: MouseEvent) => {
  const newCircle = new Circle(e.clientX, e.clientY);
  circleList.value.push(newCircle);
}, 0);

onMounted(() => {
  if (canvas.value) {
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
    document.body.addEventListener('mousemove', onMouseMove);
    render();
  }
});

onUnmounted(() => {
  document.body.removeEventListener('mousemove', onMouseMove);
});
</script>

<style lang="scss" scoped></style>
