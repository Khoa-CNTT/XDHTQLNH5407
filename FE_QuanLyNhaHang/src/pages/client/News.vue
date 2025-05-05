<template>
  <div class="container-news">
    <div class="col-left">
      <div class="card-news">
        <p class="title-news">Các Tin tức liên quan</p>
        <div class="info-news" v-for="(news, index) in dsNews" :key="index" @click="chonTinTuc(index)">
          <img :src="news.hinh" alt="">
          <p class="content-news">{{ news.noiDung }}</p>
        </div>
      </div>
    </div>
    <div class="col-right">
        <div class="title-see" v-if="cardChiTietDangXem" style="height: 100%;">
        <button @click="cardChiTietDangXem = null" style="margin-bottom: 10px;">← Quay lại</button>
        <div class="time" style="display: flex;">
          <p>Thời gian hiện tại : {{ time }}</p>
          <p style="margin-left: 10px;"> <i class="fa-solid fa-user " style="color: gold;"></i> Admin : Khánh</p>
        </div>
        <p style="font-size: 20px;">Mách bạn công thức làm canh cá nấu mẻ thơm ngon đậm vị </p>
        <h3>{{ cardChiTietDangXem.ten }}</h3>
        <img :src="cardChiTietDangXem.hinh" alt="" style="width: 300px;">
        <p style="font-size: 20px;">{{ cardChiTietDangXem.noiDung }}</p>
        <p>Vậy cần chuẩn bị những nguyên liệu gì, cách chế biến canh cá nấu mẻ như thế nào để có bát canh thơm ngon,
          chuẩn vị nhất. Hãy cùng Dola theo dõi bài viết dưới đây bạn nhé.</p>
        <p style="font-size: 20px;"><strong>Công thức làm canh cá nấu mẻ cả nhà đều mê</strong></p>
        <p>Để ra được một món canh thơm ngon, bổ dưỡng thì việc lựa chọn các nguyên liệu là điều rất cần thiết nên chị
          em cần phải lựa chọn thật kỹ. Nguyên liệu để nấu món canh này vô cùng đơn giản và dễ tìm.
        </p>
        <p style="font-size: 20px;">Nguyên liệu cần chuẩn bị</p>
        <p>Cá tươi.
        </p>
        <p>
          Cà chua.
        </p>
        <p>
          Cơm mẻ.
        </p>
        <p>
          Nghệ.
        </p>
        <p>
          Hành tím, hành lá, thì là, mùi tàu, ớt.
        </p>
        <p>
          Một số gia vị cần thiết cho món ăn: muối, hạt nêm, nước mắm, tiêu xay, …
        </p>
      </div>
      <div class="all-title" v-else>
        <div class="title-card" v-for="(news, index) in tinTucChiTietDangXem" :key="index" @click="xemChiTiet(news)">
          <img :src="news.hinh" alt="">
          <div class="info-card" style="">
            <h4>Đăng bởi: Admin Khánh</h4>
            <p class="info-name">{{ news.ten }}</p>
            <p style="color: yellow;"><strong>Xem chi tiết →</strong></p>
          </div>
          <hr>
        </div>
      </div>
     

   
      
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const dsNews = ref([
  { hinh: '/imageicon/bunbo.png', noiDung: 'Mách bạn công thức nấu tô bún đậm vị' },
  { hinh: '/imageicon/lauthai.png', noiDung: 'Lẩu thái chua cay dễ làm' },
  { hinh: '/imageicon/bunbo.png', noiDung: 'Món ngon mỗi ngày đơn giản' },
])
const chitiet = ref([
  {
    hinh: '/imageicon/bunbo.png',
    chitiet: [
      { ten: 'Bún bò Huế đậm đà', hinh: '/imageicon/bunbo.png', noiDung: 'Canh cá nấu mẻ là món ăn dân dã, quen thuộc trong mỗi mâm cơm gia đình Việt. Mùa hè nắng nóng mà có bát canh cá chua chua, ngọt ngọt thì còn gì bằng. Có rất nhiều cách để chế biến theo công thức này như: canh cá trắm nấu mẻ, canh cá basa nấu mẻ, canh cá lóc nấu mẻ, canh cá dọc mùng nấu mẻ,…' },
      { ten: 'Nguyên liệu chính', hinh: '/imageicon/bunbo.png', noiDung: 'Thịt bò, giò heo...' },
      { ten: 'Cách chế biến', hinh: '/imageicon/bunbo.png', noiDung: 'Luộc xương, nêm mắm ruốc...' },
      { ten: 'Cách chế biến', hinh: '/imageicon/bunbo.png', noiDung: 'Luộc xương, nêm mắm ruốc...' },
      { ten: 'Cách chế biến', hinh: '/imageicon/bunbo.png', noiDung: 'Luộc xương, nêm mắm ruốc...' },

    ]
  },
  {
    hinh: '/imageicon/lauthai.png',
    chitiet: [
      { ten: 'Lẩu thái chua cay', hinh: '/imageicon/lauthai.png', noiDung: 'Nước dùng từ sả, chanh, ớt...' },
      { ten: 'Thành phần chuẩn', hinh: '/imageicon/lauthai.png', noiDung: 'Tôm, mực, nghêu, rau...' },
      { ten: 'Cách nấu', hinh: '/imageicon/lauthai.png', noiDung: 'Xào nguyên liệu trước rồi thêm nước dùng...' },
      { ten: 'Lưu ý bảo quản', hinh: '/imageicon/lauthai.png', noiDung: 'Không nên để qua đêm...' },
    ]
  },
  {
    hinh: '/imageicon/bunbo.png',
    chitiet: [
      { ten: 'Món ăn 1', hinh: '/imageicon/bunbo.png', noiDung: '...' },
      { ten: 'Món ăn 2', hinh: '/imageicon/bunbo.png', noiDung: '...' },
      { ten: 'Món ăn 2', hinh: '/imageicon/bunbo.png', noiDung: '...' },
      { ten: 'Món ăn 2', hinh: '/imageicon/bunbo.png', noiDung: '...' },

    ]
  }
])

