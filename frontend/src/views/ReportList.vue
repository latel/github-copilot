<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <button class="btn btn-outline-secondary me-3" @click="router.push('/')">
          <i class="bi bi-arrow-left"></i> 返回项目列表
        </button>
        <h2 class="d-inline">{{ project?.name }} - 报表列表</h2>
      </div>
      <button class="btn btn-primary" @click="showCreateModal = true">
        <i class="bi bi-plus-lg"></i> 创建报表
      </button>
    </div>

    <div class="row">
      <div
        v-for="report in reports"
        :key="report.id"
        class="col-md-4 mb-4"
      >
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ report.name }}</h5>
            <p class="card-text text-muted">{{ report.description || '暂无描述' }}</p>
          </div>
          <div class="card-footer bg-transparent">
            <button
              class="btn btn-sm btn-primary me-2"
              @click="router.push(`/reports/${report.id}/edit`)"
            >
              <i class="bi bi-pencil"></i> 编辑
            </button>
            <button
              class="btn btn-sm btn-outline-primary me-2"
              @click="router.push(`/reports/${report.id}/view`)"
            >
              <i class="bi bi-eye"></i> 查看
            </button>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="deleteReport(report.id!)"
            >
              <i class="bi bi-trash"></i> 删除
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Report Modal -->
    <div
      v-if="showCreateModal"
      class="modal show d-block"
      tabindex="-1"
      style="background-color: rgba(0, 0, 0, 0.5);"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">创建报表</h5>
            <button type="button" class="btn-close" @click="showCreateModal = false"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">报表名称</label>
              <input v-model="newReport.name" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">报表描述</label>
              <textarea v-model="newReport.description" class="form-control" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showCreateModal = false">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="createReport">
              创建
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { projectApi, reportApi } from '../utils/api';
import type { Project, Report } from '../types';

const router = useRouter();
const route = useRoute();
const projectId = Number(route.params.projectId);

const project = ref<Project | null>(null);
const reports = ref<Report[]>([]);
const showCreateModal = ref(false);
const newReport = ref<Partial<Report>>({
  name: '',
  description: '',
  projectId,
});

async function loadProject() {
  try {
    const response = await projectApi.get(projectId);
    project.value = response.data;
  } catch (error) {
    console.error('Failed to load project:', error);
  }
}

async function loadReports() {
  try {
    const response = await reportApi.list(projectId);
    reports.value = response.data;
  } catch (error) {
    console.error('Failed to load reports:', error);
  }
}

async function createReport() {
  try {
    await reportApi.create(newReport.value);
    showCreateModal.value = false;
    newReport.value = { name: '', description: '', projectId };
    await loadReports();
  } catch (error) {
    console.error('Failed to create report:', error);
  }
}

async function deleteReport(id: number) {
  if (!confirm('确定要删除这个报表吗？')) return;
  
  try {
    await reportApi.delete(id);
    await loadReports();
  } catch (error) {
    console.error('Failed to delete report:', error);
  }
}

onMounted(() => {
  loadProject();
  loadReports();
});
</script>

<style scoped>
.card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
