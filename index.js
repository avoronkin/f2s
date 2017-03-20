var pipe = require('multipipe')
var stream = require('stream')
var wrapped = require('wrapped')

module.exports = function (fns) {
    return pipe(fns.map(function (fn) {
        return functionToStream(fn)
    }))
}

function functionToStream (fn) {
    return new stream.Transform({
        objectMode: true,
        transform: function (doc, enc, next) {
            wrapped(fn).call(this, doc, next)
        }
    })
}
