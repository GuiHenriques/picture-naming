export async function loadExcelFile(path) {
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

// Dados dos estímulos
export const praticeStimuli = [
  { image: "PICTURE_1.png", word_en: "MOUSE", word_pt: "RATO" },
  { image: "PICTURE_7.png", word_en: "FAIRY", word_pt: "FADA" },
  { image: "PICTURE_8.png", word_en: "LEG", word_pt: "PERNA" },
  { image: "PICTURE_9.png", word_en: "SHOWER", word_pt: "CHUVEIRO" },
  { image: "PICTURE_12.png", word_en: "MERMAID", word_pt: "SEREIA" },
  { image: "PICTURE_15.png", word_en: "LION", word_pt: "LEÃO" },
  { image: "PICTURE_20.png", word_en: "SKELETON", word_pt: "ESQUELETO" },
  { image: "PICTURE_26.png", word_en: "ONION", word_pt: "CEBOLA" },
  // { image: "PICTURE_30.png", word_en: "FARM", word_pt: "FAZENDA" },
  // { image: "PICTURE_32.png", word_en: "CROWN", word_pt: "COROA" },
  // { image: "PICTURE_35.png", word_en: "EAR", word_pt: "ORELHA" },
  // { image: "PICTURE_38.png", word_en: "SPIDER", word_pt: "ARANHA" },
  // { image: "PICTURE_39.png", word_en: "POCKET", word_pt: "BOLSO" },
  // { image: "PICTURE_16.png", word_en: "HUNTER", word_pt: "CAÇADOR" },
  // { image: "PICTURE_55.png", word_en: "SHADOW", word_pt: "SOMBRA" },
  // { image: "PICTURE_56.png", word_en: "ELBOW", word_pt: "COTOVELO" },
  // { image: "PICTURE_64.png", word_en: "BUTTON", word_pt: "BOTÃO" },
  // { image: "PICTURE_66.png", word_en: "ROOF", word_pt: "TELHADO" },
  // { image: "PICTURE_68.png", word_en: "CANDLE", word_pt: "VELA" },
  // { image: "PICTURE_71.png", word_en: "TROPHY", word_pt: "TAÇA" },
  // { image: "PICTURE_73.png", word_en: "WAVE", word_pt: "ONDA" },
  // { image: "PICTURE_78.png", word_en: "KEY", word_pt: "CHAVE" },
  // { image: "PICTURE_79.png", word_en: "KEYBOARD", word_pt: "TECLADO" },
  // { image: "PICTURE_83.png", word_en: "HEART", word_pt: "CORAÇÃO" },
  // { image: "PICTURE_24.png", word_en: "BONE", word_pt: "OSSO" },
  // { image: "PICTURE_43.png", word_en: "HAIRBRUSH", word_pt: "ESCOVA" },
  // { image: "PICTURE_86.png", word_en: "RIVER", word_pt: "RIO" },
  // { image: "PICTURE_48.png", word_en: "FIREFIGHTER", word_pt: "BOMBEIRO" },
  // { image: "PICTURE_90.png", word_en: "MOON", word_pt: "LUA" },
  // { image: "PICTURE_91.png", word_en: "MOUTH", word_pt: "BOCA" },
  // { image: "PICTURE_96.png", word_en: "MILK", word_pt: "LEITE" },
  // { image: "PICTURE_97.png", word_en: "FEATHER", word_pt: "PENA" },
  // { image: "PICTURE_61.png", word_en: "NEWSPAPER", word_pt: "JOURNAL" },
  // { image: "PICTURE_99.png", word_en: "PAINTING", word_pt: "QUADRO" },
  // { image: "PICTURE_100.png", word_en: "NOSE", word_pt: "NARIZ" },
  // { image: "PICTURE_102.png", word_en: "HAIR", word_pt: "CABELO" },
  // { image: "PICTURE_110.png", word_en: "DESK", word_pt: "MESA" },
  // { image: "PICTURE_67.png", word_en: "COUCH", word_pt: "SOFÁ" },
  // { image: "PICTURE_112.png", word_en: "LUNG", word_pt: "PULMÃO" },
  // { image: "PICTURE_72.png", word_en: "CHEESE", word_pt: "QUEIJO" },
  // { image: "PICTURE_81.png", word_en: "MEAT", word_pt: "CARNE" },
  // { image: "PICTURE_116.png", word_en: "FIRE", word_pt: "FOGO" },
  // { image: "PICTURE_122.png", word_en: "CHAIR", word_pt: "CADEIRA" },
  // { image: "PICTURE_118.png", word_en: "WOUND", word_pt: "FERIDA" },
  // { image: "PICTURE_131.png", word_en: "SINGER", word_pt: "CANTOR" },
  // { image: "PICTURE_138.png", word_en: "FRIDGE", word_pt: "GELADEIRA" },
  // { image: "PICTURE_139.png", word_en: "GHOST", word_pt: "FANTASMA" },
  // { image: "PICTURE_141.png", word_en: "SUNFLOWER", word_pt: "GIRASSOL" },
  // { image: "PICTURE_142.png", word_en: "GLASS", word_pt: "COPO" },
  // { image: "PICTURE_146.png", word_en: "OLIVE", word_pt: "AZEITONA" },
  // { image: "PICTURE_152.png", word_en: "SNAIL", word_pt: "CARACOL" },
  // { image: "PICTURE_159.png", word_en: "BEARD", word_pt: "BARBA" },
  // { image: "PICTURE_128.png", word_en: "DOLL", word_pt: "BONECA" },
  // { image: "PICTURE_165.png", word_en: "BELT", word_pt: "CINTO" },
  // { image: "PICTURE_169.png", word_en: "BACK", word_pt: "COSTAS" },
  // { image: "PICTURE_172.png", word_en: "PARROT", word_pt: "PAPAGAIO" },
  // { image: "PICTURE_177.png", word_en: "MUSHROOM", word_pt: "COGUMELO" },
  // { image: "PICTURE_155.png", word_en: "BULLET", word_pt: "BALA" },
  // { image: "PICTURE_184.png", word_en: "WITCH", word_pt: "BRUXA" },
  // { image: "PICTURE_190.png", word_en: "RAIN", word_pt: "CHUVA" },
  // { image: "PICTURE_193.png", word_en: "JELLYFISH", word_pt: "ÁGUA VIVA" },
  // { image: "PICTURE_199.png", word_en: "SKIRT", word_pt: "SAIA" },
  // { image: "PICTURE_204.png", word_en: "PRINTER", word_pt: "IMPRESSORA" },
  // { image: "PICTURE_205.png", word_en: "ANKLE", word_pt: "TORNOZELO" },
  // { image: "PICTURE_218.png", word_en: "DIAPER", word_pt: "FRALDA" },
  // { image: "PICTURE_222.png", word_en: "KNEE", word_pt: "JOELHO" },
  // { image: "PICTURE_238.png", word_en: "PUZZLE", word_pt: "QUEBRA CABEÇA" },
  // { image: "PICTURE_241.png", word_en: "EYE", word_pt: "OLHO" },
  // { image: "PICTURE_242.png", word_en: "MAILMAN", word_pt: "CARTEIRO" },
  // { image: "PICTURE_244.png", word_en: "LIGHT BULB", word_pt: "LÂMPADA" },
  // { image: "PICTURE_245.png", word_en: "ROOT", word_pt: "RAIZ" },
  // { image: "PICTURE_247.png", word_en: "BRAIN", word_pt: "CÉREBRO" },
  // { image: "PICTURE_249.png", word_en: "POTATO", word_pt: "BATATA" },
  // { image: "PICTURE_252.png", word_en: "LIZARD", word_pt: "LAGARTO" },
  // { image: "PICTURE_253.png", word_en: "CHOIR", word_pt: "CORAL" },
  // { image: "PICTURE_255.png", word_en: "SHOVEL", word_pt: "PÁ" },
  // { image: "PICTURE_260.png", word_en: "ISLAND", word_pt: "ILHA" },
  // { image: "PICTURE_264.png", word_en: "HAND", word_pt: "MÃO" },
  // { image: "PICTURE_164.png", word_en: "ROAD", word_pt: "ESTRADA" },
  // { image: "PICTURE_267.png", word_en: "KNOT", word_pt: "NÓ" },
  // { image: "PICTURE_268.png", word_en: "BED", word_pt: "CAMA" },
  // { image: "PICTURE_270.png", word_en: "ARROW", word_pt: "SETA" },
  // { image: "PICTURE_273.png", word_en: "BUS", word_pt: "ÔNIBUS" },
  // { image: "PICTURE_277.png", word_en: "WIG", word_pt: "PERUCA" },
  // { image: "PICTURE_285.png", word_en: "CARROT", word_pt: "CENOURA" },
  // { image: "PICTURE_292.png", word_en: "COMPASS", word_pt: "BÚSSOLA" },
  // { image: "PICTURE_294.png", word_en: "PLUMBER", word_pt: "ENCANADOR" },
  // { image: "PICTURE_295.png", word_en: "FLAG", word_pt: "BANDEIRA" },
  // { image: "PICTURE_301.png", word_en: "SWORD", word_pt: "ESPADA" },
  // { image: "PICTURE_307.png", word_en: "WING", word_pt: "ASA" },
  // { image: "PICTURE_311.png", word_en: "RAZOR", word_pt: "GILETE" },
  // { image: "PICTURE_312.png", word_en: "FLOWER", word_pt: "FLOR" },
  // { image: "PICTURE_318.png", word_en: "LEAF", word_pt: "FOLHA" },
  // { image: "PICTURE_319.png", word_en: "COW", word_pt: "VACA" },
  // { image: "PICTURE_323.png", word_en: "OWL", word_pt: "CORUJA" },
  // { image: "PICTURE_327.png", word_en: "HELMET", word_pt: "CAPACETE" },
  // { image: "PICTURE_331.png", word_en: "BRA", word_pt: "SUTIÃ" },
  // { image: "PICTURE_336.png", word_en: "BUTTER", word_pt: "MANTEIGA" },
  // { image: "PICTURE_340.png", word_en: "MIRROR", word_pt: "ESPELHO" },
  // { image: "PICTURE_343.png", word_en: "BOTTLE", word_pt: "GARRAFA" },
  // { image: "PICTURE_349.png", word_en: "LOCK", word_pt: "CADEADO" },
  // { image: "PICTURE_351.png", word_en: "BUTTERFLY", word_pt: "BORBOLETA" },
  // { image: "PICTURE_381.png", word_en: "STRAWBERRY", word_pt: "MORANGO" },
  // { image: "PICTURE_423.png", word_en: "EGG", word_pt: "OVO" },
  // { image: "PICTURE_454.png", word_en: "CHICKEN", word_pt: "GALINHA" },
  // { image: "PICTURE_507.png", word_en: "BABY", word_pt: "BEBÊ" },
  // { image: "PICTURE_546.png", word_en: "DOOR", word_pt: "PORTA" },
  // { image: "PICTURE_564.png", word_en: "SPOON", word_pt: "COLHER" },
  // { image: "PICTURE_576.png", word_en: "GLOVES", word_pt: "LUVA" },
  // { image: "PICTURE_587.png", word_en: "CORN", word_pt: "MILHO" },
  // { image: "PICTURE_597.png", word_en: "WINDOW", word_pt: "JANELA" },
  // { image: "PICTURE_606.png", word_en: "CAT", word_pt: "GATO" },
  // { image: "PICTURE_610.png", word_en: "HONEY", word_pt: "MEL" },
  // { image: "PICTURE_672.png", word_en: "BEE", word_pt: "ABELHA" },
  // { image: "PICTURE_673.png", word_en: "FORK", word_pt: "GARFO" },
  // { image: "PICTURE_690.png", word_en: "HAT", word_pt: "CHAPÉU" },
  // { image: "PICTURE_707.png", word_en: "DOG", word_pt: "CÃO" },
  // { image: "PICTURE_187.png", word_en: "CITY", word_pt: "CIDADE" },
  // { image: "PICTURE_724.png", word_en: "WHALE", word_pt: "BALEIA" },
  // { image: "PICTURE_733.png", word_en: "GLASSES", word_pt: "ÓCULOS" },
];
