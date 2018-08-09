import { createLogger, LoggerType } from '@cybereits/lib-elk-logger'
import { name } from '../package.json'
import { isDebug } from '../config/env.json'

export const logicLogger = createLogger(`${name}-business`, { loggerType: LoggerType.BUSINESSLOG, isDev: isDebug })
export const sysLogger = createLogger(`${name}-system`, { loggerType: LoggerType.SYSTEMLOG, isDev: isDebug })
