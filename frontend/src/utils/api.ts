import axios from 'axios';
import type { Project, Report, Component } from '../types';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Projects
export const projectApi = {
  list: () => api.get<Project[]>('/projects'),
  get: (id: number) => api.get<Project>(`/projects/${id}`),
  create: (data: Partial<Project>) => api.post<Project>('/projects', data),
  update: (id: number, data: Partial<Project>) => api.put<Project>(`/projects/${id}`, data),
  delete: (id: number) => api.delete(`/projects/${id}`),
};

// Reports
export const reportApi = {
  list: (projectId: number) => api.get<Report[]>('/reports', { params: { projectId } }),
  get: (id: number) => api.get<Report>(`/reports/${id}`),
  create: (data: Partial<Report>) => api.post<Report>('/reports', data),
  update: (id: number, data: Partial<Report>) => api.put<Report>(`/reports/${id}`, data),
  delete: (id: number) => api.delete(`/reports/${id}`),
};

// Components
export const componentApi = {
  list: (reportId: number) => api.get<Component[]>('/components', { params: { reportId } }),
  get: (id: number) => api.get<Component>(`/components/${id}`),
  create: (data: Partial<Component>) => api.post<Component>('/components', data),
  update: (id: number, data: Partial<Component>) => api.put<Component>(`/components/${id}`, data),
  batchUpdate: (components: Partial<Component>[]) => api.post('/components/batch', { components }),
  delete: (id: number) => api.delete(`/components/${id}`),
};
