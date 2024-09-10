import { praticeStimuli } from "./utils.js";

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
    // console.log(sheetData1); // Exibe todos os dados das planilhas no console
    return sheetData1;

    return allData; // Retorna os dados combinados
  } catch (error) {
    console.error("Erro ao carregar o arquivo:", error);
  }
}

function getImageHTML(image, language) {
  const borderStyle = language === "BP" ? "10px solid red" : "10px solid blue";

  // Retorna o HTML da imagem com a borda definida
  return `<img src='img/${image}.png' style="border: ${borderStyle};">`;
}

// Initialize jsPsych
const jsPsych = initJsPsych({
  show_progress_bar: true,
  message_progress_bar: "",
  on_finish: function () {
    jsPsych.data.get().localSave("json", "mydata.json");
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
  return {
    type: jsPsychHtmlKeyboardResponse,

    stimulus:
      "<h4>Instruções Pratica</h4>" +
      "<h4>Pressione qualquer tecla para continuar</h4>",
    choices: "ALL_KEYS",
  };
}

// Instructions Test trial
function testInstructions() {
  return {
    type: jsPsychHtmlKeyboardResponse,

    stimulus:
      "<h4>Instruções Teste</h4>" +
      "<h4>Pressione qualquer tecla para continuar</h4>",
    choices: "ALL_KEYS",
  };
}

// Pratice Trials
function praticeTrial(image, label_en, label_pt) {
  return {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<img src='img/${image}'>`,
    choices: "ALL_KEYS",
    prompt: `<h2>${label_en}</h2>` + `<h2>${label_pt}</h2>`,
  };
}

// Single Test Trial
function testTrial(trial, image, language) {
  return {
    type: jsPsychHtmlAudioResponse,
    stimulus: getImageHTML(image, language),
    recording_duration: 10_000, // ?Maximum recording duration
    allow_playback: true, // !production,
    done_button_label: "Done", // !production,
    data: { trial: trial.TRIAL, condition: trial.CONDITION },
  };
}

// Test Trials
function testTrials(trial) {
  let filler = testTrial(trial, trial["FILLER"], trial["LANGUAGE FILLER"]);
  
  let picture1 = testTrial(trial, trial["EXPERIMENTALPICTURE1"], trial["LANGUAGE EXPERIMENTAL PICTURE 1"]);

  let picture2 = testTrial(trial, trial["EXPERIMENTALPICTURE2"], trial["LANGUAGE EXPERIMENTAL PICTURE 2"]);
 
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

  // Preload Assets
  timeline.push(preloadImages());

  // Microphone Permission
  timeline.push(microphonePermission());

  // Pratice Instructions
  // timeline.push(praticeInstructions());

  // // Pratice Trials
  // praticeStimuli.forEach((item) => {
  //   timeline.push(praticeTrial(item.image, item.word_en, item.word_pt));
  // });

  // Test Instructions
  timeline.push(testInstructions());

  // Test Trials
  orderData.forEach((trial) => {
    timeline.push(...testTrials(trial));
  });

  // Thank Trial
  timeline.push(thankTrial());

  // Run the experiment
  jsPsych.run(timeline);
}

runExperiment();
