const fs = require('fs');


if (process.argv.length < 3) {
    console.log("Not enough arguments!");
} else {
    let manifest = {
        "manifest_version": process.argv[2],
        "name": "simp.io",
        "version": process.env.npm_package_version,
        "description": "Summarizes payments on the YouTube payment page.",
        "permissions": [
            "storage"
        ],
        "background": {
            "scripts": [
                "lib/browser-polyfill.min.js",
                "build/background.js"
            ]
        },
        "icons": {
            "48": "icons/48.png",
            "96": "icons/96.png"
        },
        "browser_action": {
            "default_icon": {
                "19": "icons/19.png",
                "38": "icons/38.png"
            },
            "default_title": "simp-io",
            "default_popup": "popup.html"
        },
        "content_scripts": [
            {
                "matches": ["*://*.youtube.com/paid_membership*"],
                "js": [
                    "build/browser-polyfill.min.js",
                    "build/content.js"
                ]
            }
        ]
    }

    fs.writeFileSync('./dist/manifest.json', JSON.stringify(manifest));
}
