<template>
  <div class="container">
    <div class="order-table">
      <div v-if="!bookingSuccess">
        <!-- FORM ĐẶT BÀN -->
        <div class="col-left">
          <p class="title-oder">
            <i class="fas fa-utensils"></i> Liên Hệ Đặt Bàn <i class="fas fa-utensils"></i>
          </p>
          <div class="form-row">
            <label>Thời gian bạn đến?</label>
            <input type="datetime-local" v-model="form.timeBooking" required />
          </div>
          <button class="oder-btn" @click="createBooking">
            <strong style="color: black;">Đặt Bàn Ngay</strong>
          </button>
          <p v-if="errors.message" class="error-message">{{ errors.message }}</p>
        </div>
      </div>
      <div v-else>
        <!-- BƯỚC CHỌN HÀNH ĐỘNG -->
        <div class="col-left" v-if="formStage === 'choose'">
          <h3 style="color: white; font-size: 30px;">🎉Bạn Đặt bàn thành công🎉</h3>
          <p style="color: white; font-size: 20px; margin-bottom: 10px;">
            Bạn muốn làm gì tiếp theo?
          </p>
          <button @click="formStage = 'deposit'" class="btn-oder" style="margin-bottom: 10px;">💵 Đặt tiền cọc</button>
          <button @click="startOrder" class="btn-oder">🍽️ Đặt món</button>
        </div>
        <!-- FORM ĐẶT TIỀN CỌC -->
        <div class="col-left" v-if="formStage === 'deposit'">
          <h3 style="color: white;">💵 Đặt tiền cọc</h3>
          <div class="form-row" v-if="foodForm.length">
            <label>Gợi ý tổng tiền cọc:</label>
            <p style="color: yellow; font-weight: bold;">
              {{ calculateTotalDeposit(foodForm).toLocaleString() }} VNĐ
              <br />
              <small>(bao gồm 30% giá món + 50.000 tiền bàn)</small>
            </p>
          </div>
          <div class="form-row">
          </div>
          <button @click="submitDeposit" class="btn-oder">Xác nhận đặt cọc</button>
          <button @click="formStage = 'choose'" style="margin-top: 10px;">⬅️ Quay lại</button>
        </div>
        <!-- FORM ĐẶT MÓN ĂN -->
        <div class="col-left" v-if="formStage === 'order'">
          <h3 style="color: white; font-size: 30px; padding-bottom: 20px;">🍽️ Chọn món ăn </h3>
          <div v-for="(item, index) in foodForm" :key="index" class="form-row">
            <label>Món ăn {{ index + 1 }}:</label>
            <select v-model="item.id_foods">
              <option disabled value="">-- Chọn món --</option>
              <option v-for="food in foodList" :key="food.id" :value="food.id">
                {{ food.name }} - {{ food.cost.toLocaleString() }} VNĐ
              </option>
            </select>
            <label>Số lượng:</label>
            <input type="number" v-model="item.quantity" min="1" style="width: 80px;" />
            <button @click="removeFoodItem(index)" v-if="foodForm.length > 1" style="margin-left: 10px;">❌</button>
          </div>
          <button @click="addFoodItem" class="btn-oder" style="margin-top: 10px;">➕ Thêm món</button>
          <button @click="submitFoodOrder" class="btn-oder" style="margin-top: 10px;">💵Xác nhận đặt món</button>
          <button @click="formStage = 'choose'" style="margin-top: 10px;">⬅️ Quay lại</button>
        </div>
        <!-- THÔNG TIN XÁC NHẬN & MÃ QR -->
        <div v-if="formStage === 'confirmation'" class="col-left card-info">
          <button @click="formStage = 'choose'" style="margin-top: 10px;">⬅️ Quay lại</button>

          <h3 style="color: white; display: flex; justify-content: center;margin-bottom: 20px; font-size: 30px;">Thông tin đặt bàn của bạn</h3>
          <div class="user-info">
            <img :src="userInfo.avatar" alt="Ảnh đại diện" class="avatar" />
            <p><strong>Tên người dùng:</strong> {{ userInfo.name }}</p>
            <p><strong>Email:</strong> {{ userInfo.email }}</p>
            <p><strong>ID Booking:</strong> {{ bookingId }}</p>
            <div v-if="qrCode">
              <p style="display: flex; justify-content: center; margin-top: 15px;"> <strong>Mã QR:</strong></p>
              <img :src="qrCode" alt="QR Code" class="qr-code" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-right">
        <img style="border-radius: 50%; margin-bottom: 50px;" src="/imageicon/phefood.png" alt="Hình ảnh" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import api from '../../services/api';
