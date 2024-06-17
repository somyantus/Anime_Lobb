<script setup>
import { computed, ref } from 'vue';

import { useStore } from '@/stores/store';
import RefreshBlock from './RefreshBlock.vue';

const store = useStore()
const screenWidth = ref(window.innerWidth)

window.addEventListener('resize', (() => {
    screenWidth.value = window.innerWidth
}));

const screenSize = computed(() => {
    if (screenWidth.value > 740) {
        return 'medium'
    }
    else {
        return 'small'
    }
})

store.setScreensize(screenSize)
</script>

<template>
    <div>
        <!-- For small screen size -->
        <div v-if="screenSize === 'small'" class="hero-section"
            :style="{ 'background-image': 'url(' + store.animeData.content.thumbNailImage + ')' }">
            <div class="button-block">
                <RouterLink class="close-button" to="/"><font-awesome-icon icon="xmark" /></RouterLink>
            </div>
            <div class="heading-block">
                <p class="small-hero-title">Major Update</p>
            </div>
            <h1 class="title">{{ store.animeData.content.subTitle }}</h1>
            <div class="overlay"></div>
        </div>
        <!-- For medium screen size -->
        <div v-if="screenSize === 'medium'" class="hero-section"
            :style="{ 'background-image': 'url(' + store.animeData.content.thumbNailImage + ')' }">
            <div class="button-block">
                <RouterLink class="close-button" to="/"><font-awesome-icon icon="xmark" /></RouterLink>
            </div>
            <div class="hero-content-medium">
                <div class="content-block-medium">
                    <p class="small-hero-title">Major Update</p>
                    <h1 class="title">{{ store.animeData.content.subTitle }}</h1>
                    <RefreshBlock padding="1.5rem 2rem" border-radius="0.5rem"
                        box-shadow="rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px" />
                </div>
            </div>
            <div class="overlay"></div>
        </div>
    </div>
</template>

<style scoped>
.hero-section {
    height: 450px;
    background-size: cover;
    background-position: center;
    padding: 1rem;
    transform: scale(1);
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: var(--vt-c-gradient);
    pointer-events: none;
}

.heading-block {
    display: flex;
    align-items: center;
}

.small-hero-title {
    font-weight: 500;
    font-size: 1rem;
    color: var(--vt-c-white-soft);
    z-index: 1;
    position: relative;
}

.button-block {
    display: flex;
    align-items: center;
}

.close-button {
    margin-left: auto;
    border: none;
    border-radius: 50%;
    background-color: var(--vt-c-grey);
    padding: 0.3rem 0.4rem;
    color: var(--vt-c-brown);
    font-size: 1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    z-index: 1;
    position: relative;
}

.title {
    font-weight: 600;
    font-size: 1.5rem;
    color: var(--vt-c-white);
    z-index: 1;
    position: relative;
}

/* hero section style for medium to large screen sizes */

@media (min-width: 740px) {
    .hero-section {
        height: 500px;
    }

    .overlay {
        background-image: var(--vt-c-right-gradient)
    }

    .content-block-medium {
        max-width: 470px;
        padding: 5rem 1rem 1rem 3rem;
    }

    .small-hero-title {
        font-size: 1rem;
        margin-bottom: 0.6rem;
    }

    .title {
        font-size: 1.7rem;
        margin-bottom: 1rem;
    }
}
</style>