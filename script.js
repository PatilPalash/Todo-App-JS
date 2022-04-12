let container = document.querySelector(".container");
let flexContainer = document.querySelector(".flex-container");
let selected = document.querySelector(".selected");
let lists = document.querySelector(".lists");
let inputValue = document.getElementById("name");
let modal_box = document.querySelector(".m-box");
let list_add_button = document.querySelector(".add");
let list_close_button = document.querySelector(".close");

let boxes = [];
let id = 0;


function isEmptyOrNot() {
  if (flexContainer.innerHTML == "") {
    document.getElementById("no-item-div").classList.remove("hidden");
  } else {
    document.getElementById("no-item-div").classList.add("hidden");
  }
}

isEmptyOrNot();

let showBoxes = () => {
  let box = "";
  boxes.forEach((user) => {
    let list = "";
    user.lists.forEach((el, i) => {
 
      if (
        document.getElementById(`b-${user.id}-${i}`) !== null &&
        document.getElementById(`b-${user.id}-${i}`).getAttribute("class") ==
          null
      ) {
        list += `<p id='b-${user.id}-${i}'>${el} <span class='task-done-btn' onclick="taskDone('b-${user.id}-${i}',${user.id})">Mark Done</span></p>`;
      } else if (
        document.getElementById(`b-${user.id}-${i}`) !== null &&
        document
          .getElementById(`b-${user.id}-${i}`)
          .getAttribute("class")
          .includes("task-done")
      ) {
        list += `<p id='b-${user.id}-${i}' class='task-done'>${el}</p>`;
      } else {
        list += `<p id='b-${user.id}-${i}'>${el} <span class='task-done-btn' onclick="taskDone('b-${user.id}-${i}',${user.id})">Mark Done</span></p>`;
      }
    });

    box += `<div class='box'>
        <h2 class="box-heading" onclick='getThis(${user.id})'>${user.title}</h2>
        <hr/>
        <div class="lists">
            ${list}
        </div>
        <i id="del_list" onclick="delBox(${user.id})" class="fas fa-trash"></i>
        <i id="add_list" onclick="addList(${user.id})" class="fas fa-plus-circle"></i>
    </div>`;
  });

  flexContainer.innerHTML = box;
};


let getSbox = (id) => {
  let box = "";

  if (id) {
    boxes.forEach((user) => {
      if (user.id == id) {
        let list = "";
        user.lists.forEach((el, i) => {
          if (
            document.getElementById(`b-${user.id}-${i}`) !== null &&
            document
              .getElementById(`b-${user.id}-${i}`)
              .getAttribute("class") == null
          ) {
            list += `<p id='b-${user.id}-${i}'>${el} <span class='task-done-btn' onclick="taskDone('b-${user.id}-${i}',${user.id})">Mark Done</span></p>`;
          } else if (
            document.getElementById(`b-${user.id}-${i}`) !== null &&
            document
              .getElementById(`b-${user.id}-${i}`)
              .getAttribute("class")
              .includes("task-done")
          ) {
            list += `<p id='b-${user.id}-${i}' class='task-done'>${el}</p>`;
          } else {
            list += `<p id='b-${user.id}-${i}'>${el} <span class='task-done-btn' onclick="taskDone('b-${user.id}-${i}',${user.id})">Mark Done</span></p>`;
          }
        });

        box += `
        <div class="page-2-btn">
          <div id="b-btn" onclick='goBack()'>
            <i class="fas fa-chevron-circle-left fa-2x"></i
            ><span class="w">back</span>
          </div>
          <div class="heading">${user.title}</div>
          <i class="fas fa-plus-circle fa-2x" onclick='addBoxes()'></i>
        </div>
        <div class='sbox'>
          <h2 class="box-heading" onclick='getThis(${user.id})'>${user.title}</h2>
          <hr/>
          <div class="lists">
              ${list}
          </div>
          <i id="s_del_list" onclick="delBox(${user.id})" class="fas fa-trash"></i>
          <i id="s_add_list" onclick="addList(${user.id})" class="fas fa-plus-circle"></i>
      </div>`;
      }
    });
  } else {
    box = "";
  }

  selected.innerHTML = box;
};


let addBoxes = () => {
  id++;
  modal_box.classList.remove("hidden");
  container.classList.add("blur");
  selected.classList.add("blur");
};

list_add_button.addEventListener("click", () => {
  modal_box.classList.add("popout");
  let newList = inputValue.value;
  if (newList) {
    boxes.push({
      title: newList,
      id,
      lists: [],
    });

    setTimeout(() => {
      showBoxes();
      isEmptyOrNot();
    }, 300);
  }
  inputValue.value = "";
  setTimeout(() => {
    modal_box.classList.add("hidden");
    modal_box.classList.remove("popout");
    selected.classList.add("d-none");
    container.classList.remove("d-none");
    container.classList.remove("blur");
    selected.classList.remove("blur");
  }, 300);
});

list_close_button.addEventListener("click", () => {
  modal_box.classList.add("popout");
  inputValue.value = "";
  setTimeout(() => {
    modal_box.classList.add("hidden");
    modal_box.classList.remove("popout");
    container.classList.remove("blur");
    selected.classList.remove("blur");
  }, 300);
});


function delBox(id) {
  boxes = boxes.filter((box) => {
    return box.id !== id;
  });


  selected.classList.add("d-none");
  container.classList.remove("d-none");


  showBoxes();
  isEmptyOrNot();
}