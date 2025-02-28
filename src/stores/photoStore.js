import { defineStore } from 'pinia'

export const usePhotoStore = defineStore('photos', {
  state: () => ({
    photos: [],
    loading: false
  }),
  actions: {
    async fetchPhotos(albumIds = []) {
      this.loading = true
      try {
        let url = 'https://jsonplaceholder.typicode.com/photos'
        if (albumIds.length) {
          const params = albumIds.map(id => `albumId=${id}`).join('&') 
          url += `?${params}`
        }
        const res = await fetch(url)
        this.photos = await res.json()
        console.log('Загруженные фото:', this.photos) 
      } catch (err) {
        console.error('Ошибка при загрузке фотографий:', err)
      } finally {
        this.loading = false
      }
    }
  }
})
