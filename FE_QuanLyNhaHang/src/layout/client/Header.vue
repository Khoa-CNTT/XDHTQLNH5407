<template>
  <nav class="navbar">
    <div class="header">
      <ul class="menu">
        <a href="" class="logo">
          <img src="/imageicon/phefood.png" alt="" />
        </a>
        <li>
          <router-link class="router-home" :to="{ name: 'users-home' }"><strong>HOME</strong></router-link>
        </li>
        <li class="servicefood">
          <router-link class="router-introduce" :to="{ name: 'users-introduce' }">INTRODUCE</router-link>
        </li>
        <li class="servicefood">
  <a href="#">SERVICE FOOD</a>
  <ul class="name-menu" v-if="types.length > 0">
    <li v-for="type in types" :key="type.id">
      <div class="menu-row">
        <div class="menu-list">
          <div class="row-menu" style="display: flex; align-items: flex-start; gap: 20px">
       

       
            <div class="col-6">
              <p
                @mouseover="currentImage = type.image || '/imageicon/phefood.png'"
                class="title-header"
              >
                <router-link :to="{ name: 'users-category', params: { typeId: type.id } }">
                  {{ type.name }}
                </router-link>
              </p>

              <ul class="title-menu">
                <li>Cơm gà</li>
                <li>Bún</li>
                <li>Lẩu</li>
              </ul>

              <ul class="List" v-if="type.categories && type.categories.length > 0">
                <li v-for="category in type.categories" :key="category.id">
                  <router-link :to="{ name: 'users-category', params: { categoryId: category.id } }">
                    <i class="fa-solid fa-circle-dollar-to-slot"></i>{{ category.name }}
                  </router-link>
                </li>
              </ul>

              <ul class="List">
                <li v-for="item in type.items" :key="item.id">
                  <a href="#">
                    <i class="fa-solid fa-circle-dollar-to-slot"></i>{{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</li>

        <li class="servicefood">
          <router-link :to="{ name: 'users-news' }">NEWS</router-link>
        </li>
        <li class="servicefood">
          <router-link to="/booking">BOOKING TABLE</router-link>
        </li>
        <li class="servicefood">
          <router-link to="/contact">CONTACT</router-link>
        </li>
        <div class="flex-1 justify-end flex me-10 items-center">
          <li>
            <div class="search-container" @click="handleClickOutside">
              <div :class="isSearch ? 'w-[200px] search-box' : 'w-[40px] search-box'" @click="handleOpenSearch">
                <input
                  type="text"
                  v-model="tuKhoa"
                  @blur="handleBlur"
                  placeholder="Tìm Món ..."
                />
                <div>
                  <i class="fas fa-solid fa-magnifying-glass"></i>
                </div>
              </div>

              <!-- Hiển thị kết quả tìm kiếm -->
              <ul v-if="tuKhoa && monTimDuoc.length" class="result-box">
                <li v-for="mon in monTimDuoc" :key="mon.id">
                  {{ mon.ten }}
                </li>
              </ul>

              <p v-else-if="tuKhoa">Không tìm thấy món nào.</p>
            </div>
          </li>
          <li>
            <div class="cart-shopping">
              <router-link :to="{ name: 'users-shoppingCart' }">
                <i class="fa-solid fa-cart-shopping"></i>
                <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
              </router-link>
            </div>
          </li>
          <li>
            <div class="cart-user">
              <i v-if="!userEmail" class="fa-solid fa-user"></i>
              <span v-else class="user-email">{{ userEmail }}</span>

              <div class="user-info">
                <router-link v-if="!userEmail" :to="{ name: 'users-login' }">Đăng nhập</router-link>
                <button v-else @click="logout">Đăng xuất</button>
              </div>
            </div>
          </li>

          <li>
            <input type="checkbox" id="menu-toggle" hidden>

            <label for="menu-toggle" class="menu-toggle">
              <i class="fa-solid fa-bars"></i>
            </label>

            <div class="user-menu">
              <div class="menu-header">
                <label for="menu-toggle">
                  <i class="fa-solid fa-bars"></i>
                </label>
                <h2>Menu</h2>
              </div>

              <router-link :to="{ name: 'users-home' }">
                <div class="menu-item">
                  <i class="fa-solid fa-house"></i>
                  <h2>Home</h2>
                </div>
              </router-link>

              <div class="menu-item">
                <i class="fa-solid fa-user"></i>
                <router-link :to="{ name: 'users-personalinformation' }">
                  Account
                </router-link>
              </div>
              <div class="menu-item">
                <i class="fa-solid fa-ranking-star"></i>
                <router-link :to="{ name: 'users-rank' }">
                  rank
                </router-link>
              </div>

              <router-link :to="{ name: 'users-evaluation' }">
                <div class="menu-item">
                  <i class="fas fa-pen"></i>
                  <h2>Rates</h2>
                </div>
              </router-link>

              <router-link :to="{ name: 'History' }" class="menu-item">
                <i class="fas fa-history"></i>
                <h2>History-Booking</h2>
              </router-link>

              <router-link :to="{ name: 'users-login' }" class="menu-item">
                <i class="fa-solid fa-right-to-bracket"></i>
                <h2>login</h2>
              </router-link>

              <div class="menu-item" @click="handleLogout">
                <i class="fa-solid fa-right-from-bracket"></i>
                <h2>Log Out</h2>
              </div>
            </div>
          </li>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import Swal from 'sweetalert2';
import '../../assets/css/Header.css';
import { cartCount } from '../../stores/cartStore';
import api from '../../services/api';
import { useRouter } from 'vue-router';

const currentImage = ref('/imageicon/default.png');
const isSearch = ref(false);
const tuKhoa = ref('')
const monTimDuoc = ref([]);
const userEmail = ref(null);  // Placeholder for email
const types = ref([]);
const router = useRouter();

// Mở ô tìm kiếm
const handleOpenSearch = () => {
  isSearch.value = true;
};

// Thu gọn ô tìm kiếm khi click ra ngoài
const handleClickOutside = (event) => {
  if (!event.target.closest('.search-box')) {
    isSearch.value = false;
  }
};

// Thu gọn khi mất focus
const handleBlur = () => {
  if (isSearch.value) {
    isSearch.value = false;
  }
};

// Theo dõi từ khóa và gọi API tìm kiếm
watch(tuKhoa, (newVal) => {
  if (!newVal.trim()) {
    monTimDuoc.value = [];
    return;
  }

  api.get(`/tim-mon?ten=${encodeURIComponent(newVal)}`)
    .then((response) => {
      monTimDuoc.value = response.data.mons; 
    })
    .catch((error) => {
      console.error('Lỗi tìm kiếm món:', error);
      monTimDuoc.value = [];
    });
});

const handleLogout = async () => {
  const result = await Swal.fire({
    title: 'Bạn có chắc chắn muốn đăng xuất không?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Đăng xuất',
    cancelButtonText: 'Hủy',
  });

  if (result.isConfirmed) {
    try {
      const response = await api.post('/client/logout');

      if (response.data.message === 'Đăng xuất thành công') {
        Swal.fire({
          title: 'Đăng xuất thành công!',
          text: 'Bạn đã đăng xuất khỏi tài khoản.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        localStorage.removeItem('users-login');
        localStorage.removeItem('token');
        localStorage.removeItem('customer_email');
        localStorage.removeItem('customer_password');
        localStorage.removeItem('user');
        sessionStorage.clear(); 
        router.push('/login');
      }
    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
      Swal.fire({
        title: 'Bạn chưa đăng nhập nên không thể đăng xuất?!',
        text: 'Có lỗi xảy ra khi đăng xuất. Vui lòng thử lại.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
};

onMounted(async () => {
  try {
    const response = await api.get('/client/types');
types.value = response.data.data;
} catch (error) {
console.error('Lỗi khi lấy loại món ăn:', error);
}
});
</script>
<style scoped>
.List li:hover a {
  transform: scale(1.1); 
  transition: transform 0.2s ease; /* độ mượt */
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 30px;
  padding: 6px 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  overflow: hidden;
  cursor: pointer;
}

.search-box input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 14px;
  padding-left: 20px;
}

.search-box i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #333;
  transition: color 0.3s ease;
}

.search-box:hover i {
  color: #007bff;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 14px;
  transition: all 0.1s;
  cursor: pointer;
  color: #333;
  gap: 20px;
}

.menu-item:hover {
  background: #eee;
}

.menu-item i {
  text-align: center;
  width: 20px;
  font-size: 22px;
}

.menu-item span {
  font-weight: 500;
  margin-right: 20px;
}

.user-menu {
  position: fixed;
  top: 0;
  right: 0px;
  height: 100%;
  width: 260px;
  padding: 20px;
  background: white;
  display: flex;
  z-index: 1;
  flex-direction: column;
  gap: 20px;
  transition: transform 0.3s;
  transform: translateX(100%);
}

.menu-header {
  font-size: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccc;
  color: #333;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 15px;
  font-weight: bold;
}

#menu-toggle:checked ~ .user-menu {
  transform: translateX(0);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.cart-user {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.cart-user i,
.cart-user .user-email {
  font-size: 18px;
  color: #333;
  padding: 5px 10px;
}

/* Menu đăng nhập / đăng xuất */
.user-info {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  display: none;
  z-index: 999;
  white-space: nowrap;
}

/* Hiện menu khi hover vào .cart-user */
.cart-user:hover .user-info {
  display: block;
}

.user-info a,
.user-info button {
  display: block;
  color: #333;
  text-decoration: none;
  background: none;
  border: none;
  padding: 6px 0;
  font-size: 14px;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.user-info a:hover,
.user-info button:hover {
  color: #d69c52;
}



.servicefood > a::after {
  content: "";
  position: absolute;
  bottom: -6px; 
  left: 50%;
  width: 0;
  height: 3px;   
  background-color: yellow;
  transition: width 0.3s ease, left 0.3s ease;
  transform: translateX(-50%);
  
}

.servicefood > a:hover::after {
  width: 100%;
  left: 50%;
}


.servicefood {
  position: relative;
}

.title-menu li{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
}
.servicefood > a {
  position: relative;
  display: inline-block;
  text-decoration: none;
  display: flex ;
  color: #333;
  font-weight: bold;
  transition: color 0.3s;
}
.servicefood > a:hover {
  color: #e67e22;
}

/* Mega menu container */
.mega-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 900px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 999;
}

.menu-row {
  display: flex;
  justify-content: space-between;
}

/* Bên trái: danh sách loại món */
.menu-list {
  flex: 3;
}

.row-menu {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.col-type {
  width: 200px;
}

.title-header {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #222;
  transition: 0.2s ease;
}
.title-header:hover {
 transform: scale(1.1);
}

.dish-list {
  list-style: none;
  padding-left: 0;
}

.dish-list li {
  margin-bottom: 6px;
}

.dish-list a {
  text-decoration: none;
  font-size: 14px;
  color: #444;
  transition: color 0.3s;
}

.dish-list a:hover {
  color: #e67e22;
}

/* Bên phải: ảnh */
.menu-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-image img {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ccc;
}

</style>