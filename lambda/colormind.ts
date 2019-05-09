// tslint:disable-next-line:no-implicit-dependencies
import { Context } from "aws-lambda"
import fetch from "node-fetch"

export async function handler(event: any, context: Context) {
  try {
    console.log("fetching colormind model")
    const response = await fetch("http://colormind.io/api/", {
      body: JSON.stringify({ model: "default" }),
      method: "POST",
    })

    if (!response.ok) {
      console.log("unexpected response:", response.statusText)
      return { statusCode: response.status, body: response.statusText }
    }

    const data = await response.json()

    return {
      body: JSON.stringify(data),
      statusCode: 200,
    }
  } catch (err) {
    console.log(err)
    return {
      body: JSON.stringify({ msg: err.message }),
      statusCode: 500,
    }
  }
}
