/*
 *  lib/subscribe.js
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
const document = require("iotdb-document")

/**
 */
const subscribe = _.promise(self => {
    _.promise.validate(self, subscribe)

    self.nats.subscribe(self.subject, (message, reply, subject, sid) => {
        _.promise(self)
            .add({
                document: message,
                subject: subject,
                reply: reply,
                sid: sid,
            })
            .then(self.handler)
            .except(_.error.log)
    })
})

subscribe.method = "subscribe"
subscribe.description = ``
subscribe.requires = {
    nats: _.is.Object,
    subject: _.is.String,
    handler: _.is.Function,
}
subscribe.produces = {
}
subscribe.params = {
    subject: _.p.normal,
    handler: _.p.normal,
}
subscribe.p = _.p(subscribe)

/**
 */
const subscribe_json = _.promise(self => {
    _.promise.validate(self, subscribe_json)

    self.nats.subscribe(self.subject, (message, reply, subject, sid) => {
        _.promise(self)
            .add({
                document: message,
                subject: subject,
                reply: reply,
                sid: sid,
            })
            .then(document.to.json)
            .then(self.handler)
            .except(_.error.log)
    })
})

subscribe_json.method = "subscribe_json"
subscribe_json.description = ``
subscribe_json.requires = {
    nats: _.is.Object,
    subject: _.is.String,
    handler: _.is.Function,
}
subscribe_json.produces = {
}
subscribe_json.params = {
    subject: _.p.normal,
    handler: _.p.normal,
}
subscribe_json.p = _.p(subscribe_json)

/**
 *  API
 */

/**
 *  API
 */
exports.subscribe = subscribe
exports.subscribe.json = subscribe_json
