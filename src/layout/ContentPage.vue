<script setup>
import HeroSection from '@/components/HeroSection.vue';
import RefreshBlock from '@/components/RefreshBlock.vue';
import { useStore } from '@/stores/store';

const store = useStore()
const bodyText = store.animeData.content.text
const parser = new DOMParser()

// Extracting HTML content from text we get in api
const htmlDocument = parser.parseFromString(bodyText, 'text/html')
const paragraphs = htmlDocument.querySelectorAll('p')
const paragraphTexts = Array.from(paragraphs).map(paragraph => paragraph.textContent);

// Function to get the first three words of a paragraph
const getFirstThreeWords = (paragraph) => {
    return paragraph.split(" ").slice(0, 3).join(" ");
};
</script>

<template>
    <main>
        <HeroSection />
        <!-- Refresh block if screen size is small -->
        <RefreshBlock v-if="store.screenSize === 'small'" padding="1rem 2rem" border-radius="none"
            box-shadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px" />
        <div class="body">
            <!-- Loop through paragraph texts -->
            <div class="content-block" v-for="(para, index) in paragraphTexts" :key="index">
                <!-- Render first three words of the paragraph because they need to be bold -->
                <span class="bold-black">{{ getFirstThreeWords(para) }}</span>
                <!-- Render the remaining text of the paragraph -->
                <span>{{ para.substr(getFirstThreeWords(para).length) }}</span>
                <!-- Render image after the third paragraph -->
                <div v-if="index === 2" class="content-image-block">
                    <img :src="store.animeData.content.mainImage" alt="Naruto" class="content-image">
                </div>
            </div>
        </div>
        <RefreshBlock padding="1.5rem 2rem" border-radius="none"
            box-shadow="rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px" layout="vertical" />
    </main>
</template>

<style scoped>
.body {
    padding: 0.7rem 0 1.7rem;
}

.content-block {
    padding: 0.5rem 1rem;
}

.content-image-block {
    height: 500px;
    margin-top: 1rem;
}

.content-image {
    width: 100%;
    height: 100%;
    border-radius: 0.7rem;
    transform: scale(1);
    object-fit: cover;
}

.bold-black {
    font-weight: bold;
    color: var(--vt-c-black);
}

@media (min-width: 740px) {
    .body {
        padding: 1.5rem 0 1.7rem;
    }
}
</style>