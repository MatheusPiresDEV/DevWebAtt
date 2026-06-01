const a = document.querySelector("h1");
console.log(a.textContent);
a.textContent = "Texto";
console.log(a.textContent);

const b = document.querySelectorAll(".info-nome");

const c = document.querySelectorAll(".info-peso");

const d = document.querySelectorAll(".info-altura");

const e = document.querySelectorAll(".info-imc");

console.log(`${e.textContent} ${c.textContent} ${d.textContent}`);

if(c <= 0 || c > 635){
    console.log("Peso Ínvalido");
}
else if(d < 0.57 || d > 2.72){
    console.log("Altura Ínvalido");
}
else{
    e.forEach((x, i) => {
        x[i] = Number(c[i].textContent/Math.pow(d[i].textContent,2)).toFixed(2);
        console.log(x[i]);
        e[i].textContent = x[i];
    });
}

const f = document.querySelector("#tabela-pacientes");
const g = document.querySelector("#form-adiciona");
const h = document.querySelector(".paciente");


function funcao1({nome, peso, altura, gordura, imc}){
    const j = h.cloneNode(true);
    const k = j.querySelector(".info-nome");
    k.textContent = nome;
    const l = j.querySelector(".info-peso");
    l.textContent = peso;
    const m = j.querySelector(".info-altura");
    m.textContent = altura;
    const n = j.querySelector(".info-gordura");
    n.textContent = gordon;
    const o = j.querySelector(".info-imc");
    o.textContent = imc;

    return j;
};

g.addEventListener("submit", function (p) {
    p.preventDefault();

    const q = document.querySelector(".nome").value.trim();
    const r = Number(document.querySelector(".peso").value);
    const s = Number(document.querySelector(".altura").value);
    const t = document.querySelector(".gordura").value.trim();
    const u = (r/Math.pow(s,2)).toFixed(2);

    if (!q || r <= 0 || r > 635 || s < 0.57 || s > 2.72) {alert("Valores inseridos Invalidos!"); return;}

    const v = funcao1({nome: q, peso: r, altura: s, gordura: t, imc: u});

    f.appendChild(v);

    const w = localStorage.getItem("dados");
    
    const y = w ? JSON.parse(w) : [];
    
    const z = {
        nome: q,
        peso: r,
        altura: s,
        gordura: t,
        imc: u
    };

    y.push(z);

    console.log(y);

    localStorage.setItem("dados", JSON.stringify(y));
    
    g.reset();
    
});


async function funcao2(){
    try{
        let coisinha = await fetch("https://raw.githubusercontent.com/matthewrpereira/pacientes-api/refs/heads/main/pacientes.json");
        let negocio = await coisinha.json();
        console.log(negocio);

        negocio.forEach((x)=>{
            const v = funcao1(x);
            f.appendChild(v);
        });
    }
    catch(parou){
        console.error("Erro ao carregar os pacientes", parou);
    }
}
funcao2();

const w = localStorage.getItem("dados");
if(w){
    const jumento = JSON.parse(w);
    jumento.forEach((x) => {
        const v = funcao1(x);
        f.appendChild(v);
    });
}