const tinTucChiTietDangXem = ref([])
const cardChiTietDangXem = ref(null)
const thoigian = ref()
const time = ref('')
function updatetime() {
  const now = new Date()
  time.value = now.toLocaleDateString()
  thoigian.value = now.toLocaleDateString('vi-VN')
}
let interval = null
onMounted(() => {
  updatetime()
  interval = setInterval(updatetime, 1000)
});
onUnmounted(() => {
  clearInterval(interval)
})
// Khi vừa vào thì chọn tin đầu tiên
onMounted(() => {
  chonTinTuc(0)
})
// Hàm chọn tin bên trái
function chonTinTuc(index) {
  tinTucChiTietDangXem.value = chitiet.value[index].chitiet
  cardChiTietDangXem.value = null
}
// Hàm xem chi tiết khi bấm vào card bên phải
function xemChiTiet(card) {
  cardChiTietDangXem.value = card
}
</script>
<style scoped>
body {}


.container-news {
  display: flex;
  background: #143b36;
}
.col-left {
  width: 30%;
}
.col-right {
  width: 70%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.all-title{
  display: flex;
  flex-wrap: wrap;
}
.title-news {
  background: #d69c52;
  text-align: center;
  font-weight: bold;
}
.card-news {
  border: 1px solid#d69c52;
  border-radius: 10px;
  width: 90%;
  margin: 10px 0 10px 10px;
  overflow: hidden;
}
.info-news {
  display: flex;
  padding: 10px;
  display: flex;
  cursor: pointer;
  flex-wrap: wrap;
  background-color: rgba(0, 0, 0, 0.5);
}
.info-news:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.info-news img {
  width: 100px;
}

.content-news {
  margin: 5px 0 0 5px;
  color: #fff;
  white-space: normal;
  flex: 1;
}

.content-news:hover {
  color: yellow;
}

.title-card {
  border: 1px solid red;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  margin: 12px 0 10px 10px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

}

.title-card img {
  height: 200px;
  width: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.title-card img:hover {
  transform: scale(1.1);
}

.info-card {
  color: white;
  margin-left: 10px;

}

.info-name:hover {
  color: yellow;
}

.title-see {
  padding: 20px;
  color: white;

}
</style>