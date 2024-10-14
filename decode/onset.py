from pydub import AudioSegment, silence
import os
import sys
import csv

# Constants
SILENCE_THRESHOLD = -35  # dB (testar entre -50 e -30)
MIN_SILENCE_LEN = 300  # Duração mínima do silêncio para detectar o onset (em ms)

# Diretório contendo os arquivos de áudio
AUDIO_DIR = "./output/data00"

# Create 'onsets' folder if it doesn't exist
folder_name = "onsets"
os.makedirs(folder_name, exist_ok=True)


def load_audio(file_path):
    return AudioSegment.from_wav(file_path)


def detect_onset(audio, silence_thresh=SILENCE_THRESHOLD, min_silence_len=100):
    chunks = silence.detect_nonsilent(
        audio, min_silence_len=min_silence_len, silence_thresh=silence_thresh
    )
    if chunks:
        return chunks[0][0] / 1000  # Convert to seconds
    return None


# Obter todos os arquivos .wav no diretório especificado
def get_audio_files(directory):
    return [f for f in os.listdir(directory)]


# Função principal para processar todos os arquivos e salvar em CSV
def process_audio_files(audio_dir):
    audio_files = get_audio_files(audio_dir)
    results = []

    for file in audio_files:
        file_path = os.path.join(audio_dir, file)
        audio = load_audio(file_path)
        onset_time = detect_onset(audio)
        results.append([file, onset_time])

    # Criar o diretório de saída 'onsets'
    output_folder = os.path.join(os.getcwd(), "onsets")
    os.makedirs(output_folder, exist_ok=True)

    # Extrair o nome da pasta e criar o nome do arquivo CSV
    folder_name = os.path.basename(os.path.normpath(audio_dir))
    output_csv = os.path.join(output_folder, f"{folder_name}.csv")

    # Salvar os resultados em um arquivo CSV
    with open(output_csv, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["file_name", "onset_time"])  # Cabeçalhos
        writer.writerows(results)

    print(f"Resultados salvos em {output_csv}")


# Verificar se o diretório foi passado como argumento via linha de comando
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python onset.py <diretório_dos_áudios>")
        sys.exit(1)

    # O diretório com os arquivos de áudio será o primeiro argumento
    AUDIO_DIR = sys.argv[1]

    # Verificar se o diretório passado existe
    if not os.path.isdir(AUDIO_DIR):
        print(f"Erro: O diretório '{AUDIO_DIR}' não existe.")
        sys.exit(1)

    # Processar os arquivos de áudio e salvar os resultados
    process_audio_files(AUDIO_DIR)
