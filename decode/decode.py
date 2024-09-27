import base64
import json
import sys


def decode_base64_to_mp3(json_filename):
    # Load json file
    with open(json_filename, "r") as json_file:
        data = json.load(json_file)

    # Loop through each json object
    for i, obj in enumerate(data):
        # Get the base64 string from the json object
        base64_string = obj.get("response")

        # Decode the base64 string
        audio_data = base64.b64decode(base64_string)

        # Write the decoded data to an MP3 file
        with open(
            f"{json_file[:-5]}_output/trial_{obj.get('trial')}_picture{i % 3}.mp3", "wb"
        ) as mp3_file:
            mp3_file.write(audio_data)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python decode_mp3.py <json_file>")
        sys.exit(1)

    json_filename = sys.argv[1]
    decode_base64_to_mp3(json_filename)
