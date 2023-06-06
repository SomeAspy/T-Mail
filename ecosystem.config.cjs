module.exports = {
    apps: [
        {
            name: 'T-Mail Server',
            script: 'dist/src/index.js',
            watch: true,
            autorestart: true,
        }
    ]
};