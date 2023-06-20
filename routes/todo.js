var express = require("express");
var router = express.Router();

var userTaskData = [{ name: "Testi", todos: ["testi"] }];

/* GET users listing. */
router.get("/:id", (req, res) => {
  const obj = { name: req.params.id };
  const findObj = findUser(obj);

  if (findObj) {
    res.send(findObj);
  } else {
    return res.send("User not found");
  }
});

router.put("/", (req, res) => {
  const obj = findUser(req.body);
  const todoId = Number(req.body.task);

  if (!obj) {
    res.send("User not found");
  } else {
    userTaskData.forEach((element) => {
      if (element.name === obj.name) {
        console.log(
          "Removing " + element.todos[todoId] + " from the todos list!"
        );
        element.todos.splice(todoId, 1);
      }
    });
  }
  console.log(userTaskData);
  res.send("Task deleted");
});

router.delete("/:id", (req, res) => {
  const obj = { name: req.params.id };
  const findObj = findUser(obj);

  if (!findObj) {
    res.send("User not found");
  } else {
    //Credits for this to stackoverflow.com (user: Justin Liu)
    const userIndex = userTaskData.indexOf(findObj);
    if (userIndex > -1) {
      userTaskData.splice(userIndex, 1);
    }
    res.send("User deleted");
  }
});

router.post("/", function (req, res) {
  const obj = req.body;
  console.log(userTaskData);

  const findObj = findUser(obj);

  if (!findObj) {
    userTaskData.push(obj);
    console.log("User added");
    res.send("User added");
  } else {
    userTaskData.forEach((element) => {
      if (element.name === obj.name) {
        element.todos.push(obj.todos[0]);
        console.log("Todo added");
        res.send("Todo added");
      }
    });
  }

  console.log(userTaskData);
});

function findUser(obj) {
  return userTaskData.find((user) => user.name === obj.name);
}

module.exports = router;
