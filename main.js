import { praticeStimuli } from "./utils.js";

// Constantes
let max_recording_duration = 10_000; // Duração da gravação em milissegundos

// Carregar o arquivo XLSX
async function loadExcelFile(path) {
  try {
    const response = await fetch(path); // Carrega o arquivo
    const data = await response.arrayBuffer(); // Converte para ArrayBuffer
    const workbook = XLSX.read(data, { type: "array" }); // Lê o workbook

    // Array para armazenar todos os dados
    let allData = [];

    // Itera por todas as planilhas
    // workbook.SheetNames.forEach((sheetName) => {
    //   const sheet = workbook.Sheets[sheetName]; // Pega cada planilha
    //   const sheetData = XLSX.utils.sheet_to_json(sheet); // Converte a planilha em JSON
    //   allData = allData.concat(sheetData); // Junta os dados da planilha no array
    // });

    // Primeira planilha
    const sheet1 = workbook.Sheets[workbook.SheetNames[0]];
    const sheetData1 = XLSX.utils.sheet_to_json(sheet1);
    return sheetData1;

    return allData; // Retorna os dados combinados
  } catch (error) {
    console.error("Erro ao carregar o arquivo:", error);
  }
}

function getImageHTML(image, language) {
  // console.log(image)
  const borderColor = language === "BP" ? "red" : "green";

  // Retorna o HTML da imagem com a borda definida
  return `<img src='img/${image}.png' style="border: 10px solid ${borderColor};">`;
}

// Initialize jsPsych
const jsPsych = initJsPsych({
  show_progress_bar: true,
  message_progress_bar: "",
  on_finish: function () {
    // jsPsych.data.get().localSave("json", "mydata.json");
    jsPsych.data.displayData();
  },
});

// Preload
function preloadImages() {
  let images = praticeStimuli.map((item) => "img/" + item.image);
  return {
    type: jsPsychPreload,
    images: images,
  };
}

// Microphone Permission
function microphonePermission() {
  return {
    type: jsPsychInitializeMicrophone,
  };
}

// Instructions Learn trial
function praticeInstructions() {
  let instruction1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
      "<p>Bem vinda(o)!</p>" +
      "<p>Primeiramente gostaria de te agradecer mais uma vez por aceitar o convite para participar do meu estudo de doutorado!</p>" +
      "<p> Antes de começar vou te mostrar um passo a passo de tudo que você já fez e ainda vai fazer aqui hoje.</h4>" +
      "<p>Pressione qualquer tecla para continuar</h4>",
    choices: "ALL_KEYS",
  };

  let instruction2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
      "<p>1. Antes de entrar na cabine de experimentação você leu e assinou o Termo de Consentimento Livre e Esclarecido (TCLE).\
     Guarde-o bem! Ele é um documento importante que garante os seus direitos como participante do estudo.</p>" +
      "<p>2. Além disso, você já respondeu a três questionários e fez um teste online de proficiência na língua inglesa. Muito obrigada!" +
      "<p>3. Agora você vai fazer duas tarefas: uma tarefa de nomeação de figuras e uma tarefa de controle cognitivo. Não se preocupe, você poderá fazer uma pausa entre uma tarefa e outra." +
      "<p>4. Antes de cada tarefa você lerá outras explicações sobre o que fazer e terá oportunidade de praticar." +
      "<p>5. Vamos lá? Aperte a tecla ESPAÇO para entrar na primeira tarefa.</p>",
    choices: "ALL_KEYS",
  };

  let instruction3 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
      "<h3 style='margin-bottom: 50px'>Tarefa de Nomeação de Figuras</h3> " +
      "<p> Bem vinda(o) à tarefa de nomeação de figuras!</p>" +
      "<p> Durante essa tarefa, figuras serão apresentadas uma por vez no centro da tela e você deverá dizer o nome dela em português ou inglês.</p>" +
      "<p> Quando a figura estiver dentro de uma moldura <span class='green'>VERDE</span> você deve dizer o nome dela em <span class='green'>PORTUGUÊS</span>,\
      quando ela estiver em uma moldura <span class='red'>VERMELHA</span> você deve fizer o nome dela em <span class='red'>INGLÊS</span>. " +
      "<p>Agora, antes de começar a tarefa, eu vou te apresentar todas as figuras que você verá e os nomes delas em  <span class='green'>PORTUGUÊS</span> e <span class='red'>INGLÊS</span>.</p>" +
      "<p>Aperte a tecla ESPAÇO para passar para a próxima imagem. Vamos lá?</p>",
    choices: "ALL_KEYS",
  };

  return [instruction1, instruction2, instruction3];
}

