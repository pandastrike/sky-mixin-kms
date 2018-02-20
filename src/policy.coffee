# Panda Sky Mixin: KMS Lambda permission policy
# This mixin grants the API Lambdas access to a KMS key for use in encryption and decryption.
# That IAM Role permission is rolled into your CloudFormation stack after being generated here.

import {collect, project} from "fairmont"
import Sundog from "sundog"

import {existenceCheck, nameKey} from "./utils"

Policy = (config, global, SDK) ->
  exists = await existenceCheck SDK

  names = collect project "name", config.keys
  resources = []
  for n in names
    if {Arn} = await exists n
      resources.push Arn
    else
      resources.push JSON.stringify
        "Fn::GetAtt": ["MixinKMS#{nameKey n}", "Arn"]

  [
    Effect: "Allow"
    Action: [
      "kms:Encrypt"
      "kms:Decrypt"
      "kms:ReEncrypt*"
      "kms:GenerateDataKey*"
      "kms:DescribeKey"
    ]
    Resource: resources
  ,
    Effect: "Allow"
    Action: [
      "kms:GenerateRandom"
    ]
    Resource: ["*"]
  ]

export default Policy
