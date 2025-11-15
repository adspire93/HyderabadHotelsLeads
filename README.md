# Hyderabad Hotels Leads Dashboard

Interactive dashboard for visualizing and managing Hyderabad hotel leads data.

## 🚀 Quick Deploy to Vercel

### Option 1: Automatic Deploy (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import this repository: `adspire93/HyderabadHotelsLeads`
4. Vercel will auto-detect the configuration
5. Click **"Deploy"**

The dashboard will be live in ~2 minutes!

### Option 2: Manual Configuration

If automatic detection doesn't work:

1. In Vercel project settings, set:
   - **Root Directory**: `hotel-dashboard`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

2. Click **"Deploy"**

### Option 3: Vercel CLI

```bash
npm install -g vercel
vercel
```

## 📊 Dashboard Features

- **Statistics Overview**: Key metrics and insights
- **Interactive Charts**: Rating distribution and star segment analysis
- **Advanced Table**: Search, filter, sort, and pagination
- **Map View**: Interactive map with all hotel locations
- **Responsive Design**: Works on all devices
- **Dark Mode**: Automatic dark mode support

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📁 Project Structure

```
HyderabadHotelsLeads/
├── hotel-dashboard/          # Next.js dashboard application
│   ├── app/
│   │   ├── components/       # React components
│   │   ├── lib/             # Types and utilities
│   │   ├── page.tsx         # Main dashboard page
│   │   └── layout.tsx       # Root layout
│   ├── public/
│   │   └── hotels.json      # Hotel data
│   └── package.json
├── hyderabad_hotels_20251114_200657.json  # Original data
├── package.json             # Root package.json
└── README.md
```

## 📦 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Maps**: Leaflet & React-Leaflet
- **Icons**: Lucide React

## 📄 Data

The dashboard displays hotel leads data including:
- Hotel names and addresses
- Google ratings and reviews
- Contact information (phone, email, website)
- Star segment classifications
- Geographic coordinates

## 🔧 Troubleshooting

If deployment fails:

1. Make sure you're deploying from the `main` branch
2. Check that the Root Directory is set to `hotel-dashboard` in Vercel settings
3. Verify build logs in the Vercel dashboard
4. Try redeploying with "Clear Cache and Deploy"

## 📝 License

ISC
