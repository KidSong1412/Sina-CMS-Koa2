module.exports = {
  apps: [{
    name: "SINA-CMS-KOA2",
    script: "bin/www",
    watch: true,
    instances: 2,
    env_development: {
      "NODE_ENV": "development"
    },
    env_production: {
      "NODE_ENV": "production"
    }
  }]
}