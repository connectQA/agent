# Dummy Dockerfile structure for later development

FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3200
CMD ["npm","start"]