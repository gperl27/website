import fetch from "node-fetch"

// @ts-ignore
global.fetch = fetch

const headers = {
  "User-Agent": process.env.GITHUB_USERNAME || "",
}

export const getFileContent = async (url: string) => {
  try {
    const file = await fetch(url, {
      headers,
      method: "GET",
    })

    return file.json()
  } catch (e) {
    throw e
  }
}

interface GithubPutFileOptions {
  content: string
  message: string
  sha: string
}

export const writeFileToRemote = async (
  url: string,
  options: GithubPutFileOptions
) => {
  try {
    const file = await fetch(url, {
      body: JSON.stringify(options),
      headers: {
        ...headers,
        Authorization: "token " + process.env.GITHUB_TOKEN || "",
      },
      method: "PUT",
    })

    return file.json()
  } catch (e) {
    throw e
  }
}
