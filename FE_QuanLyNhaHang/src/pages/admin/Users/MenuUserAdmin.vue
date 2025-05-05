<template>
  <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
    <div class="w-full h-12 flex flex-row justify-end pe-5 pb-2 gap-2">
      <Search v-model="searchQuery" />
      <AddButton />
    </div>
    <div class="w-full h-fit border-t border-gray-400 px-2 pt-2">
      <table class="w-full h-fit table-auto font-semibold text-2xl">
        <thead>
          <tr class="border-2 border-gray-300">
            <th>
              <div class="flex flex-row justify-center items-center gap-2">
                <Sort @sort="(key) => sortBy('name', key)" />
                <p class="text-start w-full">Họ tên</p>
              </div>
            </th>
            <th>
              <div class="flex flex-row justify-center items-center gap-2">
                <Sort @sort="(direction) => sortBy('role', direction)" />
                <p>Chức vụ</p>
              </div>
            </th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedItems" :key="index" class="border-2 border-gray-300">
            <td>
              <div class="h-full flex flex-row justify-start items-center">
                <div class="overflow-hidden flex flex-row justify-center items-center">
                  <img class="hover:cursor-pointer overflow-auto object-cover h-32 w-24 rounded-lg shadow-md border"
                    :src="`/picture/profile/${item.picture}`" alt="Ảnh nhân viên" />
                  <p class="ps-5 hover:cursor-pointer">{{ item.name }}</p>
                </div>
              </div>
            </td>

            <td class="flex justify-center items-center w-full h-full">
              <p class="w-60 text-center">{{ item.role }}</p>
            </td>

            <td class="text-center">
              <div class="flex justify-center items-center h-full">
                <div class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                  <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                      d="M6 12h.01m6 0h.01m5.99 0h.01" />
                  </svg>
                  <div
                    class="absolute hidden group-hover:flex z-10 right-0 bg-gray-200 border-2 border-gray-400 w-40 flex-col gap-2 rounded-lg p-2 items-start">
                    <p class="hover:bg-gray-500 text-start w-full h-full" @click="goDetailCategory">
                      Chi tiết
                    </p>
                    <p class="hover:bg-gray-500 text-start w-full h-full">Chỉnh sửa</p>
                    <p class="hover:bg-gray-500 text-start w-full h-full">Xoá</p>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :current-page="currentPage" :total-pages="totalPages" @page-changed="changePage" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Sort from "../../../components/Admin/SortButton.vue";
import Search from "../../../components/Admin/Search.vue";
import Pagination from "../../../components/Admin/Pagination.vue";
import AddButton from "../../../components/Admin/AddButton.vue";

const router = useRouter();
const searchQuery = ref("");
const sortKey = ref(""); // 'name' hoặc 'qty'
const sortDirection = ref(""); // 'asc' | 'desc'

function sortBy(key, direction) {
  sortKey.value = key;
  sortDirection.value = direction;
}

const filteredItems = computed(() => {
  let result = [...allItems.value];

  // Lọc theo search nếu có
  if (searchQuery.value) {
    result = result.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Sắp xếp nếu có key và direction
  if (sortKey.value && sortDirection.value) {
    result.sort((a, b) => {
      if (sortDirection.value === "asc") {
        return a[sortKey.value] > b[sortKey.value] ? 1 : -1;
      } else {
        return a[sortKey.value] < b[sortKey.value] ? 1 : -1;
      }
    });
  }

  return result;
});

const itemsPerPage = 5;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredItems.value.slice(start, end);
});

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function goDetailCustomers() {
  router.push("/admin/customers/details-customers");
}

