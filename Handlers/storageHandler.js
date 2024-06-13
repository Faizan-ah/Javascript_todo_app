export const getDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("todoList") || "[]");
};

export const saveDataToLocalStorage = (data) => {
  localStorage.setItem("todoList", JSON.stringify(data));
};
