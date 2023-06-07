module.exports = {
    apps: [
        {
            name: 'T-Mail',
            script: 'src/index.js',
            watch: true,
            autorestart: true,
            instances: 1,
        }
    ]
};