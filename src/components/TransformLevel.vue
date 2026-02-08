<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  data: Object
})

const emit = defineEmits(['complete'])

// Transform state
// Target is (0,0) and scale 1 (Since the path data itself is the target)
// We initialize with some offsets
const position = ref({ x: 0, y: 0 })
const scale = ref({ x: 1, y: 1 }) // Uniform or Non-uniform? Usually maintain aspect ratio or free? Prompt says "scale", implies simple scaling. Let's allow aspect ratio lock or free? "變形" implies deformation, maybe non-uniform. But usually text scaling is uniform. Let's stick to uniform for simplicity unless "deformation" means stretching. "變形框" could mean free transform. Let's start with free resize (independent x/y) or corner scaling.

// Let's implement a standard transform box:
// - Drag body to move
// - Drag corners to scale

const isDragging = ref(false)
const dragMode = ref(null) // 'move', 'nw', 'ne', 'sw', 'se'
const dragStart = ref({ x: 0, y: 0 })
const startTransform = ref({ x: 0, y: 0, w: 1, h: 1 }) // storing scale as w/h relative multiplier

// Bounding box of the target path (Pre-calculated or calculated on runtime? 
// SVG path bounding box is hard to get without rendering. 
// We can estimate or just use a group transform center.
// For simplicity, we apply transform to a group containing the path.
// To make handles work, we need a bounding box. 
// Let's assume a rough bounding box for the target char.
// Path: M1061...
// Approximate bounds from path data:
// x ~ 900 to 1200?
// We can use getBBox() on mount.

const svgRef = ref(null)
const targetRef = ref(null)
const bbox = ref({ x: 0, y: 0, width: 100, height: 100 })

onMounted(() => {
  // Init with random wrong position/scale
  position.value = { x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 100 }
  const randomScale = 0.5 + Math.random() * 0.5 // 0.5 to 1.0
  scale.value = { x: randomScale, y: randomScale }

  // Get BBox
  if (targetRef.value) {
    try {
      const b = targetRef.value.getBBox()
      bbox.value = { x: b.x, y: b.y, width: b.width, height: b.height }
    } catch (e) {
      console.warn("Cannot get BBox", e)
    }
  }
})

const getMousePos = (e) => {
  const svg = svgRef.value
  if (!svg) return { x: 0, y: 0 }
  const CTM = svg.getScreenCTM()
  if (!CTM) return { x: 0, y: 0 }
  const clientX = (e.touches && e.touches.length) ? e.touches[0].clientX : e.clientX
  const clientY = (e.touches && e.touches.length) ? e.touches[0].clientY : e.clientY
  return {
    x: (clientX - CTM.e) / CTM.a,
    y: (clientY - CTM.f) / CTM.d
  }
}

