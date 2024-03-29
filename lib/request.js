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

const NATS = require("nats")

/**
 */
const request = _.promise(self => {
    _.promise.validate(self, request)

    const options = _.d.clone(self.nats$options || {})
    options.max = options.max || 1
    options.timeout = options.timeout || self.nats.__cfg.request_timeout 

    self.nats.request(self.subject, self.document, options, nats$response => {
        let document = nats$response
        let nats$is_timeout = false

        if (!_.is.String(document)) {
            document = null

            if ((nats$response instanceof NATS.NatsError) && (nats$response.code === NATS.REQ_TIMEOUT)) {
                nats$is_timeout = true
            }
        }

        _.promise(self)
            .add({
                document: document,
                nats$response: nats$response,
                nats$is_timeout: nats$is_timeout,
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
request.accepts = {
    nats$options: {
        max: _.is.Number,
        timeout: _.is.Number,
    },
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
 */
const request_json = _.promise(self => {
    _.promise.validate(self, request_json)

    const options = _.d.clone(self.nats$options || {})
    options.max = options.max || 1
    options.timeout = options.timeout || self.nats.__cfg.request_timeout 

    self.nats.request(self.subject, JSON.stringify(self.json), options, nats$response => {
        let document = nats$response
        let nats$is_timeout = false

        if (!_.is.String(document)) {
            document = null

            if ((nats$response instanceof NATS.NatsError) && (nats$response.code === NATS.REQ_TIMEOUT)) {
                nats$is_timeout = true
            }
        }

        const json = _.is.String(document) ? JSON.parse(document) : null

        _.promise(self)
            .add({
                json: json,
                document: document,
                nats$response: nats$response,
                nats$is_timeout: nats$is_timeout,
            })
            .then(self.handler)
            .except(_.error.log)
    })
})

request_json.method = "request.json"
request_json.description = ``
request_json.requires = {
    nats: _.is.Object,
    subject: _.is.String,
    json: _.is.JSON,
    handler: _.is.Function,
}
request_json.accepts = {
    nats$options: {
        max: _.is.Number,
        timeout: _.is.Number,
    },
}
request_json.produces = {
}
request_json.params = {
    subject: _.p.normal,
    json: _.p.normal,
    handler: _.p.normal,
}
request_json.p = _.p(request_json)

/**
 *  API
 */
exports.request = request
exports.request.json = request_json
