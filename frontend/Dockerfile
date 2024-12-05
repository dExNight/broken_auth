FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y curl

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]