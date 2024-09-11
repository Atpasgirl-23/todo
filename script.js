let id = 0;

const input = document.querySelector(".input"); //строчка находит элемент с классом input и сохраняет его переменную, в которой будет храниться элемент
const btnAdd = document.querySelector(".button"); //находит элемент куда будут добавляться задачи по классу button
const todoBody = document.querySelector(".todo__body"); //здесь также находится элемент куда добавляют задачи по классу todo__body
const template = document.querySelector(".todo__template"); //Находит шаблон задачи, по которому создаются новые задачи
const modal = document.querySelector(".modal"); //Находит модальное окно, которое открывается для редактирования задачи
const btnClose = document.querySelector(".modal__cancel"); //Находит кнопку, чтобы закрыть модальное окно редактирования
const modalForm = document.querySelector(".modal__form"); //
const modalInput = document.querySelector(".modal__input");

btnAdd.onclick = addTodo; //Нажимая на кнопку добавления, запускается функция addTodo. Она добавляет задачу
btnClose.onclick = closeModal; //нажимая кнопку закрытия окна, запускается функция closeModal. Она закрывает окно
modalForm.onsubmit = updateTodo; //

function addTodo() {
  //функция которая добавляет задачу
  const text = input.value; // Берет текст,который вводят в поле

  if (text == "") {
    alert("Insert text");
    return; //Если ничего не введено, выводит сообщение и прекращает добавление задачи
  }

  const clone = template.content.cloneNode(true); //
  const todoText = clone.querySelector(".todo__text"); //Находит место, куда вставляется текст задачи
  const todoItem = clone.querySelector(".todo__item"); //Находит весь блок задачи
  const btnDelete = clone.querySelector(".todo__delete"); //Находит кнопки для удаления, завершения и редактирования задачи
  const btnComplete = clone.querySelector(".todo__complete"); //Также находит кнопки для удаления,завершения и редактирования задачи
  const btnEdit = clone.querySelector(".todo__edit"); //Находятся кнопки для удаления, завершения и редактирования задачи

  todoItem.id = ++id;

  btnDelete.onclick = function () {
    todoItem.remove(); //Нажимая кнопку удаления,задача исчезает
  };
  btnComplete.onclick = function () {
    todoItem.classList.toggle("item__complete");
  }; //Назжимая кнопку завершения, задача становится выполненной (меняет цвет/стиль)

  btnEdit.onclick = function () {
    openModal(todoItem.id);
  }; //Когда нажимается кнопка редактирования,открывается окно редактирования задачи

  todoText.innerHTML = text; //Вставляем текст в новую задачу

  todoBody.append(clone); //Добавляется в новую задачу в список всех задач

  input.value = "";
}

function openModal(id) {
  modal.classList.add("modal__open");
  modal.id = id;
} //Открывает модальное окно для редактирования задачи

function closeModal() {
  modal.classList.remove("modal__open");
  modalInput.value = "";
} //Закрывается модальное окно

function updateTodo(event) {
  event.preventDefault();
  const text = modalInput.value;
  if (text == "") {
    alert("Insert text");
    return;
  }

  const id = modal.id;
  const todoItem = document.getElementById(id);
  const todoText = todoItem.querySelector(".todo__text");
  todoText.innerHTML = text;
  closeModal();
} //Функция не дает странице перезагрузиться.удобно, если нужно обновить задачубез перезагрузки всей страницы
