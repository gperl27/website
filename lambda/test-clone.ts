import { Context } from "aws-lambda"
import fs from "fs"
import * as git from "isomorphic-git"
import fetch from "node-fetch"
import os from "os"
import path from "path"

console.log(fetch, 'fetch')

global.fetch = fetch

export async function handler(event: any, context: Context) {
  if (!process.env.REPO_URL) {
    throw new Error("invalid repository url")
  }

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "lambda-"))
  console.log(dir, "clone testing")

  console.log("cloning from remote")
  try {
    await git.clone({
      corsProxy: "https://cors.isomorphic-git.org/",
      depth: 10,
      dir,
      fs,
      ref: "master",
      singleBranch: true,
      url: process.env.REPO_URL,
    })

    console.log("done cloning")

    return {
      body: "success",
      statusCode: 200,
    }
  } catch (e) {
    console.log(e, "Failed at cloning repo")

    return {
      error: e.message,
      statusCode: 500,
    }
  }
}
