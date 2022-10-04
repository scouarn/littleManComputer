

const SIZE = 100;
const memory = new Array();

let ip = 0;
let acc = 0; 


function step() {
    
    // fetch    
    println("Étape " + ip);
    const op = memory[ip].value;
    ip = (ip+1) % SIZE;
    
    // execute 

    
    // display
    update_regs();
}


function update_regs() {
    
    for (let e of document.getElementsByClassName("current"))
        e.classList.remove("current");

    memory[ip].classList.add("current");
    document.getElementById("reg_ip" ).value = ip;
    document.getElementById("reg_acc").value = acc;
}

function reset_regs() {
    ip = 0;
    acc = 0;
    update_regs();
}

function println(x) {
    const area = document.getElementById("output");
    area.value += x + "\n";

    if(area.selectionStart == area.selectionEnd) {
      area.scrollTop = area.scrollHeight;
    }

}

function init() {

    const grid = document.getElementById("memory");
    for (let i = 0; i < SIZE; i++) {
        const e = document.createElement("input");
        e.setAttribute("type", "number");
        e.setAttribute("title", "Adresse : "+i);
        e.classList.add("cell");
        e.value = 0; 
    
        grid.appendChild(e);
        memory.push(e);
    }

    document.getElementById("output").value = "Initialisation\n"; 
    update_regs();

}

function reset_mem() {
    for (let e of memory)
        e.value = 0;
}

