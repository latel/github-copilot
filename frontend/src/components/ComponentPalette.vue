<template>
  <div class="component-palette">
    <div class="card">
      <div class="card-header">
        <h6 class="mb-0">组件库</h6>
      </div>
      <div class="card-body">
        <div class="component-list">
          <div
            v-for="schema in schemas"
            :key="schema.type"
            class="component-item"
            draggable="true"
            @dragstart="handleDragStart($event, schema)"
          >
            <i :class="`bi ${schema.icon}`"></i>
            <span>{{ schema.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { componentSchemas } from '../utils/componentSchemas';
import type { ComponentSchema } from '../types';

defineProps<{
  schemas?: ComponentSchema[];
}>();

const emit = defineEmits<{
  dragStart: [schema: ComponentSchema];
}>();

const schemas = componentSchemas;

function handleDragStart(event: DragEvent, schema: ComponentSchema) {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.setData('component-type', schema.type);
  }
  emit('dragStart', schema);
}
</script>

<style scoped>
.component-palette {
  height: 100%;
}

.component-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.component-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: grab;
  transition: all 0.2s;
}

.component-item:hover {
  background-color: #f8f9fa;
  border-color: #0d6efd;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.component-item:active {
  cursor: grabbing;
}

.component-item i {
  font-size: 20px;
  color: #0d6efd;
}

.component-item span {
  font-size: 14px;
}
</style>
