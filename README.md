# Crypto Sentinel 🛡️

Crypto Sentinel is a client-side web application designed to help you track your cryptocurrency portfolio, view live prices, receive volatility alerts, and stay updated with crypto news and security insights. All data is managed locally in your browser, and no user authentication is required.

## ✨ Core Features

*   **🪙 Portfolio Viewer**: Manually input your cryptocurrency holdings (CoinGecko ID and quantity).
*   **💰 Live Price Fetcher**: Utilizes the CoinGecko REST API to fetch real-time cryptocurrency prices.
*   **⚠️ Volatility Alert**: Highlights coins in your portfolio with a 24-hour price change exceeding a defined threshold (e.g., ±10%).
<<<<<<< HEAD
*   **📢 Mocked gRPC News**: The "Recent News" section in the coin detail view uses a mocked gRPC service. This demonstrates the conceptual integration of gRPC for fetching news-like data without actual network calls for this specific feature.
=======
<<<<<<< HEAD
*   **📢 Mocked gRPC Demo**: The "Recent News" section in the coin detail view now uses a mocked gRPC service. This demonstrates the conceptual integration of gRPC for fetching news-like data without actual network calls for this specific feature.
>>>>>>> cdcf72b (add wireframe)
*   **🔒 Security & Info Panel**: Shows detailed coin information from CoinGecko, including market cap, CoinGecko score, and links to official resources.
*   **🔔 Notification System**: In-app alerts for successful actions (coin added/removed), volatility warnings, and critical errors. Includes an indicator and panel to view and manage notifications.
*   **📱 Mobile-Friendly UI**: Clean, responsive interface built with React and Tailwind CSS, designed to work well on both mobile and desktop devices.
<<<<<<< HEAD
*   **💾 Local Storage Persistence**: Your portfolio and notifications are saved in your browser's local storage, so your data persists between sessions.
=======
*   **💾 Local Storage Persistence**: Your portfolio is saved in your browser's local storage, so your data persists between sessions.
=======
*   **📢 Mocked gRPC News**: The "Recent News" section in the coin detail view uses a mocked gRPC service. This demonstrates the conceptual integration of gRPC for fetching news-like data without actual network calls for this specific feature.
*   **🔒 Security & Info Panel**: Shows detailed coin information from CoinGecko, including market cap, CoinGecko score, and links to official resources.
*   **🔔 Notification System**: In-app alerts for successful actions (coin added/removed), volatility warnings, and critical errors. Includes an indicator and panel to view and manage notifications.
*   **📱 Mobile-Friendly UI**: Clean, responsive interface built with React and Tailwind CSS, designed to work well on both mobile and desktop devices.
*   **💾 Local Storage Persistence**: Your portfolio and notifications are saved in your browser's local storage, so your data persists between sessions.
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)

## 🛠️ Technologies Used

*   **Frontend**:
    *   React 19 (using `createRoot`)
    *   TypeScript
    *   Tailwind CSS (via CDN)
    *   ESM Modules (direct browser import)
*   **APIs**:
    *   [CoinGecko API (REST)](https://www.coingecko.com/en/api): For cryptocurrency market data and details.
*   **API Concepts Demonstrated**:
    *   **REST API**: Practical usage with CoinGecko.
    *   **gRPC (Mocked)**: The "Recent News" section uses a mocked gRPC client-service interaction to demonstrate this API style conceptually.
*   **Icons**: SVG icons.

## 🚀 Getting Started

This application is designed to run directly in a modern web browser without a complex build process or server-side component.

### Prerequisites

*   A modern web browser that supports ES Modules (e.g., Chrome, Firefox, Safari, Edge).
*   An internet connection to fetch live data from the CoinGecko API.

### Running the Application

1.  **Clone the repository (or download the files):**
    If you have the project files, ensure `index.html`, `index.tsx`, and all other `.ts`, `.tsx` files are in the same directory structure as provided.

2.  **Open `index.html`:**
    Simply open the `index.html` file in your web browser. The application will load and run.

    *No build step or local server is strictly necessary for the current setup, as it uses ES Modules imported directly by the browser and Tailwind CSS via CDN.*

## 📊 Usage

1.  **Adding Coins to Your Portfolio:**
    *   Locate the "Add Coin to Portfolio" form.
    *   Enter the **CoinGecko ID** for the cryptocurrency you want to add (e.g., `bitcoin`, `ethereum`, `the-open-network` for Toncoin). *Do not use the symbol (e.g., BTC, ETH) directly; use the ID found on CoinGecko's website.*
    *   Enter the quantity of the coin you hold.
<<<<<<< HEAD
    *   Click "Add Coin." The coin will appear in the "My Portfolio" table. A notification will confirm the action.
=======
<<<<<<< HEAD
    *   Click "Add Coin." The coin will appear in the "My Portfolio" table.
=======
    *   Click "Add Coin." The coin will appear in the "My Portfolio" table. A notification will confirm the action.
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)

2.  **Viewing Your Portfolio:**
    *   The "My Portfolio" table displays all added coins.
    *   You'll see the coin's name, symbol, quantity, current price, total value, and 24-hour price change.
<<<<<<< HEAD
    *   **Volatility Alert**: Coins with a 24-hour price change greater than ±10% will be highlighted with a warning icon, and a notification will be generated (with a cooldown period).
=======
<<<<<<< HEAD
    *   **Volatility Alert**: Coins with a 24-hour price change greater than ±10% will be highlighted with a warning icon.
=======
    *   **Volatility Alert**: Coins with a 24-hour price change greater than ±10% will be highlighted with a warning icon, and a notification will be generated (with a cooldown period).
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)

