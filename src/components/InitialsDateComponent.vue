<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue'

import { useStore } from '@/stores/store'

const store = useStore()
const currentDate = ref('')
const currentDay = ref('')
const currentMonth = ref('')

// Function to update current date, day, and month
const updateDateAndDay = () => {
   const date = new Date()
   currentDate.value = date.getDate()
   currentDay.value = date.toLocaleDateString(
      getCurrentInstance()?.appContext.config?.global?.locale,
      { weekday: 'long' }
   )
   currentMonth.value = date.toLocaleDateString(
      getCurrentInstance()?.appContext.config?.global?.locale,
      { month: 'long' }
   )
}

// Computed property to get initials from username
const initials = computed(() => {
   // Splitting the username into words
   const words = store.animeData.content.userName.split(' ')
   // Extracting first letter of each word and converting to uppercase
   return words.map((word) => word.charAt(0).toUpperCase()).join('')
})

onMounted(() => {
   updateDateAndDay()
})
</script>

<template>
   <div class="main">
      <div class="date-day-block">
         <p class="date-day">{{ currentDay }} {{ currentDate }} {{ currentMonth }}</p>
      </div>
      <div class="initials-today-block">
         <p class="today">Today</p>
         <div class="initials">
            <p>{{ initials }}</p>
         </div>
      </div>
   </div>
</template>

<style scoped>
.date-day {
   font-weight: 600;
   font-size: 0.8rem;
   margin-bottom: 0.3rem;
   line-height: 0.5rem;
}

.initials-today-block {
   display: flex;
   align-items: center;
}

.today {
   color: var(--vt-c-black);
   font-size: 2rem;
   font-weight: 700;
}

.initials {
   display: flex;
   align-items: center;
   margin-left: auto;
   color: var(--vt-c-black);
   background: var(--vt-c-grey);
   padding: 0.4rem 0.5rem;
   border-radius: 50%;
}

.initials > p {
   font-weight: 700;
   margin: 0;
}
</style>
