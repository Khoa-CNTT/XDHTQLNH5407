<template>
  <div class="container-pay">
    <div class="payment">
      <div class="col-left">
        <div class="main-inform">
          <div class="shop-title">
            Nhà Hàng Phê Food
            <img src="/imageicon/logo.png" alt="" />
          </div>

          <div class="shop-inform">
            <div class="shop-name">Thông tin nhận hàng</div>
            <div class="pay-login">
              <p><i class="fa-solid fa-user"></i> Đăng Nhập</p>
            </div>
            <div class="pay-transfer">
              <p>Vận chuyển</p>
            </div>
          </div>

          <div class="main-content">
            <div class="row">
              <div class="row-col-left">
                <label for="id_table">Bàn số</label>
                <input type="number" id="id_table" v-model="form.id_table" placeholder="Nhập số bàn" />

                <label for="timeEnd">Thời gian kết thúc</label>
                <input type="datetime-local" id="timeEnd" v-model="form.timeEnd" />

                <label for="total">Tổng tiền</label>
                <input type="number" id="total" v-model="form.total" placeholder="Nhập tổng tiền" />

                <label for="id_user">Người tạo đơn (ID user)</label>
                <input type="number" id="id_user" v-model="form.id_user" placeholder="Nhập ID người dùng" />

                <label for="id_customer">Khách hàng (ID)</label>
                <input type="number" id="id_customer" v-model="form.id_customer" placeholder="Nhập ID khách hàng" />
              </div>

              <div class="row-col-right">
                <div class="name-pay"><p>Thanh Toán</p></div>

                <div class="radio-pay">
                  <div class="content-box_row">
                    <div class="radio-wrapper" v-for="(pay, index) in namePay" :key="index">
                      <label class="radio-label">
                        <input
                          name="paymentMethod"
                          type="radio"
                          class="input-radio"
                          :value="pay.name"
                          v-model="selectedPayment"
                        />
                        <span class="radio__label__primary">{{ pay.name }}</span>
                      </label>
                    </div>

                    <div class="content-box__row__desc" v-if="selectedPayment === 'Thanh toán khi giao hàng'">
                      <p>Bạn chỉ phải thanh toán khi nhận được hàng</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-right">
        Bạn chưa có mặt hàng nào
        <div class="order-cart" v-if="!paymentSuccessful">
          <h3 class="order-title"><strong>Đơn Hàng Của Bạn</strong></h3>

          <div v-if="cartItems.length === 0">Chưa có mặt hàng nào</div>
          <div v-else>
            <ul>
              <li class="order-item" v-for="(item, index) in cartItems" :key="item.id">
                <div class="item-col info">
                  <img :src="item.hinh" alt="" />
                  <span>{{ item.ten }}</span>
                </div>
                <div class="item-col price">{{ item.gia }}₫</div>
                <div class="item-col quantity">x{{ item.soLuong }}</div>
                <div class="item-col total">
                  {{ item.gia * item.soLuong }}₫
                  <button class="btn-delete" @click="xoaHang(index)">Xóa</button>
                </div>
              </li>
            </ul>

            <div class="order-btn-wrapper">
              <button class="btn-orderItem" @click="datMon">Đặt Món</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../../services/api'
import { cartItems } from '../../stores/cartStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  id_table: '',
  timeEnd: '',
  total: '',
  id_user: '',
  id_customer: ''
})

const selectedPayment = ref('')
const namePay = [
  { name: 'Thanh toán khi giao hàng' },
  { name: 'Thanh toán online' }
]
const paymentSuccessful = ref(false)

const xoaHang = (index) => {
  cartItems.splice(index, 1)
}

const datMon = async () => {
  if (!form.value.id_table || !form.value.timeEnd || !form.value.total || !form.value.id_user || !form.value.id_customer || !selectedPayment.value) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  const payload = {
    id_table: form.value.id_table,
    timeEnd: form.value.timeEnd,
    total: form.value.total,
    id_user: form.value.id_user,
    id_customer: form.value.id_customer,
    payment_method: selectedPayment.value,
    items: cartItems.value.map(item => ({
      id_product: item.id,
      quantity: item.soLuong,
      price: item.gia
    }))
  };

  try {
    const response = await api.post('/admin/invoices/create', payload)
    console.log('Invoice created successfully:', response.data);
    paymentSuccessful.value = true;
    alert('Thanh toán thành công');
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response);
      alert('Có lỗi xảy ra khi tạo hóa đơn, vui lòng kiểm tra lại.');
    } else {
      console.error('Error:', error.message);
      alert('Có lỗi xảy ra khi thanh toán.');
    }
  }
}
</script>





<style scoped>
.container-pay {
  width: 100%;
  margin: 0 auto;
}

.payment {
  display: flex;
}
.content-box__row__desc{
  height: 80px;
  background: red;
}
.col-left {
  width: 70%;
  background: #fff;
  padding: 10px;
}

.col-right {
  width: 30%;
  background: #f9f9f9;
  padding: 10px;
}

.shop-title {
  font-size: 30px;
  color: blue;
  display: flex;
  align-items: center;
  gap: 10px;
}

.shop-title img {
  width: 120px;
}

.shop-inform {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 10px 0;
}

.pay-login,
.pay-transfer {
  cursor: pointer;
  color: red;
}

.main-content .row {
  display: flex;
  width: 100%;
  gap: 10px;
}

.row-col-left,
.row-col-right {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.radio-label {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  gap: 10px;
}

.input-radio {
  width: 16px;
  height: 16px;
}

.radio__label__primary {
  font-size: 16px;
}

.radio__label__accessory {
  margin-left: auto;
}

.payment-icon--4::before {
  content: "";
  background-image: url('/imageicon/payment_1.png');
  width: 50px;
  height: 30px;
  display: inline-block;
  background-size: cover;
  background-repeat: no-repeat;
}

.order-cart {
  background: white;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
}

.order-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.item-col img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.item-col {
  flex: 1;
}

.btn-delete {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

.btn-orderItem {
  background-color: green;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
