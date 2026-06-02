const a = document.querySelector("h1");
console.log(a.textContent);
a.textContent = "Texto";
console.log(a.textContent);

const tabelaPacientes = document.querySelector("#tabela-pacientes");
const formAdiciona = document.querySelector("#form-adiciona");
const pacienteTemplate = document.querySelector(".paciente");

function validaPeso(peso) {
    return Number.isFinite(peso) && peso > 0 && peso <= 635;
}

function validaAltura(altura) {
    return Number.isFinite(altura) && altura >= 0.57 && altura <= 2.72;
}

function calculaImc(peso, altura) {
    return (peso / Math.pow(altura, 2)).toFixed(2);
}

function atualizaImcsExistentes() {
    const pacientes = document.querySelectorAll(".paciente");

    pacientes.forEach((paciente) => {
        const pesoCell = paciente.querySelector(".info-peso");
        const alturaCell = paciente.querySelector(".info-altura");
        const imcCell = paciente.querySelector(".info-imc");

        const peso = Number(pesoCell.textContent);
        const altura = Number(alturaCell.textContent);

        if (!validaPeso(peso)) {
            imcCell.textContent = "Peso inválido";
            paciente.classList.add("paciente-invalido");
            return;
        }

        if (!validaAltura(altura)) {
            imcCell.textContent = "Altura inválida";
            paciente.classList.add("paciente-invalido");
            return;
        }

        imcCell.textContent = calculaImc(peso, altura);
    });
}

function criaPaciente({ nome, peso, altura, gordura, imc }) {
    const paciente = pacienteTemplate.cloneNode(true);

    paciente.querySelector(".info-nome").textContent = nome;
    paciente.querySelector(".info-peso").textContent = peso;
    paciente.querySelector(".info-altura").textContent = altura;
    paciente.querySelector(".info-gordura").textContent = gordura;
    paciente.querySelector(".info-imc").textContent = imc;

    return paciente;
}

formAdiciona.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.querySelector(".nome").value.trim();
    const peso = Number(document.querySelector(".peso").value.replace(",", "."));
    const altura = Number(document.querySelector(".altura").value.replace(",", "."));
    const gordura = document.querySelector(".gordura").value.trim();

    if (!nome || !validaPeso(peso) || !validaAltura(altura) || !gordura) {
        alert("Valores inseridos inválidos!");
        return;
    }

    const imc = calculaImc(peso, altura);
    const novoPaciente = criaPaciente({ nome, peso, altura, gordura, imc });

    tabelaPacientes.appendChild(novoPaciente);

    const dadosArmazenados = localStorage.getItem("dados");
    const pacientesSalvos = dadosArmazenados ? JSON.parse(dadosArmazenados) : [];

    pacientesSalvos.push({ nome, peso, altura, gordura, imc });
    localStorage.setItem("dados", JSON.stringify(pacientesSalvos));

    formAdiciona.reset();
});

async function carregarPacientesRemotos() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/matthewrpereira/pacientes-api/main/pacientes.json");
        const pacientes = await response.json();

        pacientes.forEach((paciente) => {
            const novoPaciente = criaPaciente(paciente);
            tabelaPacientes.appendChild(novoPaciente);
        });
    } catch (erro) {
        console.error("Erro ao carregar os pacientes", erro);
    }
}

function carregarPacientesLocais() {
    const dados = localStorage.getItem("dados");
    if (!dados) return;

    const pacientes = JSON.parse(dados);
    pacientes.forEach((paciente) => {
        const novoPaciente = criaPaciente(paciente);
        tabelaPacientes.appendChild(novoPaciente);
    });
}

atualizaImcsExistentes();
carregarPacientesLocais();
carregarPacientesRemotos();
