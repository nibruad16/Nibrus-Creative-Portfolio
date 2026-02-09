# ✅ Admin Dashboard - Quick Start Checklist

## 📋 Setup Checklist

Follow these steps in order to get your admin dashboard running:

### Step 1: Create Supabase Account ⏱️ 2 minutes
- [ ] Go to [https://supabase.com](https://supabase.com)
- [ ] Sign up or log in
- [ ] Click "New Project"
- [ ] Name it: `cinematic-portfolio`
- [ ] Set a strong database password
- [ ] Choose your region
- [ ] Wait for project creation (~2 minutes)

### Step 2: Get API Credentials ⏱️ 1 minute
- [ ] In Supabase, go to **Settings** → **API**
- [ ] Copy **Project URL**
- [ ] Copy **anon/public key**
- [ ] Copy **service_role key** (click "Reveal" first)

### Step 3: Configure Environment ⏱️ 1 minute
- [ ] Open `.env.local` in your project
- [ ] Replace `your_supabase_project_url` with your Project URL
- [ ] Replace `your_supabase_anon_key` with your anon key
- [ ] Replace `your_supabase_service_role_key` with your service role key
- [ ] Save the file

### Step 4: Set Up Database ⏱️ 2 minutes
- [ ] In Supabase, go to **SQL Editor**
- [ ] Click "New Query"
- [ ] Open `supabase/schema.sql` in your project
- [ ] Copy ALL the SQL code
- [ ] Paste into Supabase SQL Editor
- [ ] Click "Run" (or press Ctrl+Enter)
- [ ] Verify you see "Success. No rows returned"

### Step 5: Create Admin User ⏱️ 1 minute
- [ ] In Supabase, go to **Authentication** → **Users**
- [ ] Click "Add user" → "Create new user"
- [ ] Enter your email (e.g., `admin@example.com`)
- [ ] Enter a strong password
- [ ] ✅ Check "Auto Confirm User"
- [ ] Click "Create user"
- [ ] Save your credentials somewhere safe!

### Step 6: Restart Dev Server ⏱️ 30 seconds
- [ ] Stop your current dev server (Ctrl+C in terminal)
- [ ] Run: `pnpm dev`
- [ ] Wait for server to start

### Step 7: Test Login ⏱️ 1 minute
- [ ] Open browser to `http://localhost:3000/admin`
- [ ] Enter your admin email
- [ ] Enter your admin password
- [ ] Click "Sign In"
- [ ] Verify you're redirected to dashboard

### Step 8: Create First Project ⏱️ 2 minutes
- [ ] Click "New Project" button
- [ ] Fill in project details
- [ ] Click "Create Project"
- [ ] Verify it appears in dashboard

---

## 🎉 You're Done!

**Total Time**: ~10 minutes

Your admin dashboard is now fully functional!

---

## 🔍 Verification Checklist

Make sure everything works:

- [ ] Can log in at `/admin`
- [ ] Can see dashboard at `/admin/dashboard`
- [ ] Can create a new project
- [ ] Can see project in list
- [ ] Can toggle publish/unpublish
- [ ] Can delete a project
- [ ] Can upload files
- [ ] Can log out

---

## 🆘 Troubleshooting

### Can't log in?
→ Check `ADMIN_SETUP.md` → "Troubleshooting" section

### Database errors?
→ Make sure you ran the entire `schema.sql` file

### Upload not working?
→ Verify the storage bucket was created in Supabase

### Need help?
→ Check the detailed guides:
- `ADMIN_SETUP.md` - Full setup instructions
- `ADMIN_VISUAL_GUIDE.md` - UI walkthrough
- `IMPLEMENTATION_SUMMARY.md` - Technical details

---

## 📚 Documentation Files

- ✅ `ADMIN_SETUP.md` - Detailed setup guide
- ✅ `ADMIN_VISUAL_GUIDE.md` - UI and workflow guide
- ✅ `IMPLEMENTATION_SUMMARY.md` - Technical overview
- ✅ `QUICK_START.md` - This checklist
- ✅ `.env.example` - Environment template
- ✅ `supabase/schema.sql` - Database schema

---

**Happy creating! 🚀**
