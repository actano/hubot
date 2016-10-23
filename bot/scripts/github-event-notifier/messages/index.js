module.exports = {
  shrinkwrap: (repoName) =>
    `Updated npm-shrinkwrap.json found at \`${repoName}\`. Please execute \`dnpm install\`.`,
  dockerfile: (repoName) =>
    `Updated Dockerfile.dev found at \`${repoName}\`. Please rebuild docker images and containers: \`docker-compose down -v && docker-init\`.`,
}
