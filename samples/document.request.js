/*
 *  samples/document.request.js
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
const cfg = require("./cfg.json")

/**
 */
const _response_handler = _.promise(self => {
    _.promise.validate(self, _response_handler)

    console.log("-", "timeout", self.nats$is_timeout)
    console.log("-", "document", self.document)

    self = nats.close.i(self)
})

_response_handler.method = "_response_handler"
_response_handler.description = ``
_response_handler.requires = {
}
_response_handler.accepts = {
    document: _.is.String,
}
_response_handler.produces = {
}

/**
 */
_.promise({
    nats$cfg: cfg,
})
    .then(nats.initialize)
    .then(nats.request.p("foo", "what time is it", _response_handler))
    .except(_.error.log)
