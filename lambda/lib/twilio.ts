import twilio from "twilio"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)

export const sendText = (message: string): Promise<void> => {
  console.log("sending a text")

  const toNumber = process.env.TWILIO_TO_NUMBER
  const fromNumber = process.env.TWILIO_FROM_NUMBER

  if (!toNumber || !fromNumber) {
    throw new Error("No phone number(s) found")
  }

  return client.messages
    .create({
      body: message,
      from: fromNumber,
      to: toNumber,
    })
    .then(response => console.log("text send successfully", response.sid))
    .catch(e => {
      throw e
    })
}
