from pydub import AudioSegment, silence
import os
import sys
import csv
import re

# Constants
SILENCE_THRESHOLD = -35  # dB
SECOND_SILENCE_THRESHOLD = -20  # Segundo limiar de silêncio, caso o primeiro falhe
MIN_SILENCE_LEN = 300  # Duração mínima do silêncio para detectar o onset (em ms)

BASE_DIR = "./output" # Caminho para o diretório base

def get_audio_files(directory):
    """Obtém todos os arquivos .wav no diretório especificado."""
    return [f for f in os.listdir(directory) if f.endswith(".wav")]


def load_audio(file_path):
    """Carrega o arquivo de áudio."""
    return AudioSegment.from_wav(file_path)


def detect_onset(audio, silence_thresh=SILENCE_THRESHOLD):
    """Detecta o início do áudio com base no limiar de silêncio."""
    chunks = silence.detect_nonsilent(
        audio,
        silence_thresh=silence_thresh,
        min_silence_len=MIN_SILENCE_LEN,
    )
    if chunks:
        return chunks[0][0] / 1000  # Converte para segundos
    return None

def get_condition(file):
    """ Retorna a condição com base no número do trial"""
    conditions = {
        1: range(1, 40),
        2: range(81, 120),
        3: range(121, 160),
        4: range(41, 80),
        5: range(161, 200)
    }
    
    match = re.search(r'trial_(\d+)_', file)
    if match:
        trial_number = int(match.group(1))

        for condition, trial_range in conditions.items():
            if trial_number in trial_range:
                return condition
            
        raise ValueError(f"Trial number {trial_number} is invalid.")


def process_audio_files(audio_dir):
    """Processa todos os arquivos de áudio no diretório e salva os resultados em um CSV."""
    audio_files = get_audio_files(audio_dir)
    results = []

    for file in audio_files:
        file_path = os.path.join(audio_dir, file)
        audio = load_audio(file_path)

        # Detectar onset com o SILENCE_THRESHOLD padrão (-35 dB)
        onset_time = detect_onset(audio)
        threshold_used = SILENCE_THRESHOLD  # Armazenar o threshold usado

        # Se o onset for zero, reprocessar com um limiar mais sensível (-20 dB)
        if onset_time == 0:
            onset_time = detect_onset(audio, silence_thresh=SECOND_SILENCE_THRESHOLD)
            threshold_used = SECOND_SILENCE_THRESHOLD

        # Obter a condição
        condition = get_condition(file)

        # Adicionar o resultado à lista, incluindo o threshold usado
        results.append([file,onset_time, threshold_used, condition])

    # Ordenar os resultados pelo nome do arquivo (alfabeticamente)
    results_sorted = sorted(results, key=lambda x: x[0])

    # Criar o diretório de saída 'onsets'
    output_folder = os.path.join(os.getcwd(), "onsets")
    os.makedirs(output_folder, exist_ok=True)

    # Extrair o nome da pasta e criar o nome do arquivo CSV
    folder_name = os.path.basename(os.path.normpath(audio_dir))
    output_csv = os.path.join(output_folder, f"{folder_name}.csv")

    # Salvar os resultados em um arquivo CSV
    with open(output_csv, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["file_name", "onset_time", "threshold_value", "condition"])  # Cabeçalhos
        writer.writerows(results_sorted)


def process_all_folders(base_dir):
    """Processa todas as subpastas dentro de `base_dir`."""
    for folder in os.listdir(base_dir):
        folder_path = os.path.join(base_dir, folder)
        if os.path.isdir(folder_path):  # Verificar se é um diretório
            print(f"Processando a pasta: {folder_path}")
            process_audio_files(folder_path)


# Iniciar o processamento das subpastas dentro do diretório pai
if __name__ == "__main__":
    # Verificar se o diretório base existe
    if not os.path.isdir(BASE_DIR):
        print(f"Erro: O diretório '{BASE_DIR}' não existe.")
        sys.exit(1)

    # Processar todas as subpastas e salvar os resultados
    process_all_folders(BASE_DIR)
