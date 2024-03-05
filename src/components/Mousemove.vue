<template>
  <div v-if="props.toggleEvent === 'mouseMove'">
    <teleport to="body">
      <!-- before buffer -->
      <canvas
        class="w-100vw h-100vh fixed left-0 top-0 z-1 pointer-events-none"
        ref="displayCanvas"
        id="displayCanvas"
      ></canvas>
      <!-- after buffer -->
      <canvas
        class="w-100vw h-100vh fixed left-0 top-0 z-0 pointer-events-none"
        ref="bufferCanvas"
        id="bufferCanvas"
      ></canvas>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { ref, onMounted } from 'vue';
import type { ToggleEvent } from '../types/home';

const props = withDefaults(
  defineProps<{
    toggleEvent: ToggleEvent;
  }>(),
  {
    toggleEvent: 'none',
  },
);

// before buffer use to draw
const displayCanvas = ref<HTMLCanvasElement>();
// after buffer use to render
const bufferCanvas = ref<HTMLCanvasElement>();
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
    this.a *= 0.85;
    this.size += 0.3;
  }
}

const render = () => {
  const bufferContext = bufferCanvas.value?.getContext('2d');
  const displayContext = displayCanvas.value?.getContext('2d');
  if (bufferCanvas.value && bufferContext && displayContext) {
    bufferContext.clearRect(
      0,
      0,
      bufferCanvas.value.width,
      bufferCanvas.value.height,
    );

    circleList.value.forEach((ele: Circle, i) => {
      ele.draw(bufferContext);

      if (ele.a < 0.05) {
        circleList.value.splice(i, 1);
      }
    });
    // Copy the contents of the bufferCanvas to the displayCanvas
    if (displayCanvas.value) {
      displayContext.clearRect(
        0,
        0,
        displayCanvas.value.width,
        displayCanvas.value.height,
      );
    }
    displayContext.drawImage(
      bufferCanvas.value,
      0,
      0,
      bufferCanvas.value.width,
      bufferCanvas.value.height,
    );
  }
  requestAnimationFrame(render);
};

const throttle = (fn: (...args: MouseEvent[]) => void, delay: number) => {
  let last = 0;
  return (...args: MouseEvent[]) => {
    const now = Date.now();
    if (now - last > delay) {
      last = now;
      fn(...args);
    }
  };
};

const resizeHandler = () => {
  if (bufferCanvas.value) {
    bufferCanvas.value.width = window.innerWidth;
    bufferCanvas.value.height = window.innerHeight;
  }
  if (displayCanvas.value) {
    displayCanvas.value.width = window.innerWidth;
    displayCanvas.value.height = window.innerHeight;
  }
};

const onMouseMove = throttle((e: MouseEvent) => {
  const newCircle = new Circle(e.clientX, e.clientY);
  circleList.value.push(newCircle);
}, 0);

onMounted(() => {
  if (bufferCanvas.value) {
    bufferCanvas.value.width = window.innerWidth;
    bufferCanvas.value.height = window.innerHeight;
    document.body.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resizeHandler);
    render();
  }
});

onUnmounted(() => {
  document.body.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('resize', resizeHandler);
});
</script>

<style lang="scss" scoped></style>
