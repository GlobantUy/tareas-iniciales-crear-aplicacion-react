const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
  } = require('next/constants')
  
  // This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
  module.exports = (phase) => {
    // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
    const isDev = phase === PHASE_DEVELOPMENT_SERVER
    // when `next build` or `npm run build` is used
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
    // when `next build` or `npm run build` is used
    const isStaging =
      phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'
    const isVercel = 
      phase === PHASE_DEVELOPMENT_SERVER && process.env.VERCEL === '1'
  
    console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}   isVercel:${isVercel}`)
  
    const env = {
      RESTURL_BACKEND: (() => {
        if (isDev && !isVercel) return 'http://localhost:3001/api'
        if (isProd) return 'http://api:3001/api'
        if (isVercel) return 'https://backendmain-2yi8csclp.vercel.app/api/login'
        if (isStaging) return 'http://localhost:33001/api'
        return 'RESTURL_BACKEND:not (isDev,isProd && !isStaging,isProd && isStaging)'
      })(),
      RESTURL_FRONTEND: (() => {
        if (isDev && !isVercel) return 'http://localhost:3000'
        if (isProd) return 'http://localhost:3000'
        if (isVercel) return 'http://localhost:3000'
        if (isStaging) return 'http://localhost:33000'
        return 'RESTURL_FRONTEND:not (isDev,isProd && !isStaging,isProd && isStaging)'
      })(),
      RESTURL_DATABASE: (() => {
        if (isDev && !isVercel) return 'mongodb+srv://admin:1234@mongodb:27017/stb_prestamos'
        if (isProd) return 'mongodb+srv://admin:1234@mongodb:27017/stb_prestamos'
        if (isVercel) return "mongodb+srv://test1:123@cluster0.e2axf.mongodb.net/database?retryWrites=true&w=majority"
        if (isStaging) return 'mongodb+srv://test:1234@mongodb:27017/stb_prestamos'
        return 'RESTURL_DATABASE:not (isDev,isProd && !isStaging,isProd && isStaging)'
      })(),
    }  
    // next.config.js object
    return {
      env,
    }
  }
