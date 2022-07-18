let togglePlusMinusIcon = document.querySelectorAll(".sidebar__icon-link");
for (var i = 0; i < togglePlusMinusIcon.length; i++) {
    togglePlusMinusIcon[i].addEventListener("click", (e) => {
        e.target.children[1].classList.toggle('fa-minus');
        e.target.children[1].classList.toggle('fa-plus');
        let arrowParent = e.target.parentElement; //selecting main parent of togglePlusMinusIcon
        // let arrowParent = e.target.parentElement.parentElement; //selecting main parent of togglePlusMinusIcon
        arrowParent.classList.toggle("showMenu");
        // arrowParent.classList.toggle("showMenu");
        // e.target.classList.toggle("showMenu");
    });
}
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});