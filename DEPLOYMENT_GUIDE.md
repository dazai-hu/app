# 🚀 Complete Deployment Guide - Step by Step

## Part 1: Prepare Your Code for GitHub

### Step 1: Create a GitHub Repository

1. Go to https://github.com
2. Click the **"+"** icon in top right → **"New repository"**
3. Fill in:
   - **Repository name:** `link-tracker` (or any name you like)
   - **Description:** "Web-based tracking link generator"
   - **Visibility:** Public or Private (your choice)
   - ⚠️ **DO NOT** check "Add a README file"
4. Click **"Create repository"**
5. **Copy the repository URL** (looks like: `https://github.com/YOUR_USERNAME/link-tracker.git`)

---

## Part 2: Upload Your Code to GitHub

### Step 2: Open Terminal/Command Prompt

1. Press `Windows + R`
2. Type `cmd` and press Enter
3. Navigate to your project folder:
   ```bash
   cd C:\Users\Aditya\Desktop\app
   ```

### Step 3: Initialize Git and Push Code

Copy and paste these commands **one by one**:

```bash
# 1. Initialize git repository
git init

# 2. Add all files
git add .

# 3. Commit your code
git commit -m "Initial commit - Link Tracker app"

# 4. Set main branch
git branch -M main

# 5. Add your GitHub repository (REPLACE WITH YOUR URL!)
git remote add origin https://github.com/YOUR_USERNAME/link-tracker.git

# 6. Push to GitHub
git push -u origin main
```

⚠️ **Important:** Replace `YOUR_USERNAME/link-tracker.git` with your actual GitHub repository URL!

**If Git asks for credentials:**
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your password)
  - Get token at: https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Select "repo" scope
  - Copy the token and use it as password

---

## Part 3: Deploy on Render

### Step 4: Create Render Account

1. Go to https://render.com
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up with GitHub (recommended) or email
4. Verify your email if needed

### Step 5: Create New Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** button (top right)
3. Select **"Web Service"**

### Step 6: Connect GitHub Repository

1. Click **"Connect GitHub"** (if first time)
2. Authorize Render to access your GitHub
3. You'll see a list of your repositories
4. Find **"link-tracker"** (or your repo name)
5. Click **"Connect"**

### Step 7: Configure Service

Render will auto-detect settings from `render.yaml`, but verify:

- **Name:** `link-tracker` (or choose your own)
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** `Free` (select this)

Click **"Create Web Service"**

### Step 8: Wait for Deployment

1. Render will start building your app
2. You'll see logs scrolling (this takes 2-5 minutes)
3. Wait for "Build successful" and "Deploy live"
4. **Copy your app URL** (looks like: `https://link-tracker-abc123.onrender.com`)

### Step 9: Add Environment Variable

⚠️ **IMPORTANT - Don't skip this!**

1. In your Render dashboard, click on your service
2. Click **"Environment"** tab (left sidebar)
3. Click **"Add Environment Variable"**
4. Fill in:
   - **Key:** `HOST_URL`
   - **Value:** Your Render URL (paste what you copied)
   - Example: `https://link-tracker-abc123.onrender.com`
5. Click **"Save Changes"**

Your app will automatically redeploy (takes 1-2 minutes)

---

## Part 4: Test Your App

### Step 10: Access Your App

1. Wait for deployment to complete
2. Click **"Open"** button in Render dashboard
3. Or visit your URL directly: `https://your-app-name.onrender.com`

### Step 11: Create Your First Tracking Link

1. On the homepage, enter:
   - **User ID:** `test123`
   - **Target URL:** `https://google.com`
2. Click **"Generate Tracking Links"**
3. Copy one of the generated links
4. Open it in a new browser/incognito window
5. Go back and click **"View Dashboard"**
6. You should see collected data! 🎉

---

## 🎉 Congratulations! Your App is Live!

### Your App URLs:
- **Homepage:** `https://your-app-name.onrender.com`
- **Dashboard:** `https://your-app-name.onrender.com/dashboard/YOUR_USER_ID`

### What's Next?

1. **Share your tracking links** with others
2. **Monitor the dashboard** to see collected data
3. **Customize** the app as needed

---

## 📋 Quick Troubleshooting

### Problem: "git: command not found"
**Solution:** Install Git first
1. Download from: https://git-scm.com/download/win
2. Install with default settings
3. Restart Command Prompt
4. Try again

### Problem: Build fails on Render
**Solution:**
1. Check Render logs for specific error
2. Verify all files are pushed to GitHub
3. Make sure `package.json` exists in root folder

### Problem: App shows error after deployment
**Solution:**
1. Check if `HOST_URL` environment variable is set
2. Look at Render logs for errors
3. Make sure deployment completed successfully

### Problem: Free tier app is slow
**Solution:**
- Free tier apps sleep after 15 minutes
- First request takes 30-60 seconds to wake up
- This is normal! Just wait a bit

### Problem: Can't push to GitHub
**Solution:**
1. Make sure you created the repository on GitHub
2. Check you're using correct repository URL
3. Use Personal Access Token, not password
4. Get token at: https://github.com/settings/tokens

---

## 🆘 Need More Help?

### Resources:
- **Render Docs:** https://render.com/docs/web-services
- **Git Guide:** https://git-scm.com/book/en/v2
- **GitHub Help:** https://docs.github.com

### Common Commands:

```bash
# Check if git is installed
git --version

# Check current directory
cd

# List files in directory
dir

# Check git status
git status

# View remote repository
git remote -v
```

---

## 🎯 Summary Checklist

Before you start, make sure you have:
- [ ] GitHub account created
- [ ] Render account created
- [ ] Git installed on your computer
- [ ] All files in `C:\Users\Aditya\Desktop\app`

Deployment steps:
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Create Render web service
- [ ] Connect GitHub repository
- [ ] Wait for deployment
- [ ] Add HOST_URL environment variable
- [ ] Test the app

---

**Ready to start? Begin with Part 1, Step 1!** 🚀

If you get stuck at any step, let me know exactly where and I'll help you!
