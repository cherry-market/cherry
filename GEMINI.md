# GEMINI.md - Cherry Project Context Guide

This document is a project guide designed to help the AI Assistant (Gemini) understand the `Cherry` project, write consistent code, and provide efficient support.

---

## 1. Project Overview
- **Project Name**: Cherry
- **Description**: K-POP Goods Resale & Fandom Community Platform
- **Core Values**: Premium, Young, Trendy, Fandom-focused
- **Tech Stack**: React, TypeScript, Vite, Tailwind CSS, Zustand
- **Architecture**: Feature-Sliced Design (FSD) Adaptation

## 2. Directory Structure & Architecture
This project follows a lightweight version of **Feature-Sliced Design (FSD)**.

```bash
/
├── app/          # App-wide settings (Providers, Router, Entry Layout)
├── features/     # Business features separated by domain
│   ├── auth/     # Authentication (Login, Signup, Guards)
│   ├── chat/     # Chat (List, Detail, Socket)
│   ├── home/     # Main Home (Banner, Recommendations)
│   ├── product/  # Product (List, Detail, Registration, AI Write)
│   ├── mypage/   # My Page (Profile, Settings)
│   └── wish/     # Wishlist (Pick List)
├── shared/       # Shared modules (UI Components, Utilities, Constants)
│   ├── ui/       # Reusable Atomic Components (Button, Avatar, etc.)
│   ├── services/ # External API services
│   ├── mappers/  # Type mapping (Backend DTO ↔ Frontend)
│   ├── constants/# Global constants
│   └── types/    # Global type definitions
├── docs/         # Project documentation (Requirements, Reports)
└── index.html    # Entry HTML (Tailwind CDN, Global Styles)
```

## 3. Design System

### 3.1 Color Palette
Use the signature colors defined in `tailwind.config.js`.
- **Primary (Cherry)**: `#FF2E88` (High Saturation Pink) - Main actions, Highlight text
- **Cherry Deep**: `#C20055` - Shadows, Click states
- **Cherry Neon**: `#FF5CA5` - Hover states, Points
- **Background**: `#F8F9FA` (Light Gray) or `#FFFFFF` (White)

### 3.2 UI Component Philosophy
- **Atomic Design**: Always use shared components defined in `shared/ui` (e.g., Buttons, Inputs). Avoid hardcoded HTML tags.
  - Example: Use `<Button variant="primary">` instead of `<button>`.
- **Tactile Interaction**: Interactive elements must provide "tactile" feedback, including scale-down effects and shadow changes on click (use `.tactile` class or built-in `Button` styles).
- **Glassmorphism**: Actively use background blur (`backdrop-blur`) for popups, headers, and floating bars.

## 4. Coding Conventions

### 4.1 Component Authoring
- **Functional Components**: All components must be written as React Functional Components (`React.FC`).
- **Naming**: Use PascalCase for filenames and component names (e.g., `ProductDetail.tsx`).
- **Hook Separation**: Extract business logic into the `hooks/` directory if it exceeds 10 lines or is reusable (e.g., `features/product/hooks/useProductLike.ts`).

### 4.2 State Management
- **Local State**: Use `useState` for UI-local state.
- **Global State**: Use `Zustand` for global session or authentication state (`features/auth/model/authStore.ts`).

### 4.3 Styling
- **Tailwind CSS**: Use inline utility classes as the default.
- **Complex Styles**: Avoid `@layer components`; instead, abstract repetitive styles into React internal variables or strictly typed `shared/ui` components.

## 5. Terminology

| Term | Description | Code Variable Example |
| :--- | :--- | :--- |
| **Pick** | The action of liking/saving a product. (Formerly 'Wishlist') | `isLiked`, `toggleLike`, `pickCount` |
| **Cherry** | Project brand name, also refers to currency/points. | `cherry`, `CherryIcon` |
| **Manner Temp** | Seller's reliability score (Temperature). | `temperature`, `mannerTemp` |
| **AI Write** | Feature that auto-generates product descriptions using AI. | `AIProductWrite`, `generateDescription` |

## 7. SOLID Principles (Frontend Focused)

### 7.1 SRP - Single Responsibility
- **UI Components**: Render HTML/CSS only.
- **Hooks**: Manage state and effects.
- **Mappers**: Transform data.

### 7.2 Patterns for Gemini
- **Tactile UI**: Ensure click feedback (scale/shadow).
- **Glassmorphism**: Use `backdrop-blur` for overlays.
- **Skeleton Loading**: Always provide visual loading states.
- **Error States**: User-friendly error messages (no alert boxes).

### 7.3 Do Not Touch
- **Backend Logic**: Leave for Claude/Codex.
- **Complex Refactoring**: Leave for specific refactoring tasks.

## 8. Guidelines for AI Agents (Gemini Specific)
1. **Visual Excellence**: Your primary goal is "WOW" factor.
2. **User Experience**: Prioritize "how it feels" (animations, transitions).
3. **Respect Design**: Use `index.css` variables and Tailwind config colors.
4. **Absolute Paths**: Always use `@/`.
5. **No Logic in UI**: Move logic to hooks (`features/*/hooks/`).

---
*Last Updated: 2026-01-21 by Gemini (UI/UX Focus)*
