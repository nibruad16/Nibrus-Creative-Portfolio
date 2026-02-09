# Admin Dashboard Setup Guide

## 🚀 Quick Start

Your portfolio now has a powerful admin dashboard to manage projects in real-time using Supabase!

## 📋 Setup Instructions

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Project name**: `cinematic-portfolio` (or your choice)
   - **Database password**: Create a strong password
   - **Region**: Choose closest to you
5. Wait for the project to be created (~2 minutes)

### 2. Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys" → "anon public")
   - **service_role key** (under "Project API keys" → "service_role" - click "Reveal" first)

### 3. Update Environment Variables

Open `.env.local` and replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 4. Run the Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql`
4. Paste it into the SQL editor
5. Click "Run" or press `Ctrl+Enter`
6. You should see "Success. No rows returned"

### 5. Create Your Admin User

1. In Supabase, go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Fill in:
   - **Email**: Your admin email (e.g., `admin@example.com`)
   - **Password**: Create a strong password
   - **Auto Confirm User**: ✅ Check this box
4. Click "Create user"

### 6. Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
pnpm dev
```

## 🎯 Using the Admin Dashboard

### Access the Dashboard

1. Navigate to: `http://localhost:3000/admin`
2. Log in with the email and password you created in Supabase
3. You'll be redirected to the dashboard at `/admin/dashboard`

### Managing Projects

#### Create a New Project

1. Click "New Project" button
2. Fill in the form:
   - **Project Type**: Video or Image
   - **Title**: Your project title (slug auto-generates)
   - **Description**: Project description
   - **Category**: Choose from predefined categories
   - **YouTube URL**: (for video projects)
   - **Cover Image**: Upload or paste URL
   - **Additional Content**: Add multiple videos or images
3. Toggle "Publish Immediately" if you want it live right away
4. Click "Create Project"

#### Edit a Project

1. In the dashboard, click the edit icon (pencil) on any project
2. Modify the fields
3. Click "Update Project"

#### Delete a Project

1. Click the trash icon on any project
2. Confirm the deletion

#### Toggle Visibility

1. Click the eye icon to publish/unpublish a project
2. Unpublished projects won't show on your public portfolio

## 📁 File Upload

The dashboard supports file uploads to Supabase Storage:

1. Click the upload button next to any image/video field
2. Select your file
3. It will automatically upload and insert the URL

## 🔐 Security Features

- **Row Level Security (RLS)**: Only authenticated users can modify projects
- **Public Read Access**: Published projects are visible to everyone
- **Secure File Storage**: Files are stored in Supabase Storage with proper permissions

## 🎨 Features

- ✅ Real-time project management
- ✅ Beautiful gradient UI with dark theme
- ✅ File upload to Supabase Storage
- ✅ Publish/unpublish toggle
- ✅ Video and image project types
- ✅ Category management
- ✅ YouTube integration
- ✅ Image galleries with captions and AI prompts
- ✅ Responsive design

## 🔄 Migrating Existing Projects

To migrate your existing projects from `lib/data.ts` to Supabase:

1. Go to `/admin/dashboard`
2. Click "New Project" for each existing project
3. Copy the data from `lib/data.ts`
4. Paste into the form and save

Or use the Supabase SQL editor to bulk insert:

```sql
INSERT INTO projects (type, slug, title, description, category, youtube_url, published)
VALUES 
  ('video', 'my-project', 'My Project', 'Description', 'Travel', 'https://youtube.com/...', true);
```

## 🐛 Troubleshooting

### "Invalid API key" error
- Double-check your `.env.local` values
- Make sure there are no extra spaces
- Restart your dev server

### "Row Level Security" error
- Make sure you ran the `schema.sql` file completely
- Check that RLS policies were created in Supabase → Database → Policies

### Can't log in
- Verify your user exists in Supabase → Authentication → Users
- Make sure "Auto Confirm User" was checked
- Try resetting the password in Supabase

### Files won't upload
- Check that the `project-media` bucket exists in Supabase → Storage
- Verify storage policies were created
- Check file size limits (default is 50MB)

## 📞 Need Help?

Check the Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)
