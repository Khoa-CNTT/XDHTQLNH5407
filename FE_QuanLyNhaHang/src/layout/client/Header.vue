<template>
  <nav class="navbar">
    <div class="header">
      <ul class="menu">
        <a href="" class="logo">
          <img src="/imageicon/phefood.png" alt="">
        </a>
        <li>
          <router-link class="router-home" :to="{ name: 'users-home' }"><strong>HOME</strong></router-link>
        </li>
        <li class="introduce">
          <!-- cach 1 -->
          <!-- <router-link class="router-introduce" to="/introduce" >INTRODUCE</router-link>  -->
          <!-- cach 2 -->
          <router-link class="router-introduce" :to="{ name: 'users-introduce' }">INTRODUCE</router-link>


        </li>
        <li class="servicefood">
          <a href="">SERVICE FOOD</a>

        </li>
        <li class="servicefood">
          <a href="">SERVICE FOOD</a>
          <ul class="name-menu">
            <li>
              <div class="menu-row">
                <div class="menu-list">
                  <div class="row-menu">
                 
                    <div class="col-6" @mouseover="currentImage = '/imageicon/lauthai.png'">
                      <router-link :to="{name:'users-category'}">
                      <p class="title-header">Khai vị </p>
                      <ul class="List">
                        <li><a href=""><i class="fa-solid fa-circle-dollar-to-slot"></i> Spot</a></li>
                        <li><a href=""><i class="fa-solid fa-jet-fighter"></i> Margin vị akjddâddâda</a></li>
                        <li><a href="P2P.html"><i class="fa-solid fa-credit-card"></i> P2P</a></li>
                      </ul></router-link>
                   
                    </div>
              

                    <div class="col-6" @mouseover="currentImage = '/imageicon/bunbo.png'">
                      <p class="title-header">Món chính</p>
                      <ul  class="List">
                        <li><a href="botGiaoDich.html"><i class="fa-solid fa-robot"></i> Bot giao dịch</a></li>
                        <li><a href="saochepgiaodich.html"><i class="fa-solid fa-copy"></i> Sao chép giao dịch</a></li>
                        <li><a href=""><i class="fa-solid fa-lock"></i> Cơm gà </a></li>
                      </ul>
                    </div>
                  </div>

                  <div class="row-menu">
                    <div class="col-6" @mouseover="currentImage = '/imageicon/comga.png'">
                      <router-link :to="{name: 'users-category'}"></router-link>
                      <p class="title-header">Đồ uống</p>
                      <ul  class="List">
                        <li><a href="#"><i class="fa-solid fa-mug-hot"></i> Cà phêdddddd</a></li>
                        <li><a href="#"><i class="fa-solid fa-wine-glass"></i> Nước ép cam </a></li>
                        <li><a href="#"><i class="fa-solid fa-glass-water"></i> Nước ép thơm</a></li>
                      </ul>
                    </div>

                    <div class="col-6" @mouseover="currentImage = '/imageicon/lautuxuyen.png'">
                      <p class="title-header">Món tráng miệng</p>
                      <ul  class="List">
                        <li><a href="#"><i class="fa-solid fa-ice-cream"></i> Kem</a></li>
                        <li><a href="#"><i class="fa-solid fa-cake-candles"></i> Bánh ngọt</a></li>
                        <li><a href="#"><i class="fa-solid fa-cookie-bite"></i> Cookie</a></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="menu-image">
                  <img style="width: 250px;" :src="currentImage" alt="Ảnh món ăn" />
                </div>
              </div>
            </li>
          </ul>
        </li>
        <li class="servicefood">
          <router-link :to="{ name: 'users-news' }">NEWS</router-link>
        </li>
        <li class="servicefood">
          <router-link to="/booking"> BOOKING</router-link>
        </li>
        <li class="servicefood">
          <router-link to="/contact"> CONTACT</router-link>
        </li>
        <div class="flex-1 justify-end flex me-10 items-center">
          <li>
            <div class="search-container " @click="handleClickOutside">
              <div :class="isSearch ? 'w-[200px] search-box ' : 'w-[40px] search-box '" @click="handleOpenSearch()">
                <input type="text" @blur="handleBlur" placeholder="Tìm Món ..." name="" id="">
                <div>
                  <i class=" fas  fa-solid fa-magnifying-glass"></i>
                </div>
              </div>
              <!-- <div class="search-icon">
        <i class="fa-solid fa-magnifying-glass"></i>
      </div> -->
              <!-- <div class="search-card">
        <label style="margin: 0 5px 0 5px;" for="">Tìm Kiếm Món Ăn Của Bạn</label>
        <input type="text" placeholder="Tìm món ăn..." />
      </div> -->
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

            <input type="checkbox" id="menu-toggle" hidden>

            <label for="menu-toggle" class="menu-toggle">

              <i class="fa-solid fa-bars"></i>

            </label>

            <div class="user-menu">
              <div class="menu-header">
                <i class="fa-solid fa-bars"></i>


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
<router-link :to="{name: 'users-personalinformation'}">
 Acoount
</router-link>
              
              </div>
              <div class="menu-item">
                <i class="fa-solid fa-user"></i>

                <h2>Setting</h2>
              </div>
              <div class="menu-item">
                <i class="fa-solid fa-wrench"></i>

                <h2>Help</h2>
              </div>
            </div>
          </li>
        </div>


      </ul>


    </div>
  </nav>
</template>
<script setup>
import { ref } from 'vue';
import '../../assets/css/Header.css'
import { cartCount } from '../../stores/cartStore';
const currentImage = ref('/imageicon/food icon.png')
const isSearch = ref(false);

const handleOpenSearch = () => {
  isSearch.value = true;
};

// Khi nhấn ra ngoài, ô tìm kiếm sẽ thu lại
const handleClickOutside = (event) => {
  if (!event.target.closest('.search-box')) {
    isSearch.value = false;
  }
};

// Khi mất focus (blur) ra ngoài ô input, ô tìm kiếm sẽ thu lại
const handleBlur = () => {
  if (isSearch.value) {
    isSearch.value = false;
  }
};
//  document.addEventListener("click", function (event) {
//     const toggle = document.getElementById("menu-toggle");
//     const menu = document.querySelector(".menu");
//     const icon = document.querySelector(".menu-icon");

//     if (!menu.contains(event.target) && !icon.contains(event.target)) {
//       toggle.checked = false;
//     }
//   });

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

#menu-toggle:checked~.user-menu {
  transform: translateX(0);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

#menu-toggle:checked~.menu-header i {
  transform: translateX(200px);
  color: #333;
}
</style>