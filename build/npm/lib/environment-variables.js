"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsYaml = require("js-yaml");

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fairmont = require("fairmont");

var _sundog = require("sundog");

var _sundog2 = _interopRequireDefault(_sundog);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Panda Sky Mixin: KMS Lambda environment variables
// This mixin grants the API Lambdas access to KMS keys.  This looks up the Key IDs so that they may be stored within the Lambda's environment variable store.
var getEnvironmentVariables;

// TODO: For now, this will only store the first pool's User Pool and client IDs. Make this more generalized.
getEnvironmentVariables = function (config, global, SDK) {
  return {};
};

// exists = await _exists SDK

// names = collect project "name", config.pools
// if !names || empty names
//   return {}
// else
//   if {Id, clientID} = await exists names[0]
//     mixinCognitoPoolID: Id
//     mixinCognitoClientID: await clientID
//   else
//     mixinCognitoPoolID: JSON.stringify Ref: namePool names[0]
//     mixinCognitoClientID: JSON.stringify Ref: nameClient names[0]
exports.default = getEnvironmentVariables;