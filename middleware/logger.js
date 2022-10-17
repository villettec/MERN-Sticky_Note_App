const { format } = require('date-fns')
//rename v4 to uuid
const { v4: uuid } = require('uuid')
//comes from node, filesystem already built in
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')
const { dirname } = require('path')

// from dateDNS docs
const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

// Export both our functions we made here to use elsewhere.
module.exports = { logEvents, logger }