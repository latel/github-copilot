# 安装和配置指南

## 系统要求

### 必需软件
- **Node.js**: 16.x 或更高版本
- **MySQL**: 5.7 或更高版本
- **npm**: 8.x 或更高版本（随 Node.js 安装）

### 推荐工具
- Visual Studio Code（推荐的代码编辑器）
- MySQL Workbench（数据库管理工具）
- Postman（API 测试工具）

## 详细安装步骤

### 1. 克隆项目

```bash
git clone <repository-url>
cd github-copilot
```

### 2. 数据库配置

#### 2.1 启动 MySQL 服务

```bash
# Linux/Mac
sudo systemctl start mysql
# 或
sudo service mysql start

# Windows: 通过服务管理器启动 MySQL 服务
```

#### 2.2 创建数据库

方法一：使用 MySQL 命令行

```bash
mysql -u root -p < database.sql
```

方法二：手动创建

```bash
mysql -u root -p
```

然后执行：

```sql
CREATE DATABASE report_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. 后端配置

#### 3.1 安装依赖

```bash
cd backend
npm install
```

#### 3.2 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=report_system
```

**注意**: 请将 `your_password` 替换为您的 MySQL 密码

#### 3.3 启动后端服务

开发模式：

```bash
npm run dev
```

生产模式：

```bash
npm run build
npm start
```

后端服务将在 `http://localhost:7001` 启动

### 4. 前端配置

#### 4.1 安装依赖

```bash
cd ../frontend
npm install
```

#### 4.2 启动前端服务

开发模式：

```bash
npm run dev
```

生产模式：

```bash
npm run build
npm run preview
```

前端应用将在 `http://localhost:3000` 启动

## 验证安装

### 1. 检查后端服务

访问 `http://localhost:7001/api/projects`，应该返回空数组 `[]` 或项目列表

### 2. 检查前端应用

访问 `http://localhost:3000`，应该看到项目列表页面

### 3. 创建测试数据

1. 在前端点击"创建项目"
2. 输入项目名称和描述
3. 创建成功后应该在列表中看到新项目

## 常见问题

### 1. 数据库连接失败

**问题**: `connect ECONNREFUSED 127.0.0.1:3306`

**解决方案**:
- 检查 MySQL 服务是否运行
- 验证 `.env` 文件中的数据库配置
- 确认 MySQL 端口是否为 3306

### 2. TypeORM 同步表失败

**问题**: 表结构没有自动创建

**解决方案**:
- 确保数据库已创建
- 检查 `config.default.ts` 中 `synchronize` 设置为 `true`
- 手动运行 `database.sql` 创建表结构

### 3. 前端无法连接后端

**问题**: API 请求返回 404 或连接超时

**解决方案**:
- 确保后端服务正在运行
- 检查前端 `vite.config.ts` 中的代理配置
- 确认后端端口为 7001

### 4. npm 安装依赖失败

**问题**: 网络超时或依赖安装错误

**解决方案**:
```bash
# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com
# 清除缓存
npm cache clean --force
# 重新安装
npm install
```

### 5. 编译错误

**问题**: TypeScript 编译错误

**解决方案**:
- 确保 Node.js 版本符合要求（16+）
- 删除 `node_modules` 和 `package-lock.json`
- 重新安装依赖

## 生产环境部署

### 1. 构建前端

```bash
cd frontend
npm run build
```

构建产物在 `frontend/dist` 目录

### 2. 构建后端

```bash
cd backend
npm run build
```

构建产物在 `backend/dist` 目录

### 3. 配置反向代理

推荐使用 Nginx 作为反向代理：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件
    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # 后端 API
    location /api {
        proxy_pass http://localhost:7001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 4. 使用 PM2 管理进程

```bash
# 安装 PM2
npm install -g pm2

# 启动后端
cd backend
pm2 start dist/bootstrap.js --name report-backend

# 查看状态
pm2 status

# 设置开机自启
pm2 startup
pm2 save
```

## 开发建议

### 代码风格

项目使用 TypeScript，建议：
- 使用类型注解
- 避免使用 `any` 类型
- 遵循项目现有代码风格

### 调试技巧

**后端调试**:
```bash
# 使用 VS Code 调试
# 在 .vscode/launch.json 中配置调试器
```

**前端调试**:
- 使用浏览器开发者工具
- Vue DevTools 扩展

### Git 工作流

```bash
# 创建功能分支
git checkout -b feature/your-feature

# 提交更改
git add .
git commit -m "描述你的更改"

# 推送到远程
git push origin feature/your-feature
```

## 获取帮助

如果遇到问题：
1. 查看本文档的常见问题部分
2. 查看项目 Issues
3. 提交新的 Issue

## 贡献指南

欢迎提交 Pull Request！请确保：
1. 代码通过 lint 检查
2. 添加必要的测试
3. 更新相关文档
4. 提供清晰的提交信息
