const questions = [
    { question: "Qual é a marca de carro mais vendida no mundo?", options: ["Toyota", "Volkswagen", "Ford", "Honda"], answer: "Toyota", points: 4 },
    { question: "Qual carro é conhecido como 'Besouro'?", options: ["Fiat 500", "Volkswagen Fusca", "Mini Cooper", "Citroën 2CV"], answer: "Volkswagen Fusca", points: 5 },
    { question: "Quem inventou o primeiro automóvel movido a gasolina?", options: ["Henry Ford", "Karl Benz", "Nikolaus Otto", "Gottlieb Daimler"], answer: "Karl Benz", points: 7 },
    { question: "Qual é o carro mais rápido do mundo atualmente?", options: ["Bugatti Chiron", "Koenigsegg Jesko", "Hennessey Venom F5", "SSC Tuatara"], answer: "SSC Tuatara", points: 8 },
    { question: "Qual empresa criou o Mustang?", options: ["Chevrolet", "Dodge", "Ford", "Pontiac"], answer: "Ford", points: 5 },
    { question: "Em que ano foi lançado o primeiro Tesla Model S?", options: ["2008", "2010", "2012", "2014"], answer: "2012", points: 6 },
    { question: "Qual foi o primeiro carro produzido em massa?", options: ["Ford Model T", "Volkswagen Fusca", "Chevrolet Impala", "Toyota Corolla"], answer: "Ford Model T", points: 7 },
    { question: "Qual marca é conhecida pelo logo de um cavalo empinado?", options: ["Ferrari", "Lamborghini", "Porsche", "Maserati"], answer: "Ferrari", points: 5 },
    { question: "Qual é o carro mais vendido de todos os tempos?", options: ["Toyota Corolla", "Volkswagen Fusca", "Ford F-Series", "Honda Civic"], answer: "Toyota Corolla", points: 4 },
    { question: "Qual tecnologia permite que carros dirijam sozinhos?", options: ["Piloto Automático", "Controle de Cruzeiro", "Direção Autônoma", "Assistente de Faixa"], answer: "Direção Autônoma", points: 7 },
    { question: "Qual é a marca de luxo da Toyota?", options: ["Lexus", "Acura", "Infiniti", "Genesis"], answer: "Lexus", points: 6 },
    { question: "Qual é o modelo mais famoso da Porsche?", options: ["911", "Cayenne", "Panamera", "Boxster"], answer: "911", points: 5 },
    { question: "Qual carro foi o primeiro a ter airbags?", options: ["Mercedes-Benz S-Class", "Volvo 850", "Chrysler LeBaron", "Oldsmobile Toronado"], answer: "Oldsmobile Toronado", points: 12 },
    { question: "Qual é a marca de carro mais antiga ainda em produção?", options: ["Peugeot", "Mercedes-Benz", "Ford", "Renault"], answer: "Peugeot", points: 9 },
    { question: "Qual carro é conhecido por seu design 'asa de gaivota'?", options: ["DeLorean DMC-12", "Mercedes-Benz 300SL", "Lamborghini Countach", "Ferrari Testarossa"], answer: "Mercedes-Benz 300SL", points: 10 }
];

let currentQuestion = 0;
let score = 0;
let userName = "";

document.getElementById("start-button").addEventListener("click", startQuiz);
document.getElementById("restart-button").addEventListener("click", () => location.reload());

function startQuiz() {
    console.log("Tentando iniciar o quiz...");
    userName = document.getElementById("name").value.trim();
    if (!userName) {
        alert("Por favor, digite seu nome!");
        console.log("Nome não fornecido, alerta exibido.");
        return;
    }
    console.log("Nome válido:", userName);
    const startScreen = document.getElementById("start-screen");
    const quizScreen = document.getElementById("quiz-screen");
    if (startScreen && quizScreen) {
        startScreen.classList.add("hidden");
        quizScreen.classList.remove("hidden");
        console.log("Transição de telas realizada.");
        showQuestion();
    } else {
        console.error("Elementos de tela não encontrados!");
    }
}

function showQuestion() {
    console.log("Exibindo pergunta:", currentQuestion + 1);
    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    document.getElementById("question-number").textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.addEventListener("click", () => checkAnswer(option, btn));
        optionsDiv.appendChild(btn);
    });
    updateProgress();
}

function checkAnswer(selected, selectedButton) {
    console.log("Verificando resposta:", selected);
    const q = questions[currentQuestion];
    const feedback = document.getElementById("feedback");
    const isCorrect = selected === q.answer;
    const buttons = document.querySelectorAll("#options button");

    buttons.forEach(btn => {
        if (btn.textContent === q.answer) {
            btn.classList.add("correct");
        }
        if (btn === selectedButton) {
            btn.classList.add(isCorrect ? "correct" : "wrong");
        }
    });

    feedback.textContent = isCorrect 
        ? `Acerto em cheio! (+${q.points} pontos)` 
        : `Ops, não foi dessa vez! A resposta correta é: ${q.answer}`;
    feedback.style.color = isCorrect ? "#FFC107" : "#000000"; /* Amarelo para acerto, preto para erro */
    feedback.style.opacity = "1";
    if (isCorrect) score += q.points;

    document.querySelectorAll("#options button").forEach(btn => btn.disabled = true);
    setTimeout(() => {
        feedback.style.opacity = "0";
        buttons.forEach(btn => btn.classList.remove("correct", "wrong"));
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 2000);
}

function updateProgress() {
    const progress = (currentQuestion / questions.length) * 100;
    document.getElementById("progress-bar").style.setProperty("--progress", `${progress}%`);
    document.querySelector("#progress-bar::after").style.width = `${progress}%`;
}

function showResult() {
    console.log("Exibindo resultado:", score);
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    const totalPossibleScore = 100;
    document.getElementById("score").textContent = `${userName}, sua pontuação final: ${score} de ${totalPossibleScore} pontos!`;

    let scores = JSON.parse(localStorage.getItem("quizScores") || "[]");
    scores.push({ name: userName, score: score });
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 5);
    localStorage.setItem("quizScores", JSON.stringify(scores));

    const leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = "<h3>Placar dos Melhores</h3><table><tr><th>Nome</th><th>Pontuação</th></tr>";
    scores.forEach((player, index) => {
        const trClass = index === 0 ? "leader" : "";
        leaderboard.innerHTML += `<tr class="${trClass}"><td>${player.name}</td><td>${player.score} pontos</td></tr>`;
    });
    leaderboard.innerHTML += "</table>";

    const percent = (score / totalPossibleScore) * 100;
    let message = "";
    if (score === totalPossibleScore) {
        message = `${userName}, você é o rei das estradas! 👑 Ninguém sabe mais sobre carros do que você!`;
        document.getElementById("message").classList.add("crown");
    } else if (percent >= 50) {
        message = `${userName}, acelerou bonito! Você tem um pé no pódio dos amantes de carros!`;
    } else {
        message = `${userName}, freou um pouco, hein? Mas com um pit stop de estudos, você chega lá!`;
    }
    document.getElementById("message").textContent = message;
}