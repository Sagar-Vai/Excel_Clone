let bold = document.querySelector(".fa-bold");
let italic = document.querySelector(".fa-italic");
let underline = document.querySelector(".fa-underline");
let fontSize = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family");
let alignmentBtns = document.querySelectorAll(".alignment-container>*");
let formulabar = document.querySelector(".formula");
bold.addEventListener("click", function () {
    // address get -> address
    // ui elemnt
    let uiCell = getcell();
    let { rid, cid } = getRidCidfromAddress();
    // console.log(rid,cid);
    // sheet array
    let cellObj = sheetArr[rid][cid];
    if (cellObj.isBold == true) {
        uiCell.style.fontWeight = "normal";
        bold.classList.remove("menu-active");
        cellObj.isBold = false
    } else {
        uiCell.style.fontWeight = "bold";
        bold.classList.add("menu-active");
        cellObj.isBold = true;
    }
})
italic.addEventListener("click", function(){
    let uiCell = getcell();
    let {rid, cid} = getRidCidfromAddress();
    let cellObj = sheetArr[rid][cid];
       if(cellObj.isItalic == true){
           uiCell.style.fontStyle = "normal";
           italic.classList.remove("menu-active");
           cellObj.isItalic = "false";
       }else{
           uiCell.style.fontStyle = "italic";
           italic.classList.add("menu-active");
           cellObj.isItalic = "true";
       }
})
underline.addEventListener("click", function(){
    let uiCell = getcell();
    let {rid, cid} = getRidCidfromAddress();
    let cellObj = sheetArr[rid][cid];
       if(cellObj.isUnderline == true){
           uiCell.style.textDecoration = "normal";
           underline.classList.remove("menu-active");
           cellObj.isUnderline = "false";
       }else{
           uiCell.style.textDecoration = "underline";
           underline.classList.add("menu-active");
           cellObj.isUnderline = "true";
       }
})
fontSize.addEventListener("change",function(){
let cfontSize = fontSize.value;
let uiCell = getcell();
let {rid, cid} = getRidCidfromAddress();
let cellObj = sheetArr[rid][cid];
uiCell.style.fontSize = cfontSize + "px";

cellObj.fontSize = cfontSize;
})
fontFamily.addEventListener("change",function(){
    let cfontFamily = fontFamily.value;
    let uiCell = getcell();
    let {rid, cid} = getRidCidfromAddress();
    let cellObj = sheetArr[rid][cid];
    uiCell.style.fontFamily = cfontFamily ;
    
    cellObj.fontFamily= cfontFamily;
})
for(let i = 0; i < alignmentBtns.length; i++){
    alignmentBtns[i].onclick = function(){
        console.log("Hello");
    let uiCell = getcell();
    let { rid, cid } = getRidCidfromAddress();
    // console.log(rid,cid);
    // sheet array
    let cellObj = sheetArr[rid][cid];
    let newAlignment = alignmentBtns[i].getAttribute("direct");
    uiCell.style.textAlign = newAlignment;
    for(let j = 0; j < alignmentBtns.length; j++){
        alignmentBtns[j].classList.remove("menu-active");
    }
    alignmentBtns[i].classList.add("menu-active");
    cellObj.halign = newAlignment;
    }
}
function getcell() {
    let address = addressElem.value;
    let { rid, cid } = getRidCidfromAddress(address);
    console.log(rid, cid);
    return document.querySelector(`.grid .cell[rid="${rid}"][ cid="${cid}"]`)
}
function getRidCidfromAddress() {
    
    let address = addressElem.value;
    // A->z
    // 1->100
    let cid = Number(address.charCodeAt(0)) - 65;
    let rid = Number(address.slice(1)) - 1;
    // console.log(rid,cid);
    return { cid, rid };
} 

let Allcells = document.querySelectorAll(".grid .cell");
let addressElem = document.querySelector(".address");

for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("click", function () {
        console.log(Allcells[i]);
        let cid = Allcells[i].getAttribute("cid");
        let rid = Allcells[i].getAttribute("rid");
        cid = Number(cid);
        rid = Number(rid);
        // console.log(rid,cid);
        addressElem.value = `${String.fromCharCode(65 + cid)}${rid + 1}`;
        let cellObj = sheetArr[rid][cid];
        if(cellObj.isBold==true) {
            bold.classList.add("menu-active");
        }else{
            bold.classList.remove("menu-active");
            
        }
        if(cellObj.isItalic==true) {
            italic.classList.add("menu-active");
        }else{
            italic.classList.remove("menu-active");
            
        }
        if(cellObj.isUnderline==true) {
            underline.classList.add("menu-active");
        }else{
            underline.classList.remove("menu-active");
            
        }
        fontSize.value = cellObj.fontSize;
        fontFamily.value = cellObj.fontFamily;

        for(let j = 0; j < alignmentBtns.length; j++){
        alignmentBtns[j].classList.remove("menu-active");
        let cAlignment = alignmentBtns[j].getAttribute("direct");
        if(cAlignment == cellObj.halign){
            alignmentBtns[j].classList.add("menu-active");
            
        }
      }
    formulabar.value = cellObj.formula;
    }
    )
}
Allcells[0].click();

// let Allcells = document.querySelectorAll(".grid .cell");
// let addressElem = document.querySelector(".address");
// for(let i = 0; i < Allcells.length; i++){
//     Allcells[i].addEventListener("click",function(){
//         let cid = Allcells[i].getAttribute("cid");
//         let rid = Allcells[i].getAttribute("rid");
//         cid = Number("cid");
//         rid = Number("rid");
//  addressElem.value = `${String.fromCharCode(65 + cid)}${rid + 1}`;
//     })
// }