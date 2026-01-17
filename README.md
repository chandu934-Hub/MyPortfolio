# Portfolio Website

A modern, responsive portfolio website with dark/light mode theme switching and beautiful animations.

## Features

✨ **Modern Design**
- Clean and professional layout
- Smooth animations and transitions
- Responsive design for all devices

🎨 **Theme Switching**
- Dark mode and light mode
- Theme preference saved in browser
- Smooth theme transitions

🎯 **Sections Included**
- Hero section with animated background
- About section with statistics
- Skills section with animated progress bars
- Certifications section with image gallery and modal view
- Projects showcase
- Contact form
- Social media links

📱 **Responsive**
- Mobile-friendly navigation
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript
- Font Awesome Icons

## Setup Instructions

1. **Add Your Certification Images**
   - Place your certification images in the `images/` folder
   - Name them as: `cert1.jpg`, `cert2.jpg`, `cert3.jpg`, `cert4.jpg`
   - Recommended size: 800x600px or similar aspect ratio

2. **Customize Content**
   - Open `index.html` and update:
     - Your name in the hero section
     - About me text
     - Skills and their progress percentages
     - Certification details
     - Project information
     - Contact information
     - Social media links

3. **Color Customization**
   - Edit CSS variables in `styles.css` (lines 6-20) to change colors:
     ```css
     --primary-color: #6366f1;
     --secondary-color: #8b5cf6;
     --accent-color: #ec4899;
     ```

4. **Open the Website**
   - Simply open `index.html` in your web browser
   - Or use a local server for better performance

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── script.js           # JavaScript functionality
├── images/             # Your images folder
│   ├── cert1.jpg
│   ├── cert2.jpg
│   ├── cert3.jpg
│   └── cert4.jpg
└── README.md          # This file
```

## Features Breakdown

### Theme Toggle
- Click the moon/sun icon in the navbar to switch themes
- Your preference is saved automatically
- All colors adapt seamlessly

### Certifications
- Click on any certification to view it in full size
- Modal popup with zoom functionality
- Easy navigation with keyboard (ESC to close)

### Animations
- Scroll-triggered animations
- Typing effect in hero section
- Skill bar animations
- Hover effects on all interactive elements
- Smooth page scrolling
- Parallax effects

### Contact Form
- Form validation
- Success notification
- Ready to integrate with backend

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Tips for Customization

1. **Adding More Skills**: Copy a `.skill-card` div in the HTML
2. **Adding More Certifications**: Copy a `.certification-card` div
3. **Adding More Projects**: Copy a `.project-card` div
4. **Changing Animations**: Edit keyframes in `styles.css`

## License

Feel free to use this template for your personal portfolio!

## Credits

- Icons: [Font Awesome](https://fontawesome.com/)
- Design: Custom modern design
- Built with ❤️ for developers
![alt text](image.png)
---

**Need help?** Feel free to customize any part of the code to match your style!
