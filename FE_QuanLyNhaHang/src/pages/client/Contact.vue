<template>
    <div class="web-contact">
        <div class="container">
            <div class="col-left">
                <div class="contact">
                    <h3 style="height: auto;     margin-left: auto;
    margin-right: auto; color: white; padding: 10px; border-radius:5px ; width: 600px;  background-color: #d69c52;
"><strong>Nhà hàng PHÊ FOOD</strong></h3>
                    <div class="info-contact">
                        <p>Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu, tận tâm phục vụ, mang lại cho khách
                            hàng những trãi nghiệm tuyệt với nhất. Các món ăn với công thức độc quyền sẽ mang lại hương
                            vị
                            mới mẻ cho thực khách. Dola Restaurant xin chân thành cảm ơn.</p>
                        <p><strong>Của hàng chính </strong></p>
                        <ul>
                            <li>
                                <p>Địa chỉ: 52 Giáp Văn Cương </p>
                            </li>
                            <li>
                                <p>Điện thoại: <strong style="color: yellow;">1900 6750</strong></p>
                            </li>
                            <li>
                                <p>Email: <strong style="color: yellow;">tranvankhanh23122003@gmail.com</strong></p>

                            </li>
                        </ul>
                        <Button class="btn-seeStore">Hệ Thống của hàng</Button>
                    </div>
                </div>
            </div>
            <div class="col-right">
                <div class="form-contact">
                    <h3 style="height: auto; color: white; padding: 10px; border-radius:5px ; width: 600px;  background-color: #d69c52;
"><strong>Liên Hệ Với Chúng Tôi</strong></h3>
                    <div class="group-contact">
                        <input class="input-name" type="text" placeholder="Họ và tên">
                        <input class="input-email" type="text" placeholder="Email">
                        <input class="input-phone" type="text" placeholder="Số điện thoại">
                        <input class="input-content" type="text" name="" id="" placeholder="Nội dung">
                        <Button class="btn-sendInfo">Gửi Thông Tin</Button>
                        

                    </div>
                </div>
            </div>

        </div>
        <div class="map">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.66313210352!2d108.15967927460028!3d16.082961439071273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218c30c993543%3A0xec01cc42d8352cff!2zNTIgR2nDoXAgVsSDbiBDxrDGoW5nLCBIb8OgIE1pbmgsIExpw6puIENoaeG7g3UsIMSQw6AgTuG6tW5nIDU1MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1744623014700!5m2!1svi!2s"
                style="border:0;" allowfullscreen="true" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>

</template>
<style scoped>
.web-contact {
    background: #143b36;
    width: 100%;
    height: 850px;
}

.container {
    max-width: 1600px;
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
}

.contact {
    margin: 30px 0 0 30px;
}

.form-contact {
    margin: 30px 0 0 30px;

}

.group-contact {
    border: 1px solid red;
    margin-top: 10px;
    width: 600px;
    color: white;
    font-size: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 16px;

}

.input-name,
.input-email,
.input-phone {
    height: 35px;
    border-radius: 10px;
}

.input-content {
    height: 70px;
    border-radius: 10px;

}

.input-name::placeholder,
.input-email::placeholder,
.input-phone::placeholder,
.input-content::placeholder {
    padding-left: 20px;
}

.info-contact {
    border: 1px solid red;
    margin-top: 10px;
    width: 600px;
    color: white;
    font-size: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-left: auto;
    margin-right: auto;

}

.col-left {
    width: 50%;
}

.col-right {
    width: 50%;
}

.btn-seeStore,
.btn-sendInfo {
    color: #fff;
    background-color: #d69c52;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 5px;
    box-shadow: 0 3px 6px #a37b44;
    margin-top: 10px;
    height: 40px;
    width: 200px;
    transition: box-shadow 0.3s ease;

}

.btn-seeStore:hover,
.btn-sendInfo:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
    /* Bóng mờ khi hover */
    background-color: #c98e3b;
}

.map {
    margin: 20px 0 20px 0;
    width: 100%;
    padding: 0 45px;
}

.map iframe {
    width: 100%;
    height: 400px;
    border: 0;
}
</style>