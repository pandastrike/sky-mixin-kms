msg = (e) ->
  switch e.statusCode
    when 403
      console.error """
      WARNING:  KMS key #{name} exists, these AWS credentials do not grant
      access.  Currently, Sky cannot manipulate this key.
      """
    when 301
      console.error """
      WARNING: KMS key #{name} exists, but is in a Region other than
      specified in sky.yaml. Currently, Sky cannot manipulate this key.
      """

export default msg
