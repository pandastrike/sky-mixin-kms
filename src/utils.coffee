import {capitalize, camelCase, plainText, memoize} from "fairmont"
import Sundog from "sundog"
import YAML from "js-yaml"

import warningMsg from "./warning-messages"

nameKey = (name) -> capitalize camelCase plainText name

existenceCheck = memoize (SDK) ->
  {AWS:{KMS:{get}}} = await Sundog SDK
  memoize (name) ->
    try
      await get "alias/#{name}"
    catch e
      warningMsg e
      throw e

writePolicy = ->
  [
    Sid: "Root permissions"
    Effect: "Allow"
    Principal:
      AWS:
        "Fn::Join": [
          "",
          [
            "arn:aws:iam::",
            {Ref: "AWS::AccountId"},
            ":root"
          ]
        ]
    Action: "kms:*"
    Resource: "*"
  ]

expand = ({name}, tags, fullName) ->
  resourceName: nameKey name
  description: "Key created by the Sky KMS mixin for API #{fullName}"
  policy: YAML.safeDump writePolicy()
  tags: YAML.safeDump tags
  alias: "alias/#{name}"

export {
  existenceCheck
  expand
  nameKey
}
