<template>
  <div class="p-4">
    <div class="mb-4 flex items-center space-x-2">
      <input v-model="albumFilter" 
             type="text" placeholder="ID альбомов (через пробел)" 
             class="border px-2 py-1 rounded"
      >
      <button @click="applyFilter" class="bg-blue-500 text-white px-4 py-1 rounded">
        Поиск
      </button>
    </div>
    <div v-if="photoStore.loading" class="mb-2 text-gray-500">Загрузка данных...</div>
    <div class="overflow-auto border rounded" style="width:600px; height:600px;" @scroll="onTableScroll">
      <table class="min-w-full text-sm text-left border-collapse">
        <thead class="bg-gray-100 sticky top-0">
  <tr>
    <th @click="sortBy('id')" class="px-2 py-1 cursor-pointer">ID ▲▼</th>
    <th @click="sortBy('albumId')" class="px-2 py-1 cursor-pointer">Album ID ▲▼</th>
    <th @click="sortBy('title')" class="px-2 py-1 cursor-pointer">Title ▲▼</th>
    <th class="px-2 py-1">Ссылка</th>
    <th class="px-2 py-1">Image</th>
  </tr>
</thead>
<tbody>
  <tr v-for="photo in visiblePhotos" :key="photo.id" class="border-b">
    <td class="px-2 py-1">{{ photo.id }}</td>
    <td class="px-2 py-1">{{ photo.albumId }}</td>
    <td class="px-2 py-1 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap" :title="photo.title">
      {{ photo.title }}
    </td>
    <td class="border p-2">
      <a :href="photo.url" target="_blank" class="text-blue-500 underline">Ссылка</a>
    </td>
    <td class="px-2 py-1">
      <img :src="photo.thumbnailUrl" :alt="photo.title" class="w-12 h-12 rounded" />
    </td>
  </tr>
</tbody>

      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePhotoStore } from '@/stores/photoStore'



const photoStore = usePhotoStore()

const albumFilter = ref('')
const sortKey = ref('')
const sortAsc = ref(true)
const visibleCount = ref(20)

const filteredPhotos = computed(() => {
  if (!albumFilter.value) return photoStore.photos
  const ids = albumFilter.value.split(/\s+/).filter(Boolean).map(Number)
  return photoStore.photos.filter(photo => ids.includes(photo.albumId))
})

const sortedPhotos = computed(() => {
  const list = [...filteredPhotos.value]
  if (!sortKey.value) return list
  list.sort((a, b) => {
    if (a[sortKey.value] < b[sortKey.value]) return sortAsc.value ? -1 : 1
    if (a[sortKey.value] > b[sortKey.value]) return sortAsc.value ? 1 : -1
    return 0
  })
  return list
})

const visiblePhotos = computed(() => sortedPhotos.value.slice(0, visibleCount.value))

function applyFilter() {
  const query = albumFilter.value.trim()
  const ids = query.split(/\s+/).filter(Boolean).map(Number)
  photoStore.fetchPhotos(ids)
  sortKey.value = ''
  visibleCount.value = 20
}

function sortBy(key) {
  if (sortKey.value === key) sortAsc.value = !sortAsc.value
  else {
    sortKey.value = key
    sortAsc.value = true
  }
  visibleCount.value = 20
}

function onTableScroll(event) {
  const el = event.target
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10 && visibleCount.value < sortedPhotos.value.length) {
    visibleCount.value += 20
  }
}

onMounted(() => {
  photoStore.fetchPhotos()
})
</script>
