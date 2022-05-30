## Generate a multi size .ico file using ImageMagick

First install ImageMagick

### Mac OS X
```
brew install imagemagick
```

### Then run this command
```
convert icon.png -thumbnail 128x128 -alpha on -background none -flatten favicon-128.png
convert favicon-128.png -define icon:auto-resize:128,64,48,32,24,16 favicon-128.ico

convert icon.png -thumbnail 64x64 -alpha on -background none -flatten favicon-64.png
convert favicon-64.png -define icon:auto-resize:64,48,32,24,16 favicon-64.ico
```

Between favicon-128.ico, and favicon-64.ico choose the onw that fit your image size budget for the favicon and renameit to favicon.ico

# Generate the other icons
```
convert icon.png -thumbnail 16x16 -alpha on -background none -flatten icon/favicon-16x16.png
convert icon.png -thumbnail 24x24 -alpha on -background none -flatten icon/favicon-24x24.png
convert icon.png -thumbnail 32x32 -alpha on -background none -flatten icon/favicon-32x32.png
convert icon.png -thumbnail 48x48 -alpha on -background none -flatten icon/favicon-48x48.png
convert icon.png -thumbnail 64x64 -alpha on -background none -flatten icon/favicon-64x64.png
convert icon.png -thumbnail 128x128 -alpha on -background none -flatten icon/favicon-128x128.png
convert icon.png -thumbnail 72x72 -alpha on -background none -flatten icon/icon-72x72.png
convert icon.png -thumbnail 96x96 -alpha on -background none -flatten icon/icon-96x96.png
convert icon.png -thumbnail 128x128 -alpha on -background none -flatten icon/icon-128x128.png
convert icon.png -thumbnail 144x144 -alpha on -background none -flatten icon/icon-144x144.png
convert icon.png -thumbnail 152x152 -alpha on -background none -flatten icon/icon-152x152.png
convert icon.png -thumbnail 167x167 -alpha on -background none -flatten icon/icon-167x167.png
convert icon.png -thumbnail 180x180 -alpha on -background none -flatten icon/icon-180x180.png
convert icon.png -thumbnail 192x192 -alpha on -background none -flatten icon/icon-192x192.png
convert icon.png -thumbnail 256x256 -alpha on -background none -flatten icon/icon-256x256.png
convert icon.png -thumbnail 384x384 -alpha on -background none -flatten icon/icon-384x384.png
convert icon.png -thumbnail 512x512 -alpha on -background none -flatten icon/icon-512x512.png
convert icon.png -thumbnail 1024x1024 -alpha on -background none -flatten icon/icon-1024x1024.png
```

# Generate splash screens
Useful tips on how to crop properly from (here)[https://askubuntu.com/a/762841/338320] and (here)[http://www.fmwconcepts.com/imagemagick/aspectcrop/index.php]
```
./aspectcrop -a 640:960 splash.png splash/splash-640x960.png
convert splash/splash-640x960.png -resize 640x960 -alpha on -background none -flatten -gravity center -extent 640x960 splash/splash-640x960.png

./aspectcrop -a 640:1136 splash.png splash/splash-640x1136.png
convert splash/splash-640x1136.png -resize 640x1136 -alpha on -background none -flatten -gravity center -extent 640x1136 splash/splash-640x1136.png

./aspectcrop -a 750:1334 splash.png splash/splash-750x1334.png
convert splash/splash-750x1334.png -resize 750x1334 -alpha on -background none -flatten -gravity center -extent 750x1334 splash/splash-750x1334.png

./aspectcrop -a 768:1024 splash.png splash/splash-768x1024.png
convert splash/splash-768x1024.png -resize 768x1024 -alpha on -background none -flatten -gravity center -extent 768x1024 splash/splash-768x1024.png

./aspectcrop -a 1242:2208 splash.png splash/splash-1242x2208.png
convert splash/splash-1242x2208.png -resize 1242x2208 -alpha on -background none -flatten -gravity center -extent 1242x2208 splash/splash-1242x2208.png

./aspectcrop -a 1536:2048 splash.png splash/splash-1536x2048.png
convert splash/splash-1536x2048.png -resize 1536x2048 -alpha on -background none -flatten -gravity center -extent 1536x2048 splash/splash-1536x2048.png

./aspectcrop -a 2048:2732 splash.png splash/splash-2048x2732.png
convert splash/splash-2048x2732.png -resize 2048x2732 -alpha on -background none -flatten -gravity center -extent 2048x2732 splash/splash-2048x2732.png
```