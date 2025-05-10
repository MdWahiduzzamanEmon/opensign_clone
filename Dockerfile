# Stage 1: Build the application
FROM node:lts-alpine AS build-stage

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -f --production

RUN npm i vite -f

# Copy the application files
COPY . .

# RUN export NODE_OPTIONS=--max_old_space_size=16384

# Build the application
RUN npm run build

EXPOSE 3000
#  //for the main production

CMD [ "npm", "run", "preview" ]

