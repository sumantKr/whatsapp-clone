/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  styledComponents: true,
  env:{
    API_KEY: "AIzaSyDVT9kYB98olNgvvhtSeeWGBqeCpeKalh0",
    AUTH_DOMAIN: "whatsapp-clone-73e59.firebaseapp.com",
    PROJECT_ID: "whatsapp-clone-73e59",
    STORAGE_BUCKET: "whatsapp-clone-73e59.appspot.com",
    MESSAGING_SENDER_ID: "163135957978",
    APP_ID: "1:163135957978:web:c7636e9ef3fd7ce5ee2ee3"
  }
}

module.exports = nextConfig
