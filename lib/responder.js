/*
 *  lib/responder.js
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
const responder = _.promise(self => {
    const nats = require("..")

    _.promise.validate(self, responder)

    self.nats.subscribe(self.subject, (message, reply, subject, sid) => {
        _.promise(self)
            .add({
                document: message,
                subject: subject,
                reply: reply,
                sid: sid,
            })
            .then(self.handler)
            .then(nats.publish.p(reply, null))

            .except(_.error.log)
    })
})

responder.method = "responder"
responder.description = ``
responder.requires = {
    nats: _.is.Object,
    subject: _.is.String,
    handler: _.is.Function,
}
responder.produces = {
}
responder.params = {
    subject: _.p.normal,
    handler: _.p.normal,
}
responder.p = _.p(responder)

/**
 *  API
 */
exports.responder = responder
