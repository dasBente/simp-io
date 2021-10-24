let header = findHeader();
let scList = findContent().childNodes[1].childNodes[5].childNodes[1];
let supers = [];

let button = document.createElement("button");
button.innerText = "Calculate"
button.onclick = onClick;

header.parentNode.insertBefore(button, header.nextSibling);

let display = document.createElement("div");
header.parentNode.insertBefore(display, button.nextSibling);

function onClick() {
    supers = [];

    processSCs(findSCs(), supers);

    let i = 0;

    while (true) {
        let rem = findRemainingSCs(i);    
        if (rem === undefined) break;

        processSCs(rem, supers);
        i++;
    }

    let sums = summarizeAmounts(supers);
    let csvs = supersToCSV(supers);

    display.innerHTML = "";
    updateTable(display, sums);
    exportCsv(display, csvs);
}

function updateTable(elem, sums) {
    let channels = Object.keys(sums);
    let keys = Object.keys(sums[channels[0]]);

    let table = document.createElement('table');
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        table.style.color = "white";
        table.style.fontSize = "16px";
    }


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

    for (let i = 0; i < channels.length; i++) {
        let row = document.createElement('tr');
        
        let item = document.createElement('td');
        item.innerText = channels[i];
        row.appendChild(item);

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

            let amount = amountFromElement(sc);
            let type = typeFromElement(sc);

            scs.push({ date, channel, type, amount });
        } else newDay = true;
    }
}

function supersToCSV(data) {
    let keys = Object.keys(data[0]);

    let csv = "";

    for (let i = 0; i < keys.length; i++) {
        csv += keys[i]

        if (i !== keys.length - 1) csv += ","
    }

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

        let amount = currencyToNumber(d.amount);
        if (sums[d.channel]) {
            sums[d.channel].n += 1;
            sums[d.channel].amount += amount;
        } else {
            sums[d.channel] = { amount, n: 1 };
        }
    }
    return sums;
}

function currencyToNumber(curr) {
    return Number(curr.replace(/[^0-9.-]+/g,""));
}

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

function amountFromElement(elem) {
    return elementData(elem).childNodes[3].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].data;
}