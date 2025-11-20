<template>
  <div class="report-view">
    <div class="view-header">
      <div class="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
        <div>
          <button class="btn btn-outline-secondary me-3" @click="goBack">
            <i class="bi bi-arrow-left"></i> 返回
          </button>
          <h5 class="d-inline mb-0">{{ report?.name }}</h5>
        </div>
        <div>
          <button class="btn btn-primary" @click="refreshData">
            <i class="bi bi-arrow-clockwise"></i> 刷新
          </button>
        </div>
      </div>
    </div>

    <div class="view-body">
      <div class="view-canvas">
        <div class="canvas-container">
          <DraggableComponent
            v-for="component in components"
            :key="component.id"
            :component="component"
            :is-edit-mode="false"
            :is-selected="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { reportApi, componentApi } from '../utils/api';
import DraggableComponent from '../components/DraggableComponent.vue';
import type { Report, Component } from '../types';

const router = useRouter();
const route = useRoute();
const reportId = Number(route.params.reportId);

const report = ref<Report | null>(null);
const components = ref<Component[]>([]);

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

function refreshData() {
  loadComponents();
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
.report-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f8f9fa;
}

.view-header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.view-body {
  flex: 1;
  overflow: auto;
  padding: 20px;
}

.canvas-container {
  position: relative;
  min-height: 1000px;
  min-width: 1200px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
