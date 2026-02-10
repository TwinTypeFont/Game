<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'

const props = defineProps({
    data: Object,
    currentIndex: {
        type: Number,
        default: 1
    },
    totalLevels: {
        type: Number,
        default: 1
    }
})

const emit = defineEmits(['answer'])

// Removed internal timer logic to centralize in App.vue

// 選項隨機與作答狀態
const shuffledOptions = ref([])
const hasAnswered = ref(false)
const selectedId = ref(null)
let answerTimeoutId = null

const clearAnswerTimeout = () => {
    if (answerTimeoutId !== null) {
        clearTimeout(answerTimeoutId)
        answerTimeoutId = null
    }
}

// Exposed method for parent to trigger timeout
const forceTimeout = () => {
    if (hasAnswered.value) return // Already answered

    hasAnswered.value = true
    selectedId.value = null
    clearAnswerTimeout()
    // Immediate emit instead of delay for timeout
    emit('answer', 0, false, 'TIMEOUT')
}

defineExpose({ submit: forceTimeout })

const shuffleOptions = () => {
    if (!props.data || !props.data.options) {
        shuffledOptions.value = []
        return
    }
    const arr = [...props.data.options]
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
    }
    shuffledOptions.value = arr
}

const initLevel = () => {
    hasAnswered.value = false
    selectedId.value = null
    clearAnswerTimeout()
    shuffleOptions()
}

// Watch data change to re-init
watch(() => props.data, () => {
    initLevel()
}, { immediate: true })

// Cleanup
onBeforeUnmount(() => {
    clearAnswerTimeout()
})

const progressPercent = computed(() => {
    if (!props.totalLevels || props.totalLevels <= 0) return 0
    const ratio = props.currentIndex / props.totalLevels
    return Math.min(100, Math.max(0, ratio * 100))
})

const formattedIndex = computed(() => {
    const idx = props.currentIndex || 1
    return String(idx).padStart(2, '0')
})

const correctId = computed(() => {
    if (!props.data || !props.data.options) return null
    const opt = props.data.options.find(o => o.isCorrect)
    return opt ? opt.id : null
})

onMounted(() => {
    // startTimer() removed
    // shuffleOptions()
})

// Duplicate watch removed

const select = (opt, correct) => {
    if (hasAnswered.value) return
    // clearTimer() removed

    // onAnswer callback returns (score, isCorrect, userAnswer)
    // 如果做對了，得滿分，否則 0 分
    const isCorrect = opt.isCorrect
    const score = isCorrect ? props.data.points : 0

    hasAnswered.value = true
    selectedId.value = opt.id

    clearAnswerTimeout()
    answerTimeoutId = setTimeout(() => {
        emit('answer', score, isCorrect, opt.id)
    }, 800)
}
</script>

<template>
    <div class="quiz-screen">
        <div class="quiz-header">
            <div class="quiz-counter">{{ formattedIndex }} / {{ totalLevels }}</div>
            <!-- Timer moved to App.vue -->
        </div>

        <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>

        <div class="quiz-container">
            <h2 class="quiz-title">{{ data.title }}</h2>

            <div v-if="data.image" class="question-image">
                <img :src="data.image" alt="Question Reference" />
            </div>

            <p class="question-text">{{ data.question }}</p>

            <div :class="data.type === 'bool' ? 'options-tof-grid' : 'options-grid'">
                <button v-for="opt in shuffledOptions" :key="opt.id" class="option-btn" :class="{
                    'is-selected': hasAnswered && opt.id === selectedId,
                    'is-correct': hasAnswered && opt.id === correctId,
                    'is-wrong': hasAnswered && opt.id === selectedId && !opt.isCorrect
                }" :disabled="hasAnswered" @click="select(opt, opt.isCorrect)">
                    <span class="opt-label">{{ opt.label }}</span>
                    <span class="opt-text">{{ opt.text }}</span>
                    <span v-if="hasAnswered && opt.id === correctId" class="opt-icon opt-icon-correct">
                        ✓
                    </span>
                    <span v-else-if="hasAnswered && opt.id === selectedId && !opt.isCorrect"
                        class="opt-icon opt-icon-wrong">
                        ✕
                    </span>
                    <img v-if="opt.image" :src="opt.image" class="opt-img" />
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.quiz-screen {
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
}

.quiz-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ffffff;
    font-weight: 600;
}

.quiz-counter {
    font-size: 0.9rem;
    letter-spacing: 0.08em;
}

.quiz-timer-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.9rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
    font-size: 0.9rem;
}

.quiz-timer-icon {
    font-size: 1rem;
}

.quiz-progress-bar {
    width: 100%;
    height: 8px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.25);
    overflow: hidden;
}

.quiz-progress-fill {
    height: 100%;
    border-radius: inherit;
    background: #3e850d;
    transition: width 0.3s ease;
}

.quiz-container {
    width: 100%;
    margin: 0 auto;
    text-align: left;
}

.quiz-title {
    font-size: 0.9rem;
    color: #a0a0b5;
    margin-bottom: 0.75rem;
}

.question-text {
    font-size: 1rem;
    margin: 1rem 0 1.5rem;
    line-height: 1.4;
    color: #333;
}

.options-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.options-tof-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.option-btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.4rem 0.6rem;
    border: none;
    background: #ffffff;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s;
}

.option-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    background: #f5f4ff;
}

.option-btn:disabled {
    cursor: default;
}

.option-btn.is-correct {
    background: #208900;
    color: #ffffff;
}

.option-btn.is-wrong {
    background: #b80606;
    color: #ffffff;
}

.opt-label {
    font-weight: bold;
    margin-right: 0.8rem;
    background: #ffffff;
    color: #333;
    width: 40px;
    height: 40px;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 60px;
    padding: 0px;
}

.opt-text {
    font-size: 0.8rem;
    text-align: left;
    font-family: 'Chiron GoRound TC';
}

.opt-icon {
    margin-left: auto;
    font-size: 1.1rem;
}

.opt-icon-correct {
    color: #2ecc71;
}

.opt-icon-wrong {
    color: #e74c3c;
}


/* Bool type (O/X) style adjustment if needed */
@media (max-width: 600px) {

    .options-grid {
        display: grid;
          grid-template-columns: 1fr;
    }
    .option-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0);
}

}
</style>