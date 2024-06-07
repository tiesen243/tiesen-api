export const getBaseUrl = () => {
  if (process.env.APP_URL) return `https://${process.env.APP_URL}`
  else return 'http://localhost:3000'
}
