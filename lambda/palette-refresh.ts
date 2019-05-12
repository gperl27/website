// tslint:disable-next-line:no-implicit-dependencies
import { Context } from "aws-lambda"
import fetch from "node-fetch"
import { Palette } from "../src/utils/theme"
import { ColormindResponse } from "./lib/git"
import { sendText } from "./lib/twilio"

// @ts-ignore
global.fetch = fetch

export const handler = async (event: any, context: Context) => {
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
    const file = `export const palette = ${JSON.stringify(palette)}`

    console.log("attempting to write new palette to remote")

    const getFile = await fetch(
      "https://api.github.com/repos/gperl27/website/contents/palette.ts",
      {
        // body: JSON.stringify({
        //   content: new Buffer(file).toString("base64"),
        //   message: "Automated palette refresh",
        // }),
        headers: {
          "User-Agent": process.env.GITHUB_USERNAME || "",
        },
        method: "GET",
      }
    )

    const fileResponse = await getFile.json()

    try {
      await fetch(
        "https://api.github.com/repos/gperl27/website/contents/palette.ts",
        {
          body: JSON.stringify({
            content: new Buffer(file).toString("base64"),
            message: "Automated palette refresh",
            sha: fileResponse.sha,
          }),
          headers: {
            Authorization: "token " + process.env.GITHUB_TOKEN || "",
            "User-Agent": process.env.GITHUB_USERNAME || "",
          },
          method: "PUT",
        }
      )

      console.log("file written successfully to remote")
    } catch (e) {
      console.log("error writing file to remote", e.message)

      return {
        body: e.message,
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
