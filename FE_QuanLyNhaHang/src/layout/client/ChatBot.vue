<template>
    <div class="fixed right-10 bottom-32 h-16 w-16 bg-blue-500 rounded-full flex justify-center items-center">
      <!-- Icon mở chat -->
      <img @click="isOpen = true" class="rounded-full hover:cursor-pointer w-full h-full"
        src="/imageicon/bot icon.png" alt="bot icon" />
  
      <!-- Hộp chat -->
      <div v-if="isOpen"
        class="fixed right-28 rounded-xl bottom-10 h-[500px] w-[400px] bg-white border flex flex-col shadow-lg">
        
        <!-- Header -->
        <div class="w-full border h-20 flex flex-row bg-blue-400 rounded-t-xl">
          <div class="flex-[5] flex flex-row items-center px-2 gap-2">
            <div class="w-16 h-16 rounded-full bg-white overflow-hidden flex justify-center items-center">
              <img class="w-full h-full" src="/imageicon/bot icon.png" alt="bot icon" />
            </div>
            <p class="text-white font-semibold text-xl">Chat với AI</p>
          </div>
          <div class="flex flex-1 justify-center items-center">
            <svg @click="isOpen = false" class="w-8 h-8 text-white hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
          </div>
        </div>
  
        <!-- Nội dung chat -->
        <div class="flex-1 overflow-y-auto p-2 space-y-2">
          <div v-for="(msg, index) in messages" :key="index" :class="msg.sender === 'user' ? 'text-right' : 'text-left'">
            <!-- Hiển thị đang gõ -->
            <div v-if="msg.typing" class="bg-gray-200 text-black inline-block p-2 rounded-xl typing-indicator">
              <span>.</span><span>.</span><span>.</span>
            </div>
            <!-- Hiển thị tin nhắn -->
            <div v-else
              :class="msg.sender === 'user' ? 'bg-blue-200 text-black inline-block p-2 rounded-xl' : 'bg-gray-200 text-black inline-block p-2 rounded-xl'">
              {{ msg.text }}
            </div>
          </div>
        </div>
  
        <!-- Nhập tin nhắn -->
        <div class="h-auto w-full border-t rounded-b-xl flex flex-row justify-start items-center p-2 bg-white">
          <textarea v-model="message" ref="textareaRef" rows="1" placeholder="Nhập tin nhắn..."
            class="resize-none overflow-hidden w-full ps-2 focus:outline-none" @input="autoResize" @keydown.enter="sendMessage"></textarea>
          <div @click="sendMessage"
            class="h-[50px] w-[50px] flex justify-center items-center hover:cursor-pointer">
            <svg class="w-6 h-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M14.502 7.046h-2.5v-.928a2.122 2.122 0 0 0-1.199-1.954 1.827 1.827 0 0 0-1.984.311L3.71 8.965a2.2 2.2 0 0 0 0 3.24L8.82 16.7a1.829 1.829 0 0 0 1.985.31 2.121 2.121 0 0 0 1.199-1.959v-.928h1a2.025 2.025 0 0 1 1.999 2.047V19a1 1 0 0 0 1.275.961 6.59 6.59 0 0 0 4.662-7.22 6.593 6.593 0 0 0-6.437-5.695Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import api from '../../services/api'
  
  const message = ref('')
  const messages = ref([])
  const textareaRef = ref(null)
  const isOpen = ref(false)
  
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}
  const id_customer = userInfo.id || 1
  const id_user = 1
  
  const autoResize = () => {
    const textarea = textareaRef.value
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'
    }
  }
  
  const sendMessage = async () => {
    if (!message.value.trim()) return
  
    const userMessage = message.value
messages.value.push({ sender: 'user', text: userMessage })
message.value = ''  // xóa text nhập khi gửi
autoResize()

  
    // Thêm dấu hiệu đang gõ
    messages.value.push({ sender: 'bot', text: '...', typing: true })
  
    try {
      const res = await api.post('/chat/send', {
        id_customer,
        id_user,
        message: userMessage
      })
  
      // Xóa typing và thêm phản hồi
      messages.value = messages.value.filter(msg => !msg.typing)
      messages.value.push({ sender: 'bot', text: res.data.reply })
    } catch (err) {
      console.error('Lỗi gửi tin nhắn:', err)
      messages.value = messages.value.filter(msg => !msg.typing)
      messages.value.push({ sender: 'bot', text: 'Lỗi gửi tin nhắn.' })
    }
  
    message.value = ''
    autoResize()
  }
  
  onMounted(() => {
    autoResize()
  })
  </script>
  
  <style scoped>
  .typing-indicator span {
    display: inline-block;
    animation: blink 1.5s infinite;
    font-weight: bold;
    margin: 0 2px;
    font-size: 1.3rem;
  }
  .typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
  }
  .typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  @keyframes blink {
    0%, 80%, 100% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
  }
  </style>
  