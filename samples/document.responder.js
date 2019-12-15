/*
 *  samples/document.responder.js
 *
 *  David Janes
 *  IOTDB.org
 *  2019-12-15
 *
 *  Copyright (2013-2019) David P. Janes
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict"
const _ = require("iotdb-helpers")
const nats = require("iotdb-nats")

/**
 */
const _request_handler = _.promise(self => {
    _.promise.validate(self, _request_handler)

    console.log("-", "REQUEST", self.document)

    self.document = "It is " + _.timestamp.make()
})

_request_handler.method = "_request_handler"
_request_handler.description = ``
_request_handler.requires = {
    document: _.is.String,
}
_request_handler.produces = {
    document: _.is.String,
}

/**
 */
_.promise({
    nats$cfg: {},
})
    .then(nats.initialize)
    .then(nats.responder.p("foo", _request_handler))
    .except(_.error.log)
