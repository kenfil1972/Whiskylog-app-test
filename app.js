
let bottles = [];

function placeholderImg() {
    return "https://upload.wikimedia.org/wikipedia/commons/6/69/Cartoon_whisky_bottle.png";
}

function renderImages(type, containerId) {
    const el = document.getElementById(containerId);
    el.innerHTML = "";

    let filtered = bottles.filter(b => b.status === type).slice(-4);

    for (let i = 0; i < 4; i++) {
        let img = document.createElement("img");
        img.src = filtered[i]?.image || placeholderImg();
        el.appendChild(img);
    }
}

function render() {
    renderImages("unopened","unopenedImages");
    renderImages("opened","openedImages");
    renderImages("empty","emptyImages");
}

function addBottle() {
    let name = prompt("Bottle name");
    if (!name) return;

    bottles.push({
        name,
        status:"unopened",
        volume:700,
        image:""
    });
    render();
}

function addLibrary() {
    alert("Library function coming in next version");
}

function addTasting() {
    let bottle = bottles.find(b=>b.status==="unopened" || b.status==="opened");
    if (!bottle) return;

    bottle.status="opened";

    let remaining = prompt("Remaining ml?");
    if (remaining == 0) {
        bottle.status="empty";
    }

    render();
}

render();
