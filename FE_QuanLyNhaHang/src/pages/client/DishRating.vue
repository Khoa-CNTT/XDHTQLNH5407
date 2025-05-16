<template>
    <div class="dish-rating-overlay">
      <div class="dish-rating-modal">
        <button class="close-btn" @click="$emit('close')">×</button>
  
        <h2 style="font-size: 30px;">Đánh giá cho: {{ dish.name }}</h2>
  
        <div class="dish-image-wrapper">
          <img
            :src="dish.image"
            alt="Dish Image"
            class="dish-image"
            @click="showFullImage = true"
          />
        </div>
  
        <ul v-if="reviews.length > 0" class="review-list">
          <li v-for="review in reviews" :key="review.id" class="review-item">
            <strong>{{ review.customer?.FullName || 'Ẩn danh' }}:</strong>
            <p>{{ review.detail }}</p>
            <p>⭐ {{ review.star }}/5</p>
          </li>
        </ul>
  
        <p v-else>Chưa có đánh giá nào cho món này.</p>
      </div>
  
      <!-- Hình ảnh lớn khi click -->
      <div class="full-image-modal" v-if="showFullImage" @click="showFullImage = false">
        <img :src="dish.image" alt="Dish Full Image" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import api from '../../services/api'
  
  const props = defineProps({
    dish: Object
  })
  
  const reviews = ref([])
  const showFullImage = ref(false)
  
  onMounted(async () => {
    try {
      const res = await api.get('/client/rates')
      reviews.value = res.data.data.filter(r => r.id_food === props.dish.id)
    } catch (error) {
      console.error('Lỗi khi tải đánh giá:', error)
    }
  })
  </script>
  
  <style scoped>
  .dish-rating-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .dish-rating-modal {
    background: white;
    padding: 2em;
    width: 90%;
    max-width: 600px;
    border-radius: 12px;
    position: relative;
    max-height: 80vh;
    overflow-y: auto;
  }
  
  .close-btn {
    position: absolute;
    top: 12px;
    right: 16px;
    font-size: 1.5em;
    border: none;
    background: none;
    cursor: pointer;
  }
  
  .dish-image-wrapper {
    text-align: center;
    margin-bottom: 1em;
  }
  
  .dish-image {
    max-width: 100%;
    height: auto;
    cursor: pointer;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }
  
 
  
  .review-list {
    list-style: none;
    padding: 0;
  }
  
  .review-item {
    margin-bottom: 1em;
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.5em;
  }
  
  /* Full Image Popup */
  .full-image-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  }
  
  .full-image-modal img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 12px;
    box-shadow: 0 0 20px #000;
  }
  </style>
  