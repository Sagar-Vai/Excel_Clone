  let columns = 26;
let rows = 100;
let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let grid = document.querySelector(".grid");

for(let i = 0; i < columns; i++){
    let div = document.createElement("div");
    div.innerText = String.fromCharCode(65 + i);
    div.setAttribute("class","cell");
    topRow.appendChild(div);
}
for(let i = 1; i <= rows; i++){
    let div = document.createElement("div");
    div.innerText = i; 
    div.setAttribute("class","block");
    leftCol.appendChild(div);
}
let sheetListArr = [];
let sheetArr = [];
let iconContainer = document.querySelector(".icon_container");
let sheetList = document.querySelector(".sheet_list");
let firstSheet = document.querySelector(".sheet");
firstSheet.addEventListener("click",handleClick);
//addevent listener
firstSheet.click();
iconContainer.addEventListener("click",function(){
    // create new sheet
    let newSheet = document.createElement("div");
    // create element
    let allSheets = document.querySelectorAll(".sheet");
    let lastSheet = allSheets[allSheets.length - 1];
    let idx = lastSheet.getAttribute("idx");
    newSheet.setAttribute("idx",Number(idx) + 1);
    // text set
    newSheet.innerText = `Sheet-${Number(idx) + 2}`;
    // set class  
    newSheet.setAttribute("class","sheet");
    // append 
    sheetList.appendChild(newSheet);
    // allSheets = document.querySelectorAll(".sheet");
    setLastActive(allSheets);
    // futute handle click
    newSheet.addEventListener("click", handleClick);
    newSheet.click();
})
function setLastActive(allSheets){
    for(let i = 0; i < allSheets.length; i++){
        allSheets[i].classList.remove("active");
    }
    allSheets[allSheets.length - 1].classList.add("active");
}
function handleClick(e){
    let sheet = e.currentTarget;
    let allSheets = document.querySelectorAll(".sheet");
    for(let i = 0; i < allSheets.length; i++){
        allSheets[i].classList.remove("active");
    }
    sheet.classList.add("active");
    let idx = sheet.getAttribute("idx");
    // db sheet change ui sync 
    if (idx == 0 && sheetList.length == 0) {
        initSheetDB();
        //    for all operation
        sheetArr = sheeListArr[0];
    } else {
        // create a new sheet
        if (sheetListArr[idx] == undefined) {
            initSheetDB();
            sheetArr = sheetListArr[idx];
        } else {
            // /switch sheet
            sheetArr = sheetListArr[idx];
        }
        setUI(sheetArr)
    }
}


function initSheetDB(){
    let sheetArr = [];
    for (let i = 0; i < rows; i++) {
        let row = document.createElement("div");
        let rowArr = [];
        row.setAttribute("class", "row");
        for (let j = 0; j < columns; j++) {
            // UI
            let cell = document.createElement("div");
            cell.setAttribute("class", "cell");
            cell.setAttribute("rid", i);
            cell.setAttribute("cid", j);
            cell.setAttribute("contenteditable", "true");
            row.appendChild(cell);
            // 
            let cellObj = {
                isBold: false,
                isItalic:false,
                isUnderline:false,
                fontFamily: "sans-serif",
                fontSize: 16,
                color: "black",
                bgColor: "",
                halign: "center",
                value: "",
                formula: "",
                children: []
            }
            rowArr.push(cellObj);
        }
        grid.appendChild(row);
        sheetArr.push(rowArr);
    }
    sheetListArr.push(sheetArr);
}

function setUI(sheetArr) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let cellElem = document.querySelector(`.grid .cell[rid="${i}"][cid="${j}"]`);
            let cellObj = sheetArr[i][j];
            cellElem.innerText = cellObj.value;
            cellElem.style.fontWeight = cellObj.isBold == true ? "bold" : "normal";
            cellElem.style.fontSize = cellObj.fontSize + "px";
        }
    }
    document.querySelector(`.grid .cell[rid="${0}"][cid="${0}"]`).click();
}