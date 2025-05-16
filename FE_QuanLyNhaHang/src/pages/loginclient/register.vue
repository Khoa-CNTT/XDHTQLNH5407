<template>
  <div class="auth-container">
    <div class="auth-box">
      <!-- Đăng ký -->
      <form v-if="step === 'register'" @submit.prevent="register" class="form" novalidate>
        <h2>Tạo tài khoản</h2>

        <input type="email" v-model="formRegister.email" placeholder="Email" required />
        <input type="text" v-model="formRegister.FullName" placeholder="Họ và tên" required />
        <input type="tel" v-model="formRegister.phoneNumber" placeholder="Số điện thoại" required />
        <input type="password" v-model="formRegister.password" placeholder="Mật khẩu" required />
        <input type="password" v-model="formRegister.password_confirmation" placeholder="Xác nhận mật khẩu" required />

        <button type="submit" class="btn-submit">Đăng ký</button>
      </form>

      <!-- Xác thực OTP -->
      <form v-else-if="step === 'otp'" @submit.prevent="verifyOtp" class="form">
        <h2>Nhập mã OTP</h2>

        <p class="text-info">Chúng tôi đã gửi mã OTP đến email: <strong>{{ formRegister.email }}</strong></p>
        <input type="text" v-model="otp" placeholder="Nhập mã OTP" required />

        <button type="submit" class="btn-submit">Xác thực</button>
      </form>

      <div class="links-row-register">
        <router-link to="/login" class="small-link-register">Quay lại đăng nhập</router-link>
      </div>
    </div>
  </div>
</template>


<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/api'

const router = useRouter()

const formRegister = reactive({
  email: '',
  FullName: '',
  phoneNumber: '',
  password: '',
  password_confirmation: ''
})

const otp = ref('')
const step = ref('register') // bước hiện tại: 'register' hoặc 'otp'
const idDangKy = ref(null)

function register() {
  if (formRegister.password !== formRegister.password_confirmation) {
    alert('Mật khẩu xác nhận không khớp!');
    return;
  }

  api.post("/client/register", formRegister)
    .then((response) => {
      alert(response.data.message)
      idDangKy.value = response.data.id
      step.value = 'otp'
    })
    .catch((error) => {
      console.error("Lỗi đăng ký:", error.response?.data || error.message);
      alert("Lỗi đăng ký. Vui lòng kiểm tra lại thông tin!");
    });
}

function verifyOtp() {
  api.post('/client/verify-otp', {
    email: formRegister.email,
    otp: otp.value
  })
    .then((response) => {
      alert('Xác thực OTP thành công. Bây giờ bạn có thể đăng nhập.');
      router.push('/login');
    })
    .catch((error) => {
      console.error('Lỗi xác thực OTP:', error.response?.data || error.message);
      alert('Mã OTP không đúng hoặc đã hết hạn!');
    });
}
</script>



  
  <style scoped>
  .text-info {
  color: #e6f0f0;
  font-size: 0.95rem;
  margin-bottom: 12px;
  text-align: center;
}

  .auth-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #143b36;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .auth-box {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.7);
    width: 100%;
    max-width: 400px;
    padding: 30px 40px;
    box-sizing: border-box;
    border: 1.5px solid #2e6d5a;
  }
  
  .form {
    display: flex;
    flex-direction: column;
  }
  
  h2 {
    margin-bottom: 20px;
    color: #e6f0f0;
    text-align: center;
    font-weight: 700;
    text-shadow: 0 0 4px rgba(255,255,255,0.3);
  }
  
  input {
    padding: 12px 15px;
    margin-bottom: 18px;
    border: 1.5px solid #2e6d5a;
    border-radius: 6px;
    font-size: 16px;
    background-color: rgba(255, 255, 255, 0.15);
    color: #e6f0f0;
    transition: border-color 0.3s ease, background-color 0.3s ease;
  }
  
  input::placeholder {
    color: #b9d5cf;
  }
  
  input:focus {
    outline: none;
    border-color: #d69c52;
    background-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 0 8px rgba(214, 156, 82, 0.7);
    color: #fff;
  }
  
  .btn-submit {
    background-color: #d69c52;
    color: #143b36;
    padding: 14px 0;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    user-select: none;
    box-shadow: 0 3px 6px #a37b44;
    margin-bottom: 20px;
  }
  
  .btn-submit:hover {
    background-color: #c58a3c;
    box-shadow: 0 5px 12px #a37b44;
  }
  
  .links-row-register {
    text-align: center;
  }
  
  .small-link-register {
    color: #d69c52;
    text-decoration: none;
    cursor: pointer;
    font-size: 0.95rem;
    user-select: none;
    transition: color 0.3s ease;
  }
  
  .small-link-register:hover {
    color: #c58a3c;
    text-decoration: underline;
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    border: 0;
  }
  
  /* Responsive */
  @media (max-width: 450px) {
    .auth-box {
      padding: 25px 20px;
      max-width: 100%;
    }
    input {
      font-size: 14px;
    }
    .btn-submit {
      font-size: 16px;
    }
    .small-link-register {
      font-size: 0.9rem;
    }
  }
  </style>