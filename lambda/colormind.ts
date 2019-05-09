// tslint:disable-next-line:no-implicit-dependencies
import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda"

interface HelloResponse {
  statusCode: number
  body: string
}

export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const params = event.queryStringParameters
  const response: HelloResponse = {
    body: JSON.stringify({
      msg: `Hello world ${Math.floor(Math.random() * 10)}`,
      params,
    }),
    statusCode: 200,
  }

  callback(undefined, response)
}
