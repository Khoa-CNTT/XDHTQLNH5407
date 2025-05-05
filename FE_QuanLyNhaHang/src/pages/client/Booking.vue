<template>
    <div class="container">
        <div class="order-table">
            <div class="col-left">
                <p class="title-oder">
                    <i class="fas fa-utensils"></i>
                    Liên Hệ Đặt Bàn
                    <i class="fas fa-utensils"></i>
                </p>

                <div class="input-text">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Id khách hàng</label>
                            <input type="text" v-model="form.customer_name" placeholder="Teen khách hàng..." />

                        </div>
                        <div class="form-group">
                            <label>Id bàn</label>
                            <input type="text" v-model="form.table_number" placeholder="ID bàn..." />
                        </div>
                    </div>
                    <div class="form-row">
                        <!-- <div class="form-group">
                            <label>Số Điện Thoại</label>
                            <input type="text" placeholder="Nhập số điện thoại..." v-model="form.phone"/>
                        </div> -->
                        <div class="form-group">
                            <label>Món ăn </label>
                            <input type="text" v-model="form.food_name" placeholder="Món ăn..." />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Số Lượng</label>
                            <input type="number" v-model="form.quantity" placeholder="Số lượng..." />

                        </div>
                        <div class="form-group">
                            <label>Thời gian bạn đến?</label>
                            <input type="datetime-local" v-model="form.timeBooking" />
                        </div>
                    </div>
                </div>
                <div class="oder-introduce">
                    <p>Khác có thể đặt tiệc hội nghị , liên hoan vui lòng gọi trực tiếp:
                        <strong class="number-phone"> 1900 2345 </strong>
                    </p>
                </div>
                <button class="oder-btn">
                    <strong @click="createBooking">Đặt Bàn Ngay</strong>
                    <p v-if="errors.length" class="error-message">
                        Vui lòng kiểm tra lại thông tin.
                    </p>

                </button>
            </div>
            <div class="col-right">
                <img src="/imageicon/bunbo.png" alt="Hình ảnh" />
            </div>
        </div>
    </div>
</template>

<script setup>
import api from '../../services/api';
import { useRouter } from 'vue-router';
import '../../assets/css/Booking.css'
import { ref, reactive } from 'vue';
const errors = ref({});
const router = useRouter();
const form = reactive({
    table_number: '',
    timeBooking: '',
    food_name: '',
    quantity: '',
    customer_name: ''
});
const createBooking = () => {
    api.post("/admin/bookings/create", form)
        .then((response) => {
            
            if (response.status == 201) { // http code khi tạo thành công là 201, nào mà update, delete... thành công mới dùng 200
                alert('Đặt bàn thành công!');
            }
        })
        .catch((error) => { 
            console.log('error', error)
            // errors.value = error.response.data.errors;
        })
}
</script>

<style scoped>
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
    height: 550px;
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
    max-width: 400px;
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
</style>