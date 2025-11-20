import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Project, Report, Component } from '../types';

export const useAppStore = defineStore('app', () => {
  const currentProject = ref<Project | null>(null);
  const currentReport = ref<Report | null>(null);
  const selectedComponent = ref<Component | null>(null);
  const isEditMode = ref(false);

  function setCurrentProject(project: Project | null) {
    currentProject.value = project;
  }

  function setCurrentReport(report: Report | null) {
    currentReport.value = report;
  }

  function setSelectedComponent(component: Component | null) {
    selectedComponent.value = component;
  }

  function setEditMode(mode: boolean) {
    isEditMode.value = mode;
  }

  return {
    currentProject,
    currentReport,
    selectedComponent,
    isEditMode,
    setCurrentProject,
    setCurrentReport,
    setSelectedComponent,
    setEditMode,
  };
});
