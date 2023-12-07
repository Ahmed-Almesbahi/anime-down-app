const fs = require('fs')

fs.writeFileSync(
  'web-build/vercel.json',
  '{"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]}'
)
