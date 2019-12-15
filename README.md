# iotdb-nats
POP interface to [NATS](https://docs.nats.io/nats-concepts/intro)

## Introduction

Simple implementation, likely incomplete, to allow using NATS
from a POP interface.

The "native" NodeJS interface is [here](https://github.com/nats-io/nats.js).

## Sample Code

Full examples can be found in `./samples`, this is the bare necessities:

This 

    const _ = require("iotdb-helpers")
    const nats = require("iotdb-nats")
    const cfg = {
        "url": "nats://localhost",
    }

### Publish / Subscribe

Publish:

    _.promise({
        nats$cfg: cfg,
    })
        .then(nats.initialize)
        .then(nats.publish.p("foo", "hello, world"))
        .then(nats.close)
        .except(_.error.log)

Subscribe:

    const _handler = _.promise(self => {
        _.promise.validate(self, _handler)

        console.log("-", "received", self.document)
    })

    _.promise({
        nats$cfg: cfg,
    })
        .then(nats.initialize)
        .then(nats.subscribe.p("foo", _handler))
        .except(_.error.log)

## Request / Response

Request:

    const _response_handler = _.promise(self => {
        console.log("-", "timeout", self.nats$is_timeout)
        console.log("-", "document", self.document)

        self = nats.close.i(self)
    })

    _.promise({
        nats$cfg: cfg,
    })
        .then(nats.initialize)
        .then(nats.request.p("foo", "what time is it", _response_handler))
        .except(_.error.log)

Responder:

    const _request_handler = _.promise(self => {
        console.log("-", "REQUEST", self.document)

        self.document = "It is " + _.timestamp.make()
    })

    _.promise({
        nats$cfg: cfg,
    })
        .then(nats.initialize)
        .then(nats.responder.p("foo", _request_handler))
        .except(_.error.log)

