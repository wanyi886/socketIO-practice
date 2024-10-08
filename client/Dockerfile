FROM node:16-alpine
WORKDIR /socketIO-practice
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 2108
CMD ["npm", "start"]