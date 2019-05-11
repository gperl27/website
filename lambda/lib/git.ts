import fs from "fs"
import * as git from "isomorphic-git"
import os from "os"
import path from "path"
import { Palette } from "../../src/utils/theme"

git.plugins.set("fs", fs)

const FILENAME = "palette.ts"

export const addNewPaletteToRemoteRepository = async (palette: Palette) => {
  console.log("begin git upstream process")

  if (!process.env.REPOSITORY_URL) {
    throw new Error("invalid repository url")
  }

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "lambda-"))
  console.log(dir, "initialized dir to clone remote repo")

  console.log("cloning from remote")
  try {
    await git.clone({
      depth: 10,
      dir,
      fs,
      ref: "master",
      singleBranch: true,
      url: process.env.REPOSITORY_URL,
    })
  } catch (e) {
    console.log(e, "Failed at cloning repo")

    throw e
  }

  const file = `export const palette = ${JSON.stringify(palette)}`

  fs.readdirSync(dir)
  fs.writeFileSync(path.join(dir, FILENAME), file, "utf8")

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
        email: process.env.EMAIL,
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

export interface ColormindResponse {
  result: number[][]
}
