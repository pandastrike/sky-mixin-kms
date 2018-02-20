"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nameKey = exports.expand = exports.existenceCheck = undefined;

var _fairmont = require("fairmont");

var _sundog = require("sundog");

var _sundog2 = _interopRequireDefault(_sundog);

var _jsYaml = require("js-yaml");

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _warningMessages = require("./warning-messages");

var _warningMessages2 = _interopRequireDefault(_warningMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var existenceCheck, expand, nameKey, writePolicy;

exports.nameKey = nameKey = function (name) {
  return (0, _fairmont.capitalize)((0, _fairmont.camelCase)((0, _fairmont.plainText)(name)));
};

exports.existenceCheck = existenceCheck = (0, _fairmont.memoize)((() => {
  var _ref = _asyncToGenerator(function* (SDK) {
    var get;
    ({
      AWS: {
        KMS: { get }
      }
    } = yield (0, _sundog2.default)(SDK));
    return (0, _fairmont.memoize)((() => {
      var _ref2 = _asyncToGenerator(function* (name) {
        var e;
        try {
          return yield get(`alias/${name}`);
        } catch (error) {
          e = error;
          (0, _warningMessages2.default)(e);
          throw e;
        }
      });

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    })());
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());

writePolicy = function () {
  return [{
    Sid: "Root permissions",
    Effect: "Allow",
    Principal: {
      AWS: {
        "Fn::Join": ["", ["arn:aws:iam::", {
          Ref: "AWS::AccountId"
        }, ":root"]]
      }
    },
    Action: "kms:*",
    Resource: "*"
  }];
};

exports.expand = expand = function ({ name }, tags, fullName) {
  return {
    resourceName: nameKey(name),
    description: `Key created by the Sky KMS mixin for API ${fullName}`,
    policy: _jsYaml2.default.safeDump(writePolicy()),
    tags: _jsYaml2.default.safeDump(tags),
    alias: `alias/${name}`
  };
};

exports.existenceCheck = existenceCheck;
exports.expand = expand;
exports.nameKey = nameKey;