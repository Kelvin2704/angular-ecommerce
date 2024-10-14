# **Angular eCommerce Platform**

This project is a fully-featured eCommerce web application built with Angular. The platform provides users with seamless browsing, shopping, and checkout experiences, while administrators can manage products and orders. Below is an overview of the key functionalities, features, and technologies implemented.

---

## **Features**

### 1. **Product Listing & Detail Page**
   - Responsive product cards displaying product information such as images, titles, prices, and "Add to Cart" buttons.
   - Dynamic product list component fetching data from a backend API, with pagination and loading/error handling.
   - Detailed product view pages showing comprehensive information, including product images, descriptions, pricing, and variations.

### 2. **User Authentication**
   - **SignIn / SignOut**: JWT-based authentication with secure login and logout processes.
   - **Session Persistence**: Utilized local storage to maintain user sessions across page reloads and browser sessions.
   - **Route Protection**: Guards were implemented to restrict access to specific pages for authenticated users only.

### 3. **Shopping Cart**
   - Cart management allowing users to adjust product quantities, remove items, and view cart summaries.
   - Dynamic price updates for individual items and the total cart, with support for multi-item purchases.
   - Persistent cart data stored in local storage to allow users to resume shopping later.

### 4. **Checkout Process**
   - Multi-step checkout form that captures shipping and payment information with validation at each step.
   - A dynamic horizontal progress bar to visually indicate the current stage of checkout (Cart > Checkout > Orders).
   - Secure order submission to the backend with complete product and shipping details.

### 5. **Order Summary & Confirmation**
   - Order confirmation page showing the purchased products, quantities, and total amounts.
   - Display of past orders with details of each product, including order date and number.

### 6. **UI Enhancements**
   - **Breadcrumb Navigation**: Implemented a reusable breadcrumb component to guide users through the site (Home > Category > Product).
   - **Progress Steps**: Developed a horizontal progress tracker for the checkout flow, dynamically updated based on user interaction.
   - **Custom Toasts**: Integrated ngx-toastr for real-time feedback on actions like product additions, successful logins, and completed orders.

### 7. **State Management (NgRx)**
   - Managed global cart state, including product lists and prices, using NgRx.
   - User authentication state management, ensuring smooth session persistence and redirection.

### 8. **Error Handling**
   - 404 error handling with a dedicated error page for non-existing products or categories.
   - Redirects for handling unauthorized access to protected routes, like the cart and checkout.

---

## **Technologies Used**
- **Angular**: Core framework for building UI components and client-side functionality.
- **NgRx**: State management for cart and authentication handling.
- **RxJS**: Reactive programming for managing asynchronous data streams.
- **ngx-toastr**: Real-time notifications for user interactions.
- **LocalStorage**: For session and cart persistence across page reloads.
- **SCSS/CSS**: Responsive design for product cards, forms, and layout.
- **API Integration**: Consumed backend APIs for product, authentication, and order management.

---

## **Getting Started**

### 1. **Install Dependencies**
   ```bash
   npm install
