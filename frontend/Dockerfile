# Stage 1: Build the React application
FROM node:16 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

RUN npm run build

# Stage 2: Serve the React application
FROM node:16

WORKDIR /app

COPY --from=build /app/build /app

EXPOSE 3000

CMD ["npx", "serve", "-s", "."]
