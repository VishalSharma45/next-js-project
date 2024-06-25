import 'dotenv/config'

const { username, password } = process.env;
export const connectionStr = process.env.MONGODB_URL