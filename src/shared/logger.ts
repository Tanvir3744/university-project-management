import { createLogger, format, transports } from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file'; 

// importing things from winston format method
const { combine, timestamp, label, printf } = format;

//format function 

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${date.toDateString()}, - , ${hours}: ${minutes}: ${seconds}   [${label}] ${level}: ${message}`;
});


const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: "right meow!" }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(), "logs", "winston","successes", "university-%DATE%-sucess.log"),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ],
})

const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: "right meow!" }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(), "logs", "winston","errors", "university-%DATE%-error.log"),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '15d'
    })
  ],  
})

export { logger, errorLogger }
