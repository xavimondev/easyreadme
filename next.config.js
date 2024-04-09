/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        "source": "/git",
        "destination": "https://github.com/xavimondev/easyreadme",
        "permanent": true
      }
    ]
  }
}

module.exports = nextConfig
