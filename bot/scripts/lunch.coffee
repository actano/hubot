# Description:
#   Example scripts for you to examine and try out.
#
#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md

module.exports = (robot) ->

    choices =
        1: "Saigon"
        2: "Italian"
        3: "Austrian"
        4: "Burger"
        5: "Falafel"

    freshResult = ->
        result = {}
        for index, choice of choices
            result[index] = 0
        result

    result = freshResult();

    robot.hear /lunch start/, (res) ->
        result = freshResult();

        res.send "Where do we go for lunch today?"

        for index, choice of choices
            res.send "#{index}: #{choice}"

    robot.hear /lunch result/, (res) ->
        for index, count of result
            unless count == 0
                res.send "#{choices[index]}: #{count}"

    robot.hear /lunch ([0-9]+)/, (res, msg) ->
        index = res.match[1];
        result[index]++;
        res.send "Vote for #{choices[index]}"