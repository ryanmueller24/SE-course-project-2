# - It works with the backend folder, which contains the Node.js application code.
# - It uses the official Node.js 18 Alpine image for a lightweight container.

FROM node:18-alpine

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies 
# allows you to not run this command on your local machine
RUN npm install

# Copy the rest of the application code to the working directory
COPY ./backend ./backend

# sets 3000 as the port for the application for backend
EXPOSE 3000


# using CMD to run the application when the container starts
CMD ["node", "backend/src/index.js"]