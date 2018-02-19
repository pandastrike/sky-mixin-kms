# Panda Sky Mixin: KMS Lambda permission policy
# This mixin grants the API Lambdas access to a KMS key for use in encryption and decryption.
# That IAM Role permission is rolled into your CloudFormation stack after being generated here.

import {collect, project} from "fairmont"
import Sundog from "sundog"

import {namePool, _exists} from "./utils"

Policy = (config, global, SDK) ->
  # exists = await _exists SDK
  #
  # names = collect project "name", config.pools
  # resources = []
  # for n in names
  #   if pool = await exists n
  #     resources.push pool.ARN
  #   else
  #     resources.push JSON.stringify "Fn::GetAtt": [namePool(n), "Arn"]
  #
  # [
  #   Effect: "Allow"
  #   Action: [ "cognito-idp:*" ]
  #   Resource: resources
  # ]

  []

export default Policy
