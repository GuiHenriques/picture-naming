from pydub import AudioSegment, silence
import os
import sys
import csv

# Constants
SILENCE_THRESHOLD = -35  # dB (valor padrão a ser ajustado se o onset for zero)
SECOND_SILENCE_THRESHOLD = -20  # Segundo limiar de silêncio, caso o primeiro falhe
MIN_SILENCE_LEN = 300  # Duração mínima do silêncio para detectar o onset (em ms)


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

        # Se o onset for zero ou não detectado, reprocessar com um limiar mais sensível (-20 dB)
        if onset_time == 0:
            onset_time = detect_onset(audio, silence_thresh=SECOND_SILENCE_THRESHOLD)
            threshold_used = SECOND_SILENCE_THRESHOLD

        # Adicionar o resultado à lista, incluindo o threshold usado
        results.append([file, onset_time, threshold_used])

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
        writer.writerow(["file_name", "onset_time", "threshold_value"])  # Cabeçalhos
        writer.writerows(results_sorted)

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
