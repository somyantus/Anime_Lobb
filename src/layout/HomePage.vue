<script setup>
import InitialsDateComponent from '@/components/InitialsDateComponent.vue'
import RefreshBlock from '@/components/RefreshBlock.vue'
import { useStore } from '@/stores/store';

const store = useStore()
</script>

<template>
  <main>
    <div class="home-main">
        <InitialsDateComponent />
        <div class="image-block">
            <RouterLink to="/content" class="image-link">
                <img :src="store.animeData.content.thumbNailImage" alt="thumbnail" class="thumbnail-image">
            </RouterLink>
        </div>
        <RefreshBlock padding="0.9rem" border-radius="0 0 1rem 1rem" box-shadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px" />
    </div>
  </main>
</template>

<style scoped>

main {
    padding: 1rem;
}

.home-main {
    max-width: 740px;
    margin: 0 auto;
}

.image-block {
  height: 460px;
  margin-top: 0.3rem;
  border-radius: 1rem 1rem 0 0;
  box-shadow: var(--vt-c-dark-shadow);
}

.image-link {
    padding: 0;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  border-radius: 1rem 1rem 0 0;
  transform: scale(1);
  object-fit: cover;
}

</style>
