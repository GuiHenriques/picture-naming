import json
import base64

def convert_base64_to_audio(json_file, output_dir):
    # Load the JSON file
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    # Loop over each object in the JSON
    for i, obj in enumerate(data):
        base64_audio = obj.get('response')
        
        if base64_audio:
            # Decode the base64 audio
            audio_data = base64.b64decode(base64_audio)
            
            # Write the decoded audio to a file (e.g., .wav format)
            output_file = f"{output_dir}/audio_{i}.wav"
            with open(output_file, 'wb') as audio_file:
                audio_file.write(audio_data)
            print(f"Saved audio file: {output_file}")

# Example usage
json_file = 'data (6).json'
output_dir = 'output'
convert_base64_to_audio(json_file, output_dir)