const onDown = (e, mode) => {
  if (e.cancelable) e.preventDefault()
  isDragging.value = true
  dragMode.value = mode
  dragStart.value = getMousePos(e)
  startTransform.value = { 
    x: position.value.x, 
    y: position.value.y, 
    sx: scale.value.x, 
    sy: scale.value.y 
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
  const mouse = getMousePos(e)
  const dx = mouse.x - dragStart.value.x
  const dy = mouse.y - dragStart.value.y

  if (dragMode.value === 'move') {
    position.value.x = startTransform.value.x + dx
    position.value.y = startTransform.value.y + dy
  } else if (dragMode.value === 'se') {
    // Scaling relative to center or top-left?
    // Let's do scaling relative to the element center for intuitive feeling or center of bbox?
    // Simpler: Adjust scale based on distance change?
    // Proper way: 
    // NewWidth = OldWidth + dx
    // ScaleX = NewWidth / BaseWidth
    
    // Let's find the current visual width/height
    const currentW = bbox.value.width * startTransform.value.sx
    const currentH = bbox.value.height * startTransform.value.sy
    
    const newW = Math.max(10, currentW + dx) // min size 10
    const newH = Math.max(10, currentH + dy)
    
    scale.value.x = newW / bbox.value.width
    scale.value.y = newH / bbox.value.height
    
    // Note: This scaling logic maps mouse movement 1:1 to size change only if dragging from exact corner.
    // It's a simplification.
  }
}

const onUp = () => {
  isDragging.value = false
  dragMode.value = null
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseup', onUp)
  window.removeEventListener('touchmove', onMove)
  window.removeEventListener('touchend', onUp)
}

// Check result
const submitted = ref(false)
const score = ref(null)

const submit = () => {
  // Goal: pos(0,0), scale(1,1)
  const posErr = Math.sqrt(position.value.x**2 + position.value.y**2)
  const scaleErr = Math.sqrt((scale.value.x - 1)**2 + (scale.value.y - 1)**2)
  
  // Weights: Position is usually pixel units (large), Scale is ratio (small).
  // Normalize errors.
  // Stricter scoring:
  // Position: Initial random diff is avg ~50-60px. Max ~110px.
  // 100 - posErr * 2 means >50px error -> 0 score.
  // Scale: Initial random diff is avg ~0.25.
  // 100 - scaleErr * 400 means >0.25 error -> 0 score.
  
  const posScore = Math.max(0, 100 - posErr * 2) 
  const scaleScore = Math.max(0, 100 - scaleErr * 400) 
  
  const totalScoreCalc = (posScore * 0.6 + scaleScore * 0.4)
  // Ensure that if the combined score is low (just luck?), it clamps to 0 more aggressively
  // But linear is fine if the individual components are strict.
  
  const earnedPoints = Math.round((totalScoreCalc / 100) * props.data.points)
  
  score.value = earnedPoints
  submitted.value = true
  
  // Snap to result if close?
  if (totalScoreCalc > 80) {
      position.value = { x: 0, y: 0 }
      scale.value = { x: 1, y: 1 }
  }

  setTimeout(() => {
    emit('complete', earnedPoints, true, 'transform-finished')
  }, 1000)
}

defineExpose({ submit })

// Compute transform string for the group
const transformStr = computed(() => {
  // Rotate/Scale around the center of the object?
  // If we just use translate/scale, it scales from (0,0) of the group.
  // If we want to scale from center of the character, we need:
  // translate(cx, cy) scale(s) translate(-cx, -cy)
  // plus the user translation.
  
  const cx = bbox.value.x + bbox.value.width / 2
  const cy = bbox.value.y + bbox.value.height / 2
  
  return `translate(${position.value.x}, ${position.value.y}) translate(${cx}, ${cy}) scale(${scale.value.x}, ${scale.value.y}) translate(${-cx}, ${-cy})`
})

// Bounding box visual (transformed)
// We need to display the box around the transformed shape
// The box itself needs the same transform
</script>

<template>
  <div class="transform-level">
    <div class="header">
      <h2>{{ data.title }} ({{ data.points }}分)</h2>
      <p>{{ data.description }}</p>
    </div>

    <div class="canvas-wrapper">
      <svg
        ref="svgRef"
        class="game-canvas"
        :viewBox="data.viewBox || '0 0 1000 1000'"
      >
        <!-- Static Background Parts -->
        <g class="static-layer">
          <path 
            v-for="(d, i) in data.staticPaths" 
            :key="i" 
            :d="d" 
            fill="#333" 
            opacity="1" 
          />
        </g>

        <!-- Target Part (Transformed) -->
        <g :transform="transformStr">
          <!-- The Shape -->
          <path 
            ref="targetRef"
            :d="data.targetPath" 
            fill="#000" 
            :class="{ active: !submitted, done: submitted }"
            style="cursor: move;"
            @mousedown="!submitted ? onDown($event, 'move') : null"
            @touchstart="!submitted ? onDown($event, 'move') : null"
          />
          
          <!-- Transform Box UI (Only show when not submitted) -->
          <g v-if="!submitted">
            <!-- Box Outline -->
            <rect
              :x="bbox.x"
              :y="bbox.y"
              :width="bbox.width"
              :height="bbox.height"
              fill="none"
              stroke="#00a0ff"
              stroke-width="2"
              stroke-dasharray="5,5"
              pointer-events="none"
            />
            
            <!-- Handle: Bottom Right (Scale) -->
            <rect
              :x="bbox.x + bbox.width - 10"
              :y="bbox.y + bbox.height - 10"
              width="20"
              height="20"
              fill="#00a0ff"
              style="cursor: nwse-resize;"
              @mousedown.stop="onDown($event, 'se')"
              @touchstart.stop="onDown($event, 'se')"
            />
          </g>
        </g>
      </svg>
    </div>

    <div class="controls">
      <button class="submit-btn" @click="submit" :disabled="submitted">
        {{ submitted ? `得分: ${score}` : '確定' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.transform-level {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.canvas-wrapper {
  width: 100%;
  max-width: 800px; /* Wider for this specific SVG */
  border: 1px solid #eee;
  background: #fff;
  margin: 1rem 0;
}
.game-canvas {
  width: 100%;
  height: auto;
  display: block;
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
.submit-btn:disabled {
  background: #888;
}
</style>