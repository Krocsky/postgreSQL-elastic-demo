import redis from 'redis'
import redisWrapper from '@cybereits/ccl/redisWrapper'
import env from '../../config/env'

let ip = env.redis.host
let port = env.redis.port

let client = redis.createClient(port, ip, {
    password: env.redis.pwd,
    db: env.redis.database,
})
let wrapper = redisWrapper(redis, {
    host: ip,
    port,
})

client
    .on('ready', () => console.log('redis connected successfully.'))
    .on('reconnecting', () => console.log('redis reconnecting...'))
    .on('error', (err) => console.error(`redis connect error:${err}`))

export const longConnection = client
export const tempConnection = wrapper