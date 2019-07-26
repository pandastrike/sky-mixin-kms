import {isEmpty} from "panda-parchment"
import Sundog from "sundog"

preprocess = (SDK, global, meta, local) ->
  getKey = Sundog(SDK).AWS.KMS().get
  exists = (name) -> await getKey "alias/#{name}"

  # Don't ask for resources that already exist.
  {keys=[], tags={}} = local
  needed = []
  for k in keys when !(await exists k.name)
    output.push include k, {tags}

  if (isEmpty needed) && !meta.vpc
    false
  else
    keys: needed
    vpc: meta.vpc
    deployment:
      region: global.region
      name: global.environment.stack.name

export default preprocess
