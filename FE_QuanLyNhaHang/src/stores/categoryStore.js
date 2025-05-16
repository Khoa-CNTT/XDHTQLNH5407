import { ref, watch } from 'vue';
import axios from 'axios';

export const cartCount = ref(0);
export const cartItems = ref([]);

// Hàm lấy giỏ hàng từ server
const fetchCart = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/admin/carts');
    console.log('Giỏ hàng:', response.data);

    // Lưu thông tin chi tiết vào giỏ hàng
    cartItems.value = response.data.map(item => ({
      id: item.id,
      id_food: item.id_food,
      quantity: item.quantity,
      name: item.name,
      price: item.price,
      image: item.image
    }));

    // Cập nhật số lượng món trong giỏ
    cartCount.value = response.data.reduce((total, item) => total + item.quantity, 0);
  } catch (error) {
    console.error("Không thể lấy giỏ hàng", error);
  }
};

// Hàm thêm món vào giỏ hàng
export async function addToCart(mon) {
  const newItem = {
    id_food: mon.id,
    id_table: 1,  // Cập nhật id_table nếu cần thiết
    quantity: 1,
    name: mon.name,
    price: mon.price,
    image: mon.image
  };

  try {
    // Kiểm tra xem món đã có trong giỏ hay chưa
    const existingItemIndex = cartItems.value.findIndex(item => item.id_food === mon.id);
    
    if (existingItemIndex !== -1) {
      // Nếu món đã có, tăng số lượng lên
      cartItems.value[existingItemIndex].quantity++;
    } else {
      // Nếu món chưa có, gửi yêu cầu thêm món vào giỏ
      const response = await axios.post('http://localhost:8000/api/admin/carts/create', newItem);
      cartItems.value.push({
        ...newItem,
        id_food: response.data.id_food  // Lưu ID mới trả về từ server
      });
    }

    // Cập nhật số lượng món trong giỏ
    cartCount.value++;
  } catch (error) {
    console.error("Không thể thêm vào giỏ hàng", error);
  }
}


watch(cartItems, async (newCart) => {
  try {
    // Cập nhật giỏ hàng trên server
    await axios.put('http://localhost:8000/api/admin/carts', newCart);
    console.log('Giỏ hàng đã được cập nhật trên server');
  } catch (error) {
    console.error("Không thể cập nhật giỏ hàng", error);
  }
}, { deep: true });

// Lấy giỏ hàng khi trang web được tải
fetchCart();
