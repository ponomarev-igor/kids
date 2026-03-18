import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parent
VOICE_LINES_PATH = ROOT / "voice-lines.json"
AUDIO_ROOT = ROOT / "assets" / "audio"


def read_voice_lines():
    with VOICE_LINES_PATH.open(encoding="utf-8") as file:
        return json.load(file)


def write_binary(path, payload):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(payload)


def build_request(api_key, voice_id, model_id, text):
    payload = json.dumps(
        {
            "text": text,
            "model_id": model_id,
            "language_code": "ru",
            "voice_settings": {
                "stability": 0.35,
                "similarity_boost": 0.8,
                "style": 0.55,
                "use_speaker_boost": True,
            },
        }
    ).encode("utf-8")

    return urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}?output_format=mp3_44100_128",
        data=payload,
        headers={
            "Content-Type": "application/json",
            "xi-api-key": api_key,
        },
        method="POST",
    )


def fetch_audio(api_key, voice_id, model_id, text):
    request = build_request(api_key, voice_id, model_id, text)
    with urllib.request.urlopen(request, timeout=60) as response:
        return response.read()


def generate_phrase_files(api_key, voice_id, model_id, phrases, force):
    for key, text in phrases.items():
        target = AUDIO_ROOT / f"{key}.mp3"
        if target.exists() and not force:
            print(f"skip {target.name}")
            continue
        print(f"phrase {key}")
        audio = fetch_audio(api_key, voice_id, model_id, text)
        write_binary(target, audio)


def generate_letter_files(api_key, voice_id, model_id, letters, force):
    for letter, content in letters.items():
        short_target = AUDIO_ROOT / "letters" / f"{letter}.mp3"
        detail_target = AUDIO_ROOT / "details" / f"{letter}.mp3"

        if not short_target.exists() or force:
            print(f"letter {letter}")
            audio = fetch_audio(api_key, voice_id, model_id, content["short"])
            write_binary(short_target, audio)
        else:
            print(f"skip {short_target.name}")

        if not detail_target.exists() or force:
            print(f"detail {letter}")
            audio = fetch_audio(api_key, voice_id, model_id, content["detail"])
            write_binary(detail_target, audio)
        else:
            print(f"skip {detail_target.name}")


def main():
    parser = argparse.ArgumentParser(
        description="Generate audio assets for the kids alphabet app using ElevenLabs."
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Regenerate files even if they already exist.",
    )
    args = parser.parse_args()

    api_key = os.environ.get("ELEVENLABS_API_KEY", "").strip()
    voice_id = os.environ.get("ELEVENLABS_VOICE_ID", "").strip()
    model_id = os.environ.get("ELEVENLABS_MODEL_ID", "").strip() or "eleven_multilingual_v2"

    if not api_key:
        raise SystemExit("ELEVENLABS_API_KEY is required.")
    if not voice_id:
        raise SystemExit("ELEVENLABS_VOICE_ID is required.")

    voice_lines = read_voice_lines()

    try:
        generate_phrase_files(api_key, voice_id, model_id, voice_lines["phrases"], args.force)
        generate_letter_files(api_key, voice_id, model_id, voice_lines["letters"], args.force)
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        print(body, file=sys.stderr)
        raise SystemExit(f"ElevenLabs request failed with HTTP {exc.code}.") from exc
    except urllib.error.URLError as exc:
        raise SystemExit(f"Network error while calling ElevenLabs: {exc}") from exc

    print("Audio generation complete.")


if __name__ == "__main__":
    main()
