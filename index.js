var pipe = require('multipipe')
var stream = require('stream')
var wrapped = require('wrapped')

module.exports = function () {
    var handlers = [].concat.apply([], arguments)
    return pipe(handlers.map(function (fn) {
        return typeof fn === 'function' ? functionToStream(fn) : fn
    }))
}

function functionToStream (fn) {
    return new stream.Transform({
        objectMode: true,
        transform: function (doc, enc, next) {
            wrapped(fn).call(this, doc, function (err, doc) {
                if (err) {
                    return next(err)
                }

                if (doc) {
                    return next(null, doc)
                } else {
                    next()
                }
            })
        }
    })
}
