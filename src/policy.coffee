import Sundog from "sundog"

Policy = (SDK, global, meta, local) ->
  {get} = (Sundog SDK).AWS.KMS()

  resources = []
  for {name} in local.keys
      resources.push "arn:aws:kms:#{global.region}:*:alias/#{name}"

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
