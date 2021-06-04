# recorder
Simple screen recorder: https://luiscastro193.github.io/recorder/

You can use FFmpeg to fix the metadata:
```
ffmpeg -i recording.webm -c copy recording_fixed.webm
```
