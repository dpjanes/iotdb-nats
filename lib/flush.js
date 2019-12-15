/*
 *  lib/flush.js
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

/**
 */
const flush = _.promise((self, done) => {
    _.promise(self)
        .validate(flush)

        .wrap(self.nats.flush.bind(self.nats), [], "_")

        .end(done, self)
})

flush.method = "flush"
flush.description = ``
flush.requires = {
    nats: _.is.Object,
}
flush.accepts = {
}
flush.produces = {
    nats: _.is.Null,
}

/**
 *  API
 */
exports.flush = flush
