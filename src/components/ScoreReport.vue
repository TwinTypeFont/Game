<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  score: Number,
  totalScore: Number,
  history: Array
})

const displayedScore = ref(0)

onMounted(() => {
  const duration = 2000 // 動畫持續時間 (毫秒)
  const start = 0
  const end = props.score || 0
  
  if (end === 0) return

  const startTime = performance.now()
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Ease out expo function for smooth deceleration
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    
    displayedScore.value = Math.floor(start + (end - start) * ease)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  requestAnimationFrame(animate)
})
</script>

<template>
  <div class="score-report-container">
    <div class="score-card">
        <!-- Decoration or Icon based on score -->
        <div class="icon-wrapper">
            <img style="height: 20px;" v-if="score >= 95" src="/images/4.png" alt="頂尖成績"/>
            <img style="height: 20px;" v-else-if="score >= 90" src="/images/3.png" alt="字體大師" />
            <img style="height: 20px;" v-else-if="score >= 80" src="/images/5.png" alt="有天賦" />
            <img style="height: 20px;" v-else-if="score >= 70" src="/images/1.png" alt="需要加強" />
            <img style="height: 20px;" v-else src="/images/2.png" alt="再接再厲" />
        </div>


        <div class="score-display">
            <span class="score-number" style="font-family: 'Shantell Sans';font-weight: 500;">{{ displayedScore }}</span>
            <span class="score-total">/ {{ totalScore || 100 }}</span>
        </div>

        <div class="feedback-text">
            <p v-if="score >= 95">你就是下一個 Adrian Frutiger</p>
            <p v-else-if="score >= 90">你是字體大師~ 旁邊填入職表，謝謝！</p>
            <p v-else-if="score >= 80">不錯喔，有天賦！</p>
            <p v-else-if="score >= 70">不錯喔，但還有進步空間。</p>
            <p v-else-if="score >= 60">加油，往前衝！</p>
            <p v-else>再接再厲，字體的世界很水深的 xD。</p>
        </div>

        <button class="restart-btn" @click="$emit('restart')">重新挑戰</button>
    </div>
  </div>
</template>

<style scoped>
.score-report-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    height: 100%;
    min-height: 400px;
}

.score-card {
    background: #ffffff;
    border-radius: 32px;
    padding: 3rem 2rem;
    width: 100%;
    max-width: 420px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
    position: relative;
    overflow: hidden;
}

/* Optional gentle background decoration for the card header */
.score-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(180deg, rgba(255, 238, 4, 0.113) 0%, rgb(255, 255, 255) 100%);
    z-index: 0;
    border-radius: 32px 32px 0 0;
}

.icon-wrapper {
    position: relative;
    line-height: 1;
    margin-bottom: -0.5rem;
    z-index: 1;
}

.icon-wrapper img {

    object-fit: contain;
}

.title {
    position: relative;
    font-size: 1.6rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0;
    z-index: 1;
}

.score-display {
    position: relative;
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 0.5rem;
    margin: 1rem 0;
    z-index: 1;
}

.score-number {
    font-size: 5.5rem;
    font-weight: 800;
    line-height: 1;
    color: #00ff8c;
    /* Optional gradient text */
    background: linear-gradient(135deg, #b40101 0%, #f45151 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.score-total {
    font-size: 1.5rem;
    color: #94a3b8;
    font-weight: 600;
}

.feedback-text {
    position: relative;
    color: #64748b;
    font-size: 1.15rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    z-index: 1;
    font-weight: 500;
}

.restart-btn {
    position: relative;
    background-color: #000000;
    color: white;
    border: none;
    padding: 0.8rem 1.2rem;
    font-size: 1.125rem;
    font-weight: 600;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 80%;
    z-index: 1;
}

.restart-btn:hover {
    transform: translateY(-2px);
    background-color: #fcc41c;
}

.restart-btn:active {
    transform: translateY(0);
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes bounce {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-5px) scale(1.05); }
}
</style>