import { defineStore } from 'pinia'

export const useStore = defineStore({
    id: 'main',
    state: () => ({
        animeData: null,
        isLoading: false,
        screenSize: null,
    }),
    actions: {
        setAnimeData (data) {
            this.animeData = data
        },
        setLoading (value) {
            this.isLoading = value
        },
        setScreensize (value) {
            this.screenSize = value
        }
    }
})