<template>
    <div class="shopping-cart">
        <div class="container-shoppingCart">
            <div class="col-left">
                <div class="order-cart">
                    <h3 class="order-title"><strong>Giỏ Hàng Của Bạn</strong> </h3>
<div v-if="orderItem.length === 0">
    Chưa có mặt hàng nào 
</div>
<!-- <div class="order-product" >
<ul>
    <li class="order-item" v-for="(item , index) in orderItem " :key="index">
 <img :src="item.hinhanh" alt="" class="order-image">
                        <div>{{ item.ten }} - {{ item.gia }} VNĐ</div>
                        <button class="order-delete" v-on:click="xoaHang(index)">Xóa</button>
                        <button class="order-edit" v-on:click="chinhSuaHang(item)">Chỉnh sửa</button>
    </li>
</ul>
</div> -->
                </div>
            </div>
            <div class="col-right">

            </div>
</div>
    </div>

</template>
<script setup>
import { ref } from 'vue';
  const orderItem = ref([]);

  </script>
<style scoped>
.shopping-cart{
    background-color: #143b36;
height: 100%;
}
.container-shoppingCart{
    margin: 0 auto;
    padding: 0 auto;
    width: 1200px;
    display: flex;
overflow: hidden;

}
.col-left{
width: 70%;
color: white;

}
.col-right{
    width: 30%;
    color: white;
}
.order-cart{
    margin-top: 20px;
    border: 1px solid red;
    height: 500px;
    padding: 20px;
    width: 800px;
}

</style>