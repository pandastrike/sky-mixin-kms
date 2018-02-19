"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var msg;

msg = function (e) {
  switch (e.statusCode) {
    case 403:
      return console.error(`WARNING:  KMS key ${name} exists, these AWS credentials do not grant\naccess.  Currently, Sky cannot manipulate this key.`);
    case 301:
      return console.error(`WARNING: KMS key ${name} exists, but is in a Region other than\nspecified in sky.yaml. Currently, Sky cannot manipulate this key.`);
  }
};

exports.default = msg;