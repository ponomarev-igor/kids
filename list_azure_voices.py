import json
import os
import sys
import urllib.error
import urllib.request


def main():
    key = os.environ.get("AZURE_SPEECH_KEY", "").strip()
    region = os.environ.get("AZURE_SPEECH_REGION", "").strip()

    if not key:
      raise SystemExit("AZURE_SPEECH_KEY is required.")
    if not region:
      raise SystemExit("AZURE_SPEECH_REGION is required.")

    request = urllib.request.Request(
        f"https://{region}.tts.speech.microsoft.com/cognitiveservices/voices/list",
        headers={
            "Ocp-Apim-Subscription-Key": key,
        },
        method="GET",
    )

    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            voices = json.load(response)
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        print(body, file=sys.stderr)
        raise SystemExit(f"Azure voices list request failed with HTTP {exc.code}.") from exc
    except urllib.error.URLError as exc:
        raise SystemExit(f"Network error while calling Azure Speech: {exc}") from exc

    russian = [voice for voice in voices if voice.get("Locale") == "ru-RU"]
    for voice in russian:
        name = voice.get("ShortName")
        style_list = ", ".join(voice.get("StyleList") or [])
        gender = voice.get("Gender", "")
        print(f"{name} | {gender} | {style_list}")


if __name__ == "__main__":
    main()
