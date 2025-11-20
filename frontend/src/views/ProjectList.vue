<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>报表项目</h2>
      <button class="btn btn-primary" @click="showCreateModal = true">
        <i class="bi bi-plus-lg"></i> 创建项目
      </button>
    </div>

    <div class="row">
      <div
        v-for="project in projects"
        :key="project.id"
        class="col-md-4 mb-4"
      >
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ project.name }}</h5>
            <p class="card-text text-muted">{{ project.description || '暂无描述' }}</p>
          </div>
          <div class="card-footer bg-transparent">
            <button
              class="btn btn-sm btn-primary me-2"
              @click="router.push(`/projects/${project.id}/reports`)"
            >
              <i class="bi bi-folder-open"></i> 查看报表
            </button>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="deleteProject(project.id!)"
            >
              <i class="bi bi-trash"></i> 删除
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Project Modal -->
    <div
      v-if="showCreateModal"
      class="modal show d-block"
      tabindex="-1"
      style="background-color: rgba(0, 0, 0, 0.5);"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">创建项目</h5>
            <button type="button" class="btn-close" @click="showCreateModal = false"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">项目名称</label>
              <input v-model="newProject.name" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">项目描述</label>
              <textarea v-model="newProject.description" class="form-control" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showCreateModal = false">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="createProject">
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
import { useRouter } from 'vue-router';
import { projectApi } from '../utils/api';
import type { Project } from '../types';

const router = useRouter();
const projects = ref<Project[]>([]);
const showCreateModal = ref(false);
const newProject = ref<Partial<Project>>({
  name: '',
  description: '',
});

async function loadProjects() {
  try {
    const response = await projectApi.list();
    projects.value = response.data;
  } catch (error) {
    console.error('Failed to load projects:', error);
  }
}

async function createProject() {
  try {
    await projectApi.create(newProject.value);
    showCreateModal.value = false;
    newProject.value = { name: '', description: '' };
    await loadProjects();
  } catch (error) {
    console.error('Failed to create project:', error);
  }
}

async function deleteProject(id: number) {
  if (!confirm('确定要删除这个项目吗？')) return;
  
  try {
    await projectApi.delete(id);
    await loadProjects();
  } catch (error) {
    console.error('Failed to delete project:', error);
  }
}

onMounted(() => {
  loadProjects();
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
