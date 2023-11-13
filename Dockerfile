FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN adduser --disabled-password myuser
USER myuser

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
