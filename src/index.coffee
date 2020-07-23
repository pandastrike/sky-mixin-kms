import getPolicy from "./policy"
import getTemplate from "./template"

create = (SDK, global, meta, local) ->
  name = "kms"
  vpc = meta.vpc
  template = await getTemplate SDK, global, meta, local
  policy = await getPolicy SDK, global, meta, local

  {name, policy, vpc, template}

export default create
