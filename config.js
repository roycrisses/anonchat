// AnonChat Configuration
const config = {
    // Google OAuth Configuration
    googleClientId: '522966423715-bqcif1to9hreso1ulf1q6tifh0rh1mt3.apps.googleusercontent.com',
    
    // App Configuration
    appName: 'AnonChat',
    appVersion: '1.0.0',
    
    // Feature Flags
    enableGoogleLogin: true,
    enableGuestLogin: true,
    enableSearch: true,
    enableCustomEnvironments: true,
    
    // UI Configuration
    theme: {
        primaryRed: '#dc2626',
        primaryBlue: '#3b82f6',
        backgroundDark: '#1a1a1a'
    },
    
    // Chat Configuration
    maxMessageLength: 500,
    maxUsernameLength: 20,
    typingIndicatorDelay: 1000,
    
    // Environment Configuration
    defaultEnvironments: {
        geopolitics: { id: 'GEO001', name: 'Geo Politics', icon: '🌍', desc: 'Global affairs & political discussions' },
        science: { id: 'SCI002', name: 'Science', icon: '🔬', desc: 'Scientific discoveries & research' },
        education: { id: 'EDU003', name: 'Education', icon: '📚', desc: 'Learning & academic discussions' },
        programming: { id: 'PRO004', name: 'Programming', icon: '💻', desc: 'Code, tech & development' },
        'social-media': { id: 'SOC005', name: 'Social Media', icon: '📱', desc: 'Trends & digital culture' },
        memes: { id: 'MEM006', name: 'Memes', icon: '😂', desc: 'Humor & viral content' }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} 