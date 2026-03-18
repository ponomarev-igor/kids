Place optional character voice files here.

Supported phrase files:
- intro.mp3
- choose-letter.mp3
- repeat-try.mp3
- alphabet-intro.mp3

Optional letter files go into:
- letters/А.mp3
- letters/Б.mp3
- letters/В.mp3
- ...

Optional detail files go into:
- details/А.mp3
- details/Б.mp3
- details/В.mp3
- ...

If a file is missing, the app falls back to browser speech synthesis.

To generate files with ElevenLabs:
1. Export ELEVENLABS_API_KEY
2. Export ELEVENLABS_VOICE_ID
3. Optionally export ELEVENLABS_MODEL_ID
4. Run:
   python3 generate_elevenlabs_audio.py

To generate files with Azure Speech:
1. Export AZURE_SPEECH_KEY
2. Export AZURE_SPEECH_REGION
3. Optionally export AZURE_SPEECH_VOICE
4. Run:
   python3 list_azure_voices.py
   python3 generate_azure_audio.py
