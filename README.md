# Link Tracker - Web Application

A web-based tracking link generator that allows you to create links to collect user information ethically and transparently.

## Features

- 🔗 **Two Link Types**:
  - **CloudFlare Page**: Shows a CloudFlare-style verification page before redirecting
  - **WebView Page**: Displays the target website in an iframe while collecting data

- 📊 **Data Collection**:
  - IP Address
  - Geolocation (with user permission)
  - Device Information
  - Browser Details
  - Screen Resolution
  - Timezone
  - Camera Snapshots (with user permission)

- 📈 **Dashboard**: View all collected data in real-time with statistics

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser and navigate to:
```
http://localhost:5000
```

## Usage

1. **Create a Link**:
   - Enter a unique User ID (for tracking)
   - Enter the target URL where users will be redirected
   - Click "Generate Tracking Links"

2. **Share Links**:
   - Copy either the CloudFlare or WebView link
   - Share with your target audience

3. **View Dashboard**:
   - Click "View Dashboard" to see collected data
   - Dashboard auto-refreshes every 10 seconds

## Configuration

Edit `server.js` to configure:

- `PORT`: Server port (default: 5000)
- `hostURL`: Your hosted URL
- `use1pt`: Enable/disable URL shortening

## Deployment

### Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variable: `HOST_URL` with your Render URL

### Other Platforms

This app can be deployed to any Node.js hosting platform:
- Heroku
- Railway
- Vercel
- DigitalOcean

## File Structure

```
app/
├── server.js           # Main server file
├── package.json        # Dependencies
├── views/              # EJS templates
│   ├── index.ejs       # Home page
│   ├── dashboard.ejs   # Dashboard
│   ├── webview.ejs     # WebView tracking page
│   └── cloudflare.ejs  # CloudFlare tracking page
├── public/             # Static files
│   └── css/
│       └── style.css   # Styles
└── data/               # Collected data (auto-created)
```

## Important Notes

⚠️ **Legal & Ethical Use**:
- Only use this tool for legitimate purposes
- Ensure compliance with privacy laws (GDPR, CCPA, etc.)
- Always inform users about data collection
- Obtain proper consent before collecting personal data

## License

MIT License - Use responsibly and ethically.
