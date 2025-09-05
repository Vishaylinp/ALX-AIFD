# 🗳️ ALX Poll App

Welcome to the ALX Poll App! This project is a modern, full-stack polling application built with Next.js and Supabase. It allows users to create, view, and vote on polls, providing a seamless and interactive experience. Our goal is to demonstrate a robust application structure, secure authentication, and efficient data handling using the latest web technologies.

## 🚀 Getting Started

To get this project up and running on your local machine, follow these steps:

### Prerequisites

Make sure you have the following installed:

- Node.js (v18.x or later)
- npm, yarn, pnpm, or bun (your preferred package manager)
- Git

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/alx-poll-app.git
    cd alx-poll-app/poll
    ```

2.  **Install dependencies:**

    Choose your preferred package manager:

    ```bash
    # Using npm
    npm install

    # Using yarn
    yarn install

    # Using pnpm
    pnpm install

    # Using bun
    bun install
    ```

3.  **Set up Environment Variables:**

    Create a `.env.local` file in the `poll` directory (where `package.json` is located) and add your Supabase project credentials. You can find these in your Supabase project settings under `API`.

    ```
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

    **Important:** Never commit your `.env.local` file to version control.

4.  **Run the development server:**

    ```bash
    # Using npm
    npm run dev

    # Using yarn
    yarn dev

    # Using pnpm
    pnpm dev

    # Using bun
    bun dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Technologies and Dependencies

This project leverages the following key technologies and libraries:

-   **Next.js** (v15.5.2): A React framework for building full-stack web applications.
-   **React** (v19.1.0) & **React DOM** (v19.1.0): For building user interfaces.
-   **Supabase** (`@supabase/supabase-js` v2.56.0, `@supabase/ssr` v0.7.0): Our backend-as-a-service for database, authentication, and real-time features.
-   **shadcn/ui**: A collection of re-usable components built with Radix UI and Tailwind CSS.
    -   `@radix-ui/react-alert-dialog` (v1.1.15)
    -   `@radix-ui/react-label` (v2.1.7)
    -   `@radix-ui/react-progress` (v1.1.7)
    -   `@radix-ui/react-slot` (v1.2.3)
-   **Tailwind CSS** (v4): A utility-first CSS framework for rapid UI development.
-   **Lucide React** (v0.542.0): A collection of beautiful and customizable SVG icons.
-   **Vitest** (v3.2.4): A blazing fast unit-test framework powered by Vite.
    -   `@testing-library/jest-dom` (v6.8.0)
    -   `@vitejs/plugin-react` (v5.0.2)
    -   `@vitest/ui` (v3.2.4)
    -   `jsdom` (v26.1.0)
-   **TypeScript** (v5): For type-safe JavaScript development.
-   **Other Utilities:**
    -   `class-variance-authority` (v0.7.1)
    -   `clsx` (v2.1.1)
    -   `tailwind-merge` (v3.3.1)
    -   `tw-animate-css` (v1.3.7)

## 🧪 Running Tests

This project uses [Vitest](https://vitest.dev/) for unit testing. To run the tests, use the following command:

```bash
npm test
# or
yarn test
# or
pnpm test
# or
bun test
```

This will execute all tests and report the results in your terminal.

## 📚 Further Learning and Contributions

To learn more about Next.js and contribute to this project, check out these resources:

-   [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.
-   [Project Issues](https://github.com/your-username/alx-poll-app/issues) - Report bugs or suggest new features.
-   [Project Roadmap](https://github.com/your-username/alx-poll-app/projects) - See what's planned for the future.

Your feedback and contributions are always welcome!