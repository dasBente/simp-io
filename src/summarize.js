let header = findHeader();
let scList = findContent().childNodes[1].childNodes[5].childNodes[1];
let supers = [];
let newDay = true;

let controls = document.createElement("div");

let calcButton = document.createElement("button");
calcButton.innerText = "Calculate";
calcButton.onclick = calcStats;
controls.appendChild(calcButton);

let autoExpandButton = document.createElement("button");
autoExpandButton.innerText = "Expand SCs";
autoExpandButton.onclick = expandSCs;
controls.appendChild(autoExpandButton);

header.parentNode.insertBefore(controls, header.nextSibling);

let display = document.createElement("div");
display.style.color = "white";
display.style.fontSize = "16px";
display.style.backgroundColor = "black";
header.parentNode.insertBefore(display, controls.nextSibling);

export function calcStats() {
    supers = [];
    newDay = true;

    processSCs(findSCs(), supers);

    let i = 0;

    // go through additionally loaded SCs
    while (true) {
        let rem = findRemainingSCs(i);    
        if (rem === undefined) break;

        processSCs(rem, supers);
        i++;
    }

    return supers;
}

function exportCsv(elem, csv) {
    let a = document.createElement('a');
    a.innerText = "Export data as .csv";
    
    let content = encodeURI('data:text/csv;charset=utf-8,' + csv);
    a.href = content;
    a.download = "data.csv";

    elem.appendChild(a);
}

function processSCs(scElem, scs) {
    let date = "";

    for (let i = 0; i < scElem.childElementCount; i++) {
        let sc = scElem.childNodes[i];
        
        if (sc.childElementCount === 1) { // SC node
            if (newDay) {
                newDay = false;
                date = dateFromElement(sc);
            }

            let channel = channelFromElement(sc);
            
            // skip empty SCs (for now)
            if (channel === "Super Chat") continue;

            let total = totalFromElement(sc);
            let type = typeFromElement(sc);

            // push new data point
            scs.push({ date, channel, type, total });
        } else newDay = true;
    }
}

function supersToCSV(data) {
    let keys = Object.keys(data[0]);
    let csv = "";

    // build header
    for (let i = 0; i < keys.length; i++) {
        csv += keys[i]

        if (i !== keys.length - 1) csv += ","
    }

    // build data row by row
    for (let i = 0; i < data.length; i++) {
        csv += "\n";

        for (let j = 0; j < keys.length; j++) {
            csv += ("" + data[i][keys[j]]).trim();

            if (j !== keys.length - 1) csv += ","
        }
    }

    return csv;
}

function summarizeAmounts(data) {
    let sums = {};
    for (let i = 0; i < data.length; i++) {
        let d = data[i];

        let total = currencyToNumber(d.total);
        if (sums[d.channel]) {
            sums[d.channel].n += 1;
            sums[d.channel].total += total;
        } else {
            sums[d.channel] = { total, n: 1 };
        }
    }
    return sums;
}

function currencyToNumber(curr) {
    return Number(curr.replace(/[^0-9.-]+/g,""));
}

//
// Functions below here are just used to navigate the html of the sc list.
//
