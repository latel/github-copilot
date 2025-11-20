-- 创建数据库
CREATE DATABASE IF NOT EXISTS report_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE report_system;

-- 项目表
CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  isActive BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 报表表
CREATE TABLE IF NOT EXISTS reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  project_id INT NOT NULL,
  layout JSON,
  isActive BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 组件表
CREATE TABLE IF NOT EXISTS components (
  id INT PRIMARY KEY AUTO_INCREMENT,
  report_id INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  properties JSON NOT NULL,
  position JSON,
  dataSource JSON,
  zIndex INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 插入示例数据
INSERT INTO projects (name, description) VALUES 
  ('示例项目', '这是一个示例项目，用于演示系统功能'),
  ('销售报表项目', '包含各类销售数据报表');

INSERT INTO reports (name, description, project_id) VALUES 
  ('销售总览', '展示销售数据的总体情况', 1),
  ('月度分析', '按月度展示销售趋势', 1);
