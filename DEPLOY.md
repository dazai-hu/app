# Deploying to Render

## Quick Deploy Steps

### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will auto-detect the `render.yaml` configuration
   - Click "Create Web Service"

3. **Configure Environment Variable:**
   - In Render dashboard, go to your service
   - Navigate to "Environment" tab
   - Add environment variable:
     - Key: `HOST_URL`
     - Value: Your Render URL (e.g., `https://your-app.onrender.com`)
   - Click "Save Changes"

4. **Done!** Your app will be live at `https://your-app.onrender.com`

### Option 2: Manual Configuration

If you prefer manual setup:

1. **Create New Web Service** on Render
2. **Connect Repository** or deploy from Git URL
3. **Configure Build Settings:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** `Node`

4. **Add Environment Variable:**
   - `HOST_URL`: Your Render URL

5. **Deploy!**

## Important Notes

### Free Tier Limitations:
- ⚠️ Free services spin down after 15 minutes of inactivity
- First request after inactivity may take 30-60 seconds
- Consider upgrading to paid plan for production use

### Data Persistence:
- The `data/` folder stores collected information
- On free tier, this data is **ephemeral** (lost on restart)
- For persistent storage, consider:
  - Upgrading to paid plan with persistent disk
  - Using a database (MongoDB, PostgreSQL)
  - Using external storage (AWS S3, Cloudinary)

### After Deployment:

1. **Update HOST_URL:**
   - Copy your Render URL (e.g., `https://link-tracker-abc123.onrender.com`)
   - Set it as the `HOST_URL` environment variable
   - Redeploy if needed

2. **Test Your App:**
   - Visit your Render URL
   - Create a test tracking link
   - Verify data collection works

3. **Share Your Links:**
   - Use the generated CloudFlare or WebView links
   - Monitor the dashboard for collected data

## Troubleshooting

### Build Fails:
- Check that `package.json` is in the root directory
- Verify Node.js version compatibility (18.x recommended)

### App Crashes:
- Check Render logs in the dashboard
- Ensure all dependencies are listed in `package.json`

### Data Not Saving:
- Verify the `data/` directory is being created
- Check file permissions
- Consider using a database for production

## Upgrading for Production

For a production-ready setup:

1. **Add Database:**
   - Create a PostgreSQL or MongoDB instance on Render
   - Update server.js to use database instead of files

2. **Add Persistent Disk:**
   - In Render dashboard, add a persistent disk
   - Mount it to `/data` directory

3. **Enable Custom Domain:**
   - Add your custom domain in Render settings
   - Update DNS records as instructed

## Support

For issues or questions:
- Check Render documentation: https://render.com/docs
- Review application logs in Render dashboard
- Ensure environment variables are set correctly

---

**Ready to deploy?** Follow Option 1 above for the easiest deployment experience!
