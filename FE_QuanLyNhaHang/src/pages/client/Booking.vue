<template>
    <div class="container">
        <div class="order-table">
            <div class="col-left">
                <p style="font-size: 40px;" class="title-oder">
                    <i class="fas fa-utensils"></i>
                    Liên Hệ Đặt Bàn
                    <i class="fas fa-utensils"></i>
                </p>

                <div class="input-text">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Họ và tên</label>
                            <input type="text" v-model="form.FullName" placeholder="Nhập họ và tên..." maxlength="255" required />
                        </div>
                        <div class="form-group">
                            <label>Số điện thoại</label>
                            <input type="text" v-model="form.phoneNumber" placeholder="Nhập số điện thoại..." maxlength="20" required />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Số lượng</label>
                            <input type="number" v-model="form.quantity" placeholder="Số lượng..." min="1" required />
                        </div>
                        <div class="form-group">
                            <label>Thời gian bạn đến?</label>
                            <input type="datetime-local" v-model="form.timeBooking" required />
                        </div>
                    </div>
                </div>

                <div class="oder-introduce">
                    <p>Khác có thể đặt tiệc hội nghị, liên hoan vui lòng gọi trực tiếp:
                        <strong class="number-phone">1900 2345</strong>
                    </p>
                </div>

                <button class="oder-btn" @click="createBooking">
                    <strong>Đặt Bàn Ngay</strong>
                    <p v-if="errors.message" class="error-message">
                        {{ errors.message }}
                    </p>
                </button>
            </div>

            <div class="col-right">
                <img style="border-radius: 50%; margin-bottom: 50px;" src="/imageicon/phefood.png" alt="Hình ảnh" />
            </div>
        </div>
    </div>
</template>

<script setup>
import api from '../../services/api';
import { useRouter } from 'vue-router';
import '../../assets/css/Booking.css';
import { ref, reactive } from 'vue';

const errors = ref({});
const router = useRouter();

const form = reactive({
    FullName: '',
    phoneNumber: '',
    quantity: '',
    timeBooking: ''
});

const bookingHistory = ref([]);

const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = '00';
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const createBooking = () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
        alert("Bạn cần đăng nhập để thực hiện chức năng này.");
        router.push({ name: 'login' });
        return;
    }

    // Kiểm tra form trước khi gửi
    errors.value = {};
    if (!form.FullName || !form.phoneNumber || !form.quantity || !form.timeBooking) {
        errors.value = { message: 'Vui lòng kiểm tra lại thông tin.' };
        return;
    }

    const payload = {
        ...form,
        timeBooking: formatDateTime(form.timeBooking)
    };

    api.post("/admin/bookings/create", payload)
        .then((response) => {
            if (response.status === 201) {
                alert('Đặt bàn thành công!');
                bookingHistory.value.push(response.data);
                router.push({ name: 'users-home' }); // chuyển về trang Home
            }
        })
        .catch((error) => {
            console.log('Lỗi khi đặt bàn:', error);
            errors.value = error.response?.data?.errors || { message: 'Đã xảy ra lỗi khi đặt bàn.' };
        });
};
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