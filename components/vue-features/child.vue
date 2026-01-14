<template>
  <div class="product-card-container">
    <!-- 默认插槽 -->
    <slot>
      <div class="row">
        <span v-for="(tag, index) in tags" :key="index" class="tag">
          {{ tag }}
        </span>

        <button @click="decrementCount">-1</button>

        <span class="count">{{ count }}</span>

        <button @click="incrementCount">+1</button>

        <div :class="countClass">
          <span v-if="count < 0">负数</span>
          <span v-else-if="count === 0">为零</span>
          <span v-else>正数</span>
        </div>
        <span class="show" v-show="count > 0">v-show</span>
      </div>
    </slot>

    <div class="footer">
      <!-- 具名插槽 -->
      <slot name="footer" :tags="tags"></slot>
      <button @click="sendMessage">向父组件发送消息</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  tags: {
    type: Array,
    default: () => ["新品", "热销"],
  },
});

const emit = defineEmits(["send-message", "count-change"]);

const count = ref(0);

const countClass = computed(() => {
  return count.value < 0
    ? "negative"
    : count.value === 0
    ? "positive-odd"
    : "positive-even";
});

const incrementCount = () => {
  count.value += 1;
  emit("count-change", { newVal: count.value, oldVal: count.value - 1 });
};

const decrementCount = () => {
  count.value -= 1;
  emit("count-change", { newVal: count.value, oldVal: count.value + 1 });
};

const sendMessage = () => {
  emit("send-message", count.value);
};
</script>

<style lang="scss" scoped>
.product-card-container {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  border: 2px solid #e9ecef;

  .row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 25px;
    flex-wrap: wrap;

    &:last-child {
      margin-bottom: 0;
    }

    .tag {
      background: #667eea;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      transition: background-color 0.3s;

      &:hover {
        background: #764ba2;
      }
    }

    button {
      background: #667eea;
      color: white;
      border: none;
      min-width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: #764ba2;
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.95);
      }
    }

    .count {
      font-size: 24px;
      font-weight: bold;
      min-width: 60px;
      text-align: center;
      color: black;
    }

    & > div {
      margin-left: 20px;
      padding: 10px 20px;
      border-radius: 10px;
      background: rgba(102, 126, 234, 0.1);
      font-weight: bold;
    }

    .show {
      flex: 1;
      text-align: center;
      color: black;
      font-weight: bold;
      font-size: 18px;
    }
  }

  .footer {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 2px dashed #dee2e6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 25px;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
      }
    }
  }
}

/* 状态颜色 */
.positive-even {
  color: #10b981 !important;
}

.positive-odd {
  color: #f59e0b !important;
}

.negative {
  color: #667eea !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .product-card-container {
    .row {
      flex-direction: column;
      align-items: flex-start;

      & > div {
        margin-left: 0;
        margin-top: 10px;
      }
    }

    .footer {
      flex-direction: column;
      gap: 15px;
      text-align: center;

      button {
        width: 100%;
      }
    }
  }
}
</style>