3.  **Viewing Coin Details:**
    *   In the portfolio table, click the "View Details" (eye icon 👁️) button next to a coin.
    *   A side panel will open displaying:
        *   Detailed price information.
        *   A brief description of the coin.
        *   Security & Info Panel: Market cap, CoinGecko score, links to official website, explorers, and code repositories.
<<<<<<< HEAD
        *   Recent News (Mocked gRPC): This section displays sample news articles from the mocked gRPC service.
=======
<<<<<<< HEAD
        *   Recent News (Mocked gRPC Demo): This section displays sample news articles from the mocked gRPC service.
>>>>>>> cdcf72b (add wireframe)
    *   Click the "×" button to close the detail view.

4.  **Removing Coins:**
    *   In the portfolio table, click the "Remove Coin" (trash icon 🗑️) button next to the coin you wish to remove. A notification will confirm.

<<<<<<< HEAD
=======
5.  **Data Refresh:**
=======
        *   Recent News (Mocked gRPC): This section displays sample news articles from the mocked gRPC service.
    *   Click the "×" button to close the detail view.

4.  **Removing Coins:**
    *   In the portfolio table, click the "Remove Coin" (trash icon 🗑️) button next to the coin you wish to remove. A notification will confirm.

>>>>>>> cdcf72b (add wireframe)
5.  **Notifications:**
    *   Click the bell icon (🔔) in the header to open the notification panel.
    *   View, mark as read, dismiss individual notifications, or clear all notifications.
    *   Unread notification count is shown on the bell icon.
    *   Notifications can include actions (e.g., "View Coin" for a volatility alert).

6.  **Data Refresh:**
<<<<<<< HEAD
=======
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
    *   Market data for your portfolio automatically refreshes every 60 seconds.

## ⚙️ Key Functionalities

*   **Portfolio Management**: Add, view, and remove coins. Portfolio is saved to local storage.
*   **Live Price Tracking**: Fetches current prices and 24-hour percentage changes from CoinGecko (REST API).
<<<<<<< HEAD
*   **Volatility Alerts & Notifications**: Identifies and alerts on significant price movements.
*   **Mocked gRPC for News**: The "Recent News" feed uses a mocked gRPC service to conceptually demonstrate this API pattern.
*   **Error Handling**: Includes retries for CoinGecko API calls and user-friendly error messages (also shown as notifications).
=======
<<<<<<< HEAD
*   **gRPC Demonstration (Mocked)**: The "Recent News" feed uses a mocked gRPC service to conceptually demonstrate this API pattern.
*   **Error Handling**: Includes retries for CoinGecko API calls and user-friendly error messages for network issues or incorrect coin IDs.
=======
*   **Volatility Alerts & Notifications**: Identifies and alerts on significant price movements.
*   **Mocked gRPC for News**: The "Recent News" feed uses a mocked gRPC service to conceptually demonstrate this API pattern.
*   **Error Handling**: Includes retries for CoinGecko API calls and user-friendly error messages (also shown as notifications).
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
*   **Responsive Design**: Adapts to various screen sizes.

## 📄 Data Sources

*   **Cryptocurrency Data**: All market data, coin details, and pricing information are sourced from the [CoinGecko API](https://www.coingecko.com/en/api).
*   **Demonstrative "News" Data**: The "Recent News" feed uses a mocked gRPC service to provide sample news articles and illustrate the gRPC concept.

## 📝 Notes & Limitations

<<<<<<< HEAD
*   **API Rate Limits**: The CoinGecko API has rate limits for free usage. If you make too many requests too quickly, you might experience temporary issues. The app includes retry logic for rate limiting.
*   **CoinGecko ID**: It's crucial to use the correct CoinGecko ID for adding coins. Symbols like "BTC" will not work; you need "bitcoin". The app provides guidance on this.
*   **Client-Side Only**: All data and application state are managed in the browser. There is no backend server or database.
*   **Mocked gRPC**: The gRPC news service is currently a mock implementation and does not make real gRPC network calls. It's for demonstration purposes.
=======
<<<<<<< HEAD
*   **API Rate Limits**: The CoinGecko API has rate limits for free usage. If you make too many requests too quickly, you might experience temporary issues. The app includes basic retry logic for rate limiting.
*   **CoinGecko ID**: It's crucial to use the correct CoinGecko ID for adding coins. Symbols like "BTC" will not work; you need "bitcoin". The app provides guidance on this.
*   **Client-Side Only**: All data and application state are managed in the browser. There is no backend server or database.
=======
*   **API Rate Limits**: The CoinGecko API has rate limits for free usage. If you make too many requests too quickly, you might experience temporary issues. The app includes retry logic for rate limiting.
*   **CoinGecko ID**: It's crucial to use the correct CoinGecko ID for adding coins. Symbols like "BTC" will not work; you need "bitcoin". The app provides guidance on this.
*   **Client-Side Only**: All data and application state are managed in the browser. There is no backend server or database.
*   **Mocked gRPC**: The gRPC news service is currently a mock implementation and does not make real gRPC network calls. It's for demonstration purposes.
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
*   **Informational Purposes Only**: This application is for informational and educational purposes only and should not be considered financial advice.

## 🤝 Contributing

This is a project primarily designed to showcase frontend and API integration skills. If you have suggestions or find bugs, feel free to open an issue or propose changes if a repository context is provided.

---

<<<<<<< HEAD
Enjoy using Crypto Sentinel!
=======
<<<<<<< HEAD
Enjoy using Crypto Sentinel!
=======
Enjoy using Crypto Sentinel!
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
