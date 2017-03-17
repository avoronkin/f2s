# f2s


```javascript

var assert = require('assert')
var f2s = require('f2s')
var stream = require('stream')

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
.pipe(testStream)
.on('data', function (data) {
    assert(data.cb)
    assert(data.promise)
    assert(data.sync)
})

readable.push({key:'value1'})
readable.push({key:'value2'})
readable.push(null)

```
