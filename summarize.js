let header = findHeader();
let scList = findContent().childNodes[1].childNodes[5].childNodes[1];
let supers = [];

let controls = document.createElement("div");

let button = document.createElement("button");
button.innerText = "Calculate"
button.onclick = onClick;
controls.appendChild(button);

header.parentNode.insertBefore(controls, header.nextSibling);

let display = document.createElement("div");
header.parentNode.insertBefore(display, controls.nextSibling);

function onClick() {
    supers = [];

    processSCs(findSCs(), supers);

    let i = 0;

    // go through additionally loaded SCs
    while (true) {
        let rem = findRemainingSCs(i);    
        if (rem === undefined) break;

        processSCs(rem, supers);
        i++;
    }

    let sums = summarizeAmounts(supers);
    let csvs = supersToCSV(supers);

    // build visualization
    display.innerHTML = "";
    updateTable(display, sums);
    exportCsv(display, csvs);
}

function updateTable(elem, sums) {
    let channels = Object.keys(sums);
    let keys = Object.keys(sums[channels[0]]);

    // build table
    let table = document.createElement('table');
    table.style.color = "white";
    table.style.fontSize = "16px";
    table.style.backgroundColor = "black";

    // build table header
    let header = document.createElement('tr');
    
    let item = document.createElement('th');
    item.innerText = 'channel';
    header.appendChild(item);

    for (let i = 0; i < keys.length; i++) {
        let item = document.createElement('th');
        item.innerText = keys[i];
        header.appendChild(item);
    }
    table.appendChild(header);

    // build table rows
    for (let i = 0; i < channels.length; i++) {
        let row = document.createElement('tr');
        
        // add channel name as first column
        let item = document.createElement('td');
        item.innerText = channels[i];
        row.appendChild(item);

        // remaining statistical data
        for (let j = 0; j < keys.length; j++) {
            let item = document.createElement('td');
            item.innerText = sums[channels[i]][keys[j]];
            row.appendChild(item);
        }

        table.appendChild(row);
    }
    
    elem.appendChild(table);
}

function exportCsv(elem, csv) {

}

function processSCs(scElem, scs) {
    let newDay = true;
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

function findContent() {
    return document.getElementById("primary").childNodes[0].childNodes[3].childNodes[0].childNodes[5];
}

function findHeader() {
    return findContent().childNodes[0];
}

function findSCs() {
    return findContent().childNodes[3].childNodes[5].childNodes[1];
}

function findRemainingSCs(i = 0) {
    let rem = findContent().childNodes[3].childNodes[5].childNodes[3].childNodes[i]
    return rem === undefined ? rem : rem.childNodes[5];
}

function dateFromElement(elem) {
    return elem.childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[0].data;
}

function elementData(elem) {
    return elem.childNodes[1].childNodes[3].childNodes[3];
}

function channelFromElement(elem) {
    return elementData(elem).childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[0].data;
}

function typeFromElement(elem) {
    return elementData(elem).childNodes[1].childNodes[3].childNodes[0].childNodes[1].childNodes[0].data
}

function totalFromElement(elem) {
    return elementData(elem).childNodes[3].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].data;
}