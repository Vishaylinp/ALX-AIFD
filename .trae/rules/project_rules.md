# Project Rules for Polling App

This document outlines the architectural and coding guidelines for the AI assistant to follow within this project.

## Core Principles

- **Primary Stack:** All code must be written for **Next.js (App Router)** and use **Supabase** for all database and authentication logic.
- **UI Framework:** Always use **shadcn/ui** components for forms, buttons, and other UI elements. Avoid generating custom CSS unless explicitly requested.
- **Security:** Prioritize security. All database writes, reads of sensitive data, and authentication-related logic **must be handled on the server-side** using Next.js **Server Actions** or **Route Handlers**.

---

## Code Generation Guidelines

1.  **Component Structure:**
    - New pages and layouts should be created inside the `app/` directory following the App Router's file-based routing.
    - Pages related to authentication should be placed in `app/auth/` to share a common layout.
    - Pages for poll management (creation, listing) should be placed in `app/polls/`.

2.  **API and Utilities:**
    - All shared, non-component logic (like database client configuration, utility functions) should be placed in the `lib/` directory.
    - All form submissions should be handled by a dedicated Server Action (`'use server'`).

3.  **UI/UX:**
    - When generating forms, use the standard `shadcn/ui` components (`<Form>`, `<Button>`, `<Input>`).
    - Include basic form validation and user feedback (e.g., error messages, success alerts).

---

## Example Scenario

A user requests: "Create a form to submit a new poll."
The AI will respond by:
- Creating a file `app/polls/create/page.tsx`.
- Marking the file as a Client Component (`'use client'`).
- Generating a form using shadcn/ui components.
- Creating a corresponding **Server Action** in `app/actions/poll-actions.ts` to handle the data submission to Supabase.