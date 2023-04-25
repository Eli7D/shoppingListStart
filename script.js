const logo = document.querySelector("title");

const onclick = () => console.log("click event");
const ondoubleclick = () => console.log("doubleclick event");

logo.addEventListener("click", onclick);
logo.addEventListener("dblclick", ondoubleclick);
