import { Context } from "aws-lambda"
import * as git from "isomorphic-git"

export async function handler(event: any, context: Context) {
  console.log("test hitting remote git")

  if (!process.env.REPO_URL) {
    throw new Error("invalid repository url")
  }

  console.log("checking remote info")
  try {
    await git.getRemoteInfo({
      url: process.env.REPO_URL,
    })
  } catch (e) {
    console.log(e, "Failed at checking remote info")

    throw e
  }
}
