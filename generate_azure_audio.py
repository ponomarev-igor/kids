import argparse
import html
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


def build_ssml(text, voice_name, rate, style):
    escaped = html.escape(text)
    style_attr = f' style="{style}"' if style else ""
    return f"""
<speak version="1.0" xml:lang="ru-RU" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts">
  <voice name="{voice_name}">
    <mstts:express-as{style_attr}>
      <prosody rate="{rate}">{escaped}</prosody>
    </mstts:express-as>
  </voice>
</speak>
""".strip().encode("utf-8")


def synthesize(key, region, voice_name, text, rate, style):
    request = urllib.request.Request(
        f"https://{region}.tts.speech.microsoft.com/cognitiveservices/v1",
        data=build_ssml(text, voice_name, rate, style),
        headers={
            "Ocp-Apim-Subscription-Key": key,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "audio-24khz-96kbitrate-mono-mp3",
            "User-Agent": "kids-alphabet-app",
        },
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        return response.read()


def generate_phrase_files(key, region, voice_name, rate, style, phrases, force):
    for file_key, text in phrases.items():
        target = AUDIO_ROOT / f"{file_key}.mp3"
        if target.exists() and not force:
            print(f"skip {target.name}")
            continue
        print(f"phrase {file_key}")
        audio = synthesize(key, region, voice_name, text, rate, style)
        write_binary(target, audio)


def generate_letter_files(key, region, voice_name, rate, style, letters, force):
    for letter, content in letters.items():
        short_target = AUDIO_ROOT / "letters" / f"{letter}.mp3"
        detail_target = AUDIO_ROOT / "details" / f"{letter}.mp3"

        if not short_target.exists() or force:
            print(f"letter {letter}")
            audio = synthesize(key, region, voice_name, content["short"], rate, style)
            write_binary(short_target, audio)
        else:
            print(f"skip {short_target.name}")

        if not detail_target.exists() or force:
            print(f"detail {letter}")
            audio = synthesize(key, region, voice_name, content["detail"], rate, style)
            write_binary(detail_target, audio)
        else:
            print(f"skip {detail_target.name}")


def main():
    parser = argparse.ArgumentParser(
        description="Generate audio assets for the kids alphabet app using Azure Speech."
    )
    parser.add_argument("--force", action="store_true", help="Regenerate existing files.")
    parser.add_argument(
        "--voice",
        default=os.environ.get("AZURE_SPEECH_VOICE", "").strip() or "ru-RU-SvetlanaNeural",
        help="Azure voice short name, e.g. ru-RU-SvetlanaNeural",
    )
    parser.add_argument(
        "--style",
        default=os.environ.get("AZURE_SPEECH_STYLE", "").strip() or "cheerful",
        help="Voice style if supported, e.g. cheerful",
    )
    parser.add_argument(
        "--rate",
        default=os.environ.get("AZURE_SPEECH_RATE", "").strip() or "-10%",
        help='Prosody rate, for example "-10%"',
    )
    args = parser.parse_args()

    key = os.environ.get("AZURE_SPEECH_KEY", "").strip()
    region = os.environ.get("AZURE_SPEECH_REGION", "").strip()

    if not key:
        raise SystemExit("AZURE_SPEECH_KEY is required.")
    if not region:
        raise SystemExit("AZURE_SPEECH_REGION is required.")

    voice_lines = read_voice_lines()

    try:
        generate_phrase_files(
            key, region, args.voice, args.rate, args.style, voice_lines["phrases"], args.force
        )
        generate_letter_files(
            key, region, args.voice, args.rate, args.style, voice_lines["letters"], args.force
        )
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        print(body, file=sys.stderr)
        raise SystemExit(f"Azure Speech request failed with HTTP {exc.code}.") from exc
    except urllib.error.URLError as exc:
        raise SystemExit(f"Network error while calling Azure Speech: {exc}") from exc

    print("Azure audio generation complete.")


if __name__ == "__main__":
    main()
