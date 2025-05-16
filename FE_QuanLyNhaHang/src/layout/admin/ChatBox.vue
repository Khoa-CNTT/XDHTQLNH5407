<template>
    <div class="fixed right-10 bottom-10 h-16 w-16 bg-blue-500 rounded-full flex justify-center items-center">
      <!-- ICON mở chat -->
      <svg @click="isOpen = true" class="w-12 h-12 text-white hover:cursor-pointer" aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
      </svg>
  
      <!-- Hộp chat -->
      <div v-if="isOpen"
        class="fixed right-28 rounded-xl bottom-10 h-[500px] w-[400px] bg-white border flex flex-col">
        <div class="w-full border h-20 flex flex-row bg-blue-400 rounded-t-xl">
          <div class="flex-[5] flex flex-row items-center px-2 gap-2">
            <div class="w-16 h-16 rounded-full bg-white overflow-hidden flex justify-center items-center">
              <img class="w-12 h-12" src="/imageicon/customer icon.png" alt="user image">
            </div>
            <p class="text-white font-semibold text-xl">Lê Minh Trí</p>
          </div>
          <!-- ICON đóng chat -->
          <div class="flex flex-1 justify-center items-center">
            <svg @click="isOpen = false" class="w-8 h-8 text-white hover:cursor-pointer" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
          </div>
        </div>
        <!-- chat content -->
        <div class="flex-1 overflow-y-auto p-2">
          <div v-for="msg in messages" :key="msg.id" :class="msg.sender === 'customer' ? 'text-right' : 'text-left'">
            <p class="inline-block px-3 py-2 rounded-lg max-w-[70%] break-words"
              :class="msg.sender === 'customer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'">
              {{ msg.content }}
            </p>
          </div>
        </div>
  
        <!-- Nhập tin nhắn -->
        <div class="h-auto w-full border-t rounded-b-xl flex flex-row justify-start items-center p-2 bg-white">
          <textarea v-model="message" ref="textareaRef" rows="1" placeholder="Nhập tin nhắn..."
            class="resize-none overflow-hidden w-full ps-2 focus:outline-none" @input="autoResize"></textarea>
          <div @click="sendMessage" class="h-[50px] w-[50px] flex justify-center items-center hover:cursor-pointer">
            <svg class="w-6 h-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
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
  
  const isOpen = ref(false)
  const message = ref('')
  const textareaRef = ref(null)
  const messages = ref([])
  
  const sendMessage = async () => {
    const trimmed = message.value.trim()
    if (!trimmed) return
  
    const body = {
      id_customer: 1,  // customer ID
      id_user: 2,      // admin ID (this should be dynamically set based on logged-in user)
      message: trimmed
    }
  
    try {
      const res = await api.post('/chat/send-message', body, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      })
      message.value = ''
      getMessages()  // Refresh the messages
    } catch (err) {
      console.error('Error sending message:', err)
    }
  }
  
  const autoResize = () => {
    const textarea = textareaRef.value
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'
    }
  }
  
  const getMessages = async () => {
    const res = await api.get(`/chat/get-messages/1/2`, {  // Replace with dynamic IDs
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    })
    messages.value = res.data.messages
  }
  
  onMounted(() => {
    getMessages()  // Load messages on mount
  })
  </script>
  