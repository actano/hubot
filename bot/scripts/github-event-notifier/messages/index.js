module.exports = {
  yarnLock: (repoName) =>
    `Updated yarn.lock found at \`${repoName}\`. Please execute \`dyarn install\`.`,
  dockerfile: (repoName) =>
    `Updated Dockerfile.dev found at \`${repoName}\`. ` +
    'Please rebuild docker images and containers: `docker-compose down -v && docker-init`.',
}
