// tslint:disable-next-line:no-implicit-dependencies
import { Context } from "aws-lambda"
import fetch from "node-fetch"
import { Palette } from "../src/utils/theme"
import { getFileContent, writeFileToRemote } from "./lib/github"
import { sendText } from "./lib/twilio"

// @ts-ignore
global.fetch = fetch

interface ColormindResponse {
  result: number[][]
}

const filename = "palette.ts"
const githubUrl = `https://api.github.com/repos/${
  process.env.GITHUB_USERNAME
}/website/contents/${filename}`

export const handler = async (event: any, context: Context) => {
  try {
    console.log("fetching colormind model")
    const response = await fetch("http://colormind.io/api/", {
      body: JSON.stringify({
        input: ["N", "N", "N", "N", [255, 255, 255]],
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

    try {
      const fileResponse = await getFileContent(githubUrl)

      await writeFileToRemote(githubUrl, {
        content: new Buffer(file).toString("base64"),
        message: "Automated palette refresh",
        sha: fileResponse.sha,
      })
    } catch (e) {
      console.log("error communicating with github")
      console.log(e.message)

      try {
        await sendText("Unable to add new palette")
      } catch (e) {
        console.log("failed to send text")

        return {
          body: JSON.stringify({ msg: e.message }),
          statusCode: 500,
        }
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
    lightShades: data[4].toString(),
    lightAccent: data[3].toString(),
    mainBrand: data[2].toString(),
    darkAccent: data[1].toString(),
    darkShades: data[0].toString(),
  }
  // tslint:enable:object-literal-sort-keys
}
