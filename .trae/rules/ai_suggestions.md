# AI Suggested Project Rules for Polling App

Based on the brainstorming session for QR code generation, here are some high-level rules and patterns to follow for this project:

1.  **Utility Function Placement**: All shared, non-component utility functions, such as the QR code generation, should reside within the `lib/` directory of the respective application (e.g., `alx-poll/poll/lib/`). This ensures a clear separation of concerns and maintainability.

2.  **Server-Side Processing for Intensive Tasks**: CPU-intensive tasks, like QR code generation, should be handled on the server-side using Next.js Server Actions or Route Handlers. This approach offloads heavy computations from the client, leading to a snappier and more responsive user experience.

3.  **Performance Optimization through Caching**: Implement caching mechanisms (both server-side and client-side) for generated assets or data that are static or frequently accessed, such as QR codes for polls. Caching reduces regeneration overhead, minimizes database calls, and significantly improves application response times.