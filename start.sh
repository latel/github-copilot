#!/bin/bash

echo "=========================================="
echo "可视化报表系统启动脚本"
echo "=========================================="
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: Node.js 未安装"
    echo "请先安装 Node.js (https://nodejs.org/)"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"

# 检查 MySQL
if ! command -v mysql &> /dev/null; then
    echo "⚠️  警告: MySQL 未找到，请确保 MySQL 服务正在运行"
fi

echo ""
echo "正在启动服务..."
echo ""

# 启动后端
echo "📦 启动后端服务..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "正在安装后端依赖..."
    npm install
fi

if [ ! -f ".env" ]; then
    echo "⚠️  警告: .env 文件不存在，请从 .env.example 复制并配置"
    cp .env.example .env
fi

npm run dev &
BACKEND_PID=$!
cd ..

echo "✅ 后端服务已启动 (PID: $BACKEND_PID)"
echo "   访问地址: http://localhost:7001"
echo ""

# 等待后端启动
sleep 3

# 启动前端
echo "🎨 启动前端服务..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "正在安装前端依赖..."
    npm install
fi

npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ 前端服务已启动 (PID: $FRONTEND_PID)"
echo "   访问地址: http://localhost:3000"
echo ""
echo "=========================================="
echo "🎉 服务启动完成！"
echo "=========================================="
echo ""
echo "访问 http://localhost:3000 开始使用"
echo ""
echo "按 Ctrl+C 停止所有服务"
echo ""

# 等待用户中断
trap "echo ''; echo '正在停止服务...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo '✅ 所有服务已停止'; exit 0" INT

wait