const allItems = ref([
  // Quản lý (1)
  {
    picture: "user1.png",
    name: "Nguyễn Hoàng Phúc",
    role: "Quản lý",
    phone: "0909111222",
    email: "phuc.nh@nhahang-royal.vn",
    status: "Đang làm việc",
    birth: "10/05/1983",
  },
  // Bếp (5)
  {
    picture: "user2.png",
    name: "Trần Thị Kim Chi",
    role: "Bếp trưởng",
    phone: "0918222333",
    email: "chi.ttk@nhahang-royal.vn",
    status: "Đang làm việc",
    birth: "25/11/1980",
  },
  {
    picture: "user3.png",
    name: "Lê Văn Tài",
    role: "Phụ bếp",
    phone: "0377333444",
    email: "tai.lv@nhahang-staff.com",
    status: "Đang làm việc",
    birth: "14/02/1999",
  },
  {
    picture: "user4.png",
    name: "Phạm Ngọc Hân",
    role: "Phụ bếp",
    phone: "0766444555",
    email: "han.pn@nhahang-staff.com",
    status: "Đang làm việc",
    birth: "30/07/2001",
  },
  {
    picture: "user5.png",
    name: "Hoàng Minh Đức",
    role: "Phụ bếp",
    phone: "0988555666",
    email: "duc.hm@nhahang-staff.com",
    status: "Thử việc", // Trạng thái thử việc
    birth: "19/09/2003",
  },
  {
    picture: "user1.png",
    name: "Võ Thị Mỹ Duyên",
    role: "Phụ bếp",
    phone: "0588666777",
    email: "duyen.vtm@nhahang-staff.com",
    status: "Đang làm việc",
    birth: "01/12/2000",
  },
  // Phục vụ (6)
  {
    picture: "user1.png",
    name: "Đặng Thị Thu Thảo",
    role: "Nhân viên Phục vụ",
    phone: "0933777888",
    email: "thao.dtt@dichvu-nhahang.net",
    status: "Đang làm việc",
    birth: "11/03/2002",
  },
  {
    picture: "user1.png",
    name: "Bùi Anh Khoa",
    role: "Nhân viên Phục vụ",
    phone: "0866888999",
    email: "khoa.ba@dichvu-nhahang.net",
    status: "Đang làm việc",
    birth: "22/06/2001",
  },
  {
    picture: "user1.png",
    name: "Huỳnh Gia Bảo",
    role: "Nhân viên Phục vụ",
    phone: "0944999000",
    email: "bao.hg@dichvu-nhahang.net",
    status: "Đang làm việc",
    birth: "05/01/2003",
  },
  {
    picture: "user1.png",
    name: "Nguyễn Phương Anh",
    role: "Nhân viên Phục vụ",
    phone: "0908101112",
    email: "anh.np@dichvu-nhahang.net",
    status: "Thử việc", // Trạng thái thử việc
    birth: "18/04/2004",
  },
  {
    picture: "user1.png",
    name: "Trần Quốc Tuấn",
    role: "Nhân viên Phục vụ",
    phone: "0917111213",
    email: "tuan.tq@dichvu-nhahang.net",
    status: "Đang làm việc",
    birth: "09/10/1998",
  },
  {
    picture: "user1.png",
    name: "Lê Bảo Ngọc",
    role: "Nhân viên Phục vụ",
    phone: "0366121314",
    email: "ngoc.lb@dichvu-nhahang.net",
    status: "Đang làm việc",
    birth: "28/02/2000",
  },
  // Pha chế (2)
  {
    picture: "user1.png",
    name: "Phạm Thanh Trúc",
    role: "Nhân viên Pha chế",
    phone: "0788131415",
    email: "truc.pt@bar-cafe.co",
    status: "Đang làm việc",
    birth: "15/05/1997",
  },
  {
    picture: "user1.png",
    name: "Hoàng Công Thành",
    role: "Nhân viên Pha chế",
    phone: "0987141516",
    email: "thanh.hc@bar-cafe.co",
    status: "Đang làm việc",
    birth: "21/08/1999",
  },
  // Thu ngân (2)
  {
    picture: "user1.png",
    name: "Vũ Thị Mai",
    role: "Nhân viên Thu ngân",
    phone: "0599151617",
    email: "mai.vt@ketoan-nhahang.org",
    status: "Đang làm việc",
    birth: "03/04/1996",
  },
  {
    picture: "user1.png",
    name: "Đặng Minh Nhật",
    role: "Nhân viên Thu ngân",
    phone: "0932161718",
    email: "nhat.dm@ketoan-nhahang.org",
    status: "Đang làm việc",
    birth: "11/07/1995",
  },
  // Tạp vụ (2)
  {
    picture: "user1.png",
    name: "Bùi Văn Lợi",
    role: "Tạp vụ",
    phone: "0877171819",
    email: "loi.bv@vesinh-pro.com",
    status: "Đang làm việc",
    birth: "26/09/1992",
  },
  {
    picture: "user1.png",
    name: "Huỳnh Thị Sen",
    role: "Tạp vụ",
    phone: "0943181920",
    email: "sen.ht@vesinh-pro.com",
    status: "Đang làm việc",
    birth: "07/12/1989",
  },
  // Bảo vệ (2)
  {
    picture: "user1.png",
    name: "Nguyễn Tấn Dũng",
    role: "Nhân viên Bảo vệ",
    phone: "0907192021",
    email: "dung.nt@baove247.vn",
    status: "Đang làm việc",
    birth: "14/01/1985",
  },
  {
    picture: "user1.png",
    name: "Trần Văn Bình",
    role: "Nhân viên Bảo vệ",
    phone: "0916202122",
    email: "binh.tv@baove247.vn",
    status: "Đang làm việc",
    birth: "23/06/1988",
  },
  // Bảo trì (1)
  {
    picture: "user1.png",
    name: "Lê Quang Vinh",
    role: "Nhân viên Bảo trì",
    phone: "0355212223",
    email: "vinh.lq@kythuat-nhahang.com",
    status: "Đang làm việc",
    birth: "08/10/1986",
  },
]);
</script>
