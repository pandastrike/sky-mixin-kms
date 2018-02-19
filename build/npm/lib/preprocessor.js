"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fairmont = require("fairmont");

var _utils = require("./utils");

var _presets = require("./presets");

var _presets2 = _interopRequireDefault(_presets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Panda Sky Mixin: KMS
// This mixin allocates the requested KMS keys into your CloudFormation stack. Keys are retained after stack deletion, so here we scan for them in KMS before adding them to a new CFo template.
var process;

process = function (SDK, config) {
  return {
    // exists = await _exists SDK

    // # Start by extracting out the Cognito Mixin configuration:
    // {env, tags=[]} = config
    // c = config.aws.environments[env].mixins.cognito
    // c = if isObject c then c else {}
    // c.tags = cat (c.tags || []), tags

    // # Expand the preset name to the full configuraiton template.
    // {pools=[], tags} = c
    // output = []
    // for p in pools
    //   # Don't ask for resources that already exist.
    //   deployment = await exists p.name
    //   output.push expandPreset p, tags, deployment
    keys: []
  };
};

exports.default = process;