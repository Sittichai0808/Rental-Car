import sha256 from 'crypto-js/sha256.js'

export const hashPassword = (password) => sha256(password + process.env.PASSWORD_SECRET)
