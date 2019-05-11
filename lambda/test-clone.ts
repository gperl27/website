import { Context } from "aws-lambda"
import fs from "fs"
import os from "os"
import path from "path"

import { Clone } from "nodegit"

export async function handler(event: any, context: Context) {
  if (!process.env.REPO_URL) {
    throw new Error("invalid repository url")
  }

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "lambda-"))

  console.log("cloning from remote")

  const repo = await Clone.clone(process.env.REPO_URL, dir)

  const commit = await repo.getHeadCommit()

  return {
    body: JSON.stringify({
      author: commit.author(),
      date: commit.date(),
      message: commit.message(),
    }),
    statusCode: 200,
  }
}
