<template>
    <div class="container-pay">
        <div class="payment">
            <div class="col-left">
                <div class="main-inform">
                    <div class="shop-title">
                        Nhà Hàng Phê Food
                        <img src="/imageicon/logo.png" alt="">
                    </div>
                    <div class="shop-inform">
                        <div style="margin-left: 10px;" class="shop-name">
                            Thông tin nhận hàng
                        </div>
                        <div class="pay-login">
                            <p><i class="fa-solid fa-user"></i>Đăng Nhập</p>
                        </div>
                        <div style="margin-left: 25px;" class="pay-transfer">
                            <p>Vận chuyển</p>
                        </div>
                    </div>
                    <div class="main-content">
                        <div class="row">
                            <div class="row-col-left">
                                <label for=""> Email</label>
                                <input type="email" placeholder="Nhập Email">
                                <label for=""> Họ và Tên
                                </label>
                                <input type="text" placeholder="Nhập Tên">
                                <form>
                                    <label for="phone">Số điện thoại:</label>
                                    <div class="phone-container">

                                        <input type="tel" class="phone" name="phone" placeholder="Nhập số điện thoại"
                                            required>
                                        <select id="country-code" name="country-code">
                                            <option value="+1">+1 (Mỹ)</option>
                                            <!-- <option value="+84">+84 <i class="fa-solid fa-star"></i></option> -->
                                            <option value="+44">+44(Anh)</option>
                                            <option value="+61">+61 (Úc)</option>
                                        </select>
                                    </div>

                                </form>
                                <label for=""> Địa chỉ
                                </label>
                                <input type="text" placeholder="Nhập địa chỉ">
                                <label for=""> Địa chỉ
                                </label>
                                <input type="text"> <label for=""> Địa chỉ
                                </label>
                                <input type="text">


                            </div>

                            <div class="row-col-right">
                                <div class="do-something">
                                    ??????
                                </div>

                                <div class="name-pay">
                                    <p>Thanh Toán</p>
                                </div>

                                <div class="radio-pay">
                                    <div class="content-box_row">
                                        <div class="radio-wrapper" v-for="(pay ,index) in namePay" :key="index">
                                            <label class="radio-label">
                                                <input name="paymentMethod" id="paymentMethod" type="radio"
                                                    class="input-radio" value="552267">
                                                <span class="radio__label__primary">{{ pay.name }}</span>
                                                <span class="radio__label__accessory">
                                                    <span class="radio__label__icon">
                                                        <i class="payment-icon payment-icon--4"></i>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <div class="content-box__row__desc" id="desc" style="display: none;">
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

            </div>
        </div>

    </div>

</template>
<script setup>
const radioCOD = document.getElementById('paymentMethod');
const descCOD = document.getElementById('desc');

const allRadios = document.querySelectorAll('input[name="paymentMethod"]');
allRadios.forEach(radio => {
  radio.addEventListener('change', function() {
    if (radioCOD.checked) {
      descCOD.style.display = 'block';
    } else {
      descCOD.style.display = 'none';
    }
  });
});
const namePay =[
    {
        name: 'Thanh toán khi giao hàng',
    },
    {
        name: ' Thanh toán trước khi giao hàng'
    }
]
</script>
<style scoped>
.container-pay {
    
    width: 100%;
    margin: 0 auto;

}

.shop-title {
    margin-left: 10px;
    font-size: 30px;
    color: blue;
    display: flex;
}

.shop-title img {
    width: 150px;
    margin-left: 10px;
}

.main-inform {
    padding: 10px;
}

.shop-inform {
    display: flex;
}

.pay-login {
    margin-left: 160px;
    color: red;
    cursor: pointer;

}

.pay-login i {
    margin-right: 8px;
}

.payment {
    height: 100%;
    background-color: white;

}

.col-left {
    width: 70%;
}

.col-right {
    width: 30%;
}

.row {
    display: flex;
    width: 100%;
}

.row-col-left {
    width: 50%;

    padding: 10px;
    flex-direction: column;
    display: flex;
    margin-top: 4px;
}

.row-col-right {
    width: 50%;

    padding: 10px;
}

.phone {
    margin-right: 10px;

}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    color: #333;
    font-size: 16px;
    transition: all 0.3s ease;
}

.phone-container {
    display: flex;
    align-items: center;
}

select,
input[type="tel"] {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
}

select {
    width: 100px;

}

input[type="tel"] {
    flex: 1;
}

.radio-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    border: 1px solid red;
    width: 100%;
    height: 50px;

}

.input-radio {
    width: 16px;
    height: 16px;
    margin-left: 20px;
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
    display: flex;
    align-items: center;
    margin-right: 25px;
}
</style>