# Diocese of Tagum Directory App

A comprehensive directory app for the Roman Catholic Diocese of Tagum.

## Features

- **Welcome Screen**: Animated welcome screen with orbiting icons around the diocese logo
- **Home Screen**: Directory grid with 12 category icons in 4x3 layout
- **Parish Directory**: Browse all parishes in a 2-column grid with search and filters
- **Clergy Directory**: Browse all clergy members with category filters and search
- **Parish Detail View**: Full parish information with image placeholder, location directions, contact, GKKs, and history
- **Parish Events**: View parish events by year (Coming Soon feature)
- **Clergy Detail View**: Full clergy information including assignment, biography, and contact actions
- **Bottom Navigation**: Back, Home, and Next navigation
- **First-launch detection**: Uses AsyncStorage to remember if user has seen the welcome screen

## Screens

### Welcome Screen
- Diocese of Tagum logo centered
- 9 icons orbiting around the logo with smooth animations
- "Welcome to THE ROMAN CATHOLIC DIOCESE OF TAGUM" text
- Continue button to proceed to home

### Home Screen
- Search and Login buttons in header
- Diocese logo with title
- 4x3 grid of directory icons:
  - Row 1: Parish, BEC, Clergy
  - Row 2: Vicariate, DCLAIM, Ministry
  - Row 3: Schools, Congregation, Corporations
  - Row 4: Circular Letter, Survey, Daily Readings

### Parish Directory (NEW DESIGN)
- 2-column grid layout of parish icons
- Search bar for filtering parishes
- Tab filters: All, Parishes, Quasi-Parishes, Mission Stations
- Each grid item shows:
  - Parish icon (based on name: Cathedral, Immaculate, Sacred Heart, Santo Niño, Our Lady, Birhen)
  - Parish name
- Tap to view full parish details

### Parish Detail Screen (NEW DESIGN)
- Header with back button and "Parish Details" title
- Large image placeholder area (33% of screen height)
- Parish name and vicariate badge (centered)
- Main info card with:
  - Location (tappable for Google Maps directions)
  - Parish Priest name
  - Contact Number (tappable to call)
  - Feast Day
- Mass Schedule section
- GKKs count section
- Blueprint section (placeholder)
- Parish Events button (navigates to events screen)
- Parish History section

### Parish Events Screen (NEW)
- Year selection (2026, 2025)
- Events Coming Soon placeholder for each year

### Congregations Directory (NEW)
- List of 16 religious congregations in the Diocese of Tagum
- Each congregation shows acronym and full name
- Tap to view full congregation details

### Congregation Detail Screen (NEW)
- Header with congregation name and acronym
- Image placeholder area (25% of screen height)
- Mission statement
- Contact card with:
  - Location (tappable for Google Maps directions from current location)
  - Phone numbers (tappable to call)
  - Email (tappable to send email)
  - Website (tappable to open in browser)
- Schedule of Events button (navigates to schedule screen)
- Patron Saint section
- Brief History section
- Founding Anniversary highlight card

### Congregation Schedule Screen (NEW)
- Year selection folders (2026, 2027)
- Tap to view events for specific year

### Congregation Events Screen (NEW)
- List of events for the selected year
- "No events scheduled yet" placeholder when empty

### DCLAIM Directory (NEW)
- List of 26 lay apostolate groups and movements
- Each group shows name and coordinator
- Diocesan Council of Lay Apostolates and Integrated Movements

### DCLAIM Detail Screen (NEW)
- Header with group name and coordinator
- Mission statement
- Contact card with phone numbers and email
- Schedule of Events button (navigates to schedule screen)
- Website/Social Media links section
- Photos placeholder
- History section

### DCLAIM Schedule Screen (NEW)
- Year selection folders (2026, 2027)
- Tap to view events for specific year

### DCLAIM Events Screen (NEW)
- List of events for the selected year
- "Event details will be added" placeholder when empty

### Ministries Directory (NEW)
- List of 14 diocesan ministries and apostolates
- Brown/cream themed to match the Diocese of Tagum aesthetic
- Each ministry shows name and coordinator
- Cross symbol decorations
- Tap to view full ministry details

### Ministry Detail Screen (NEW)
- Header with ministry name and coordinator
- Mission statement section
- Contact card with phone numbers and email
- Schedule of Events button (navigates to schedule screen)
- Website/Social Media links section (website, YouTube, radio)
- Photos placeholder
- History section
- Brown/cream color theme throughout

### Ministry Schedule Screen (NEW)
- Year selection folders (2026, 2027)
- Tap to view events for specific year

### Ministry Events Screen (NEW)
- List of events for the selected year
- "Event details will be added" placeholder when empty

### Schools Directory (NEW - DOTES)
- List of 16 Catholic schools in the Diocese of Tagum
- Filter tabs: All Schools, DOTES Member, Congregational
- Each school shows abbreviation, name, location, and category
- Diocese of Tagum Educational System (DOTES)

### School Detail Screen (NEW)
- Header with school name and abbreviation
- Image placeholder area (25% of screen height)
- Administration card with:
  - Religious Order
  - Current Head
  - Charism (if applicable)
- Location (tappable for Google Maps directions from current location)
- Contact email (tappable to send email)
- Website (tappable to open in browser)
- Schedule of Events button
- Founding Anniversary
- Patron Saint
- Mission statement (with motto if applicable)
- Brief History
- Category badge with founding year

