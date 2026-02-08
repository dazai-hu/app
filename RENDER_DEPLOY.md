# 🚀 Quick Deploy to Render

## Prerequisites
- GitHub account
- Render account (free tier works!)

## Step-by-Step Deployment

### 1️⃣ Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Link Tracker"

# Create main branch
git branch -M main

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### 2️⃣ Deploy on Render

1. Go to https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect GitHub"** and authorize Render
4. Select your repository
5. Render will auto-detect settings from `render.yaml`
6. Click **"Create Web Service"**

### 3️⃣ Configure Environment

After deployment starts:

1. Go to your service in Render dashboard
2. Click **"Environment"** tab
3. Add environment variable:
   - **Key:** `HOST_URL`
   - **Value:** (Copy your Render URL, e.g., `https://link-tracker-abc123.onrender.com`)
4. Click **"Save Changes"**

Your app will automatically redeploy!

### 4️⃣ Done! 🎉

Your app is now live at: `https://YOUR_APP_NAME.onrender.com`

## What's Next?

1. **Test the app:**
   - Visit your Render URL
   - Create a test tracking link
   - Share the link and check the dashboard

2. **Update HOST_URL if needed:**
   - If you change your app name or domain
   - Update the `HOST_URL` environment variable

3. **Monitor your app:**
   - Check logs in Render dashboard
   - View metrics and usage

## Important Notes

⚠️ **Free Tier Limitations:**
- App sleeps after 15 minutes of inactivity
- First request may take 30-60 seconds to wake up
- Data is stored in files (ephemeral on free tier)

💡 **For Production:**
- Upgrade to paid plan for always-on service
- Add persistent disk for data storage
- Consider using a database (PostgreSQL/MongoDB)

## Troubleshooting

**Build fails?**
- Check that all files are committed to GitHub
- Verify `package.json` is in root directory

**App crashes?**
- Check Render logs for errors
- Ensure `HOST_URL` is set correctly

**Can't access app?**
- Wait 30-60 seconds for free tier to wake up
- Check if deployment completed successfully

## Need Help?

- Render Docs: https://render.com/docs
- Check application logs in Render dashboard
- Verify all environment variables are set

---

**Ready to deploy?** Follow the steps above and you'll be live in minutes! 🚀
