<template>
    <div class="overflow-auto max-w-[600px] max-h-[600px] border border-gray-300 rounded dark:border-gray-700">
      <table class="min-w-full border-collapse table-auto">
        <thead class="sticky top-0 bg-gray-200 dark:bg-gray-800 dark:text-white">
          <tr>
            <th class="border p-2">ID</th>
            <th class="border p-2">Альбом</th>
            <th class="border p-2">Название</th>
            <th class="border p-2">Ссылка</th>
            <th class="border p-2">Миниатюра</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="photo in photos" :key="photo.id" class="border dark:border-gray-700">
            <td class="border p-2 dark:text-white">{{ photo.id }}</td>
            <td class="border p-2 dark:text-white">{{ photo.albumId }}</td>
            <td class="border p-2 truncate w-48 dark:text-white" :title="photo.title">{{ photo.title }}</td>
            <td class="border p-2">
              <a :href="photo.url" target="_blank" class="text-blue-500 underline">Ссылка</a>
            </td>
            <td class="border p-2">
              <img :src="photo.thumbnailUrl" :alt="photo.title" class="w-12 h-12 rounded" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia'
  import { usePhotoStore } from '@/stores/photoStore'
  
  const photoStore = usePhotoStore()
  const { photos } = storeToRefs(photoStore)
  </script>
  