### School Schedule Screen (NEW)
- Year selection folders (2026, 2027)
- Event count for each year
- Tap to view events for specific year

### School Events Screen (NEW)
- List of events for the selected year with school-colored accent
- "No Events Yet" placeholder when empty

### Clergy Directory
- Search bar for filtering clergy
- Tab filters: All, Parish Priests, Parochial Vicars, Chaplains, Formators, On Study
- Clergy cards showing:
  - Circular photo (or placeholder)
  - Name and title
  - Parish assignment
  - Location
  - Category badge
- Tap to view full clergy details

### Clergy Detail Screen
- Header with photo, name, title, and category badge
- Quick action buttons: Call, Email, Share
- Current Assignment with link to parish
- Ordination date
- Biography
- Contact Information

### Search Screen
- Search input with placeholder
- Will search across all directories

### Login Screen
- Google and Facebook OAuth login options

## App Structure

```
src/
├── app/
│   ├── _layout.tsx           # Root layout with navigation
│   ├── welcome.tsx           # Animated welcome screen
│   ├── modal.tsx             # Modal template
│   ├── (tabs)/               # Main app tabs
│   │   ├── _layout.tsx       # Tab navigation
│   │   ├── index.tsx         # Home screen with directory grid
│   │   ├── search.tsx        # Search screen
│   │   └── login.tsx         # Login screen
│   ├── parishes/             # Parish directory
│   │   ├── index.tsx         # Parish grid with search and tabs
│   │   ├── [id].tsx          # Parish detail screen
│   │   └── [id]/events/      # Parish events
│   │       ├── index.tsx     # Year selection screen
│   │       └── [year].tsx    # Events for specific year
│   ├── congregations/        # Congregations directory
│   │   ├── index.tsx         # Congregations list
│   │   ├── [id].tsx          # Congregation detail screen
│   │   └── [id]/             # Congregation sub-routes
│   │       ├── schedule.tsx  # Schedule year selection
│   │       └── events/[year].tsx  # Events for specific year
│   ├── dclaim/               # DCLAIM directory
│   │   ├── index.tsx         # DCLAIM groups list
│   │   ├── [id].tsx          # DCLAIM group detail screen
│   │   └── [id]/             # DCLAIM sub-routes
│   │       ├── schedule.tsx  # Schedule year selection
│   │       └── events/[year].tsx  # Events for specific year
│   ├── schools/              # Schools directory (DOTES)
│   │   ├── index.tsx         # Schools list with filters
│   │   ├── [id].tsx          # School detail screen
│   │   └── [id]/             # School sub-routes
│   │       ├── schedule.tsx  # Schedule year selection
│   │       └── events/[year].tsx  # Events for specific year
│   ├── ministries/           # Ministries directory
│   │   ├── index.tsx         # Ministries list
│   │   ├── [id].tsx          # Ministry detail screen
│   │   └── [id]/             # Ministry sub-routes
│   │       ├── schedule.tsx  # Schedule year selection
│   │       └── events/[year].tsx  # Events for specific year
│   └── clergy/               # Clergy directory
│       ├── index.tsx         # Clergy list with search and tabs
│       └── [id].tsx          # Clergy detail screen
├── components/               # Reusable UI components
│   ├── BottomNavBar.tsx      # Bottom navigation bar
│   └── Themed.tsx            # Dark mode wrapper components
└── lib/
    ├── data/
    │   ├── parish-directory.ts    # Parish and clergy data with helper functions
    │   ├── congregations-data.ts  # Congregations data with helper functions
    │   ├── dclaim-data.ts         # DCLAIM groups data with helper functions
    │   ├── schools-data.ts        # Schools data (DOTES) with helper functions
    │   └── ministries-data.ts     # Ministries data with helper functions
    ├── auth-context.tsx         # Authentication context
    └── state/                   # State management
```

## Data Structure

### Parish
- id, name, vicariate, location
- priestId, priestName, fiesta, history, type
- phone, mobile, email, massSchedule (optional)
- gkkCount, image (optional)
- iconType for dynamic icon assignment (cathedral, immaculate, sacred-heart, santo-nino, our-lady, birhen, default)

### Clergy
- id, name, title
- parishId, parishName, location
- image, ordination, biography (optional)
- email, phone (optional)
- category (parish-priest, parochial-vicar, chaplain, formator, on-study, etc.)

## Sample Data (Christ the King Vicariate)
- Christ the King Cathedral Parish (67 GKKs)
- Birhen sa Kasilak Parish (45 GKKs)
- Immaculate Conception Parish (38 GKKs)
- Sacred Heart of Jesus Parish (42 GKKs)
- Santo Niño Parish (35 GKKs)
- Our Lady of Lourdes Parish (28 GKKs)
- St. Joseph the Worker Parish (52 GKKs)
- San Isidro Labrador Parish (31 GKKs)
- Holy Family Quasi-Parish (18 GKKs)
- Divine Mercy Quasi-Parish (22 GKKs)
- St. Michael the Archangel Mission Station (12 GKKs)

## App Store Readiness

- Portrait orientation locked
- Supports iOS and Android
- Responsive design for all screen sizes
- Safe area handling implemented
- Bottom navigation compatible with all devices
- Smooth animations with react-native-reanimated
- Google Maps integration for directions
- Phone call integration for contact numbers
