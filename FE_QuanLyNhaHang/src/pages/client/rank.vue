<template>
  <div class="restaurant-ranking">
    <h1 class="main-title">🏆 Bảng Xếp Hạng Nhà Hàng</h1>
    <div class="ranking-container">
      <!-- Phần trái: Carousel món ăn -->
      <div class="featured-dishes">
        <h2 class="section-title">Món Đặc Biệt</h2>
        <div class="carousel">
          <div class="carousel-item" v-for="(dish, index) in featuredDishes" :key="index" :class="{ active: currentDishIndex === index }">
            <img :src="dish.image" :alt="dish.name" />
            <div class="dish-info">
              <h3>{{ dish.name }}</h3>
              <p>{{ dish.description }}</p>
            </div>
          </div>
          <button class="carousel-control prev" @click="prevDish">❮</button>
          <button class="carousel-control next" @click="nextDish">❯</button>
        </div>
      </div>

      <!-- Phần phải: Bảng xếp hạng -->
      <div class="ranking-list">
        <h2 class="section-title">Top Món Yêu Thích</h2>
        <div class="danh-sach-rank">
          <div
            v-for="(rank, index) in ranks"
            :key="rank.id"
            class="rank-card"
            :class="'hang-' + (index + 1)"
          >
            <div class="rank-medal">
              <i :class="['fas', getMedalIcon(index)]"></i>
            </div>
            <img :src="rank.image" :alt="rank.nameRank" />
            <div class="rank-info">
              <div class="ten-rank">
                #{{ index + 1 }} - {{ rank.nameRank }}
              </div>
              <p class="rank-description">{{ rank.description }}</p>
              <button class="view-details" @click="viewDishDetails(rank)">Xem Chi Tiết</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal chi tiết món ăn -->
    <div class="modal-overlay" v-if="showModal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        <h2>{{ selectedRank.nameRank }}</h2>
        <img :src="selectedRank.image" :alt="selectedRank.nameRank" class="modal-image" />
        <p>{{ selectedRank.description }}</p>
        <p><strong>Giá:</strong> {{ selectedRank.price }}</p>
        <p><strong>Đánh giá:</strong> {{ selectedRank.rating }} / 5</p>
        <button class="add-to-cart" @click="addToCart(selectedRank)">Thêm vào giỏ hàng</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

const ranks = ref([
  { id: 1, nameRank: 'Banana Smoothie', image: '/imageicon/bunbo.png', description: 'Sinh tố chuối thơm ngon, bổ dưỡng.', price: '50,000đ', rating: 4.8 },
  { id: 2, nameRank: 'Orange Juice', image: '/imageicon/comga.png', description: 'Nước cam ép tươi, giàu vitamin C.', price: '40,000đ', rating: 4.5 },
  { id: 3, nameRank: 'Apple Pie', image: '/imageicon/lauthai.png', description: 'Bánh táo giòn, ngọt ngào.', price: '60,000đ', rating: 4.7 },
  { id: 4, nameRank: 'Fruit Salad', image: '/imageicon/fruit_salad.png', description: 'Salad trái cây tươi mát.', price: '45,000đ', rating: 4.3 }
])

const featuredDishes = ref([
  { name: 'Banana Smoothie', image: '/imageicon/bunbo.png', description: 'Sinh tố chuối mịn màng, bổ dưỡng.' },
  { name: 'Orange Juice', image: '/imageicon/comga.png', description: 'Nước cam ép nguyên chất, tươi mát.' },
  { name: 'Apple Pie', image: '/imageicon/lauthai.png', description: 'Bánh táo ấm áp, giòn thơm.' }
])

const currentDishIndex = ref(0)
const showModal = ref(false)
const selectedRank = ref(null)

onMounted(async () => {
  try {
    const response = await api.get('client/ranks')
    ranks.value = response.data.map(item => ({
      ...item,
      image: item.image ? `http://localhost:8000/images/ranks/${item.image}` : '/imageicon/phefood.png'
    }))
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu rank:', error)
  }
})

function getMedalIcon(index) {
  return index === 0 ? 'fa-medal' : index === 1 ? 'fa-trophy' : index === 2 ? 'fa-award' : ''
}

function prevDish() {
  currentDishIndex.value = (currentDishIndex.value - 1 + featuredDishes.value.length) % featuredDishes.value.length
}

function nextDish() {
  currentDishIndex.value = (currentDishIndex.value + 1) % featuredDishes.value.length
}

function viewDishDetails(rank) {
  selectedRank.value = rank
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedRank.value = null
}

function addToCart(dish) {
  alert(`Đã thêm ${dish.nameRank} vào giỏ hàng!`)
  closeModal()
}
</script>

<style scoped>
.restaurant-ranking {
  background: linear-gradient(135deg, #143b36 0%, #1a4b46 100%);
  padding: 40px 24px;
  border-radius: 24px;
  width: 100%;
  height: auto;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.main-title {
  text-align: center;
  font-size: 36px;
  font-weight: 800;
  color: #ffd700;
  margin-bottom: 32px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.ranking-container {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}

.featured-dishes {
  flex: 1;
  min-width: 300px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #f0f4f8;
  margin-bottom: 20px;
  text-align: center;
}

.carousel {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.carousel-item {
  display: none;
  text-align: center;
}

.carousel-item.active {
  display: block;
}

.carousel-item img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 16px;
}

.dish-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(20, 59, 54, 0.8);
  color: #f0f4f8;
  padding: 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

.dish-info h3 {
  font-size: 20px;
  margin: 0 0 8px;
}

.dish-info p {
  font-size: 14px;
  margin: 0;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #f0f4f8;
  font-size: 24px;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.carousel-control:hover {
  background: rgba(0, 0, 0, 0.8);
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.ranking-list {
  flex: 1;
  min-width: 300px;
}

.danh-sach-rank {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rank-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #ffffff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.rank-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.rank-medal i {
  font-size: 28px;
  color: #ffd700;
}

.rank-medal i.fa-trophy {
  color: #c0c0c0;
}

.rank-medal i.fa-award {
  color: #cd7f32;
}

.rank-card img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
}

.rank-info {
  flex: 1;
}

.ten-rank {
  font-size: 22px;
  font-weight: 700;
  color: #143b36;
  margin-bottom: 8px;
}

.rank-description {
  font-size: 14px;
  color: #666;
  margin: 0 0 8px;
}

.view-details {
  background: #4caf50;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
}

.view-details:hover {
  background: #388e3c;
}

.hang-1 {
  border-left: 8px solid #ffd700;
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.15), #ffffff);
}

.hang-2 {
  border-left: 8px solid #c0c0c0;
  background: linear-gradient(90deg, rgba(192, 192, 192, 0.15), #ffffff);
}

.hang-3 {
  border-left: 8px solid #cd7f32;
  background: linear-gradient(90deg, rgba(205, 127, 50, 0.15), #ffffff);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  position: relative;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
}

.close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 20px;
  color: #143b36;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #e63946;
}

.modal-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin: 16px 0;
}

.add-to-cart {
  background: #4caf50;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
}

.add-to-cart:hover {
  background: #388e3c;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media (max-width: 768px) {
  .ranking-container {
    flex-direction: column;
  }

  .carousel-item img {
    height: 200px;
  }

  .rank-card img {
    width: 60px;
    height: 60px;
  }

  .ten-rank {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 28px;
  }

  .section-title {
    font-size: 20px;
  }

  .modal-content {
    width: 95%;
    padding: 16px;
  }
}
</style>