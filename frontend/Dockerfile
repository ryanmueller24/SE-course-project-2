# This Dockerfile is for building the frontend application using Nginx.
# It uses the official Nginx Alpine image for a lightweight container.
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets from frontend to nginx
COPY ./frontend/public /usr/share/nginx/html

# Copy custom nginx config to handle SPA routing
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

