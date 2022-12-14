
const memory = new Array();

const examples = {
    add: [1, 110, 1, 310, 2, 0],
    mul: [1, 121, 1, 122, 222, 612, 420, 122, 223, 321, 123, 504, 223, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    fib: [210, 2, 311, 112, 210, 111, 212, 110, 500, 0, 1, 0, 0],
};

let ip = 0;
let acc = 0; 

function print(str) {
    document.getElementById("log").value = str;
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
    print("");
}

function reset_mem() {
    for (let e of memory)
        e.value = 0;
}


function load_example(e) {
    reset_mem();

    for (let i = 0; i < 100 && i < e.length; i++)
        memory[i].value = e[i];
}


function step() {
    
    function next() {
        ip = (ip+1) % 100;
    }
    
    function mem_get(a) {
        const x = parseInt(memory[a].value, 10);
        return isFinite(x) ? x : 0; 
    }
    
    function mem_set(a, v) {
        memory[a].value = v;
    }

    // fetch    
    const op = mem_get(ip);

    // execute
    let asm; 
    let desc;

    if (op == 0) {
        print("HLT : J'ai reçu la commande d'arrêt, j'ai terminé !");
    }
    else if (op == 1) {
        const inp = parseInt(prompt("Entrez un nombre : ", "0"), 10);

        if (isFinite(inp)) {
            acc = inp;
            print(`INP: J'ai reçu la valeur ${acc}.`);
        }
        else {
            acc = 0;
            print(`INP: J'ai reçu une valeur incorrecte ! J'ai entré 0 à la place.`);
        }

        next();
    }
    else if (op == 2) {
        alert("Sortie : " + acc);
        print(`OUT: J'ai envoyé ${acc} en sortie.`);
        next();
    }
    else if (op >= 100 && op <= 899) { 
        const idx = Math.floor(op/100) - 1;
        const arg = op % 100;
        next(); // OK with branches

        [   (a) => { mem_set(a, acc);        print(`STA: J'ai mis ${acc} à l'adress ${a}.`);     },
            (a) => { acc  = mem_get(a);      print(`LDA: J'ai chargé ${acc} de l'adresse ${a}`); },
            (a) => { acc += mem_get(a);      print(`ADD: J'ai ajouté ${mem_get(a)} à l'accumulateur.`);  },
            (a) => { acc -= mem_get(a);      print(`SUB: J'ai retiré ${mem_get(a)} de l'accumulateur.`); },
            (a) => { ip = a;                 print(`BRA: J'ai sauté à l'adresse ${a}.`);         },
            (a) => { if (acc == 0) { ip = a; print(`BRZ: J'ai sauté à l'adresse ${a}.`); } else { print(`BRZ: Je n'ai pas sauté.`); }  },
            (a) => { if (acc >= 0) { ip = a; print(`BRP: J'ai sauté à l'adresse ${a}.`); } else { print(`BRP: Je n'ai pas sauté.`); }  },
            (a) => { if (acc <  0) { ip = a; print(`BRN: J'ai sauté à l'adresse ${a}.`); } else { print(`BRN: Je n'ai pas sauté.`); }  },
        ][idx](arg);

    }
    else {
        print("??? : Je ne connais pas ce code d'instruction ! (" + op + ")");
    }
   
    update_regs(); 

}

function repair_value(e) {
    const n = parseInt(e.value, 10);
    if (isNaN(n)) e.value = 0;
    else e.value = Math.floor(n);
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

    print("");
    update_regs();
}



