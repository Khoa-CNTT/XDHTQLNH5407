<template>
    <div class="container-cartegoryaooetizer">
   <h1>Danh Sách  Món Khai Vị</h1>

  
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
  
      <div class="food-items" v-if="selectedCategory">
        <h2>{{ selectedCategory.name }}</h2>
  
        <div class="menu-grid" v-if="selectedCategory.dsMon">
          <div class="card-menu" v-for="(mon, monIndex) in selectedCategory.dsMon" :key="monIndex">
            <img :src="mon.hinh" alt="" />
            <div class="info-card">
              <div class="card-name"><strong>{{ mon.ten }}</strong></div>
              <div class="card-title">{{ mon.moTa }}</div>
              <div class="card-price">
  <span class="old-price" v-if="mon.giaCu">{{ mon.giaCu.toLocaleString()}}đ</span>
  <span class="new-price" v-if="mon.giaMoi">{{ mon.giaMoi.toLocaleString() }}đ</span>
</div>

              <div class="btn-wrapper">
                <button class="btn-oder">Đặt Hàng</button>
                <button class="btn-add" @click="addToCart">
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
        <p>Vui lòng chọn danh mục để xem món ăn.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const categories = ref([
    {
      name: 'Nổi Bật',
      dsMon: [
        { ten: 'Táo Đỏ', hinh: '/imageicon/comga.png', moTa: 'Giòn ngọt mát lành' },
        { ten: 'Chuối Vàng', hinh: '/imageicon/bunbo.png', moTa: 'Bổ sung kali tốt cho sức khỏe' }
      ]
    },
    {
      name: 'Bán chạy',
      dsMon: [
        { ten: 'Cà Rốt', hinh: '/imageicon/comga.png', moTa: 'Tốt cho mắt' },
        { ten: 'Bông cải', hinh: '/imageicon/bunbo.png', moTa: 'Nhiều vitamin C' },
        { ten: 'Cải bó xôi', hinh: '/imageicon/pizza.png', moTa: 'Giàu chất sắt' }
      ]
    },
    {
      name: 'Giảm giá',
      dsMon: [
    {
      ten: 'Sữa tươi',
      hinh: '/imageicon/pizza.png',
      moTa: 'Ngon và bổ dưỡng',
      giaCu: 200000,
      giaMoi: 100000
    },
    {
      ten: 'Phô mai',
      hinh: '/imageicon/comga.png',
      moTa: 'Đậm đà, béo ngậy',
      giaCu: 150000,
      giaMoi: 90000
    }
  ]
    },
    {
      name: 'Mới',
      dsMon: [
        { ten: 'Thịt bò', hinh: '/imageicon/bunbo.png', moTa: 'Giàu protein' },
        { ten: 'Thịt heo', hinh: '/imageicon/comga.png', moTa: 'Mềm thơm' }
      ]
    },
    {
      name: 'Giá',
      dsMon: [
        { ten: 'Gạo lứt', hinh: '/imageicon/pizza.png', moTa: 'Tốt cho sức khỏe' },
        { ten: 'Ngũ cốc', hinh: '/imageicon/bunbo.png', moTa: 'Nhiều chất xơ' }
      ]
    }
  ])
//   const drinkItem = ref([
//   {
//     name: 'Khai vị',
//     dsMon: [
//       { ten: 'Táo Đỏ', hinh: '/imageicon/comga.png', moTa: 'Giòn ngọt mát lành' },
//       { ten: 'Chuối Vàng', hinh: '/imageicon/bunbo.png', moTa: 'Bổ sung kali tốt cho sức khỏe' }
//     ]
//   },
//   {
//     name: 'Đồ uống', 
//     dsMon: [
//       { ten: 'Nước ép cam', hinh: '/imageicon/nuocepcam.png', moTa: 'Tươi mát, vitamin C' },
//       { ten: 'Trà sữa', hinh: '/imageicon/trasua.png', moTa: 'Ngọt ngào, béo ngậy' }
//     ]
//   },
// ])
  const selectedCategoryIndex = ref(null)
  const soLuong = ref(0)
  
  function selectCategory(index) {
    selectedCategoryIndex.value = index
  }
  function addToCart() {
    soLuong.value++
  }
  
  const selectedCategory = computed(() => {
    return selectedCategoryIndex.value !== null
      ? categories.value[selectedCategoryIndex.value]
      : null
  })
  </script>
  
  <style scoped>
  html, body {
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
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  .menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Đảm bảo card không chồng lên nhau */
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
  height: 330px; 
  transition: all 0.3s ease; 
}
.card-menu img {
  width: 300px; 
  height: 160px;
  object-fit: cover; /* Đảm bảo ảnh không bị méo và vẫn giữ tỷ lệ */
  border-radius: 8px; 
  transition: transform 0.3s ease;
}
.card-menu:hover img{
  transform: translateY(-6px);
}
  .btn-wrapper {
    margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  }
  .btn-oder,
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

  </style>
  