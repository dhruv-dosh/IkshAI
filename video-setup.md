# Video Background Setup Instructions

## 📹 How to Add Your Video

Your hero section is now set up for a video background! Follow these steps:

### Step 1: Choose Your Video

**Option 1: Use a Free Stock Video**
- Visit **Pexels Videos**: https://www.pexels.com/videos/
- Search for: "technology", "AI", "futuristic", "abstract", "data"
- Download MP4 format

**Option 2: Use Pixabay**
- Visit: https://pixabay.com/videos/
- Similar search terms

**Recommended specs:**
- Resolution: 1920x1080 (Full HD) minimum
- Duration: 10-30 seconds (it will loop)
- Format: MP4
- File size: Under 5MB for fast loading

### Step 2: Add Video to Your Website

1. Download your chosen video
2. Rename it to: `hero-video.mp4`
3. Place it in: `d:\Customer Support Agent\Website\`
4. The code already references it!

### Step 3: Test

1. Refresh your browser
2. The video should autoplay in the background
3. Text will appear over the video with a dark overlay

## ✨ Current Features

✅ **Autoplay** - Video starts automatically
✅ **Muted** - No sound (required for autoplay)
✅ **Looping** - Video repeats continuously
✅ **Full-screen** - Covers entire hero section
✅ **Responsive** - Scales properly on all devices
✅ **Overlay** - Dark overlay (50% opacity) for text readability
✅ **Text contrast** - White text with shadow for visibility

## 🎨 Video Suggestions

Good video themes for IKSH AI:
- Abstract technology animations
- Digital data streams
- Futuristic cityscapes
- Neural network visualizations
- Code or data processing
- Minimal motion graphics

## ⚙️ Customization Options

### Adjust overlay darkness:
In `styles.css`, line ~656:
```css
background: rgba(0, 0, 0, 0.5); /* Change 0.5 to 0.3 (lighter) or 0.7 (darker) */
```

### Change video:
Just replace `hero-video.mp4` with your new video file.

## 🚀 Ready to Go!

Once you add `hero-video.mp4` to your website folder, refresh and enjoy your stunning video background!
