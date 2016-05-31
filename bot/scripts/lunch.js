module.exports = (robot) => {

  let choices = {
    0: "Not hungry",
    1: "Saigon",
    2: "Italian",
    3: "Austrian",
    4: "Burger",
    5: "Falafel",
    6: 'Korean',
    7: 'Steak'
  };

  const freshResult = () => {
    let result = {};
    for (let index in choices) {
      result[index] = []
    }
    return result;
  };

  let result = freshResult();

  robot.hear(/lunch start/, (res) => {
    result = freshResult();

    res.send('Where to go for lunch today? ');
    res.send('Make your choice e.g. "lunch 1"');

    for (let index in choices) {
      res.send(`${index}: ${choices[index]}`);
    }
  });

  robot.hear(/lunch result/, (res) => {
    for (let index in result) {
      let members = result[index];
      if (members.length !== 0)
        res.send(`${choices[index]}: ${members.length} (${members.join(", ")})`);
    }
  });

  robot.hear(/lunch ([0-9]+)/, (res, msg) => {
    let userName = res.message.user.name;
    let index = res.match[1];
    let currentUsers = result[index];
    if (!currentUsers) {
      res.reply('You voted for a non-existent choice');
    } else if (currentUsers.indexOf(userName) === -1) {
      currentUsers.push(userName);
      res.reply(`You voted for ${choices[index]}`)
    } else {
      res.reply(`You have already voted for ${choices[index]}`)
    }
  });
};