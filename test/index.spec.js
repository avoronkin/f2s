var f2s = require('../index')
var stream = require('stream')

describe('f2s', function () {
    it('should work', function (done) {

        var testStream = f2s([
            function (doc, cb) {
                doc.cb = true
                cb(null, doc)
            },
            function (doc) {
                return Promise.resolve()
                .then(function () {
                    doc.promise = true
                    return doc
                })
            },
            function (doc) {
                doc.sync = true
                return doc
            }
        ])

        var readable = new stream.Readable({
            objectMode: true
        })

        readable
        .once('error', done)
        .pipe(testStream)
        .once('error', done)
        .on('data', function (data) {
            console.log('data', data)
        })
        .once('finish', done)

        readable.push({key:'value1'})
        readable.push({key:'value2'})
        readable.push(null)
    })
})
