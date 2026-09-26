# Demonstração do Leve MP4

Medida em 26/09/2026, no Chromium 152, usando uma cópia local do app Leve MP4 e sua função `compress()` original, com Mediabunny e WebCodecs.

- Origem: clipe sintético gerado com FFmpeg `testsrc2=size=1280x720:rate=30`, filtro `hue=s=0,eq=contrast=0.8:brightness=-0.1`, duração de 6 segundos, libx264 CRF 14, yuv420p, sem áudio.
- Código do Leve MP4 utilizado: commit `5e6b34a2d52403967428185c0d860be90a03d365`.
- Original: 2.780.333 bytes, 1280 × 720.
- Configuração do Leve MP4: qualidade equilibrada, resolução 480p, manter áudio desativado.
- Saída: 812.230 bytes, H.264 em MP4, 854 × 480.
- Redução arredondada: 71%. Não representa garantia para outros vídeos.

Os arquivos em `assets/leve-original.mp4` e `assets/leve-compactado.mp4` são o par realmente processado. A compressão do arquivo final foi feita pelo aplicativo, não pelo FFmpeg. A página não inicia reprodução nem carrega os vídeos completos automaticamente.
