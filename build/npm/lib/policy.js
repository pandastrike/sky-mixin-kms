"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fairmont = require("fairmont");

var _sundog = require("sundog");

var _sundog2 = _interopRequireDefault(_sundog);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Panda Sky Mixin: KMS Lambda permission policy
// This mixin grants the API Lambdas access to a KMS key for use in encryption and decryption.
// That IAM Role permission is rolled into your CloudFormation stack after being generated here.
var Policy;

Policy = (() => {
  var _ref = _asyncToGenerator(function* (config, global, SDK) {
    var Arn, exists, i, len, n, names, resources;
    exists = yield (0, _utils.existenceCheck)(SDK);
    names = (0, _fairmont.collect)((0, _fairmont.project)("name", config.keys));
    resources = [];
    for (i = 0, len = names.length; i < len; i++) {
      n = names[i];
      if (({ Arn } = yield exists(n))) {
        resources.push(Arn);
      } else {
        resources.push(`arn:aws:kms:${global.aws.region}:*:alias/${n}`);
      }
    }
    return [{
      Effect: "Allow",
      Action: ["kms:Encrypt", "kms:Decrypt", "kms:ReEncrypt*", "kms:GenerateDataKey*", "kms:DescribeKey"],
      Resource: resources
    }, {
      Effect: "Allow",
      Action: ["kms:GenerateRandom"],
      Resource: ["*"]
    }];
  });

  return function Policy(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = Policy;