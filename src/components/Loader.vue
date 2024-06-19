<script setup>
import { computed } from 'vue'

import { useStore } from '@/stores/store'

const store = useStore()
const message = 'Loading please wait...'

const isLoading = computed(() => store.isLoading)
</script>

<template>
   <div v-if="isLoading" class="loader">
      <div class="spinner"></div>
      <div class="message">{{ message }}</div>
   </div>
</template>

<style>
.loader {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: var(--vt-c-light-grey);
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   z-index: 9999;
}

.spinner {
   border: 4px solid var(--vt-c-grey-1);
   border-top: 4px solid var(--vt-c-blue);
   border-radius: 50%;
   width: 30px;
   height: 30px;
   animation: spin 1s linear infinite;
   /*
- 'spin': Specifies the name of the animation defined in the @keyframes rule.
- '1s': Specifies the duration of the animation, in this case, 1 second.
- 'linear': Specifies the timing function of the animation, making it progress at a constant speed.
- 'infinite': Specifies that the animation should repeat indefinitely, creating a continuous looping effect.
*/
}

@keyframes spin {
   /* Start state: no rotation */
   0% {
      transform: rotate(0deg);
   }

   /* End state: full rotation (360 degrees) */
   100% {
      transform: rotate(360deg);
   }
}

.message {
   margin-top: 10px;
}
</style>
