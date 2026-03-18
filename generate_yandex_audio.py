import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parent
VOICE_LINES_PATH = ROOT / "voice-lines.json"
AUDIO_ROOT = ROOT / "assets" / "audio"

TTS_URL = "https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize"


def read_voice_lines():
    with VOICE_LINES_PATH.open(encoding="utf-8") as file:
        return json.load(file)


def write_binary(path, payload):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(payload)


def synthesize(api_key, folder_id, voice, text, speed, emotion, retries=3):
    params = urllib.parse.urlencode({
        "text": text,
        "lang": "ru-RU",
        "voice": voice,
        "folderId": folder_id,
        "format": "mp3",
        "speed": speed,
        "emotion": emotion,
    }).encode("utf-8")

    request = urllib.request.Request(
        TTS_URL,
        data=params,
        headers={"Authorization": f"Api-Key {api_key}"},
        method="POST",
    )
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                return response.read()
        except Exception as exc:
            if attempt < retries - 1:
                print(f"  retry {attempt + 1} after error: {exc}")
                time.sleep(2)
            else:
                raise


def generate_phrase_files(api_key, folder_id, voice, speed, emotion, phrases, force):
    for key, text in phrases.items():
        target = AUDIO_ROOT / f"{key}.mp3"
        if target.exists() and not force:
            print(f"skip {target.name}")
            continue
        print(f"phrase {key}: {text}")
        audio = synthesize(api_key, folder_id, voice, text, speed, emotion)
        write_binary(target, audio)
        time.sleep(0.3)


def generate_animal_files(api_key, folder_id, voice, speed, emotion, animals, animal_prompts, force):
    for name, text in animals.items():
        target = AUDIO_ROOT / "animals" / f"{name}.mp3"
        if target.exists() and not force:
            print(f"skip animals/{name}.mp3")
            continue
        print(f"animal {name}: {text}")
        audio = synthesize(api_key, folder_id, voice, text, speed, emotion)
        write_binary(target, audio)
        time.sleep(0.3)

    for name, text in animal_prompts.items():
        target = AUDIO_ROOT / "animal-prompts" / f"{name}.mp3"
        if target.exists() and not force:
            print(f"skip animal-prompts/{name}.mp3")
            continue
        print(f"animal-prompt {name}: {text}")
        audio = synthesize(api_key, folder_id, voice, text, speed, emotion)
        write_binary(target, audio)
        time.sleep(0.3)


def generate_prompt_files(api_key, folder_id, voice, speed, emotion, prompts, force):
    for letter, text in prompts.items():
        target = AUDIO_ROOT / "prompts" / f"{letter}.mp3"
        if target.exists() and not force:
            print(f"skip prompts/{letter}.mp3")
            continue
        print(f"prompt {letter}: {text}")
        audio = synthesize(api_key, folder_id, voice, text, speed, emotion)
        write_binary(target, audio)
        time.sleep(0.3)


def generate_letter_files(api_key, folder_id, voice, speed, letter_speed, emotion, letters, force):
    for letter, content in letters.items():
        short_target = AUDIO_ROOT / "letters" / f"{letter}.mp3"
        detail_target = AUDIO_ROOT / "details" / f"{letter}.mp3"

        if not short_target.exists() or force:
            print(f"letter {letter}")
            audio = synthesize(api_key, folder_id, voice, content["short"], letter_speed, emotion)
            write_binary(short_target, audio)
            time.sleep(0.3)
        else:
            print(f"skip letters/{letter}.mp3")

        if not detail_target.exists() or force:
            print(f"detail {letter}")
            audio = synthesize(api_key, folder_id, voice, content["detail"], speed, emotion)
            write_binary(detail_target, audio)
            time.sleep(0.3)
        else:
            print(f"skip details/{letter}.mp3")


def main():
    parser = argparse.ArgumentParser(
        description="Generate audio for kids-alphabet-app using Yandex SpeechKit."
    )
    parser.add_argument("--force", action="store_true", help="Regenerate existing files.")
    parser.add_argument("--voice", default="alena", help="Voice name: alena, filipp, jane, omazh, zahar")
    parser.add_argument("--speed", default="0.9", help="Speech speed: 0.1–3.0")
    parser.add_argument("--letter-speed", default="0.7", help="Speed for individual letter sounds: 0.1–3.0")
    parser.add_argument("--emotion", default="good", help="Emotion: good, evil, neutral")
    args = parser.parse_args()

    api_key = os.environ.get("YANDEX_API_KEY", "").strip()
    folder_id = os.environ.get("YANDEX_FOLDER_ID", "").strip()

    if not api_key:
        raise SystemExit("YANDEX_API_KEY is required.")
    if not folder_id:
        raise SystemExit("YANDEX_FOLDER_ID is required.")

    voice_lines = read_voice_lines()

    try:
        generate_phrase_files(api_key, folder_id, args.voice, args.speed, args.emotion, voice_lines["phrases"], args.force)
        generate_letter_files(api_key, folder_id, args.voice, args.speed, args.letter_speed, args.emotion, voice_lines["letters"], args.force)
        generate_prompt_files(api_key, folder_id, args.voice, args.speed, args.emotion, voice_lines["prompts"], args.force)
        generate_animal_files(api_key, folder_id, args.voice, args.speed, args.emotion, voice_lines["animals"], voice_lines["animal-prompts"], args.force)
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        print(body, file=sys.stderr)
        raise SystemExit(f"Yandex SpeechKit failed with HTTP {exc.code}.") from exc
    except urllib.error.URLError as exc:
        raise SystemExit(f"Network error: {exc}") from exc

    print("Done.")


if __name__ == "__main__":
    main()
