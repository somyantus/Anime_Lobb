<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

import { useStore } from './stores/store.js'
import makeRequest from './axios/wrapper';
import Loader from './components/Loader.vue';

const store = useStore();

const fetchData = () => {
    store.setLoading(true)
    makeRequest({method: 'GET', url: 'prod/getContent'}).then(res => {
      store.setLoading(false)
      store.setAnimeData(res)
    }).catch(err => {
      console.error('Error fetching data', err)
    })
}

onMounted(() => {
  fetchData()
});

</script>

<template>
  <Loader />
  <RouterView v-if="store.animeData"  />
</template>
