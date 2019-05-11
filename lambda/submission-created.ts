import { Context } from "aws-lambda"
import { sendText } from "./lib/twilio"

export async function handler(event: any, context: Context) {
  console.log("received form submission")

  try {
    await sendText("New form submission!")

    return {
      body: "Success",
      statusCode: 200,
    }
  } catch (e) {
    console.log("failed to send text")

    return {
      body: JSON.stringify({ msg: e.message }),
      statusCode: 500,
    }
  }
}
