<template>
  <div class="report-editor">
    <div class="editor-header">
      <div class="d-flex justify-content-between align-items-center p-3 border-bottom">
        <div>
          <button class="btn btn-outline-secondary me-3" @click="goBack">
            <i class="bi bi-arrow-left"></i> 返回
          </button>
          <h5 class="d-inline mb-0">{{ report?.name }}</h5>
        </div>
        <div>
          <button class="btn btn-success" @click="saveReport">
            <i class="bi bi-save"></i> 保存
          </button>
        </div>
      </div>
    </div>

    <div class="editor-body">
      <div class="editor-sidebar left">
        <ComponentPalette />
      </div>

      <div
        class="editor-canvas"
        @drop="handleDrop"
        @dragover.prevent
        @click="deselectComponent"
      >
        <div class="canvas-container">
          <DraggableComponent
            v-for="component in components"
            :key="component.id"
            :component="component"
            :is-edit-mode="true"
            :is-selected="selectedComponent?.id === component.id"
            @select="selectComponent(component)"
            @update="updateComponentPosition(component.id!, $event)"
          />
        </div>
      </div>

      <div class="editor-sidebar right">
        <PropertyEditor
          :component="selectedComponent"
          @update="updateComponentProperties"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { reportApi, componentApi } from '../utils/api';
import { getComponentSchema } from '../utils/componentSchemas';
import ComponentPalette from '../components/ComponentPalette.vue';
import DraggableComponent from '../components/DraggableComponent.vue';
import PropertyEditor from '../components/PropertyEditor.vue';
import type { Report, Component } from '../types';

const router = useRouter();
const route = useRoute();
const reportId = Number(route.params.reportId);

const report = ref<Report | null>(null);
const components = ref<Component[]>([]);
const selectedComponent = ref<Component | null>(null);

async function loadReport() {
  try {
    const response = await reportApi.get(reportId);
    report.value = response.data;
  } catch (error) {
    console.error('Failed to load report:', error);
  }
}

async function loadComponents() {
  try {
    const response = await componentApi.list(reportId);
    components.value = response.data;
  } catch (error) {
    console.error('Failed to load components:', error);
  }
}

function selectComponent(component: Component) {
  selectedComponent.value = component;
}

function deselectComponent(event: MouseEvent) {
  if ((event.target as HTMLElement).classList.contains('canvas-container')) {
    selectedComponent.value = null;
  }
}

async function handleDrop(event: DragEvent) {
  event.preventDefault();
  
  const componentType = event.dataTransfer?.getData('component-type');
  if (!componentType) return;

  const schema = getComponentSchema(componentType);
  if (!schema) return;

  const canvas = (event.currentTarget as HTMLElement).querySelector('.canvas-container');
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const newComponent: Partial<Component> = {
    reportId,
    type: componentType,
    properties: { ...schema.defaultProps },
    position: {
      x: Math.max(0, x - 100),
      y: Math.max(0, y - 50),
      width: 300,
      height: 200,
    },
    zIndex: components.value.length,
  };

  try {
    const response = await componentApi.create(newComponent);
    components.value.push(response.data);
  } catch (error) {
    console.error('Failed to create component:', error);
  }
}

async function updateComponentPosition(id: number, position: any) {
  const index = components.value.findIndex(c => c.id === id);
  if (index === -1) return;

  components.value[index] = {
    ...components.value[index],
    position,
  };

  try {
    await componentApi.update(id, { position });
  } catch (error) {
    console.error('Failed to update component position:', error);
  }
}

async function updateComponentProperties(component: Component) {
  const index = components.value.findIndex(c => c.id === component.id);
  if (index === -1) return;

  components.value[index] = component;
  selectedComponent.value = component;

  try {
    await componentApi.update(component.id!, {
      properties: component.properties,
      position: component.position,
    });
  } catch (error) {
    console.error('Failed to update component:', error);
  }
}

async function saveReport() {
  alert('报表已保存！');
}

function goBack() {
  if (report.value) {
    router.push(`/projects/${report.value.projectId}/reports`);
  } else {
    router.push('/');
  }
}

onMounted(() => {
  loadReport();
  loadComponents();
});
</script>

<style scoped>
.report-editor {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.editor-header {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.editor-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.editor-sidebar {
  width: 280px;
  background: white;
  border-right: 1px solid #dee2e6;
  overflow-y: auto;
}

.editor-sidebar.right {
  border-right: none;
  border-left: 1px solid #dee2e6;
}

.editor-canvas {
  flex: 1;
  background: #f8f9fa;
  overflow: auto;
  padding: 20px;
}

.canvas-container {
  position: relative;
  min-height: 1000px;
  min-width: 1200px;
  background: white;
  border: 1px dashed #dee2e6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
