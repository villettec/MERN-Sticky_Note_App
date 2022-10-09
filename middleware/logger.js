const { format } = require('date-fns')
//rename v4 to uuid
const { v4: uuid } = require('uuid')
//comes from node, filesystem already built in
const fs = requre('fs')
const fsPromises = requre('fs').promises
const path = require('path')
const { dirname } = require('path')

// from dateDNS docs
const logEvents = async (message, logFile) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName))
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}