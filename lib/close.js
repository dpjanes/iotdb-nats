/*
 *  lib/close.js
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
const _immediate = self => {
    const NATS = require("nats")

    _.promise.validate(self, _immediate)

    if (self.nats) {
        self.nats.close()
    }

    self.nats = null
}

_immediate.method = "close.i"

const close = _.promise(_immediate)
close.method = "close"
close.description = `Closes the connection to NATS. Can be called multiple times`
close.requires = {
}
close.accepts = {
}
close.produces = {
    nats: _.is.Null,
}
close.i = _.i(_immediate)

/**
 *  API
 */
exports.close = close
