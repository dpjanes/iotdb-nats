/*
 *  lib/publish.js
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
const publish = _.promise((self, done) => {
    _.promise(self)
        .validate(publish)

        .wrap(self.nats.publish.bind(self.nats), [ self.subject, self.document, null ], "_")

        .end(done, self)
})

publish.method = "publish"
publish.description = ``
publish.requires = {
    nats: _.is.Object,
    subject: _.is.String,
    document: _.is.String,
}
publish.produces = {
}
publish.params = {
    subject: _.p.normal,
    document: _.p.normal,
}
publish.p = _.p(publish)

/**
 */
const publish_json = _.promise((self, done) => {
    _.promise(self)
        .validate(publish_json)

        .then(document.from.json)
        .then(publish)

        .end(done, self)
})

publish_json.method = "publish.json"
publish_json.description = ``
publish_json.requires = {
    nats: _.is.Object,
    subject: _.is.String,
    json: _.is.JSON,
}
publish_json.produces = {
}
publish_json.params = {
    subject: _.p.normal,
    json: _.p.normal,
}
publish_json.p = _.p(publish_json)


/**
 *  API
 */
exports.publish = publish
exports.publish.json = publish_json
