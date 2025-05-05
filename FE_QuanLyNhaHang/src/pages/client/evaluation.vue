<template>
    <div class="app-wrapper">
      <div class="app-container">
        <header>
          <h1>Restaurant Reviews</h1>
          <p>Share your experience by submitting a review with photos!</p>
        </header>
        <main>
          <section class="form-section">
            <form @submit.prevent="submitReview" class="review-form" novalidate>
              <div class="form-group rating-group">
                <label>Rating:</label>
                <div class="stars">
                  <button
                    v-for="star in 5"
                    :key="star"
                    type="button"
                    :class="{'active': rating >= star}"
                    @click="rating = star"
                    aria-label="Select star rating"
                  >
                    ★
                  </button>
                </div>
              </div>
  
              <div class="form-group">
                <label for="comment">Comment</label>
                <textarea
                  id="comment"
                  v-model="comment"
                  placeholder="Write your review here..."
                  required
                  rows="4"
                ></textarea>
              </div>
  
              <div class="form-group">
                <label for="photos">Upload Photos</label>
                <input
                  type="file"
                  id="photos"
                  multiple
                  accept="image/*"
                  @change="handleFileChange"
                />
                <div class="photo-previews" v-if="photoPreviews.length">
                  <div v-for="(photo, index) in photoPreviews" :key="index" class="photo-preview">
                    <img :src="photo" alt="Photo preview" />
                    <button type="button" class="remove-photo" @click="removePhoto(index)" aria-label="Remove photo">×</button>
                  </div>
                </div>
              </div>
              <!-- :disabled vô hiệu hóa nút  -->
              <button type="submit" :disabled="!canSubmit" class="submit-btn">Submit Review</button> 
            </form>
          </section>
  
          <section v-if="reviews.length" class="reviews-section">
            <h2>Previous Reviews</h2>
            <ul class="reviews-list">
              <li v-for="(review, index) in reviews" :key="index" class="review-item">
                <div class="review-header">
                  <div class="review-rating">
                    <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= review.rating }">★</span>
                  </div>
                  <time :datetime="review.date">{{ formattedDate(review.date) }}</time>
                </div>
                <p class="review-comment">{{ review.comment }}</p>
                <div class="review-photos" v-if="review.photos.length">
                  <img
                    v-for="(photo, i) in review.photos"
                    :key="i"
                    :src="photo"
                    alt="Review photo"
                    class="review-photo"
                  />
                </div>
              </li>
            </ul>
          </section>
          <section v-else class="no-reviews">
            <p>Chưa có đánh giá nào</p>
          </section>
        </main>
        <footer>
          <small>© 2025 Restaurant Reviews</small>
        </footer>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        rating: 0,
        comment: '',
        photoFiles: [],
        photoPreviews: [],
        reviews: []
      };
    },
    computed: {
      canSubmit() {
        return this.rating > 0 && this.comment.trim().length > 0;
      }
    },
    methods: {
      handleFileChange(event) {
        const files = Array.from(event.target.files);
        for (const file of files) {
          if (!file.type.startsWith('image/')) continue;
          this.photoFiles.push(file);
          const reader = new FileReader();
          reader.onload = e => {
            this.photoPreviews.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
        event.target.value = null;
      },
      removePhoto(index) {
        this.photoFiles.splice(index, 1);
        this.photoPreviews.splice(index, 1);
      },
      submitReview() {
        if (!this.canSubmit) return;
  
        const newReview = {
          rating: this.rating,
          comment: this.comment.trim(),
          photos: [...this.photoPreviews],
          date: new Date().toISOString()
        };
  
        this.reviews.unshift(newReview);
  
        this.rating = 0;
        this.comment = '';
        this.photoFiles = [];
        this.photoPreviews = [];
      },
      formattedDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
  
  * {
    box-sizing: border-box;
  }
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    background: linear-gradient(135deg, #72EDF2 10%, #5151E5 100%);
    height: 100vh;
  }
  .app-wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: white;
  }
  .app-container {
    background: white;
    width: 100%;
    max-width: 600px;
    height: 90vh;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  header {
    background: #5151E5;
    color: white;
    padding: 1.2rem 1.5rem;
    text-align: center;
  }
  main {
    padding: 1rem 1.5rem;
    overflow-y: auto;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  footer {
    background: #5151E5;
    color: white;
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
    text-align: center;
  }
  .review-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .form-group {
    display: flex;
    flex-direction: column;
  }
  .stars {
    display: flex;
    gap: 0.3rem;
  }
  .stars button {
    font-size: 2rem;
    background: none;
    border: none;
    color: #ccc;
    cursor: pointer;
  }
  .stars button.active,
  .stars button:hover,
  .stars button:hover ~ button {
    color: #FFB400;
  }
  textarea {
    resize: vertical;
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  textarea:focus {
    outline: none;
    border-color: #5151E5;
    box-shadow: 0 0 4px rgba(81,81,229,0.5);
  }
  .photo-previews {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.6rem;
  }
  .photo-preview {
    width: 60px;
    height: 60px;
    position: relative;
  }
  .photo-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
  .remove-photo {
    position: absolute;
    top: 2px;
    right: 2px;
    background: white;
    border: none;
    border-radius: 50%;
    font-weight: bold;
    cursor: pointer;
    color: red;
    width: 20px;
    height: 20px;
  }
  .submit-btn {
    background: #5151E5;
    color: white;
    padding: 0.7rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
  }
  .submit-btn:disabled {
    background: #999;
    cursor: not-allowed;
  }
  .reviews-section {
    flex-grow: 1;
  }
  .review-item {
    background: #f0f0ff;
    border-radius: 10px;
    padding: 1rem;
  }
  .review-rating {
    color: #FFB400;
  }
  .star.filled {
    color: #FFB400;
  }
  .review-photo {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 6px;
    margin-right: 0.5rem;
  }
  .no-reviews {
    text-align: center;
    color: #555;
    padding: 1rem;
    font-style: italic;
  }
  </style>
  