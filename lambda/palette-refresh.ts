// tslint:disable-next-line:no-implicit-dependencies
import { Context } from "aws-lambda"
import fetch from "node-fetch"
import { Palette } from "../src/utils/theme"
import { addNewPaletteToRemoteRepository, ColormindResponse } from "./lib/git"
import { sendText } from "./lib/twilio"

// @ts-ignore
global.fetch = fetch

export async function handler(event: any, context: Context) {
  try {
    console.log("fetching colormind model")
    const response = await fetch("http://colormind.io/api/", {
      body: JSON.stringify({
        input: [[255, 255, 255], "N", "N", "N", "N"],
        model: "default",
      }),
      method: "POST",
    })

    if (!response.ok) {
      console.log("unexpected response:", response.statusText)
      return { statusCode: response.status, body: response.statusText }
    }

    const data = await response.json()
    const palette = transformPalette(data)

    console.log("attempting to write new palette to remote")

    try {
      await addNewPaletteToRemoteRepository(palette)
    } catch (e) {
      console.log("failed to add new palette to remote")

      return {
        body: JSON.stringify({ msg: e.message }),
        statusCode: 500,
      }
    }

    try {
      await sendText("Palette refresh successful")
    } catch (e) {
      console.log("failed to send text")

      return {
        body: JSON.stringify({ msg: e.message }),
        statusCode: 500,
      }
    }

    return {
      body: "Success",
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

const transformPalette = (colormindResults: ColormindResponse): Palette => {
  const data = colormindResults.result

  if (data.length !== 5) {
    throw new Error("Palette must have 5 colors")
  }

  // tslint:disable:object-literal-sort-keys
  return {
    lightShades: data[0].toString(),
    lightAccent: data[1].toString(),
    mainBrand: data[2].toString(),
    darkAccent: data[3].toString(),
    darkShades: data[4].toString(),
  }
  // tslint:enable:object-literal-sort-keys
}
