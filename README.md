# simp.io
Simple browser-extension to inflict maximum mental self damage. Generates a simple summary of all of your spending
habits on YouTube.com via a simple widget added to the top of the purchase history page.  
  
Other features include the automatic expansion of your purchase history at the press of a button as well as
exporting all your purchases into a detailed .csv file for further analysis if you so desire.  
  
**Disclaimer:** This code was cobbled together in the span of a couple of hours and I refuse to engage with it
for any longer, feel free to build on top of this if you want to.  
Might break immediately whenever YouTube chooses to change part of their frontend. There might be easier methods
than what I've used (scouring through the page HTML like a rat), but investing any more time than I already did
for this felt wrong.

## Usage
This extension was tested on both FireFox (93.0) and Chrome (95.0.4638.54). Below are descriptions of how to load the
application from your local computer.  
Start off by downloading the repository either through git or the repositories download function. If downloaded through
GitLab, you might need to unpack the project somewhere on your machine first.

### FireFox

1. Open [the Firefox debugging page](about:debugging#/runtime/this-firefox) 
2. click the top-right button "Load temporary Browser-Extension"
3. Navigate to your downloaded and unpacked project
4. Select any file inside the project

The extension should now be loaded.

### Chrome

1. Open [the Chrome extension page](chrome://extensions/)
2. Toggle developer mode to on (top right)
3. Click "Load unpacked extension"
4. Navigate to the downloaded and unpacked project
5. Load the project folder

The extension should now be loaded.

## Attributions
Images combined for the application icon:

* A colored emoji of a dollar bill as part of the [Noto Emoji project](https://github.com/googlei18n/noto-emoji/), [Apache 2.0](https://github.com/googlei18n/noto-emoji/blob/master/LICENSE)
* A colored emoji of a fire as part of the [Noto Emoji project](https://github.com/googlei18n/noto-emoji/), [Apache 2.0](https://github.com/googlei18n/noto-emoji/blob/master/LICENSE)
