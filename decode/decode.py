import json
import base64
import os
import sys
from pydub import AudioSegment
from io import BytesIO


def convert_base64_to_audio(json_file):
    output_dir = f"output/{json_file[:-5]}"

    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Load the JSON file
    with open(json_file, "r") as f:
        data = json.load(f)

    # Loop over each object in the JSON
    for i, obj in enumerate(data):
        base64_audio = obj.get("response")

        if base64_audio:
            # Decode the base64 audio
            audio_data = base64.b64decode(base64_audio)

            # Use BytesIO to treat the audio data as a file in memory
            audio_stream = BytesIO(audio_data)

            # Load the audio using pydub
            audio_segment = AudioSegment.from_file(audio_stream)

            # Convert the audio to standard WAV format (16 bits, 44.1 kHz, stereo)
            audio_segment = (
                audio_segment.set_frame_rate(44100).set_channels(2).set_sample_width(2)
            )

            # Extract trial number
            trial_number = obj.get("trial")

            # Count from 0 to 2 for the audio output
            count = i % 3  # This will cycle through 0, 1, 2

            # Save as a WAV file with the new naming convention
            output_file = f"{output_dir}/trial_{trial_number}_picture{count}.wav"
            audio_segment.export(output_file, format="wav")

            print(f"Audio saved as {output_file} in standard format.")


if __name__ == "__main__":
    # Check if the JSON file was passed as a command-line argument
    if len(sys.argv) != 2:
        print("Usage: python3 decode.py <json_file>")
        sys.exit(1)

    # Get the JSON file from the command-line argument
    json_file = sys.argv[1]

    # Call the function to convert base64 to audio
    convert_base64_to_audio(json_file)
