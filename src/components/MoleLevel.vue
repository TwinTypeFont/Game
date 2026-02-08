<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  data: Object
})

const emit = defineEmits(['answer'])

const hasAnswered = ref(false)
const selectedId = ref(null)
const shuffledOptions = ref([])

onMounted(() => {
    if (props.data.options) {
        // Simple shuffle
        // We shuffle the options so the 'mole' image isn't always in the same spot
        shuffledOptions.value = [...props.data.options].sort(() => Math.random() - 0.5)
    }
})

const handleSelect = (item) => {
    if (hasAnswered.value) return
    hasAnswered.value = true
    selectedId.value = item.id
    
    // Check if the clicked item has id='mole'
    const isCorrect = item.id === 'mole'
    const score = isCorrect ? (props.data.points || 10) : 0
    
    setTimeout(() => {
        emit('answer', score, isCorrect, item.id)
    }, 1000)
}
</script>

<template>
    <div class="mole-level">
        <div class="header">
            <h2>{{ data.title }}</h2>
            <p>{{ data.question }}</p>
        </div>
        
        <div class="grid-container">
            <button
                v-for="item in shuffledOptions" 
                :key="item.id"
                class="mole-item"
                :class="{ 
                    selected: selectedId === item.id,
                    correct: hasAnswered && item.id === 'mole',
                    wrong: hasAnswered && selectedId === item.id && item.id !== 'mole',
                    masked: hasAnswered && item.id !== 'mole' && selectedId !== item.id
                }"
                @click="handleSelect(item)"
            >
                <img :src="item.image" :alt="item.id" class="mole-img" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.mole-level {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

.header {
    margin-bottom: 2rem;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 0px;
    justify-content: center;
    width: 100%;
    max-width: 400px;
}

.mole-item {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border: 0px solid #ddd;
    border-radius: 12px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;
}

.mole-item:hover:not(.selected):not(.masked) {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
    border-color: #bbb;
}

.mole-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none; /* Prevent image drag/interactions interfering with button click */
}

.mole-item.selected {
    border-color: #333;
    background-color: #f0f0f0;
}

.mole-item.correct {
    background-color: #d4edda;
    border-color: #28a745;
}

.mole-item.wrong {
    background-color: #f8d7da;
    border-color: #dc3545;
    animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}

.mole-item.masked {
    opacity: 0.5;
    cursor: default;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

@media (max-width: 600px) {
    .grid-container {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
