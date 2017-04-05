var f2s = require('../index')
var stream = require('stream')
var assert = require('assert')

describe('f2s', function () {
    it('should work', function (done) {

        var transformStream = f2s([
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
            .pipe(transformStream)
            .once('error', done)
            .on('data', function (data) {
                assert(data.cb)
                assert(data.promise)
                assert(data.sync)
            })
            .once('finish', done)

        readable.push({key:'value1'})
        readable.push({key:'value2'})
        readable.push(null)
    })

    it('should work', function (done) {

        var transformStream = f2s(
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
        )

        var readable = new stream.Readable({
            objectMode: true
        })

        readable
            .once('error', done)
            .pipe(transformStream)
            .once('error', done)
            .on('data', function (data) {
                assert(data.cb)
                assert(data.promise)
                assert(data.sync)
            })
            .once('finish', done)

        readable.push({key:'value1'})
        readable.push({key:'value2'})
        readable.push(null)
    })
})
