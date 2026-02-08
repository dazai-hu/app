# 🔧 Setting Build & Start Commands on Render

## 📋 Quick Answer

When deploying on Render, use these commands:

```
Build Command:    npm install
Start Command:    npm start
```

That's it! Simple as that. 😊

---

## 🎯 Step-by-Step Guide

### Method 1: Automatic Detection (Recommended)

Render will **automatically detect** these commands from your `render.yaml` file!

✅ **You don't need to do anything!** The `render.yaml` file I created already has:

```yaml
services:
  - type: web
    name: link-tracker
    env: node
    buildCommand: npm install
    startCommand: npm start
```

When you connect your GitHub repository, Render reads this file and sets everything automatically! 🎉

---

### Method 2: Manual Configuration

If you want to set them manually (or if auto-detection doesn't work):

#### **During Initial Setup:**

1. **After connecting GitHub repository**, you'll see a configuration screen

2. **Fill in these fields:**

   ```
   ┌─────────────────────────────────────────┐
   │ Name:                                   │
   │ ┌─────────────────────────────────────┐ │
   │ │ link-tracker                        │ │
   │ └─────────────────────────────────────┘ │
   │                                         │
   │ Environment:                            │
   │ ┌─────────────────────────────────────┐ │
   │ │ Node                    ▼           │ │
   │ └─────────────────────────────────────┘ │
   │                                         │
   │ Build Command:                          │
   │ ┌─────────────────────────────────────┐ │
   │ │ npm install                         │ │ ← Type this
   │ └─────────────────────────────────────┘ │
   │                                         │
   │ Start Command:                          │
   │ ┌─────────────────────────────────────┐ │
   │ │ npm start                           │ │ ← Type this
   │ └─────────────────────────────────────┘ │
   │                                         │
   │ Plan:                                   │
   │ ┌─────────────────────────────────────┐ │
   │ │ Free                    ▼           │ │
   │ └─────────────────────────────────────┘ │
   └─────────────────────────────────────────┘
   ```

3. **Click "Create Web Service"**

---

#### **After Deployment (Changing Commands):**

If you need to change commands after deployment:

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Click on your service (link-tracker)

2. **Click "Settings" tab** (left sidebar)

3. **Scroll to "Build & Deploy" section**

4. **Update the commands:**
   
   **Build Command:**
   ```
   npm install
   ```
   
   **Start Command:**
   ```
   npm start
   ```

5. **Click "Save Changes"**

6. **Manual Deploy** (if needed):
   - Click "Manual Deploy" → "Deploy latest commit"

---

## 🤔 What Do These Commands Do?

### **Build Command: `npm install`**
```
What it does:
- Downloads all dependencies from package.json
- Installs express, cors, body-parser, ejs
- Prepares your app for running
- Runs ONCE during deployment

Think of it as: "Setting up the app"
```

### **Start Command: `npm start`**
```
What it does:
- Runs: node server.js
- Starts your web server
- Makes your app accessible online
- Keeps running 24/7

Think of it as: "Turning on the app"
```

---

## 📸 Visual Guide - What You'll See

### **Screen 1: Create Web Service**
```
After clicking "New +" → "Web Service" → Connecting GitHub:

┌────────────────────────────────────────────────────┐
│  Create a new Web Service                          │
├────────────────────────────────────────────────────┤
│                                                    │
│  Repository: your-username/link-tracker           │
│                                                    │
│  Name: [link-tracker                    ]         │
│                                                    │
│  Environment: [Node                ▼   ]         │
│                                                    │
│  Region: [Oregon (US West)         ▼   ]         │
│                                                    │
│  Branch: [main                     ▼   ]         │
│                                                    │
│  Build Command: [npm install            ]  ← HERE │
│                                                    │
│  Start Command: [npm start              ]  ← HERE │
│                                                    │
│  Plan: [Free                       ▼   ]         │
│                                                    │
│  [ Create Web Service ]                           │
│                                                    │
└────────────────────────────────────────────────────┘
```

### **Screen 2: Settings (After Deployment)**
```
In your service dashboard → Settings tab:

┌────────────────────────────────────────────────────┐
│  Build & Deploy                                    │
├────────────────────────────────────────────────────┤
│                                                    │
│  Build Command                                     │
│  ┌──────────────────────────────────────────────┐ │
│  │ npm install                                  │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  Start Command                                     │
│  ┌──────────────────────────────────────────────┐ │
│  │ npm start                                    │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  [ Save Changes ]                                 │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## ✅ Verification

After deployment, check the logs to verify:

```
Build Logs (should show):
────────────────────────────────────
==> Running build command 'npm install'...
npm install
added 57 packages in 3s
==> Build successful!

Deploy Logs (should show):
────────────────────────────────────
==> Running start command 'npm start'...
✅ App running on port 10000!
🌐 Visit https://link-tracker-xyz.onrender.com
==> Service is live!
```

---

## 🚨 Common Mistakes to Avoid

### ❌ **Wrong:**
```
Build Command: npm run build
Start Command: node index.js
```

### ✅ **Correct:**
```
Build Command: npm install
Start Command: npm start
```

### Why?
- Your `package.json` has `"start": "node server.js"`
- So `npm start` automatically runs `node server.js`
- You don't have a build step (no React/Next.js)
- Your main file is `server.js`, not `index.js`

---

## 🔍 Troubleshooting

### **"Build failed"**
```
Check:
- Is Build Command exactly: npm install
- Does package.json exist in root?
- Are all dependencies listed in package.json?

Solution:
- Verify package.json is committed to GitHub
- Check Render logs for specific error
```

### **"Application failed to start"**
```
Check:
- Is Start Command exactly: npm start
- Does server.js exist?
- Is PORT environment variable used?

Solution:
- Check server.js has: const PORT = process.env.PORT || 5000
- Review Render logs for error details
```

### **"Commands not saving"**
```
Solution:
- Click "Save Changes" button
- Wait for confirmation message
- Manually redeploy if needed
```

---

## 📝 Quick Reference Card

```
╔════════════════════════════════════════════╗
║  RENDER CONFIGURATION                      ║
╠════════════════════════════════════════════╣
║                                            ║
║  Build Command:    npm install             ║
║  Start Command:    npm start               ║
║  Environment:      Node                    ║
║  Plan:             Free                    ║
║                                            ║
║  Environment Variables:                    ║
║  - HOST_URL: [your-render-url]             ║
║                                            ║
╚════════════════════════════════════════════╝
```

---

## 🎯 Summary

**You need to enter:**

1. **Build Command:** `npm install`
2. **Start Command:** `npm start`

**Where to enter:**
- During initial setup (when creating web service)
- OR in Settings → Build & Deploy (after deployment)

**When Render uses them:**
- Build Command: Runs once during deployment
- Start Command: Runs continuously to keep app alive

**Pro Tip:** 
The `render.yaml` file does this automatically! Just connect your repo and Render handles everything! 🚀

---

## 🎬 Next Steps

After setting build/start commands:

1. ✅ Set commands (done!)
2. ⏳ Wait for deployment (2-5 min)
3. 🔧 Add HOST_URL environment variable
4. 🎉 Test your app!

---

**Need help with the next step?** Just ask! 😊
