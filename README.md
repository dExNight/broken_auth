# Vulnerable Auth Demo

A deliberately vulnerable web application built with Flask and React to demonstrate common security issues in authentication systems

## Key Features & Vulnerabilities

### Authentication
- Plain text password storage
- No rate limiting or brute force protection
- Weak password reset tokens (6 digits)
- Reset tokens shown directly in UI instead of email delivery
- JWT tokens stored in localStorage (XSS vulnerable)

### User Data & XSS
- Unescaped HTML/JS in user bio field
- Auto-executing JavaScript from bio content
- User search feature exposing sensitive data
- No input sanitization

### Implemented Attacks
- XSS payload stealing JWT tokens
- Weak password reset token brute force
- Information disclosure via profile search
- Bio field JavaScript injection

## Tech Stack
- Backend: Python/Flask, SQLAlchemy, JWT
- Frontend: React, TypeScript, TanStack Query
- Styling: Tailwind CSS

## Project Structure
- backend/           # Flask application
  - app/
    - models/        # Database models
    - routes/        # API endpoints
    - controllers/   # Business logic
- frontend/          # React application
  - src/
    - features/      # Feature-based modules
    - components/    # Reusable components

# Xss usage sample
```javascript
<script>alert('I stole your token: ' + localStorage.getItem('token'));</script>
```