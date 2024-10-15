from pydub import AudioSegment, silence

# Constants
SILENCE_THRESHOLDS = [-20, -25, -30, -35, -40]  # dB

# Load audio
audio = AudioSegment.from_wav("./path/to/file.wav")

# Iterate over different silence thresholds
for threshold in SILENCE_THRESHOLDS:
  # Detect non-silent chunks (onset detection)
  chunks = silence.detect_nonsilent(audio, min_silence_len=300, silence_thresh=threshold)
  
  # Get the start time of the first non-silent chunk (first onset)
  if chunks:
    onset_time = chunks[0][0] / 1000  # Convert to seconds
    print(f"Onset detected at file with threshold {threshold} dB: {onset_time} seconds")
  else:
    print(f"No onset detected at file with threshold {threshold} dB")
