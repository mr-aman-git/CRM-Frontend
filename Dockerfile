# Build Stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage (Nginx use karenge static files ke liye)
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Agar aapka build 'build' folder mein banta hai toh '/app/build' karein
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]