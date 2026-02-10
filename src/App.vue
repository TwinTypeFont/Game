<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { levels } from './data/quizData.js'

import QuizLevel from './components/QuizLevel.vue'
import PracticalLevel from './components/PracticalLevel.vue'
import ScoreReport from './components/ScoreReport.vue'
import BezierLevel from './components/BezierLevel.vue'
import TransformLevel from './components/TransformLevel.vue'
import MoleLevel from './components/MoleLevel.vue'
const gameState = ref('intro')
const currentLevelIndex = ref(0)
const userHistory = ref([])
const currentLevelRef = ref(null)

const timeLeft = ref(0)
let timerInterval = null

const formattedTime = computed(() => {
  const m = Math.floor(timeLeft.value / 60)
  const s = timeLeft.value % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

const startTimer = () => {
    clearInterval(timerInterval)
    if (!currentLevelData.value) return 

    const type = currentLevelData.value.type
    if (type === 'quiz') {
        timeLeft.value = 16
    } else if (type === 'bool') {
        timeLeft.value = 12
    } else if (type === 'mole') {
        timeLeft.value = 22
    } else {
        timeLeft.value = 45
    }

    timerInterval = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value--
        } else {
            clearInterval(timerInterval)
            handleTimeout()
        }
    }, 1000)
}

const stopTimer = () => {
    clearInterval(timerInterval)
}

const handleTimeout = () => {
    // Fallback: treat as timeout/skip (0 score)
    // To implement auto-submit for practical levels, we would need 
    // to access component refs, but that can be fragile. 
    // For stability, we mark as timeout.
    handleLevelComplete(0, false, 'TIMEOUT')
}

const currentLevelData = computed(() => levels[currentLevelIndex.value])
const totalScore = computed(() => userHistory.value.reduce((acc, curr) => acc + curr.score, 0))

const startGame = () => {
  gameState.value = 'playing'
  currentLevelIndex.value = 0
  userHistory.value = []
  startTimer()
}

watch(currentLevelIndex, () => {
    if (gameState.value === 'playing') {
        startTimer()
    }
})

watch(gameState, (newState) => {
    if (newState !== 'playing') {
        stopTimer()
    }
})

onUnmounted(() => {
    stopTimer()
})

const handleLevelComplete = (score, isCorrect, answer) => {
  stopTimer()
  userHistory.value.push({
    title: currentLevelData.value.title,
    score: score,
    isCorrect: isCorrect,
    userAnswer: answer
  })

  if (currentLevelIndex.value < levels.length - 1) {
    currentLevelIndex.value++
  } else {
    gameState.value = 'result'
  }
}

const jumpToQuestion = (questionNumber) => {
  const index = Number(questionNumber) - 1
  if (!Number.isFinite(index)) return
  if (index < 0 || index >= levels.length) return
  gameState.value = 'playing'
  currentLevelIndex.value = index
}

if (typeof window !== 'undefined') {
  window.gotoQuestion = jumpToQuestion
}
</script>

<template>
  <div class="app-container">
    <!-- Intro Screen -->
    <div v-if="gameState === 'intro'" class="screen intro">
      <img src="/images/logo.png" alt="Logo" class="floating-logo" style="width: 100%;max-width: 200px;">
      <h1>字體知識大挑戰</h1>
      <p>測試你對中文字體結構與知識的了解。</p>
      <button @click="startGame" class="start-btn">開始測驗</button>
    </div>

    <div v-else-if="gameState === 'playing'" class="screen game">
      <div class="timer-display">
          <span>⏱ {{ formattedTime }}</span>
      </div>
      
      <QuizLevel 
        v-if="currentLevelData.type === 'quiz' || currentLevelData.type === 'bool'"
        :key="`quiz-${currentLevelIndex}`"
        :data="currentLevelData"
        :current-index="currentLevelIndex + 1"
        :total-levels="levels.length"
        @answer="handleLevelComplete"
      />
      
      <PracticalLevel 
        v-else-if="currentLevelData.type === 'practical'"
        :key="`practical-${currentLevelIndex}`"
        :data="currentLevelData"
        @complete="handleLevelComplete"
      />

      <BezierLevel
        v-else-if="currentLevelData.type === 'bezier'"
        :key="`bezier-${currentLevelIndex}`"
        :data="currentLevelData"
        @complete="handleLevelComplete"
      />

      <TransformLevel
        v-else-if="currentLevelData.type === 'transform'"
        :key="`transform-${currentLevelIndex}`"
        :data="currentLevelData"
        @complete="handleLevelComplete"
      />

      <MoleLevel
        v-else-if="currentLevelData.type === 'mole'"
        :key="`mole-${currentLevelIndex}`"
        :data="currentLevelData"
        @answer="handleLevelComplete"
      />
    </div>

    <!-- Result Screen -->
    <ScoreReport 
      v-else-if="gameState === 'result'"
      :score="totalScore"
      :total-score="100"
      :history="userHistory"
      @restart="gameState = 'intro'"
    />

    <footer class="app-footer">
      <a href="https://twintype.co" target="_blank" rel="noopener noreferrer" style="font-size: 10px;">TwinType</a>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 1rem;
}

.app-footer {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: #888;
}

.app-footer a {
  color: inherit;
  text-decoration: none;
}

.app-footer a:hover {
  text-decoration: underline;
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
}

.screen.game {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: none;
  position: relative;
}

.timer-display {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: #444;
    background: rgba(255,255,255,0.8);
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    z-index: 100;
}

.start-btn {
  margin-top: 2rem;
  padding: 0.6rem 1rem;
  font-size: 1em;
  border-radius: 50px;
  border: none;
  background: #333;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;
}

.start-btn:hover {
  transform: scale(1.05);
  background: #000;
}

.screen{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.floating-logo {
  animation: jitter 1.4s ease-in-out infinite;
}

@keyframes jitter {
  0% { transform: translateY(0); }
  50% { transform: translateY(2px); }
}
</style>
