import { praticeStimuli } from "./utils.js";

// import orders

// Constants

// Initialize jsPsych
const jsPsych = initJsPsych({
  show_progress_bar: true,
  message_progress_bar: '',
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

function praticeTrials() {
  let trials = praticeStimuli.map((item) => {
    return {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `<img src="img/${item.image}">`,
      choices: "ALL_KEYS",
      prompt: `<h1>${item.word_en}</h1>` + `<h1>${item.word_pt}</h1>`,
    };
  });

  return {
    timeline: trials,
    randomize_order: true,
  };
}

// Test Trials

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
  timeline.push(praticeInstructions());

  // Pratice Trials
  praticeStimuli.forEach((item) => {
    timeline.push(praticeTrial(item.image, item.word_en, item.word_pt));
  });

  // Test Instructions
  timeline.push(testInstructions());

  // Thank Trial
  timeline.push(thankTrial());

  // Run the experiment
  jsPsych.run(timeline);
}

runExperiment();
