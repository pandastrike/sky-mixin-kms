import {isEmpty, include, toJSON, clone} from "panda-parchment"
import Sundog from "sundog"

generateConfig = (global) ->
  Policy: """
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "Root permissions",
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::#{global.accountID}:root"
        },
        "Action": "kms:*",
        "Resource": "*"
      }
    ]
  }
  """
  Description: "Key created by the Sky KMS Mixin for API #{global.environment.stack.name}"
  KeyUsage: "ENCRYPT_DECRYPT"
  CustomerMasterKeySpec: "SYMMETRIC_DEFAULT"
  Origin: "AWS_KMS"



preprocess = (SDK, global, meta, local) ->
  kms = Sundog(SDK).AWS.KMS()
  baseConfig = generateConfig global

  {keys=[], tags={}} = local
  for {name} in keys
    unless await kms.get "alias/#{name}"
      keyConfig = clone baseConfig
      unless isEmpty tags
        keyConfig.Tags = []
        keyConfig.Tags.push TagKey: t, TagValue: v for t, v in tags

      {KeyId} = await kms.create keyConfig

      await kms.addAlias KeyId, "alias/#{name}"

  unless meta.vpc
    false
  else
    vpc: meta.vpc
    deployment:
      region: global.region
      name: global.environment.stack.name

export default preprocess
