const questions = [
    { question: "Qual é a marca de carro mais vendida no mundo?", options: ["Toyota", "Volkswagen", "Ford", "Honda"], answer: "Toyota" },
    { question: "Qual carro é conhecido como 'Besouro'?", options: ["Fiat 500", "Volkswagen Fusca", "Mini Cooper", "Citroën 2CV"], answer: "Volkswagen Fusca" },
    { question: "Quem inventou o primeiro automóvel movido a gasolina?", options: ["Henry Ford", "Karl Benz", "Nikolaus Otto", "Gottlieb Daimler"], answer: "Karl Benz" },
    { question: "Qual é o carro mais rápido do mundo atualmente?", options: ["Bugatti Chiron", "Koenigsegg Jesko", "Hennessey Venom F5", "SSC Tuatara"], answer: "SSC Tuatara" },
    { question: "Qual empresa criou o Mustang?", options: ["Chevrolet", "Dodge", "Ford", "Pontiac"], answer: "Ford" },
    { question: "Em que ano foi lançado o primeiro Tesla Model S?", options: ["2008", "2010", "2012", "2014"], answer: "2012" },
    { question: "Qual foi o primeiro carro produzido em massa?", options: ["Ford Model T", "Volkswagen Fusca", "Chevrolet Impala", "Toyota Corolla"], answer: "Ford Model T" },
    { question: "Qual marca é conhecida pelo logo de um cavalo empinado?", options: ["Ferrari", "Lamborghini", "Porsche", "Maserati"], answer: "Ferrari" },
    { question: "Qual é o carro mais vendido de todos os tempos?", options: ["Toyota Corolla", "Volkswagen Fusca", "Ford F-Series", "Honda Civic"], answer: "Toyota Corolla" },
    { question: "Qual tecnologia permite que carros dirijam sozinhos?", options: ["Piloto Automático", "Controle de Cruzeiro", "Direção Autônoma", "Assistente de Faixa"], answer: "Direção Autônoma" },
    { question: "Qual é a marca de luxo da Toyota?", options: ["Lexus", "Acura", "Infiniti", "Genesis"], answer: "Lexus" },
    { question: "Qual é o modelo mais famoso da Porsche?", options: ["911", "Cayenne", "Panamera", "Boxster"], answer: "911" },
    { question: "Qual carro foi o primeiro a ter airbags?", options: ["Mercedes-Benz S-Class", "Volvo 850", "Chrysler LeBaron", "Oldsmobile Toronado"], answer: "Oldsmobile Toronado" },
    { question: "Qual é a marca de carro mais antiga ainda em produção?", options: ["Peugeot", "Mercedes-Benz", "Ford", "Renault"], answer: "Peugeot" },
    { question: "Qual carro é conhecido por seu design 'asa de gaivota'?", options: ["DeLorean DMC-12", "Mercedes-Benz 300SL", "Lamborghini Countach", "Ferrari Testarossa"], answer: "Mercedes-Benz 300SL" }
];

let currentQuestion = 0;
let score = 0;
let userName = "";

document.getElementById("start-button").addEventListener("click", startQuiz);
document.getElementById("restart-button").addEventListener("click", () => location.reload());

function startQuiz() {
    userName = document.getElementById("name").value.trim();
    if (!userName) {
        alert("Por favor, digite seu nome!");
        return;
    }
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    document.getElementById("question-number").textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.addEventListener("click", () => checkAnswer(option));
        optionsDiv.appendChild(btn);
    });
    updateProgress();
}

function checkAnswer(selected) {
    const q = questions[currentQuestion];
    const feedback = document.getElementById("feedback");
    const isCorrect = selected === q.answer;
    feedback.textContent = isCorrect ? "Acerto em cheio!" : "Ops, não foi dessa vez!";
    feedback.style.color = isCorrect ? "#28a745" : "#dc3545";
    feedback.style.opacity = "1";
    if (isCorrect) score++;

    document.querySelectorAll("#options button").forEach(btn => btn.disabled = true);
    setTimeout(() => {
        feedback.style.opacity = "0";
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function updateProgress() {
    const progress = (currentQuestion / questions.length) * 100;
    document.getElementById("progress-bar").style.setProperty("--progress", `${progress}%`);
    document.querySelector("#progress-bar::after").style.width = `${progress}%`;
}

function showResult() {
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    document.getElementById("score").textContent = `${userName}, você acertou ${score} de ${questions.length}!`;
    const percent = (score / questions.length) * 100;
    let message = "";
    if (percent === 100) {
        message = `${userName}, você é o rei das estradas! Ninguém sabe mais sobre carros do que você!`;
    } else if (percent >= 50) {
        message = `${userName}, acelerou bonito! Você tem um pé no pódio dos amantes de carros!`;
    } else {
        message = `${userName}, freou um pouco, hein? Mas com um pit stop de estudos, você chega lá!`;
    }
    document.getElementById("message").textContent = message;
}