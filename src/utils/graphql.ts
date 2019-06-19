export const getBlogIndexFilter = () => {
  let filter = 'fileAbsolutePath: { regex: "/content/blog/" }'

  if (process.env.NODE_ENV === "production") {
    filter += '\nfrontmatter: { phase: { eq: "live" } }'
  }

  return filter
}
