<script setup>
import { useStore } from '@/stores/store';
import makeRequest from '@/axios/wrapper';

defineProps({
    padding: {
        type: String,
        required: true
    },
    borderRadius: {
        type: String,
        required: true
    },
    boxShadow: {
        type: String,
        required: true
    },
    layout: {
        type: String,
        default: 'horizontal'
    }
})

const store = useStore()

const loadData = () => {
    store.setLoading(true)
    makeRequest({ method: 'GET', url: 'prod/getContent' }).then(res => {
        store.setLoading(false)
        store.setAnimeData(res)
    }).catch(err => {
        console.error('Error fetching data', err)
    })
}
</script>

<template>
    <!-- Horizontal layout of refresh block with logo and title -->
    <div v-if="layout === 'horizontal'">
        <div class="horizontal-main" :style="{ padding: padding, borderRadius: borderRadius, boxShadow: boxShadow }">
            <div class="logo-title-block">
                <div class="logo-block">
                    <img :src="store.animeData.content.logo" alt="pirate" class="logo">
                </div>
                <div class="title">
                    <p>{{ store.animeData.content.title }}</p>
                    <p class="title-subtext">Set sail for one piece</p>
                </div>
            </div>
            <div class="refresh-button-block">
                <button class="refresh-button" @click="loadData()">
                    Refresh
                </button>
                <p class="button-caption-text">in App Purchase</p>
            </div>
        </div>
    </div>
    <!-- Vertical layout of refresh block with logo and title -->
    <div v-if="layout === 'vertical'">
        <div class="vertical-main" :style="{ padding: padding, borderRadius: borderRadius, boxShadow: boxShadow }">
            <div class="vertical-logo-block">
                <img :src="store.animeData.content.logo" alt="pirate" class="logo">
            </div>
            <p class="vertical-title">{{ store.animeData.content.title }}</p>
            <p class="vertical-title-subtext">Set sail for one piece</p>
            <button class="vertical-refresh-button" @click="loadData()">
                Refresh
            </button>
            <p class="vertical-button-caption-text">in App Purchase</p>
        </div>
    </div>
</template>

<style scoped>
.horizontal-main {
    display: flex;
    background-color: var(--vt-c-white);
    z-index: 1;
    position: relative;
}

.logo-title-block {
    display: flex;
    align-items: center;
}

.logo-block {
    width: 50px;
    height: 50px;
    margin-right: 0.6rem;
    box-shadow: var(--vt-c-light-shadow);
    border-radius: 1rem;
}

.logo {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    transform: scale(1);
    object-fit: cover;
}

.title p:first-child {
    font-size: 0.8rem;
    font-weight: 800;
    color: var(--vt-c-black);
    line-height: 0.7rem;
}

.title-subtext {
    font-size: 0.7rem;
}

.refresh-button-block {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.refresh-button {
    text-transform: uppercase;
    background-color: var(--vt-c-grey);
    border: none;
    border-radius: 1rem;
    padding: 0.3rem 0.5rem;
    font-size: 0.7rem;
    color: var(--vt-c-bright-blue);
    font-weight: 600;
    cursor: pointer;
}

.button-caption-text {
    margin-top: 0.1rem;
    font-size: 0.4rem;
}

/* vertical layout styling */

.vertical-main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: var(--vt-c-grey)
}

.vertical-logo-block {
    width: 85px;
    height: 85px;
    box-shadow: var(--vt-c-light-shadow) 0px 1px 4px;
    border-radius: 1rem;
}

.vertical-title {
    font-size: 0.9rem;
    font-weight: 800;
    color: var(--vt-c-black);
    margin-top: 0.5rem;
}

.vertical-title-subtext {
    font-size: 0.65rem;
    color: var(--vt-c-brown);
}

.vertical-refresh-button {
    text-transform: uppercase;
    background-color: var(--vt-c-bright-blue);
    border: none;
    border-radius: 1rem;
    padding: 0.4rem 0.7rem;
    font-size: 0.7rem;
    color: var(--vt-c-white);
    font-weight: 600;
    cursor: pointer;
    margin-top: 0.7rem;
}

.vertical-button-caption-text {
    margin-top: 0.1rem;
    font-size: 0.5rem;
    color: var(--vt-c-brown);
}
</style>