FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Rebuild bcrypt
RUN npm rebuild bcrypt

COPY . .

EXPOSE ${PORT}

CMD ["node", "dist/main"]