# Personal Expense Tracker

A modern web application for tracking personal expenses and income, built with Next.js 13, MongoDB, and Tailwind CSS.

## Features

- 💰 Track expenses and income
- 📊 Visualize monthly spending with charts
- 🏷️ Categorize transactions
- 🌓 Dark/Light mode support
- 📱 Responsive design

## Tech Stack

- **Frontend:** Next.js 13 (App Router), React, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Forms:** React Hook Form
- **HTTP Client:** Axios

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-expense-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory and add:
```env
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features in Detail

### Transaction Management
- Add, edit, and delete transactions
- Categorize transactions
- Sort transactions by date, amount, or category
- Filter transactions by category

### Category Management
- Create and manage expense/income categories
- Organize transactions by category
- Edit or delete categories

### Data Visualization
- Monthly expense chart
- Visual breakdown of spending
- Track spending patterns

### User Interface
- Clean, modern design
- Responsive layout
- Dark/Light mode toggle
- Intuitive navigation

## Project Structure

- `/app` - Next.js pages and API routes
- `/components` - React components
- `/lib` - Utility functions and database connection
- `/models` - MongoDB schemas
- `/public` - Static assets




