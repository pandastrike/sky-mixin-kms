# Panda Sky Mixin: KMS
# This mixin allocates the requested KMS keys into your CloudFormation stack. Keys are retained after stack deletion, so here we scan for them in KMS before adding them to a new CFo template.
import {cat, isObject} from "fairmont"

import {existenceCheck, expand} from "./utils"

process = (SDK, config) ->
  exists = await existenceCheck SDK

  # Start by extracting out the KMS Mixin configuration:
  {env, tags=[]} = config
  c = config.aws.environments[env].mixins.kms
  c = if isObject c then c else {}
  c.tags = cat (c.tags || []), tags

  # Don't ask for resources that already exist.
  {keys=[], tags} = c
  output = []
  for k in keys when !(await exists k.name)
    output.push expand k, tags, config.environmentVariables.fullName

  {keys: output}


export default process
