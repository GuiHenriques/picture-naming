# Picture Naming: nomeação de figuras bilíngue com gravação de voz

Tarefa de **nomeação de figuras com alternância de línguas** (português ↔ inglês), feita em **JavaScript + [jsPsych 7](https://www.jspsych.org/)** para uma pesquisa de doutorado do [LabLing](https://labling.ufsc.br/) (UFSC). O projeto também inclui um **pipeline em Python** que processa os áudios gravados e mede automaticamente o **tempo de início da fala** (*speech onset*) de cada resposta.

> 🔗 **Demo:** https://guihenriques.github.io/picture-naming/ (pede acesso ao microfone)

## A tarefa

As figuras aparecem uma por vez dentro de uma **moldura colorida**. A cor da moldura indica em qual língua o participante deve dizer o nome da figura. A voz é gravada pelo microfone a cada tentativa.

1. **Familiarização:** são apresentadas as 132 figuras com os nomes em inglês e em português.
2. **Treino:** exemplo com gravação e reprodução. O participante pode repetir o treino quantas vezes quiser.
3. **Teste:** **200 tentativas** em ordem aleatória. Cada tentativa tem uma figura *filler* e duas figuras experimentais, totalizando 600 gravações de até 10 s. Há pausas a cada 50 tentativas e barra de progresso.

A sequência de estímulos (figura, língua e condição de cada tentativa) **não fica no código**: ela é lida em tempo de execução da planilha [`orders.xlsx`](orders.xlsx) com a biblioteca [SheetJS](https://sheetjs.com/). Assim a pesquisadora pode alterar o desenho experimental sem mexer no JavaScript.

## Pipeline de análise dos áudios (`decode/`)

O jsPsych exporta as gravações como **base64 dentro de um JSON**. Os scripts transformam esse arquivo em dados prontos para análise:

| Script | O que faz |
| --- | --- |
| [`decode.py`](decode/decode.py) | Decodifica o base64 de cada resposta e converte para **WAV padrão** (44,1 kHz, 16 bits) com [pydub](https://github.com/jiaaro/pydub). Os arquivos seguem o padrão `trial_<n>_picture<k>.wav` |
| [`onset.py`](decode/onset.py) | Percorre as pastas de todos os participantes e detecta o **início da fala** em cada áudio com `detect_nonsilent` (limiar de −35 dB, silêncio mínimo de 300 ms). Quando a detecção falha (onset = 0), **reprocessa com um limiar mais sensível** (−20 dB). Associa cada tentativa à sua condição experimental e salva um **CSV por participante** com `file_name, onset_time, threshold_value, condition` |

Esse processo substituiu a marcação manual do início da fala em centenas de áudios por participante.

## Tecnologias

- **JavaScript (ES Modules)** e **jsPsych 7**, com os plugins `html-audio-response`, `initialize-microphone`, `preload` e `html-button-response`
- **SheetJS (xlsx)** para ler a ordem dos estímulos de uma planilha
- **Python**: pydub, ffmpeg e processamento de áudio em lote

## Estímulos

As figuras vêm do banco **MultiPic** (Duñabeitia et al., 2018, *Quarterly Journal of Experimental Psychology*), um conjunto de desenhos coloridos normatizado para nomeação em vários idiomas.

## Contexto

Projeto desenvolvido durante minha Iniciação Científica no LabLing (UFSC). Implementei a tarefa e o pipeline de processamento de áudio a partir do desenho experimental definido pela pesquisadora responsável.
