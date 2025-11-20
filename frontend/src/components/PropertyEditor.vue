<template>
  <div class="property-editor">
    <div class="card">
      <div class="card-header">
        <h6 class="mb-0">属性编辑器</h6>
      </div>
      <div class="card-body">
        <div v-if="!component">
          <p class="text-muted">请选择一个组件</p>
        </div>
        <div v-else>
          <div class="mb-3">
            <label class="form-label">组件类型</label>
            <input type="text" class="form-control" :value="componentSchema?.label" readonly />
          </div>
          
          <div v-for="(prop, key) in schema.properties" :key="key" class="mb-3">
            <label class="form-label">{{ prop.title }}</label>
            
            <input
              v-if="prop.type === 'string' && !prop.enum && prop.format !== 'color'"
              type="text"
              class="form-control"
              :value="component.properties[key]"
              @input="updateProperty(key, ($event.target as HTMLInputElement).value)"
            />
            
            <input
              v-else-if="prop.type === 'string' && prop.format === 'color'"
              type="color"
              class="form-control form-control-color"
              :value="component.properties[key]"
              @input="updateProperty(key, ($event.target as HTMLInputElement).value)"
            />
            
            <input
              v-else-if="prop.type === 'number'"
              type="number"
              class="form-control"
              :value="component.properties[key]"
              :min="prop.minimum"
              :max="prop.maximum"
              @input="updateProperty(key, Number(($event.target as HTMLInputElement).value))"
            />
            
            <select
              v-else-if="prop.enum"
              class="form-select"
              :value="component.properties[key]"
              @change="updateProperty(key, ($event.target as HTMLSelectElement).value)"
            >
              <option v-for="option in prop.enum" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            
            <div v-else-if="prop.type === 'boolean'" class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                :checked="component.properties[key]"
                @change="updateProperty(key, ($event.target as HTMLInputElement).checked)"
              />
            </div>
            
            <textarea
              v-else-if="prop.type === 'array' || prop.type === 'object'"
              class="form-control"
              rows="4"
              :value="JSON.stringify(component.properties[key], null, 2)"
              @input="updateArrayProperty(key, ($event.target as HTMLTextAreaElement).value)"
            ></textarea>
          </div>

          <div class="mb-3">
            <h6>位置和大小</h6>
            <div class="row g-2">
              <div class="col-6">
                <label class="form-label">X</label>
                <input
                  type="number"
                  class="form-control"
                  :value="component.position.x"
                  @input="updatePosition('x', Number(($event.target as HTMLInputElement).value))"
                />
              </div>
              <div class="col-6">
                <label class="form-label">Y</label>
                <input
                  type="number"
                  class="form-control"
                  :value="component.position.y"
                  @input="updatePosition('y', Number(($event.target as HTMLInputElement).value))"
                />
              </div>
              <div class="col-6">
                <label class="form-label">宽度</label>
                <input
                  type="number"
                  class="form-control"
                  :value="component.position.width"
                  @input="updatePosition('width', Number(($event.target as HTMLInputElement).value))"
                />
              </div>
              <div class="col-6">
                <label class="form-label">高度</label>
                <input
                  type="number"
                  class="form-control"
                  :value="component.position.height"
                  @input="updatePosition('height', Number(($event.target as HTMLInputElement).value))"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import type { Component } from '../types';
import { getComponentSchema } from '../utils/componentSchemas';

const props = defineProps<{
  component: Component | null;
}>();

const emit = defineEmits<{
  update: [component: Component];
}>();

const componentSchema = computed(() => {
  if (!props.component) return null;
  return getComponentSchema(props.component.type);
});

const schema = computed(() => {
  return componentSchema.value?.schema || { properties: {} };
});

function updateProperty(key: string, value: any) {
  if (!props.component) return;
  
  const updated = {
    ...props.component,
    properties: {
      ...props.component.properties,
      [key]: value,
    },
  };
  
  emit('update', updated);
}

function updateArrayProperty(key: string, value: string) {
  try {
    const parsed = JSON.parse(value);
    updateProperty(key, parsed);
  } catch (e) {
    // Invalid JSON, ignore
  }
}

function updatePosition(key: string, value: number) {
  if (!props.component) return;
  
  const updated = {
    ...props.component,
    position: {
      ...props.component.position,
      [key]: value,
    },
  };
  
  emit('update', updated);
}
</script>

<style scoped>
.property-editor {
  height: 100%;
  overflow-y: auto;
}
</style>
