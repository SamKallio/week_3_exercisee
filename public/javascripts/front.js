if (document.readyState !== "loading") {
  console.log("Document is ready");
  //initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Document ready after waiting!");
    //initializeCode();
  });
}

const button = document.getElementById("submit-data");
const searchButton = document.getElementById("search");
const deleteButton = document.getElementById("delete-user");

button.addEventListener("click", submitData);
searchButton.addEventListener("click", searchData);
deleteButton.addEventListener("click", deleteUser);

function deleteUser() {
  const deleteResultP = document.getElementById("delete-result");
  const searchParagraph = document.getElementById("search-result");
  const searchInput = document.getElementById("search-name");

  fetch("http://localhost:3000/user/" + searchInput.value, {
    method: "DELETE",
  })
    .then((response) => response.text())
    .then((data) => {
      deleteResultP.innerText = data;
      searchParagraph.innerText = "";
    });

  const t = document.querySelectorAll(".delete-task");

  t.forEach((task) => {
    task.remove();
  });

  deleteButton.style.display = "none";
}

function searchData() {
  const searchInput = document.getElementById("search-name");
  const searchParagraph = document.getElementById("search-result");

  fetch("http://localhost:3000/user/" + searchInput.value)
    .then((response) => response.json())
    .then((data) => {
      if (data === "User not found") {
        searchParagraph.innerText = data;
        deleteButton.style.display = "none";
      } else {
        searchParagraph.innerText = data.name;
        deleteButton.style.display = "inline-block";
        console.log(data);
        clearTodoButtons();
        generateTodos(data.todos);
      }
    });
}

function clearTodoButtons() {
  const allButtons = document.querySelectorAll(".delete-task");
  allButtons.forEach((btn) => {
    btn.remove();
  });
}

function generateTodos(todos) {
  let i = 0;

  todos.forEach((element) => {
    let button = document.createElement("button");
    button.classList.add("delete-task");
    button.setAttribute("data-id", i);
    button.innerText = element;
    document.body.appendChild(button);
    button.addEventListener("click", deleteTodo);
    i++;
  });
}

function deleteTodo(event) {
  const searchParagraph = document.getElementById("search-result");

  const getUser = {
    name: searchParagraph.innerText,
    task: event.target.dataset.id,
  };

  if (!getUser.name) {
    console.log(getUser);
    return;
  }
  fetch("http://localhost:3000/user", {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(getUser),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
    });

  event.target.remove();
}

function submitData() {
  const nameInput = document.getElementById("input-name");
  const taskInput = document.getElementById("input-task");
  const resultParagraph = document.getElementById("p-result");
  const nameToSend = nameInput.value;
  const taskToSend = taskInput.value;

  console.log(nameToSend);
  console.log(taskToSend);

  //Return if no values provided
  if (!nameToSend || !taskToSend) {
    return;
  }

  const newEntry = {
    name: nameToSend,
    todos: [taskToSend],
  };

  fetch("http://localhost:3000/todo", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newEntry),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      resultParagraph.innerText = data;
    });
}
