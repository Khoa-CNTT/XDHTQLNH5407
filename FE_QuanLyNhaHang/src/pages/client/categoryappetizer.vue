<template>
  <div class="container-cartegoryaooetizer">
    <h1>Danh Sách Menu</h1>

    <div class="search-wrapper" style="text-align:center; margin-bottom: 1rem;">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Tìm kiếm món ăn... 🔎"
        class="search-input"
      />
    </div>

    <div class="categories">
      <button
        v-for="(category, index) in categories"
        :key="category.name"
        @click="selectCategory(index)"
        class="category-button"
        :class="{ active: selectedCategoryIndex === index }"
        type="button"
      >
        {{ category.name }}
      </button>
    </div>

    <div class="food-items" v-if="selectedCategory && filteredDishes.length > 0">
      <h2>{{ selectedCategory.name }}</h2>

      <div class="menu-grid">
        <div class="card-menu" v-for="(dish, dishIndex) in filteredDishes" :key="dishIndex">
          <img :src="getImageUrl(dish.image)" alt="Ảnh món ăn" style="width: 100%; height: auto;" />
          <div class="info-card">
            <div class="card-name" @click="handleShowRating(dish)">
              <strong>{{ dish.name }}</strong>
            </div>
            <div class="card-cost"><strong>{{ dish.cost }}</strong></div>

            <div class="card-title">{{ dish.detail }}</div>
            <div class="card-price">
              <span class="old-price" v-if="dish.oldPrice">{{ dish.oldPrice.toLocaleString() }}đ</span>
              <span class="new-price" v-if="dish.newPrice">{{ dish.newPrice.toLocaleString() }}đ</span>
            </div>

            <div class="btn-wrapper">
              <button class="btn-order">Đặt Hàng</button>
              <button class="btn-add" @click="handleAddToCart(dish)">
                Thêm vào giỏ <i class="fas fa-shopping-cart"></i>
              </button>

              <div class="gio-hang-icon">
                <span class="so-luong" v-if="soLuong > 0">{{ soLuong }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="food-items" v-else>
      <p>Vui lòng chọn danh mục để xem món ăn hoặc không tìm thấy món ăn phù hợp.</p>
    </div>

    <!-- Component đánh giá món ăn -->
    <DishRating
      v-if="showRating"
      :dish="selectedDish"
      @close="showRating = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../../services/api'
import { useRouter } from 'vue-router'
import { cartItems, addToCart } from '../../stores/cartStore'
import DishRating from './DishRating.vue'

const router = useRouter()

const categories = ref([])
const selectedCategoryIndex = ref(null)
const selectedDish = ref(null)
const showRating = ref(false)

const searchTerm = ref('')

function selectCategory(index) {
  selectedCategoryIndex.value = index
}

// Hàm lấy danh mục đã chọn
const selectedCategory = computed(() => {
  return selectedCategoryIndex.value !== null
    ? categories.value[selectedCategoryIndex.value]
    : null
})

// Lọc món ăn theo từ khóa tìm kiếm  
const filteredDishes = computed(() => {
  if (!selectedCategory.value) return []
  if (!searchTerm.value.trim()) return selectedCategory.value.dsMon
  const keyword = searchTerm.value.trim().toLowerCase()
  return selectedCategory.value.dsMon.filter(dish =>
    dish.name.toLowerCase().includes(keyword)
  )
})

// Tính tổng số lượng trong giỏ hàng
const soLuong = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.soLuong, 0)
})

// Tải danh mục và món ăn từ API khi component được mount
onMounted(async () => {
  await fetchCategories()
  try {
    const response = await api.get('/client/foods')
    const foods = response.data
    const categorizedFoods = categorizeFoods(foods)
    categories.value = categorizedFoods
  } catch (error) {
    console.error('Lỗi khi tải món ăn:', error)
  }
})

const fetchCategories = async () => {
  const res = await api.get('/client/categories')
  categories.value = res.data
}

function categorizeFoods(foods) {
  const categorized = categories.value.map((item) => {
    return {
      name: item.name,
      gia: item.cost,
      dsMon: []
    }
  })

  foods.forEach((food) => {
    food.categories.forEach((category) => {
      const categoryIndex = categorized.findIndex((c) => c.name === category.name)
      if (categoryIndex !== -1) {
        categorized[categoryIndex].dsMon.push(food)
      }
    })
  })

  return categorized
}

// Trả về URL ảnh đầy đủ
function getImageUrl(image) {
  if (!image) return ''
  if (image.startsWith('http')) return image
  return `http://localhost:8000/storage/foods/${image}`
}

// Thêm vào giỏ hàng
function handleAddToCart(dish) {
  addToCart(dish)
}

// Mở component đánh giá
function handleShowRating(dish) {
  selectedDish.value = dish
  showRating.value = true
}
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: white;
}

.container-cartegoryaooetizer {
  background: white;
  width: 100%;
  padding: 1rem;
}

h1 {
  text-align: center;
  color: #4caf50;
  font-size: 50px;
  margin-bottom: 20px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.category-button {
  background-color: #e0f2f1;
  border: 2px solid #4caf50;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;
}

.category-button:hover,
.category-button.active {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
}

.food-items {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  min-height: 290px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.card-menu {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 350px;
  transition: all 0.3s ease;
}

.card-menu img {
  width: 300px;
  height: 160px;
  object-fit: cover;
  /* Đảm bảo ảnh không bị méo và vẫn giữ tỷ lệ */
  border-radius: 8px;
  transition: transform 0.3s ease;
}

/* .card-menu:hover img {
  transform: translateY(-6px);
} */

.btn-wrapper {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.btn-order,
.btn-add {
  margin: 0.2rem;
  padding: 15px;
  border: none;
  border-radius: 4px;
  background: #4caf50;
  color: white;
  cursor: pointer;
  font-size: 11px;
}

.gio-hang-icon {
  margin-top: 0.4rem;
}

.so-luong {
  background: red;
  color: white;
  padding: 0.1rem 0.4rem;
  border-radius: 50%;
}

.card-price {
  margin-top: 0.4rem;
}

.old-price {
  text-decoration: line-through;
  color: #999;
  margin-right: 8px;
  font-size: 16px;
}

.new-price {
  color: red;
  font-weight: bold;
  font-size: 18px;
}
.card-name{
  cursor: pointer;
  transition: 0.2s ease;
}
.card-name:hover{
  transform: scale(1.1);
  color: #4caf50;
}

.search-input {
  padding: 0.5rem 1rem;
  margin-bottom: 10px;
  width: 200px;
  border-radius: 6px;
  border: 1.5px solid #4caf50;
  font-size: 16px;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #388e3c;
}
</style>
