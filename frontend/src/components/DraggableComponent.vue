<template>
  <div
    class="draggable-component"
    :class="{ selected: isSelected }"
    :style="componentStyle"
    @mousedown="handleMouseDown"
  >
    <component
      :is="componentMap[component.type]"
      :type="component.type"
      :properties="component.properties"
    />
    <div v-if="isEditMode && isSelected" class="resize-handles">
      <div class="resize-handle resize-se" @mousedown.stop="handleResize($event, 'se')"></div>
      <div class="resize-handle resize-sw" @mousedown.stop="handleResize($event, 'sw')"></div>
      <div class="resize-handle resize-ne" @mousedown.stop="handleResize($event, 'ne')"></div>
      <div class="resize-handle resize-nw" @mousedown.stop="handleResize($event, 'nw')"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import TextComponent from './TextComponent.vue';
import ChartComponent from './ChartComponent.vue';
import type { Component } from '../types';

const props = defineProps<{
  component: Component;
  isEditMode: boolean;
  isSelected: boolean;
}>();

const emit = defineEmits<{
  select: [];
  update: [position: { x: number; y: number; width: number; height: number }];
}>();

const componentMap: Record<string, any> = {
  text: TextComponent,
  'chart-bar': ChartComponent,
  'chart-line': ChartComponent,
  'chart-pie': ChartComponent,
};

const componentStyle = computed(() => ({
  position: 'absolute' as const,
  left: `${props.component.position.x}px`,
  top: `${props.component.position.y}px`,
  width: `${props.component.position.width}px`,
  height: `${props.component.position.height}px`,
  zIndex: props.component.zIndex,
}));

function handleMouseDown(e: MouseEvent) {
  if (!props.isEditMode) return;
  
  emit('select');
  
  const startX = e.clientX;
  const startY = e.clientY;
  const startLeft = props.component.position.x;
  const startTop = props.component.position.y;

  const handleMouseMove = (e: MouseEvent) => {
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    emit('update', {
      x: startLeft + deltaX,
      y: startTop + deltaY,
      width: props.component.position.width,
      height: props.component.position.height,
    });
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
}

function handleResize(e: MouseEvent, direction: string) {
  e.preventDefault();
  
  const startX = e.clientX;
  const startY = e.clientY;
  const startLeft = props.component.position.x;
  const startTop = props.component.position.y;
  const startWidth = props.component.position.width;
  const startHeight = props.component.position.height;

  const handleMouseMove = (e: MouseEvent) => {
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    let newX = startLeft;
    let newY = startTop;
    let newWidth = startWidth;
    let newHeight = startHeight;

    if (direction.includes('e')) {
      newWidth = startWidth + deltaX;
    }
    if (direction.includes('w')) {
      newWidth = startWidth - deltaX;
      newX = startLeft + deltaX;
    }
    if (direction.includes('s')) {
      newHeight = startHeight + deltaY;
    }
    if (direction.includes('n')) {
      newHeight = startHeight - deltaY;
      newY = startTop + deltaY;
    }

    newWidth = Math.max(50, newWidth);
    newHeight = Math.max(50, newHeight);

    emit('update', {
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight,
    });
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
}
</script>

<style scoped>
.draggable-component {
  cursor: move;
  border: 1px solid transparent;
  transition: border-color 0.2s;
}

.draggable-component.selected {
  border: 2px solid #0d6efd;
  box-shadow: 0 0 10px rgba(13, 110, 253, 0.3);
}

.resize-handles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.resize-handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #0d6efd;
  border: 1px solid white;
  pointer-events: all;
}

.resize-se {
  right: -5px;
  bottom: -5px;
  cursor: se-resize;
}

.resize-sw {
  left: -5px;
  bottom: -5px;
  cursor: sw-resize;
}

.resize-ne {
  right: -5px;
  top: -5px;
  cursor: ne-resize;
}

.resize-nw {
  left: -5px;
  top: -5px;
  cursor: nw-resize;
}
</style>
