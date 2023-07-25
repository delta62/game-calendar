import http from 'http'

let serve = async (ctx, servedir, listen) => {
  // Start esbuild's local web server. Random port will be chosen by esbuild.
  let { host, port } = await ctx.serve({ servedir }, {})

  // Create a second (proxy) server that will forward requests to esbuild.
  let proxy = http.createServer((req, res) => {
    // forwardRequest forwards an http request through to esbuid.
    let forwardRequest = path => {
      let options = {
        hostname: host,
        port,
        path,
        method: req.method,
        headers: req.headers,
      }

      let proxyReq = http.request(options, proxyRes => {
        if (proxyRes.statusCode === 404) {
          // If esbuild 404s the request, assume it's a route needing to
          // be handled by the JS bundle, so forward a second attempt to `/`.
          return forwardRequest('/')
        }

        // Otherwise esbuild handled it like a champ, so proxy the response back.
        res.writeHead(proxyRes.statusCode, proxyRes.headers)
        proxyRes.pipe(res, { end: true })
      })

      req.pipe(proxyReq, { end: true })
    }

    // When we're called pass the request right through to esbuild.
    forwardRequest(req.url)
  })

  // Start our proxy server at the specified `listen` port.
  proxy.listen(listen)
}

export default serve
