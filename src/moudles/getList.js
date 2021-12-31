const express = require('express');
const path = require('path');


let sitePath = path.join(__dirname, '../moudles/siteSchema');
const Site = require(sitePath);

let html_str = "";

function addToList(ref, title) {
    html_str += `<tr><td class="menueven" id="cell" onmouseover="color_fill_menueven(this)" onmouseout="out_color_menueven(this)"><A href="${ref}">${title}</A></td></tr>`;
}



// "../site/${siteName}"




addToList('..', 'HOME');
addToList('../addSitePage', 'Add Site');
addToList('../removeSite', 'Remove Site');


let getLst = function(){
    let prom = new Promise((resolve, reject) => {
        const sites_json = Site.find();
        resolve(sites_json);
    }).then((sites_json) => {
        sites_json.forEach(site => {
            let title = (JSON.parse(JSON.stringify(site))).title;
            addToList(`../site/${title}`, `${title}`);
        });
        return html_str;
    });

    return prom;
}


module.exports = getLst();