// Instructions Test trial
function testInstructions() {
  let instructions1 = {
    type: jsPsychHtmlKeyboardResponse,

    stimulus:
      "<p>Agora que você se familiarizou com todas as imagens e seus nomes vamos treinar a tarefa? </p>" +
      "<p>Lembrando, durante essa tarefa, figuras serão apresentadas uma por vez no centro da tela e você deverá dizer o nome dela em português ou inglês.</p>" +
      "<p>Quando a figura estiver dentro de uma moldura <span class='green'>VERDE</span> você deve dizer o nome dela em <span class='green'>PORTUGUÊS</span>,\
      quando ela estiver em uma moldura <span class='red'>VERMELHA</span> você deve fizer o nome dela em <span class='red'>INGLÊS</span>." +
      "<p>Tente não falar muito baixo para que não corramos o risco do microfone não captar o sua voz, ok?</p>" +
      "<p>Aperte ESPAÇO para ver um exemplo.</p>",
    choices: "ALL_KEYS",
  };

  let instructions2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
      "<p>Agora você poderá treinar um pouco para ter certeza que entendeu a tarefa.</p>" +
      "<p>Lembre-se, quando a imagem aparecer em um moldura <span class='green'>VERDE</span> você deve dizer o nome dela em <span class='green'>PORTUGUÊS</span> e quando a imagem aparecer em um moldura <span class='red'>VERMELHA</span> você deve dizer o nome dela em <span class='red'>INGLÊS</span>." +
      "<p>Aperte CONTINUE quando terminar de falar.</p>",
    choices: "ALL_KEYS",
  };

  let example = exampleTrial();

  let instructions3 = {
    type: jsPsychHtmlButtonResponse,
    stimulus:
      "<p>O treino acabou!</p>" +
      "<p>Você entendeu a tarefa ou quer treinar um pouco mais?</p>" +
      "<p>Aperte VOLTAR para repetir o treino ou CONTINUAR para iniciar a tarefa.</p>",
    choices: ["VOLTAR", "CONTINUAR"],
  };
  
  return {
    timeline: [instructions1, instructions2, example, instructions3],
    loop_function: function (data) {
      if (parseInt(data.values()[3].response) === 0) {
        return true;
      } 
      return false;
    }
  };
}

// Pratice Trials
function praticeTrial(image, label_en, label_pt) {
  return {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<img src='img/${image}'>`,
    choices: "ALL_KEYS",
    prompt: `<h2 class='red'>${label_en}</h2>` + `<h2 class='green'>${label_pt}</h2>`,
  };
}

function exampleTrial() {
  return {
    type: jsPsychHtmlAudioResponse,
    stimulus: getImageHTML("PICTURE_1", "BP"),
    recording_duration: max_recording_duration, // ?Maximum recording duration
    allow_playback: true, // !production,
    done_button_label: "CONTINUE", // !production,
    data: { trial: "EXAMPLE" },
  };
}

function breakTrial() {
  return {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>Descanse um pouco!</p>",
    choices: "ALL_KEYS",
  }
}

// Single Test Trial
function testTrial(trial, image, language) {
  return {
    type: jsPsychHtmlAudioResponse,
    stimulus: getImageHTML(image, language),
    recording_duration: max_recording_duration, // ?Maximum recording duration
    // allow_playback: true, // !production,
    done_button_label: "CONTINUE", // !production,
    data: { trial: trial.TRIAL, condition: trial.CONDITION },
  };
}

// Test Trials
function testTrials(trial) {
  let filler = testTrial(trial, trial["FILLER"], trial["LANGUAGE FILLER"]);

  let picture1 = testTrial(
    trial,
    trial["EXPERIMENTALPICTURE1"],
    trial["LANGUAGE EXPERIMENTAL PICTURE 1"]
  );

  let picture2 = testTrial(
    trial,
    trial["EXPERIMENTALPICTURE2"],
    trial["LANGUAGE EXPERIMENTAL PICTURE 2"]
  );

  return [filler, picture1, picture2];
}

function thankTrial() {
  return {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>Obrigado!</p>",
  };
}

async function runExperiment() {
  let timeline = [];

  // Load excel Order Data
  let orderData = await loadExcelFile("orders.xlsx");

  // Suffle Order Data
  orderData = jsPsych.randomization.shuffle(orderData);

  // Preload Assets
  timeline.push(preloadImages());

  // Microphone Permission
  timeline.push(microphonePermission());

  // Pratice Instructions
   timeline.push(...praticeInstructions());

  // Pratice Trials
  praticeStimuli.forEach((item) => {
    timeline.push(praticeTrial(item.image, item.word_en, item.word_pt));
  });

  // Test Instructions
  timeline.push(testInstructions());

  // Test Trials
  let trialCounter = 0;
  orderData.forEach((trial) => {
    timeline.push(...testTrials(trial));
    trialCounter++;
    // console.log(trialCounter);
    
    if (trialCounter % 10 == 0) {
      timeline.push(breakTrial());
    }
    
  });

  // Thank Trial
  timeline.push(thankTrial());

  // Run the experiment
  jsPsych.run(timeline);
}

runExperiment();
