# Hyderabad Hotels Dashboard

An interactive, modern dashboard for visualizing and managing Hyderabad hotel leads data.

## Features

- **📊 Statistics Overview**: Key metrics including total hotels, average ratings, and contact coverage
- **📈 Data Visualization**: Interactive charts showing rating distribution and star segment breakdown
- **🔍 Smart Search & Filtering**: Real-time search and filter by star segment
- **📋 Interactive Table**: Sortable columns with pagination
- **🗺️ Map View**: Interactive map showing all hotel locations with detailed popups
- **🎨 Modern UI**: Clean, responsive design with dark mode support
- **⚡ Fast Performance**: Built with Next.js for optimal loading speed

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Maps**: Leaflet & React-Leaflet
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd hotel-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment on Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to deploy your dashboard

### Option 2: Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect Next.js and configure the build settings
6. Click "Deploy"

Your dashboard will be live in minutes!

## Project Structure

```
hotel-dashboard/
├── app/
│   ├── components/
│   │   ├── StatCard.tsx       # Statistics card component
│   │   ├── Charts.tsx         # Data visualization charts
│   │   ├── HotelTable.tsx     # Interactive data table
│   │   └── HotelMap.tsx       # Map view component
│   ├── lib/
│   │   └── types.ts           # TypeScript type definitions
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main dashboard page
├── public/
│   └── hotels.json            # Hotel data
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Data Source

The dashboard uses hotel lead data from `hyderabad_hotels_20251114_200657.json` containing:

- Hotel names and addresses
- Google ratings and review counts
- Contact information (phone, email, website)
- Star segment classifications
- Geographic coordinates

## Features in Detail

### Statistics Cards
- Total hotel count
- Average rating calculation
- Contact information coverage
- Premium hotel identification

### Data Visualization
- Rating distribution bar chart
- Star segment pie chart
- Interactive tooltips

### Hotel Table
- Search by name or address
- Filter by star segment
- Sort by name, rating, or reviews
- Pagination for large datasets
- Direct contact links (phone, email, website)

### Map View
- All hotels plotted on interactive map
- Click markers for hotel details
- Responsive zoom and pan
- Direct website links in popups

## Customization

You can easily customize the dashboard by:

- Modifying colors in `tailwind.config.ts`
- Adjusting chart configurations in `components/Charts.tsx`
- Changing table columns in `components/HotelTable.tsx`
- Updating statistics in `app/page.tsx`

## Performance

- **First Load**: Optimized with Next.js code splitting
- **Data Loading**: Efficient client-side data fetching
- **Responsive**: Works seamlessly on mobile, tablet, and desktop
- **SEO Ready**: Server-side rendering support

## License

ISC

## Support

For issues or questions, please open an issue in the repository.
