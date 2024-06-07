# Cryptocurrency Tracking Application

A cryptocurrency tracking application that allows users to input and track their cryptocurrency holdings, compare gains or losses based on real-time prices, and manage their portfolios.

## Features

- Display a list of top 100 cryptocurrencies based on market cap.
- Cryptocurrency details including logo, name, and price in THB.
- User portfolio management with performance tracking.
- Secure user authentication (signup, login).
- Responsive UI with a design similar to kryptodian.com.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [API Documentation](#api-documentation)
4. [Testing](#testing)
5. [Technologies Used](#technologies-used)

## Installation

### Prerequisites

- Node.js
- Docker (for containerization)
- A CoinMarketCap API key

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/cryptocurrency-tracking-app.git
    cd cryptocurrency-tracking-app/backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file and add the following:

    ```env
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USER=yourusername
    DATABASE_PASSWORD=yourpassword
    DATABASE_NAME=yourdatabase
    JWT_SECRET=your_jwt_secret
    PORT=your_nestjs_port
    COINMARKETCAP_API_KEY=your_coinmarketcap_api_key
    ```

4. Run the application:

    ```bash
    npm run start
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file and add the following:

    ```env
    REACT_APP_API_BASE_URL=your_nestjs_port
    ```

4. Run the application:

    ```bash
    npm start
    ```

### Docker Setup

1. Build and run the Docker containers:

    ```bash
    docker-compose up --build
    ```

## Usage

1. **Sign Up:** Create a new account.
2. **Login:** Sign in to manage your portfolio.
3. **Add Holdings:** Input your current cryptocurrency positions.
4. **Track Performance:** View the performance of your holdings.

## API Documentation

### Authentication

- **POST /auth/signup:** Create a new user.
- **POST /auth/login:** Authenticate a user and return a JWT.

### Portfolio

- **POST /portfolio:** Add a new cryptocurrency to your portfolio.
- **GET /portfolio:** Retrieve the user's portfolio.
- **GET /portfolio/history:** Get the history of user's portfolio.

### Crypto

- **GET /crypto/top:** Retrieve the top 100 crypto currencies from market cap.

## Testing

To run unit tests for the backend, navigate to the `backend` directory and run:

```bash
npm run test
```

## Technologies Used

### Frontend

- React
- TypeScript
- Chakra UI

### Backend

- NestJS
- TypeScript
- PostgreSQL
- CoinMarketCap API (for cryptocurrency data)
- Jest (for unit testing)
