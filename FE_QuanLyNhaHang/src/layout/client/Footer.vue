<template>
  <footer class="footer">
    <div class="container">
      <div class="col-left">
        <img style="width: 200px; " src="/imageicon/logo.png" alt="Logo">
        <p style="color: white;">Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu, tận tâm phục vụ, mang lại cho khách hàng những trãi
          nghiệm tuyệt vời nhất. Các món ăn với công thức độc quyền sẽ mang lại hương vị mới mẻ cho thực khách. Dola
          Restaurant xin chân thành cảm ơn.</p>
        <strong>Cửa hàng chính</strong>
      </div>

      <div class="col-right">

        <div class="instruct">
        <h3 style="font-size: 20px;">Phương thức thanh toán</h3>
          <ul>
          <li>Thanh toán qua thẻ tín dụng</li>
          <li>Thanh toán qua ví điện tử</li>
          <li>Thanh toán khi nhận hàng</li>
        </ul>
        </div>
     <div class="policy">
      <h3>Chính sách </h3>
        <ul>
          <li>Chính sách thành viên </li>
          <li>Chinh sách thanh toán </li>
          <li>Hướng dẫn mua hàng</li>
          <li>Hướng dẫn mua hàng</li>
          <li>Hướng dẫn mua hàng</li>

        </ul> 
     </div>
     <div class="social-network">
      <h3>Mạng xã hội</h3>
      <div class="social-links">
        <a href="https://www.facebook.com" target="_blank" class="social-icon facebook">
          <i class="fa-brands fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" class="social-icon instagram">
          <i class="fa-brands fa-instagram"></i>
        </a>
        <a href="https://twitter.com" target="_blank" class="social-icon twitter">
          <i class="fa-brands fa-twitter"></i>
        </a>
      
      </div>
        <h3>Hình thức thanh toán </h3>
        <ul class="payment">
      <li>
        <img src="/imageicon/payment_1.png" alt="">
      </li>
      <li>
        <img src="/imageicon/payment_2.png" alt="">
      </li>
      <li>
        <img src="/imageicon/payment_3.png" alt="">
      </li>
        </ul>

     </div>
  
        
      </div>
    </div>

    <p class="footer-text">© 2025 Công ty của bạn. Mọi quyền được bảo lưu.</p>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  font-family: Arial, sans-serif;
  
}

.container {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}

.col-right {
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
  margin-right: 50px;
  display: flex;
  padding: 10px;
  margin: 10px;
  gap:15px;
  text-align: center;

}

.col-left {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left:10px   ;
}

.payment{
  display: flex;
  width: 200px;
  gap: 15px;
  margin-left:5px ;
}

h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin-bottom: 8px;
}

.footer-text {
  font-size: 14px;
  margin-top: 10px;
}
.social-links {
  margin-bottom: 20px;
}

.social-icon {
  font-size: 30px;
  margin: 0 15px;
  transition: transform 0.3s ease;
  color: #fff;
}

.social-icon:hover {
  transform: scale(1.1);
}

.social-icon.facebook {
  color: #3b5998;
}

.social-icon.instagram {
  color: #e4405f;
}

.social-icon.twitter {
  color: #1da1f2;
}

.social-icon.linkedin {
  color: #0077b5;
}
</style>