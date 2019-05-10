/* tslint:disable:no-console */
// tslint:disable-next-line:no-implicit-dependencies
import { Context } from "aws-lambda"
import fs from "fs"
import * as git from "isomorphic-git"
import fetch from "node-fetch"
import os from "os"
import path from "path"
import { Palette } from "../src/utils/theme"

git.plugins.set("fs", fs)
global.fetch = fetch

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

const FILENAME = "palette.ts"

const addNewPaletteToRemoteRepository = async (palette: Palette) => {
  console.log("begin git upstream process")

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "test-"))
  console.log(dir, "initialized dir to clone remote repo")

  console.log("cloning from remote")
  try {
    await git.clone({
      depth: 10,
      dir,
      fs,
      ref: "master",
      singleBranch: true,
      url: "https://github.com/gperl27/website",
    })
  } catch (e) {
    console.log(e, "Failed at cloning repo")

    throw e
  }

  // Now it should not be empty...
  fs.readdirSync(dir)
  fs.writeFileSync(
    path.join(dir, FILENAME),
    JSON.stringify({ palette }),
    "utf8"
  )

  console.log("adding file")
  try {
    await git.add({ fs, dir, filepath: FILENAME })
  } catch (e) {
    console.log(e, "Failed at adding new file")

    throw e
  }

  console.log("committing file")
  try {
    await git.commit({
      author: {
        email: "gperlman27@gmail.com",
        name: "Greg Lambda Bot",
      },
      dir,
      fs,
      message: "Daily automatic palette cycle",
    })
  } catch (e) {
    console.log(e, "Failed at committing new file")

    throw e
  }

  console.log("pushing file upstream")
  try {
    await git.push({
      dir,
      ref: "master",
      remote: "origin",
      token: `${process.env.GITHUB_TOKEN}`,
    })
  } catch (e) {
    console.log(e, "Failed at pushing branch to remote repo")

    throw e
  }

  console.log("end git upstream process")
}

interface ColormindResponse {
  result: number[][]
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
