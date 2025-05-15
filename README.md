# recorder
Simple screen recorder. You can use FFmpeg to fix the metadata if needed:
```shell
ffmpeg -i recording.webm -c copy recording_fixed.webm
```
Fast high quality encoding. For smaller file size, re-encoding is recommended:
```shell
ffmpeg -i recording_fixed.webm -c:v libvpx-vp9 -threads 10 -b:v 0 -crf 23 -c:a copy recording_final.webm
```
