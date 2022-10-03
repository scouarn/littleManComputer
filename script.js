
const memory = new Array(100);

function init_mem() {
    const mem_el = document.getElementById("memory");

    for (i = 0; i < 100; i++) {
        const e = document.createElement("input");
        e.setAttribute("type", "number");
        e.setAttribute("addr", i);
        e.classList.add("cell");
        e.value = 0; 

        mem_el.appendChild(e);
        memory[i] = e; 
    }
    
    memory[0].classList.add("current");
}

