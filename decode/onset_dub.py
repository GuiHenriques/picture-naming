from pydub import AudioSegment, silence

# Constants
SILENCE_THRESHOLD = -30  # dB (testes entre -50 e -30)

# Load audios
audio1 = AudioSegment.from_wav("file1.wav")
audio2 = AudioSegment.from_wav("file2.wav")


# Detect non-silent chunks (onset detection)
chunks1 = silence.detect_nonsilent(audio1, min_silence_len=100, silence_thresh=SILENCE_THRESHOLD)
chunks2 = silence.detect_nonsilent(audio2, min_silence_len=100, silence_thresh=SILENCE_THRESHOLD)

# Get the start time of the first non-silent chunk (first onset)
onset_time1 = chunks1[0][0] / 1000  # Convert to seconds
onset_time2 = chunks2[0][0] / 1000  # Convert to seconds

print(f"Onset detected at file1: {onset_time1} seconds")
print(f"Onset detected at file2: {onset_time2} seconds")
