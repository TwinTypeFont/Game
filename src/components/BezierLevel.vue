<script setup>
import { ref, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  data: Object
})

const emit = defineEmits(['complete'])

const startPart = "M407.907,810.08c-5.062-36.596-11.364-67.511-18.931-92.743-26.881-89.633-120.943-120.833-242.253-141.943v-24.613c53.981,3.964,289.907,17.046,304.701,17.046,34.887,0,41.632-15.239,41.632-35.951V146.021l293.363,26.498c-3.796,27.764-25.258,44.163-64.36,49.2v321.496"
const endPart = "Z"
const anchorStart = { x: 722.06, y: 543.215 }
const anchorEnd = { x: 407.907, y: 810.08 }
const fixedCP1 = { x: 722.06, y: 723.645 }
const targetControl1 = { x: 651.403, y: 790.005 } 

const control1 = ref({
  x: targetControl1.x + 80,
  y: targetControl1.y - 120
})

const isDragging = ref(false)

const dragOffset = ref({ x: 0, y: 0 })
const svgRef = ref(null)

const getMousePosition = (evt) => {
  const svg = svgRef.value
  if (!svg) return { x: 0, y: 0 }

  const CTM = svg.getScreenCTM()
  if (!CTM) return { x: 0, y: 0 }

  const clientX = (evt.touches && evt.touches.length)
    ? evt.touches[0].clientX
    : evt.clientX
  const clientY = (evt.touches && evt.touches.length)
    ? evt.touches[0].clientY
    : evt.clientY

  return {
    x: (clientX - CTM.e) / CTM.a,
    y: (clientY - CTM.f) / CTM.d
  }
}

const onDown = (e) => {
  if (e.cancelable) e.preventDefault()
  isDragging.value = true

  const pos = getMousePosition(e)
  dragOffset.value = {
    x: pos.x - control1.value.x,
    y: pos.y - control1.value.y
  }

  if (e.type === 'touchstart') {
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onUp)
  } else {
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }
}

const onMove = (e) => {
  if (!isDragging.value) return
  if (e.cancelable) e.preventDefault()
  const pos = getMousePosition(e)
  control1.value = {
    x: pos.x - dragOffset.value.x,
    y: pos.y - dragOffset.value.y
  }
}

const onUp = () => {
  isDragging.value = false
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseup', onUp)
  window.removeEventListener('touchmove', onMove)
  window.removeEventListener('touchend', onUp)
}

onBeforeUnmount(() => {
  onUp()
})

const buildPath = (c1) => {
  // 將絕對座標轉回相對座標，以符合 path 語法
  // c dx1,dy1 dx2,dy2 dx,dy
  // Start point is anchorStart
  const dx1 = fixedCP1.x - anchorStart.x
  const dy1 = fixedCP1.y - anchorStart.y
  const dx2 = c1.x - anchorStart.x
  const dy2 = c1.y - anchorStart.y
  const dx  = anchorEnd.x - anchorStart.x
  const dy  = anchorEnd.y - anchorStart.y
  

  return `${startPart}c${dx1},${dy1} ${dx2},${dy2} ${dx},${dy}${endPart}`
}


const pathUser = computed(() => buildPath(control1.value))


const pathTarget = computed(() => buildPath(targetControl1))

const submitted = ref(false)
const score = ref(null)

const submit = () => {
  const dx = control1.value.x - targetControl1.x
  const dy = control1.value.y - targetControl1.y
  const dist = Math.sqrt(dx * dx + dy * dy)
  const accuracy = Math.max(0, 100 - dist * 0.8)
  const earnedPoints = Math.round((accuracy / 100) * props.data.points)

  score.value = earnedPoints
  submitted.value = true

  setTimeout(() => {
    emit('complete', earnedPoints, true, 'bezier-finished')
  }, 1000)
}

defineExpose({ submit })
</script>

<template>
  <div class="bezier-container">
    <div class="header">
      <h2>{{ data.title }} ({{ data.points }}分)</h2>
      <p>{{ data.description }}</p>
    </div>

    <div class="canvas-wrapper">
      <svg
        ref="svgRef"
        class="bezier-canvas"
        width="500"
        height="500"
        viewBox="0 0 1000 1000"
      >

        <path
          v-if="submitted"
          :d="pathTarget"
          fill="#f5f5f5"
          stroke="#ddd"
          stroke-width="12"
        />

        <path
          :d="pathUser"
          fill="none"
          stroke="#000"
          stroke-width="14"
          stroke-linejoin="round"
          stroke-linecap="round"
        />

        <!-- Visualize Handles & Anchors -->
        <circle
          :cx="anchorStart.x"
          :cy="anchorStart.y"
          r="8"
          fill="#00c0a0"
        />

        <!-- Handle 1 (Fixed CP1) -->
        <line
          :x1="anchorStart.x"
          :y1="anchorStart.y"
          :x2="fixedCP1.x"
          :y2="fixedCP1.y"
          stroke="#999"
          stroke-width="3"
          stroke-dasharray="6 4"
        />
        <circle
          :cx="fixedCP1.x"
          :cy="fixedCP1.y"
          r="6"
          fill="#ccc"
          stroke="#999"
          stroke-width="2"
          style="pointer-events: none;"
        />

        <!-- Anchor 2 (End of curve) -->
        <circle
          :cx="anchorEnd.x"
          :cy="anchorEnd.y"
          r="8"
          fill="#00c0a0"
        />

        <line
          :x1="anchorEnd.x"
          :y1="anchorEnd.y"
          :x2="control1.x"
          :y2="control1.y"
          stroke="#ff9f1c"
          stroke-width="4"
          stroke-dasharray="8 6"
        />
        <circle
          :cx="control1.x"
          :cy="control1.y"
          r="16"
          fill="#ff3366"
          stroke="#fff"
          stroke-width="3"
          style="cursor: grab;"
          @mousedown="onDown"
          @touchstart="onDown"
        />

      </svg>
    </div>

    <div class="controls">
      <button class="submit-btn" @click="submit">
        {{ submitted ? `得分: ${score}` : '提交筆畫' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.bezier-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.canvas-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1 / 1;
  border: 1px solid #eee;
  background: #fdfdfd;
  margin: 20px 0;
  touch-action: none;
}

.bezier-canvas {
  width: 100%;
  height: 100%;
}

.submit-btn {
  padding: 1rem 3rem;
  font-size: 1.2rem;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.submit-btn:hover {
  background: #555;
}
</style>
