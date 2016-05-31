# Description:
#   notify if npm install has to be called
#
# Notes:
#   if the package.json is changed, npm install has to be called

module.exports = (robot) ->
    require("./github-event-notifier")(robot)
