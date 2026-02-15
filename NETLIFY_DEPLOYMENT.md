# Netlify Deployment Checklist for Settings Feature

## ✅ Pre-Deployment Steps

### 1. Supabase Database Setup (ALREADY DONE ✓)
- [x] Created `site_settings` table in Supabase
- [x] Inserted default settings row
- [x] Set up Row Level Security policies

### 2. Environment Variables in Netlify

Go to: **Netlify Dashboard → Your Site → Site settings → Environment variables**

Add these 3 variables:

```
NEXT_PUBLIC_SUPABASE_URL
Value: https://prlsyoieyubuwwbbhegm.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBybHN5b2lleXVidXd3YmJoZWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MjUxMjIsImV4cCI6MjA4NjIwMTEyMn0.ZvbBnYiwNAYuePyvcSDSuSrSXvdy7j9xIYohreuzPXc

SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBybHN5b2lleXVidXd3YmJoZWdtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDYyNTEyMiwiZXhwIjoyMDg2MjAxMTIyfQ.7px9sw7QGwLYoP2Gf-b6kjIPnkBa_4Aj1ci6paU-j3U
```

**Important:** After adding these, you MUST redeploy your site for them to take effect!

---

## 🚀 Deployment Steps

### Option 1: Push to Git (Recommended)
```bash
git add .
git commit -m "Add dynamic settings system with admin panel"
git push origin main
```

Netlify will automatically deploy when you push to your main branch.

### Option 2: Manual Deploy
1. Build locally: `npm run build`
2. Upload the `.next` folder to Netlify

---

## 🧪 Testing After Deployment

### 1. Test the Admin Login
- Go to: `https://your-site.netlify.app/admin`
- Login with your admin credentials

### 2. Test Settings Update
- Go to: `https://your-site.netlify.app/admin/dashboard/settings`
- Change some values (e.g., Site Title, Hero Title)
- Click "Save Changes"
- You should see a success message

### 3. Verify Changes on Homepage
- Go to: `https://your-site.netlify.app`
- Hard refresh (Ctrl+Shift+R)
- Check if your changes appear:
  - Browser tab title should show your new Site Title
  - Hero section should show your new Hero Title
  - Contact info should show your updated email/phone

---

## 🐛 Troubleshooting

### If settings don't save:
1. Check Netlify Function Logs:
   - Netlify Dashboard → Functions → View logs
   - Look for errors in the `/api/settings` function

2. Check Supabase Logs:
   - Supabase Dashboard → Logs
   - Look for failed UPDATE queries

### If settings don't appear on homepage:
1. Clear Netlify cache:
   - Netlify Dashboard → Deploys → Trigger deploy → Clear cache and deploy
2. Hard refresh your browser (Ctrl+Shift+R)
3. Check browser console for errors (F12)

### Common Issues:
- **"Table not found"**: Run the SQL schema in Supabase
- **"Unauthorized"**: Check environment variables are set correctly
- **"Network error"**: Check Supabase URL is correct

---

## 📝 What Changed

### Files Modified:
1. `app/page.tsx` - Now fetches settings from database
2. `app/api/settings/route.ts` - API endpoints for settings
3. `app/admin/dashboard/settings/page.tsx` - Admin settings UI
4. `supabase/settings-schema.sql` - Database schema

### Features Added:
- ✅ Dynamic site title and description
- ✅ Editable hero section (title, subtitle, video, CTAs)
- ✅ Editable about section
- ✅ Editable contact information
- ✅ Admin panel with orange/amber theme
- ✅ Real-time updates (no rebuild needed!)

---

## 🎉 Success Criteria

Your deployment is successful when:
- [x] You can login to `/admin`
- [x] You can edit settings in `/admin/dashboard/settings`
- [x] Changes save without errors
- [x] Homepage reflects your changes after refresh
- [x] No console errors in browser or Netlify logs
