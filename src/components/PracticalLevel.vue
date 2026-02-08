<script setup>
import { ref, onMounted } from 'vue'
import { animate, utils } from 'animejs';

const props = defineProps({
  data: Object // The level data containing strokes info
})

const emit = defineEmits(['complete'])

const strokes = ref([])
const score = ref(null)
const selectedStroke = ref(null)
const dragOffset = ref({ x: 0, y: 0 })
// Ref for the SVG element
const activeSvg = ref(null)

// Init logic: Clone data and randomize position
onMounted(() => {
  strokes.value = props.data.data.map(s => {
    // If static, keep at target position. If not, randomize.
    if (s.isStatic) {
      return { 
        ...s, 
        x: s.targetX, 
        y: s.targetY, 
        isDragging: false 
      }
    }
    return {
      ...s,
      // Random position - keeping it within a more reasonable range
      x: (Math.random() - 0.5) * 400, 
      y: (Math.random() - 0.5) * 400,
      isDragging: false
    }
  })

  // Intro animation
  setTimeout(() => {
    try {
      // Select elements directly to ensure we find them
      const targets = document.querySelectorAll('.stroke-group:not(.static)')
      if (targets.length > 0) {
        animate(targets, {
          opacity: [0, 1],
          // translateY: [30, 0], // Removing transform animation to avoid conflict with Vue position binding
          delay: utils.stagger(80),
          easing: 'easeOutQuad'
        })
      }
    } catch (err) {
      console.warn('Animation error:', err)
    }
  }, 100)
})

const getMousePosition = (evt) => {
  const svg = activeSvg.value
  if (!svg) return { x: 0, y: 0 }
  
  const CTM = svg.getScreenCTM()
  if (!CTM) return { x: 0, y: 0 }
  
  const clientX = (evt.touches && evt.touches.length) ? evt.touches[0].clientX : evt.clientX
  const clientY = (evt.touches && evt.touches.length) ? evt.touches[0].clientY : evt.clientY

  return {
    x: (clientX - CTM.e) / CTM.a,
    y: (clientY - CTM.f) / CTM.d
  }
}

const startDrag = (e, stroke) => {
  if (e.cancelable) e.preventDefault();
  selectedStroke.value = stroke
  stroke.isDragging = true
  
  const mousePos = getMousePosition(e)
  
  dragOffset.value = {
    x: mousePos.x - stroke.x,
    y: mousePos.y - stroke.y
  }
  
  if (e.type === 'touchstart') {
     window.addEventListener('touchmove', onDrag, { passive: false })
     window.addEventListener('touchend', stopDrag)
  } else {
     window.addEventListener('mousemove', onDrag)
     window.addEventListener('mouseup', stopDrag)
  }
}

const onDrag = (e) => {
  if (selectedStroke.value) {
    if (e.cancelable) e.preventDefault();
    const mousePos = getMousePosition(e)
    selectedStroke.value.x = mousePos.x - dragOffset.value.x
    selectedStroke.value.y = mousePos.y - dragOffset.value.y
  }
}

const stopDrag = () => {
  if (selectedStroke.value) {
    selectedStroke.value.isDragging = false
    selectedStroke.value = null
  }
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('touchend', stopDrag)
}

const submit = () => {
  let totalDist = 0
  let activeStrokeCount = 0
  
  strokes.value.forEach(s => {
    const dx = s.x - s.targetX
    const dy = s.y - s.targetY
    totalDist += Math.sqrt(dx*dx + dy*dy)
    if (!s.isStatic) activeStrokeCount++
  })
  
  // Only average the distance over the strokes that actually moved
  // This prevents static strokes from diluting the error (making the score superficially high)
  const count = activeStrokeCount > 0 ? activeStrokeCount : strokes.value.length
  const avgDist = totalDist / count
  
  // Stricter scoring: 
  // Previously: 100 - (avgDist / 2) where avgDist was diluted by static strokes
  // Now: 100 - avgDist (no division)
  const accuracy = Math.max(0, 100 - avgDist) 
  const earnedPoints = Math.round((accuracy / 100) * props.data.points)
  
  score.value = earnedPoints

  // Visual reward
  if (accuracy > 80) {
    strokes.value.forEach((s) => {
      // Don't animate static ones, although they are already at target
      if (!s.isStatic) {
        animate(s, {
          x: s.targetX,
          y: s.targetY,
          easing: 'spring(1, 80, 10, 0)'
        });
      }
    })
  }

  // Delay slightly then callback - ensuring it's called
  console.log('PracticalLevel: Submitting with score', earnedPoints)
  setTimeout(() => {
     console.log('PracticalLevel: Emitting complete event')
     emit('complete', earnedPoints, true, 'finished')
  }, 1000)
}

defineExpose({ submit })
</script>

<template>
  <div class="practical-container">
    <div class="header">
      <h2>{{ data.title }} ({{ data.points }}分)</h2>
      <p>{{ data.description }}</p>
    </div>

    <div class="canvas-wrapper">
      <!-- Target Guide (Faint) - Hidden as requested -->
      <svg class="game-canvas guide" width="500" height="500" viewBox="0 0 1000 1000">
      </svg>

      <!-- Active Layer -->
      <svg class="game-canvas active" ref="activeSvg" width="500" height="500" viewBox="0 0 1000 1000">
        <g 
          v-for="s in strokes" 
          :key="s.id" 
          :transform="`translate(${s.x}, ${s.y})`"
          @mousedown="s.isStatic ? null : startDrag($event, s)"
          @touchstart="s.isStatic ? null : startDrag($event, s)"
          :class="{ dragging: s.isDragging, static: s.isStatic }"
          :style="{ cursor: s.isStatic ? 'default' : 'grab' }"
          class="stroke-group"
        >
          <!-- 支援路徑與矩形 -->
          <path v-if="s.d" :d="s.d" :fill="s.isStatic ? '#393939' : 'black'" stroke="none" />
          <rect v-else :x="s.rectX" :y="s.rectY" :width="s.width" :height="s.height" :fill="s.isStatic ? '#393939' : 'black'" stroke="none" />
          
          <!-- Invisible wide area for easier grabbing -->
          <path v-if="s.d" :d="s.d" stroke="transparent" stroke-width="50" fill="none" />
          <rect v-else :x="s.rectX" :y="s.rectY" :width="s.width" :height="s.height" stroke="transparent" stroke-width="50" fill="none" />
        </g>
      </svg>
    </div>

    <div class="controls">
      <button class="submit-btn" @click="submit" :disabled="score !== null">
        {{ score !== null ? `得分: ${score}` : '送出' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.practical-container {
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
  height: auto;
  border: 1px solid #eee; /* Light border */
  background: #fdfdfd;
  margin: 20px 0;
  touch-action: none; /* Prevent scrolling when touching canvas */
}
.game-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.stroke-group {
  transition: opacity 0.2s;
}
.stroke-group:not(.static):hover {
  opacity: 0.8;
}
.stroke-group.dragging {
  cursor: grabbing !important;
  opacity: 0.6;
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
.submit-btn:disabled {
  background: #42b883;
  cursor: default;
}
</style>