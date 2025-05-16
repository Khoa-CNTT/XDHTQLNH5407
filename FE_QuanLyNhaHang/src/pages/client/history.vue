<template>
  <div class="invoice-history">
    <div v-if="paymentSuccessful">
      <h3 class="order-title"><strong>Lịch Sử Đặt Món</strong></h3>
      
      <div v-if="orderHistory.length === 0" class="no-orders">Chưa có đơn hàng nào</div>
      
      <div v-else>
        <ul>
          <li class="order-item" v-for="(order, index) in orderHistory" :key="order.id">
            <div class="item-col info">
              <span>{{ order.ten }}</span> - 
              <span>{{ order.status === 'success' ? 'Đặt món thành công' : 'Đặt món thất bại' }}</span>
            </div>
            <div class="item-col price">{{ order.gia }}₫</div>
            <div class="item-col quantity">x{{ order.soLuong }}</div>
            <div class="item-col total">
              {{ order.gia * order.soLuong }}₫
              <button class="btn-edit" @click="editOrder(order)">✏️ Chỉnh sửa</button>
              <button class="btn-delete" @click="deleteOrder(index)">🗑️ Xóa</button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-else>
      <h3 class="order-title"><strong>Đơn Hàng Của Bạn</strong></h3>

      <div v-if="cartItems.length === 0" class="no-orders">Chưa có mặt hàng nào</div>
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
</template>

<script setup>
import { ref } from 'vue';
import { cartItems } from '../../stores/cartStore'; 
import { useHistoryStore } from '../../stores/historyStore';

const paymentSuccessful = ref(false); 
const orderHistory = useHistoryStore().orderHistory; 

const datMon = () => {
  if (cartItems.length === 0) {
    alert('Giỏ hàng của bạn trống!');
    return;
  }

  const order = {
    id: new Date().getTime(), 
    ten: cartItems.map(item => item.ten).join(', '), 
    gia: cartItems.reduce((sum, item) => sum + item.gia * item.soLuong, 0),
    soLuong: cartItems.reduce((sum, item) => sum + item.soLuong, 0), 
    status: 'success' 
  };

  useHistoryStore().addOrder(order);
  paymentSuccessful.value = true;
  cartItems.splice(0, cartItems.length); 
};

const editOrder = (order) => {
  alert('Chỉnh sửa đơn hàng ' + order.ten);
};

const deleteOrder = (index) => {
  if (confirm('Bạn chắc chắn muốn xóa đơn hàng này?')) {
    useHistoryStore().deleteOrder(index); 
  }
};

const xoaHang = (index) => {
  cartItems.splice(index, 1); // Xóa mặt hàng khỏi giỏ
};
</script>

<style scoped>
/* Toàn bộ phần lịch sử đơn hàng */
.invoice-history {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.invoice-history h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.invoice-history ul {
  list-style-type: none;
  padding: 0;
}

.invoice-history li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
}

.invoice-history .item-col {
  display: flex;
  align-items: center;
}

.invoice-history .item-col.info {
  flex: 2;
  justify-content: flex-start;
}

.invoice-history .item-col.price,
.invoice-history .item-col.total {
  flex: 1;
  text-align: right;
}

.invoice-history img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
}

.invoice-history span {
  font-weight: 500;
}

.invoice-history button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.invoice-history button:hover {
  background-color: #0056b3;
}

.invoice-history .btn-delete {
  background-color: #dc3545;
}

.invoice-history .btn-delete:hover {
  background-color: #c82333;
}

.invoice-history .order-btn-wrapper {
  text-align: center;
  margin-top: 20px;
}

.invoice-history .btn-orderItem {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
}

.invoice-history .btn-orderItem:hover {
  background-color: #218838;
}

/* Chỉnh sửa phần không có đơn hàng */
.invoice-history .no-orders {
  font-size: 18px;
  color: #6c757d;
  text-align: center;
  margin-top: 30px;
}

/* Các nút chỉnh sửa */
.btn-edit {
  background-color: #ffc107;
}

.btn-edit:hover {
  background-color: #e0a800;
}
</style>
