"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fairmont = require("fairmont");

var _utils = require("./utils");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Panda Sky Mixin: KMS
// This mixin allocates the requested KMS keys into your CloudFormation stack. Keys are retained after stack deletion, so here we scan for them in KMS before adding them to a new CFo template.
var process;

process = (() => {
  var _ref = _asyncToGenerator(function* (SDK, config) {
    var c, env, exists, i, k, keys, len, output, tags;
    exists = yield (0, _utils.existenceCheck)(SDK);
    // Start by extracting out the KMS Mixin configuration:
    ({ env, tags = [] } = config);
    c = config.aws.environments[env].mixins.kms;
    c = (0, _fairmont.isObject)(c) ? c : {};
    c.tags = (0, _fairmont.cat)(c.tags || [], tags);
    // Don't ask for resources that already exist.
    ({ keys = [], tags } = c);
    output = [];
    for (i = 0, len = keys.length; i < len; i++) {
      k = keys[i];
      if (!(yield exists(k.name))) {
        output.push((0, _utils.expand)(k, tags, config.environmentVariables.fullName));
      }
    }
    return {
      keys: output,
      vpc: config.aws.vpc,
      region: config.aws.region
    };
  });

  return function process(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = process;