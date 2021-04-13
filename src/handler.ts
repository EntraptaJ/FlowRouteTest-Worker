/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return JSON.stringify(await response.json())
  } else if (contentType.includes('application/text')) {
    return await response.text()
  } else if (contentType.includes('text/html')) {
    return await response.text()
  } else {
    return await response.text()
  }
}

interface Message {
  body: string

  to: string

  from: string
}

export async function handleRequest(request: Request): Promise<Response> {
  const message = JSON.parse(await gatherResponse(request)) as Message
  console.log(`Message Body: `, message.body, `Message To: ${message.to}`)

  return new Response(`request method: ${request.method}`)
}
