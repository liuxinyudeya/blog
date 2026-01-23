<!-- .vitepress/components/Timeline.vue -->
<template>
  <div
    class="custom-timeline"
    :class="{
      vertical: type === 'vertical',
      horizontal: type === 'horizontal',
    }"
  >
    <div v-for="(item, index) in items" :key="index" class="timeline-item">
      <div class="timeline-marker">
        <div class="marker-dot" :style="{ backgroundColor: color }"></div>
        <div v-if="item.year" class="year-label">{{ item.year }}</div>
      </div>

      <div class="timeline-content">
        <div class="timeline-header">
          <h3 class="timeline-title">
            <span v-if="item.icon" class="item-icon">{{ item.icon }}</span>
            {{ item.title }}
          </h3>
          <div v-if="item.subtitle" class="timeline-subtitle">
            {{ item.subtitle }}
          </div>
        </div>

        <div class="timeline-body">
          <ul v-if="item.points" class="timeline-points">
            <li v-for="(point, pointIndex) in item.points" :key="pointIndex">
              <span v-if="point.icon" class="point-icon">{{ point.icon }}</span>
              {{ point.text }}
            </li>
          </ul>
          <div v-else class="timeline-description">
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    default: "vertical",
    validator: (value) => ["vertical", "horizontal"].includes(value),
  },
  color: {
    type: String,
    default: "#3eaf7c", // VitePress 默认主题色
  },
});
</script>

<style scoped>
.custom-timeline {
  position: relative;
  padding: 2rem 0;
}

.custom-timeline.vertical .timeline-item {
  display: flex;
  margin-bottom: 2rem;
  position: relative;
}

.custom-timeline.vertical .timeline-item:last-child {
  margin-bottom: 0;
}

.custom-timeline.vertical .timeline-marker {
  flex-shrink: 0;
  position: relative;
  width: 100px;
  text-align: center;
}

.custom-timeline.vertical .marker-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.custom-timeline.vertical .year-label {
  margin-top: 0.5rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.custom-timeline.vertical .timeline-content {
  flex: 1;
  padding-left: 1.5rem;
  padding-top: 0.25rem;
}

.custom-timeline.vertical
  .timeline-item:not(:last-child)
  .timeline-marker::after {
  content: "";
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: calc(100% + 2rem);
  background-color: var(--vp-c-divider);
  z-index: 1;
}

.timeline-header {
  margin-bottom: 0.75rem;
}

.timeline-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.25rem 0;
}

.item-icon {
  margin-right: 0.5rem;
}

.timeline-subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}

.timeline-body {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem 1.5rem;
  border-left: 4px solid v-bind(color);
}

.timeline-points {
  margin: 0;
  padding-left: 1.5rem;
  list-style-type: none;
}

.timeline-points li {
  margin: 0.5rem 0;
  position: relative;
}

.timeline-points li::before {
  content: "•";
  color: v-bind(color);
  font-weight: bold;
  position: absolute;
  left: -1.5rem;
}

.point-icon {
  margin-right: 0.5rem;
}

/* 水平时间线样式 */
.custom-timeline.horizontal {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 3rem 0 1rem 0;
}

.custom-timeline.horizontal .timeline-item {
  flex: 1;
  text-align: center;
  position: relative;
  padding: 0 1rem;
}

.custom-timeline.horizontal .timeline-marker {
  position: relative;
  margin-bottom: 1rem;
}

.custom-timeline.horizontal .marker-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin: 0 auto 0.5rem auto;
  position: relative;
  z-index: 2;
}

.custom-timeline.horizontal::before {
  content: "";
  position: absolute;
  top: 12px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--vp-c-divider);
}
</style>
