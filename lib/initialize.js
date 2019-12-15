/*
 *  lib/initialize.js
 *
 *  David Janes
 *  IOTDB.org
 *  2019-12-15
 *
 *  Copyright (2013-2020) David P. Janes
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

const logger = require("../logger")(__filename)

/**
 */
const initialize = _.promise(self => {
    const NATS = require("nats")

    _.promise.validate(self, initialize)

    logger.trace({
        method: initialize.method,
    }, "called")

    if (self.nats$cfg.url) {
        self.nats = NATS.connect(self.nats$cfg.url)
    } else if (self.nats$cfg.options) {
        self.nats = NATS.connect(self.nats$cfg.options)
    } else {
        self.nats = NATS.connect()
    }

    self.nats.__cfg = self.nats$cfg
    self.nats.__cfg.request_timeout = self.nats.__cfg.request_timeout || 10000
})

initialize.method = "initialize"
initialize.description = `Initialize a connection to NATS

    Essentially nats.connect()
`
initialize.requires = {
    nats$cfg: _.is.Dictionary,
}
initialize.accepts = {
    nats$cfg: {
        url: _.is.String,
        options: _.is.Dictionary,
        request_timeout: _.is.Number,
    },
}
initialize.produces = {
    nats: _.is.Object,
}

/**
 *  API
 */
exports.initialize = initialize
