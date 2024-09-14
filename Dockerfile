# Build the React app using Node
FROM node:22-alpine as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the source code and build the React app
COPY . .
RUN yarn build

# Stage 2: Nginx for serving the React app
FROM nginx:alpine

# Copy the built React app from the 'build' step
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration if needed
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
