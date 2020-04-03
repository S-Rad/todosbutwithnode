import store from "./store";
import todosslice from "./todos";
const { actions } = todosslice;
let addtodotextfield;
let addtodobutton;
let todowrapper;

window.onload = () => {
  addtodotextfield = document.querySelector("#addtodofield");
  addtodobutton = document.querySelector("#addtodobutton");
  todowrapper = document.querySelector("#todowrapper");
  addtodobutton.onclick = addtodolistener;
  initializetodos();
};

const addtodolistener = () => {
  store.dispatch(actions.add({ text: addtodotextfield.value }));
  renderalltodos();
  addtodotextfield.value = null;
};

async function initializetodos() {
  renderalltodos();
}

const gettodos = () => store.getState().todos;

const renderalltodos = () => {
  emptytodolist();
  console.log(store.getState().todos);
  gettodos().forEach(rendertodo);
};

const rendertodo = ({ id, text, active }) => {
  const tododiv = document.createElement("div");

  tododiv.className = active ? "activetodo" : "inactivetodo";
  tododiv.setAttribute("key", id);
  const todotextnode = document.createTextNode(text);
  tododiv.appendChild(createcheckbox(active));
  tododiv.appendChild(todotextnode);
  tododiv.appendChild(createdeletebutton());

  todowrapper.appendChild(tododiv);
};

const createdeletebutton = () => {
  const deletebutton = document.createElement("button");
  deletebutton.type = "button";
  deletebutton.className = "deletebutton";
  deletebutton.onclick = deletebuttonclicked;
  return deletebutton;
};

const deletebuttonclicked = e => {
  const parent = e.target.parentElement;
  removetodo(parent.getAttribute("key"));
  renderalltodos();
};

const removetodo = todoid => store.dispatch(actions.remove({ id: todoid }));

const createcheckbox = active => {
  const todocheckbox = document.createElement("input");
  todocheckbox.type = "checkbox";
  todocheckbox.checked = !active;
  todocheckbox.onclick = checkboxclicked;
  return todocheckbox;
};

const checkboxclicked = e => {
  const parent = e.target.parentElement;
  toggletodo(parent.getAttribute("key"));
  renderalltodos();
};

const toggletodo = todoid => store.dispatch(actions.toggle({ id: todoid }));

const emptytodolist = () => (todowrapper.innerHTML = null);

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

/*
 <div class="todo">
        <input type="checkbox" name="done" />This is a ToDo
        <input type="image" class="deletebutton" alt="Login" src="bin.png" />
      </div>

      <div class="donetodo">
        <input type="checkbox" name="done" checked />This is a done ToDo
        <input type="image" class="deletebutton" alt="Loeschen" src="bin.png" />
      </div>*/