import Swal from 'sweetalert2';
import QRCode from 'qrcode';
import { useBookingHistoryStore } from '../../stores/bookingHistoryStore';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
const toast =useToast();
const bookingStore = useBookingHistoryStore();
const bookingSuccess = ref(false);
const formStage = ref('choose');
const errors = ref({});
const router =useRouter();
const bookingId = ref(null); 
const form = reactive({
  timeBooking: ''
});
const depositAmount = ref(0);
const foodForm = ref([{ id_foods: '', quantity: 1 }]);
const foodList = ref([]);
const userInfo = reactive({
  name: '',
  email: '',
  avatar: 'imageicon/phefood.png'
});
const qrCode = ref('');
const generateQRCode = () => {
  const data = `Tên: ${userInfo.name}, Email: ${userInfo.email}`;
  QRCode.toDataURL(data, (err, url) => {
    if (err) return;
    qrCode.value = url;
  });
};
onMounted(() => {
  generateQRCode();
});
const addFoodItem = () => {
  foodForm.value.push({ id_foods: '', quantity: 1 });
}
const removeFoodItem = (index) => {
  if (foodForm.value.length > 1) {
    foodForm.value.splice(index, 1);
  }
};
const calculateFoodDeposit = (foods) => {
  if (!Array.isArray(foods) || !foods.length || !foodList.value.length) return 0;
  return foods.reduce((total, item) => {
    const food = foodList.value.find(f => f.id === item.id_foods);
    return food ? total + item.quantity * food.cost : total;
  }, 0) * 0.3;
};
const calculateTotalDeposit = (foods) => {
  return Math.floor(calculateFoodDeposit(foods) + 50000);
};
const formatDateTime = (datetime) => {
  const date = new Date(datetime);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${d} ${h}:${min}:00`;
};
const createBooking = () => {
  const token = localStorage.getItem('auth_token');
  errors.value = {};

  if (!form.timeBooking) {
    errors.value = { message: 'Vui lòng chọn thời gian đến.' };
    return;
  }

  const payload = {
    timeBooking: formatDateTime(form.timeBooking)
  };
  api.post('/client/bookings/create', payload)
    .then((res) => {
      if (res.status === 201) {
        toast.success('Bạn đã đặt bàn thành công', {
  toastClassName: 'vue-toastification__toast'
});

        bookingSuccess.value = true;
        formStage.value = 'choose';
        bookingStore.addBooking(res.data.booking);
        localStorage.setItem('bookingHistory', JSON.stringify(bookingStore.bookings.value));


        bookingId.value = res.data.booking.id;

        getFoods();
      }
    })
    .catch((err) => {
      const res = err.response;
      if (res?.status === 401) {
        Swal.fire({ title: 'Vui lòng đăng nhập trước!', icon: 'error', confirmButtonText: 'Thử lại' });
      } else if (res?.data?.errors) {
        errors.value = res.data.errors;
      } else {
        errors.value = { message: res?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại sau.' };
      }
    });
};
const submitFoodOrder = () => {
  localStorage.setItem('bookingHistory', JSON.stringify(bookingStore.bookings.value));


  const invalid = foodForm.value.some(item => !item.id_foods || item.quantity < 1);
  if (invalid) {
    alert('Vui lòng chọn món và số lượng hợp lệ cho tất cả các món.');
    return;
  }

  const payload = {
    id_booking: bookingId.value,
    foods: foodForm.value.map(item => ({
      id_foods: item.id_foods,
      quantity: item.quantity
    }))
  };

  api.post('/client/booking-food', payload)
  
    .then(() => {
      toast.success('Đặt món thành công!');
      localStorage.setItem('bookingHistory', JSON.stringify(bookingStore.bookings.value));

      // Cập nhật lịch sử đặt bàn với danh sách món đã chọn
      const updatedBooking = {
        id: bookingId.value,
        foods: foodForm.value.map(item => ({
          id_foods: item.id_foods,
          quantity: item.quantity
        }))
      };

      bookingStore.updateBookingFoods(updatedBooking);
      localStorage.setItem('bookingHistory', JSON.stringify(bookingStore.bookings.value));

      router.push({ name: 'users-home' });
    })
    .catch((err) => {
      console.log('Lỗi đặt món:', err.response?.data || err.message);
    });
};

const submitDeposit = () => {
  userInfo.name = localStorage.getItem('customer_name') || 'Chưa có tên';
  userInfo.email = localStorage.getItem('customer_email') || 'Chưa có email';
  userInfo.avatar = localStorage.getItem('customer_avatar') || '/images/avatar.png';

  generateQRCode();
  formStage.value = 'confirmation';
};
const getFoods = () => {
  api.get('/client/foods').then((res) => {
    foodList.value = res.data;
  });
};
const startOrder = () => {
  if (!bookingId.value) {
    console.error('bookingId is missing!', bookingId.value); // để debug
    alert('Không tìm thấy ID booking! Vui lòng đặt bàn trước.');
    return;
  }
  formStage.value = 'order';
};
</script>



<style scoped>
.error-message {
    color: red;
    font-size: 14px;
}
.container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    justify-content: center;
}

.order-table {
    width: 100%;
    height: auto;
    background: #143b36;
    border-radius: 60px;
    display: flex;
    align-items: center;
    padding: 30px;
    gap: 40px;
}

.col-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.col-right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.col-right img {
    width: 100%;
    max-width: 500px;
    object-fit: contain;
    margin-top: 100px;
}

.title-oder {
    font-family: "Dancing Script", cursive;
    text-align: center;
    color: white;
    margin-bottom: 20px;
}

.input-text {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-row {
    display: flex;
    gap: 20px;
    justify-content: space-between;
}

.form-group {
    display: flex;
    flex-direction: column;
    flex: 1;
}

label {
    color: white;
    margin-bottom: 6px;
    font-size: 20px;
    font-weight: 500;
    text-align: left;
}

input {
    background: #fff;
    border: 2px solid #ccc;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
}

.oder-introduce {
    margin-top: 15px;
    text-align: center;
}

.oder-introduce p {

    font-size: 16px;
    color: white;
}

.number-phone {
    color: yellow;
}

.oder-btn {
    background: white;
    width: 200px;
    display: flex;
    justify-content: center;
    margin: 20px auto 0;
    border-radius: 10px;
    font-size: 25px;
}

.oder-btn:hover {
    background: yellow;
}
.error-message {
    color: red;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
}

.container {
    max-width: 1200px;
    display: flex;
    justify-content: center;
}

.order-table {
    width: 100%;
    background: #143b36;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 30px 40px;
    padding-right: 120px;
    gap: 50px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.col-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.col-right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.col-right img {
    width: 100%;
    max-width: 400px;
    object-fit: contain;
    margin-top: 50px;
    transition: transform 0.3s ease-in-out;
}

.col-right img:hover {
    transform: scale(1.05);
}

.title-oder {
    font-family: "Dancing Script", cursive;
    text-align: center;
    color: white;
    margin-bottom: 30px;
    font-size: 32px;
}

.form-row {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    margin-bottom: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    flex: 1;
}

label {
    color: white;
    margin-bottom: 6px;
    font-size: 18px;
    font-weight: 500;
    text-align: left;
}

input,
select {
    background: #fff;
    border: 2px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
    width: 100%;
}

input[type="datetime-local"] {
    background: #f0f0f0;
}

input:focus,
select:focus {
    border-color: #ffcc00;
}

button {
    background: #ffcc00;
    color: #fff;
    padding: 5px;
    width: 100%;
    max-width: 200px;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #e6b800;
}

button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
}

p a {
    color: #ffcc00;
    text-decoration: none;
}

p a:hover {
    text-decoration: underline;
}
.btn-oder{
    background: green;
}
.user-info{
  width: auto;
  height: auto;
  color: black;
  background: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
}
.user-info .avatar{
  border-radius: 50% ;
}
.vue-toastification__toast {
  font-size: 0.75rem;
  padding: 0.5em 1em;
  border-radius: 6px;
  min-height: unset;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>