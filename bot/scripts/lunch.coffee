# Description:
#   Example scripts for you to examine and try out.
#
#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md

module.exports = (robot) ->

    choices =
        0: "Not hungry"
        1: "Saigon"
        2: "Italian"
        3: "Austrian"
        4: "Burger"
        5: "Falafel"

    freshResult = ->
        result = {}
        for index, choice of choices
            result[index] = []
        result

    result = freshResult();

    robot.hear /lunch start/, (res) ->
        result = freshResult();

        res.send "Where to go for lunch today? "
        res.send "Make your choice e.g. \"lunch 1\""

        for index, choice of choices
            res.send "#{index}: #{choice}"

    robot.hear /lunch result/, (res) ->
        for index, members of result
            unless members.length == 0
                res.send "#{choices[index]}: #{members.length} (#{members.join(", ")})"

    robot.hear /lunch ([0-9]+)/, (res, msg) ->
        userName = res.message.user.name;
        index = res.match[1];
        currentUsers = result[index];
        if not currentUsers?
            res.reply "You voted for a non-existent choice"
        else if (userName not in currentUsers)
            currentUsers.push(userName);
            res.reply "You voted for #{choices[index]}"
        else
            res.reply "You have already voted for #{choices[index]}"
