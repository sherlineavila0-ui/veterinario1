document.getElementById("opinionForm").addEventListener("submit", function(e){
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const opinion = document.getElementById("opinion").value;
    const rating = document.getElementById("rating").value;

    const container = document.querySelector(".testimonios-container");

    const div = document.createElement("div");
    div.className = "testimonio";
    div.innerHTML = `<h3>${nombre}</h3><div class='stars'>${rating}</div><p>${opinion}</p>`;

    container.appendChild(div);

    this.reset();
});
