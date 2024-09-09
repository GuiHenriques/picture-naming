import { praticeStimuli, loadExcelFile } from "./utils.js";

// Carregar o arquivo XLSX
function loadOrderData() {

}

loadExcelFile("orders.xlsx").then((orderData) => {
  console.log(orderData); // Exibe os dados no console
});

// Initialize jsPsych
const jsPsych = initJsPsych({
  show_progress_bar: true,
  message_progress_bar: "",
  on_finish: function () {
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

// Test Trials
function testTrial(trial) {
  let filler = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
      if (trial["LANGUAGE FILLER"] == "EN") {
        return `<img src='img/${trial.FILLER}' style="border: 10px solid red;">`;
      } else {
        return `<img src='img/${trial.FILLER}' style="border: 10px solid blue">`;
      }
    },
    choices: "ALL_KEYS",
  };
  return filler;
}

function thankTrial() {
  return {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>Obrigado!</p>",
  };
}

async function runExperiment() {
  let timeline = [];

  // Preload Assets
  timeline.push(preloadImages());

  // Pratice Instructions
  // timeline.push(praticeInstructions());

  // // Pratice Trials
  // praticeStimuli.forEach((item) => {
  //   timeline.push(praticeTrial(item.image, item.word_en, item.word_pt));
  // });

  // Test Instructions
  timeline.push(testInstructions());

  // Test Trials
  orderData.array.forEach((trial) => {
    testTrial(trial);
  });

  // Thank Trial
  timeline.push(thankTrial());

  // Run the experiment
  jsPsych.run(timeline);
}

runExperiment();
