module.exports = {
    apps: [
        {
            name: 'T-Mail',
            script: 'dist/src/index.js',
            watch: true,
            autorestart: true,
            instances: 1,
        }
    ]
};