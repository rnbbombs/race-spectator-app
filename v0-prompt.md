# v0.dev Prompt for Race Spectator App

Use this prompt with v0.dev to generate UI components for the Race Spectator App.

## App Overview
Create a mobile app UI for race spectators to manage support groups, view race details, communicate, and navigate to optimal spectator points. The design should be modern and minimalist, combining the clean aesthetic of Evite with the athletic energy of Strava.

## Design System

### Colors
- Primary: #FF6B35 (Athletic orange/red - like Strava)
- Secondary: #4ECDC4 (Clean teal)
- Background: #F8F8F8 (Light gray)
- Surface: #FFFFFF (White)
- Text Primary: #1a1a1a (Dark gray)
- Text Secondary: #666 (Medium gray)
- Text Tertiary: #999 (Light gray)
- Border: #E8E8E8 (Light border)

### Typography
- Headings: Bold, clean sans-serif (600-700 weight)
- Body: Regular weight, readable (400-500 weight)
- Sizes: 12px (small), 14px (caption), 16px (body), 18-20px (h3), 24px (h2), 32px (h1)

### Components Style
- Cards: White background, rounded corners (12px), subtle shadows
- Buttons: Primary buttons use #FF6B35, rounded (12px), padding 16px
- Inputs: Light gray background (#F5F5F5), rounded (12px), border #E8E8E8
- Icons: Line-style icons (similar to Strava's iconography)

## Key Screens to Generate

### 1. Home/Dashboard Screen
- Header with greeting and user name
- Active group card (if exists) with orange/red accent
- Section for "Upcoming Races" with race cards
- Quick action buttons (Search Races, Create Group)
- Clean, card-based layout with plenty of white space

### 2. Race Detail Screen
- Race name and distance badge
- Race information cards (date, location, start time, type)
- Interactive course map (placeholder for map component)
- List of recommended spectator points with:
  - Point name and mile marker
  - Description
  - Parking availability indicator
  - Travel time estimates
- "Create Support Group" button (primary color)
- "View Navigation Routes" button (outlined style)

### 3. Group Management Screen
- Group header with name and member count
- Member list with avatars, names, and role badges
- Role colors: Organizer (#FF6B35), Runner (#4ECDC4), Spectator (#95A5A6)
- Action buttons: Group Chat, Invite Members, Leave Group
- Create group form (if no active group) with inputs for name and race ID

### 4. Chat Screen
- Header with group name
- Message list with:
  - User messages (right-aligned, orange background)
  - Other messages (left-aligned, white background)
  - Location messages with map pin icon
  - Timestamps
- Input area with location share button, text input, and send button
- Clean, modern messaging interface

### 5. Map Navigation Screen
- Header with "Navigation Routes" title
- Course map view (placeholder)
- Route information card showing total travel time
- List of spectator points in route order with:
  - Numbered indicators
  - Point name and mile marker
  - Description
  - Meta information (parking, travel time, arrival time)
  - "Navigate Here" button for each point

### 6. Auth Screen
- Centered layout
- App title "Race Spectator"
- Toggle between Login and Sign Up
- Form inputs: Name (signup only), Email, Password
- Primary action button
- Link to switch between login/signup modes

### 7. Profile/Settings Screen
- User avatar (circular, orange background)
- User name and email
- Settings sections with:
  - Notifications toggle
  - Location Services status
  - Privacy settings
- About section with:
  - Help & Support
  - Terms of Service
  - Privacy Policy
  - Version number
- Log out button (outlined, orange text)

## Component Patterns

### Race Card
- White card with shadow
- Header: Race name (left) + Distance badge (right, orange)
- Details: Location, Date, Start time
- Rounded corners, padding 16px

### Group Member Card
- Horizontal layout
- Avatar circle (40px, gray background)
- Name and role badge
- Role badge color-coded by role type

### Spectator Point Card
- White card
- Numbered indicator (circular, orange)
- Point name and mile marker
- Description text
- Meta badges (parking, travel time)
- Navigation button

## Layout Principles
- Generous white space
- Card-based design with subtle shadows
- Consistent 16px padding/margins
- Rounded corners (8-12px)
- Clean typography hierarchy
- Minimal use of color (primarily orange accent)
- Modern, athletic aesthetic

## Responsive Considerations
- Mobile-first design
- Touch-friendly button sizes (min 44px height)
- Scrollable content areas
- Safe area handling for notched devices

## Example Prompt for v0.dev

"Create a modern, minimalist mobile app UI for a race spectator app. Use a clean design system with #FF6B35 as the primary color (athletic orange like Strava) and white cards on a #F8F8F8 background. Design a home screen with a greeting header, an active group card in orange, a section of race cards showing race name, location, date, and distance badge, and quick action buttons. Use rounded corners (12px), subtle shadows, and plenty of white space. Typography should be clean and readable with bold headings. The overall aesthetic should feel like Evite meets Strava - modern, minimalist, and energetic."

