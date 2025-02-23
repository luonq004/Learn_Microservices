# Sử dụng Alpine nhưng đảm bảo có đủ dependencies
FROM node:18-alpine3.17

WORKDIR /app

# Copy package.json và package-lock.json để tận dụng Docker cache
COPY package.json .

# Cài đặt dependencies
RUN npm install 

# Copy toàn bộ code
COPY . .

# Chạy ứng dụng Next.js
CMD ["npm", "run", "dev"]
