import json
import base64
import os
import sys
import wave


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

            # Write the decoded audio to a WAV file
            output_file = f"{output_dir}/audio_{i}.wav"
            with wave.open(output_file, "wb") as wav_file:
                # Set parameters: nchannels, sampwidth, framerate
                wav_file.setnchannels(1)  # Mono
                wav_file.setsampwidth(2)  # 16-bit
                wav_file.setframerate(44100)  # 44.1 kHz
                wav_file.writeframes(audio_data)


if __name__ == "__main__":
    # Check if the JSON file was passed as a command-line argument
    if len(sys.argv) != 2:
        print("Usage: python3 decode.py <json_file>")
        sys.exit(1)

    # Get the JSON file from command-line argument
    json_file = sys.argv[1]

    # Call the function to convert base64 to audio
    convert_base64_to_audio(json_file)
