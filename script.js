
const memory = new Array();

let ip = 0;
let acc = 0; 

function next() {
    ip = (ip+1) % 100;
}

function mem_get(a) {
    const x = parseInt(memory[a].value);
    return isFinite(x) ? x : 0; 
}

function mem_set(a, v) {
    memory[a].value = v;
}

function step() {
    
    // fetch    
    //println("Étape " + ip);
    const op = mem_get(ip);
    
    // execute 
    const ins_1_arg = [
        { asm: "ADD", f: (a) => { acc += mem_get(a);      } },
        { asm: "SUB", f: (a) => { acc -= mem_get(a);      } },
        { asm: "STA", f: (a) => { mem_set(a, acc);        } },
        { asm: "LDA", f: (a) => { acc = mem_get(a);       } },
        { asm: "BRA", f: (a) => { ip = a;                 } },
        { asm: "BRZ", f: (a) => { if (acc == 0) ip = a;   } },
        { asm: "BRP", f: (a) => { if (acc >= 0) ip = a;   } },
    ];
    
    let asm; 
   
    if (op == 0) {
        alert("Fin du programme"); 
        asm = "HLT";
    }
    else if (op == 901) {
        asm = "INP";
        
        const inp = parseInt(prompt("Entrée : ", "0"));

        if (isFinite(inp))
            acc = inp;
        else 
            acc = 0;

        next();
    }
    else if (op == 902) {
        alert("Sortie : " + acc);
        asm = "OUT"; 
        next();
    }
    else if (op >= 100 && op <= 899) { 
        const idx = Math.floor(op/100) - 1;
        const arg = op % 100;
        ins_1_arg[idx].f(arg);
        asm = ins_1_arg[idx].asm;
        next();
    }
    else {
        alert("Instruction invalide : " + op); 
        asm = "???";
        console.log(op);
    }
    
    // display
    console.log(asm);
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

function repair_value(e) {
    if (isNaN(parseInt(e.value))) e.value = 0;
}


function init() {

    const grid = document.getElementById("memory");

    for (let i = 0; i < 100; i++) {
        const container = document.createElement("div");
        container.classList.add("cell");
    
        const label = document.createElement("div");
        label.innerHTML = i;

        const inp = document.createElement("input");
        inp.setAttribute("type", "number");
        inp.setAttribute("onfocusout", "repair_value(this);");
        inp.value = 0; 
    
        container.appendChild(label);
        container.appendChild(inp);
    
        grid.appendChild(container);
        memory.push(inp);
    }

    //document.getElementById("output").value = "Initialisation\n"; 
    update_regs();

}

function reset_mem() {
    for (let e of memory)
        e.value = 0;
}

