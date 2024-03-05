<template>
  <teleport to="body">
    <canvas
      class="w-100vw h-100vh fixed left-0 top-0 z-1 pointer-events-none"
      ref="Canvas"
      id="Canvas"
    ></canvas>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const canvas = ref<HTMLCanvasElement>();
let context = ref<CanvasRenderingContext2D | null>();
const snowArray = ref<Snow[]>([]);
const intervalId = ref<number>();

class Snow {
  constructor(
    public x: number,
    public y: number,
    public scale: number,
    public rotate: number,
    public speedX: number,
    public speedY: number,
    public speedR: number,
  ) {}

  render() {
    if (context.value && canvas.value) {
      context.value.save();
      context.value.beginPath();

      context.value.translate(this.x, this.y);
      context.value.scale(this.scale, this.scale);
      context.value.rotate((this.rotate * Math.PI) / 180);

      context.value.moveTo(-20, 0);
      context.value.lineTo(20, 0);
      context.value.strokeStyle = '#fff';
      context.value.lineWidth = 5;
      context.value.lineCap = 'round';

      var disX = Math.sin((30 * Math.PI) / 180) * 20;
      var disY = Math.sin((60 * Math.PI) / 180) * 20;

      context.value.moveTo(-disX, -disY);
      context.value.lineTo(disX, disY);

      context.value.moveTo(-disX, disY);
      context.value.lineTo(disX, -disY);

      context.value.stroke();
      context.value.restore();
    }
  }
}
const init = () => {
  const len = 100;
  for (let i = 0; i < len; i++) {
    if (!canvas.value) return;
    const x = Math.random() * canvas.value.width;
    const scale = Math.random() + 0.5;
    const rotate = Math.random() * 60;
    const speedX = Math.random() + 1;
    const speedY = Math.random() + 5;
    const speedR = Math.random() * 4 + 2;

    setTimeout(function () {
      const snow = new Snow(x, 0, scale, rotate, speedX, speedY, speedR);
      snow.render();

      snowArray.value.push(snow);
    }, Math.random() * 8000);
  }
  snowing();
};

const snowing = () => {
  intervalId.value = setInterval(function () {
    if (!canvas.value || !context.value) return;
    context.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    for (var i = 0; i < snowArray.value.length; i++) {
      snowArray.value[i].x =
        (snowArray.value[i].x + snowArray.value[i].speedX) % canvas.value.width;
      snowArray.value[i].y =
        (snowArray.value[i].y + snowArray.value[i].speedY) %
        canvas.value.height;
      snowArray.value[i].rotate =
        (snowArray.value[i].rotate + snowArray.value[i].speedR) % 60;

      snowArray.value[i].render();
    }
  }, 30);
};

onMounted(() => {
  if (canvas.value && context.value) {
    context.value = canvas.value?.getContext('2d');
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
    init();
  }
});

onUnmounted(() => {
  clearInterval(intervalId.value);
});
</script>

<style lang="scss" scoped></style>
