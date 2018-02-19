"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fairmont = require("fairmont");

var _sundog = require("sundog");

var _sundog2 = _interopRequireDefault(_sundog);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Panda Sky Mixin: KMS Lambda permission policy
// This mixin grants the API Lambdas access to a KMS key for use in encryption and decryption.
// That IAM Role permission is rolled into your CloudFormation stack after being generated here.
var Policy;

Policy = function (config, global, SDK) {
  return [];
};

// exists = await _exists SDK

// names = collect project "name", config.pools
// resources = []
// for n in names
//   if pool = await exists n
//     resources.push pool.ARN
//   else
//     resources.push JSON.stringify "Fn::GetAtt": [namePool(n), "Arn"]

// [
//   Effect: "Allow"
//   Action: [ "cognito-idp:*" ]
//   Resource: resources
// ]
exports.default = Policy;