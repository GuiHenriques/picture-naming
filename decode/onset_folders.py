import os
import csv
from pydub import AudioSegment, silence
import sys

# Constants
SILENCE_THRESHOLD = -35  # dB (testar entre -50 e -30)
MIN_SILENCE_LEN = 300  # Duração mínima do silêncio para detectar o onset (em ms)

# Diretório base fixo (sem passar por argumentos)
BASE_DIR = "./output"


# Função para carregar o áudio
def load_audio(file_path):
    return AudioSegment.from_wav(file_path)


# Função para detectar o onset
def detect_onset(
    audio, silence_thresh=SILENCE_THRESHOLD, min_silence_len=MIN_SILENCE_LEN
):
    chunks = silence.detect_nonsilent(
        audio, min_silence_len=min_silence_len, silence_thresh=silence_thresh
    )
    if chunks:
        return chunks[0][0] / 1000  # Converter para segundos
    return None


# Obter todos os arquivos .wav no diretório especificado
def get_audio_files(directory):
    return [f for f in os.listdir(directory) if f.endswith(".wav")]


# Função principal para processar todos os arquivos em uma pasta e salvar em CSV
def process_audio_files(audio_dir):
    audio_files = get_audio_files(audio_dir)
    results = []

    for file in audio_files:
        file_path = os.path.join(audio_dir, file)
        audio = load_audio(file_path)
        onset_time = detect_onset(audio)
        results.append([file, onset_time])

    # Ordenar os resultados pelo nome do arquivo (alfabeticamente)
    results_sorted = sorted(results, key=lambda x: x[0])

    # Criar o diretório de saída 'onsets'
    output_folder = os.path.join(os.getcwd(), "onsets")
    os.makedirs(output_folder, exist_ok=True)

    # Extrair o nome da pasta e criar o nome do arquivo CSV
    folder_name = os.path.basename(os.path.normpath(audio_dir))
    output_csv = os.path.join(output_folder, f"{folder_name}.csv")

    # Salvar os resultados ordenados em um arquivo CSV
    with open(output_csv, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["file_name", "onset_time"])  # Cabeçalhos
        writer.writerows(results_sorted)

    print(f"Resultados salvos em {output_csv}")


# Função para processar todas as subpastas dentro de um diretório
def process_all_folders(base_dir):
    # Iterar sobre todas as subpastas em `base_dir`
    for folder in os.listdir(base_dir):
        folder_path = os.path.join(base_dir, folder)
        if os.path.isdir(folder_path):  # Verificar se é um diretório
            print(f"Processando a pasta: {folder_path}")
            process_audio_files(folder_path)


# Verificar se o diretório base existe
if __name__ == "__main__":
    if not os.path.isdir(BASE_DIR):
        print(f"Erro: O diretório base '{BASE_DIR}' não existe.")
        sys.exit(1)

    # Processar todas as subpastas dentro do diretório base
    process_all_folders(BASE_DIR)
