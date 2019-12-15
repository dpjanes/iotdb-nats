/*
 *  lib/request.js
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
const request = _.promise(self => {
    _.promise.validate(self, request)

    self.nats.request(self.subject, self.document, { max: 1 }, response => {
        _.promise(self)
            .add({
                document: response,
            })
            .then(self.handler)
            .except(_.error.log)
    })
})

request.method = "request"
request.description = ``
request.requires = {
    nats: _.is.Object,
    subject: _.is.String,
    document: _.is.String,
    handler: _.is.Function,
}
request.produces = {
}
request.params = {
    subject: _.p.normal,
    document: _.p.normal,
    handler: _.p.normal,
}
request.p = _.p(request)

/**
 *  API
 */
exports.request = request
