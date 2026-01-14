<template>
  <div class="vue-features-container">
    <div class="single-card">
      <!-- 1. v-pre 示例 -->
      <div class="card-header">
        <div>
          <p>Vue核心特性</p>
          <span v-pre>{{ count }}</span>
        </div>
        <svg width="200" height="60">
          <circle cx="150" cy="30" r="20" fill="white" opacity="0.3"></circle>
          <circle cx="150" cy="30" r="15" fill="white"></circle>
        </svg>
      </div>

      <div class="card-body">
        <Child :tags="productTags" @send-message="sendMessage">
          <!-- 具名插槽 -->
          <template v-slot:footer="slotProps">
            {{ slotProps.tags ? `${slotProps.tags.length}个标签` : "无标签" }}
          </template>
        </Child>
      </div>

      <div class="card-footer">
        <span>📌 count: {{ count }}</span>
        <span v-once>📌 v-once count: {{ count }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Child from "./child.vue";
const count = ref(0);
const productTags = ref(["新品", "热销", "充足"]);
const sendMessage = (data) => {
  count.value = data;
};
</script>

<style lang="scss" scoped>
.vue-features-container {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  // min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 15px;

  .single-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    transition: transform 0.3s ease;
    width: 100%;
    max-width: 800px;

    &:hover {
      transform: translateY(-5px);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px;
      text-align: center;
      position: relative;

      & > div:first-child {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 15px;
      }

      p {
        font-size: 24px;
        font-weight: bold;
        margin: 0;
      }

      span {
        background: rgba(255, 255, 255, 0.2);
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 14px;
        display: inline-block;
      }

      svg {
        display: block;
        margin: 0 auto;
      }
    }

    .card-body {
      padding: 15px;
    }

    .card-footer {
      background: #f8f9fa;
      padding: 20px 30px;
      border-top: 1px solid #e9ecef;
      text-align: center;
      font-size: 14px;
      color: #6c757d;

      span {
        background: white;
        padding: 10px 20px;
        border-radius: 20px;
        border: 2px solid #667eea;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin: 0 5px;
      }
    }
  }
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.single-card {
  animation: fadeIn 0.6s ease-out;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .vue-features-container {
    .single-card {
      margin: 10px;

      .card-header {
        & > div:first-child {
          flex-direction: column;
          gap: 10px;
        }
      }

      .card-footer {
        span {
          display: block;
          margin: 10px 0;
          width: 100%;
        }
      }
    }
  }
}
</style>