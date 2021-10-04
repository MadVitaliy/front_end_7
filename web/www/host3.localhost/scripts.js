let angle_id = "angle";
let count_id = "count";

let furnitures = ["стіл", "крісло", "стілець", "диван", "шафа", "полиця"];
let materials = ["дуб", "бук", "горіх", "вільха", "падук", "каштан", "тис", "фанера", "ДСП"];
let furnitures_materials = [
    [0, 1, 2, 3, 4],
    [3, 4, 5],
    [3, 4, 5, 6],
    [0, 1, 2, 3],
    [0, 1, 2, 7, 8],
    [0, 1, 7, 8]
];
let default_material = [0];

function funonload() {
    loadFurnitures();
    loadMaterials();
    drowFunctionGrag();
};

function loadFurnitures() {
    let furnitureBox = document.getElementById("furniture");
    furnitureBox.innerHTML = "";
    for (let i = 0; i < furnitures.length; i++) {
        var opt = document.createElement("option");
        opt.value = furnitures[i];
        opt.innerHTML = furnitures[i];
        furnitureBox.appendChild(opt);
    }
}

function loadMaterials() {
    let furnitureBox = document.getElementById("furniture");
    let selectedFurnitureIndex = furnitureBox.selectedIndex;

    let currentMaterials;
    if (selectedFurnitureIndex < furnitures.length)
        currentMaterials = furnitures_materials[selectedFurnitureIndex];
    else
        currentMaterials = default_material;

    let materialBox = document.getElementById("material");
    materialBox.innerHTML = "";
    for (let i = 0; i < currentMaterials.length; i++) {
        var opt = document.createElement("option");
        opt.value = materials[currentMaterials[i]];
        opt.innerHTML = materials[currentMaterials[i]];
        materialBox.appendChild(opt);
    }
}

function validateAngle(i_number) {
    if (isNaN(i_number) ||
        parseFloat(Number(i_number)) != i_number ||
        isNaN(parseFloat(i_number))) {
        return false
    };
    if (i_number <= 0 || i_number > 90)
        return false;
    return true;
}

function validateCount(i_number) {
    if (isNaN(i_number) ||
        parseInt(Number(i_number)) != i_number ||
        isNaN(parseInt(i_number, 10))) {
        return false
    };
    if (i_number <= 0)
        return false;
    return true;
}

function checkNumber(i_id, i_validator) {
    let angle = document.getElementById(i_id);
    if (i_validator(angle.value)) {
        angle.style.border = "solid green 2px";
        return true;
    } else {
        angle.style.border = "solid red 2px";
        return false
    }
}

function checkAgleInput() {
    checkNumber(angle_id, validateAngle);
}

function checkCountInput() {
    checkNumber(count_id, validateCount);
}

function radiansToDegrees(i_degrees) {
    return i_degrees * (Math.PI / 180);
}

function calculate() {
    let angle = document.getElementById(angle_id).value;
    let selectBox = document.getElementById("functionName");
    let fun = selectBox.options[selectBox.selectedIndex].value;
    console.log(fun);
    if (checkNumber(angle_id, validateAngle)) {
        let stringToEval = "Math." + fun + "(" + radiansToDegrees(angle) + ")";
        let result = eval(stringToEval);
        let stringToShow = fun + "(" + angle + "°) = " + result;
        document.getElementById("resultOutput").innerText = stringToShow;
    } else {
        document.getElementById("resultOutput").innerText = "";
    }
}

function dataValidation() {
    console.log("dataValidation()");

    let furnitureBox = document.getElementById("furniture");
    let furniture = furnitureBox.options[furnitureBox.selectedIndex].value;
    let materialBox = document.getElementById("material");
    let material = materialBox.options[materialBox.selectedIndex].value;
    let count = document.getElementById(count_id).value;

    if (furniture != null && furniture != "" &&
        material != null && material != "" &&
        checkNumber(count_id, validateCount)) {
        document.form1.action = "index.php";
    } else {
        form1.setAttribute("action", "");
    }
};

//drow graf
function drowFunctionGrag() {
    let y = x => 3 * Math.cos(2 * x);
    let z = 20; //scale
    let c = document.querySelector('canvas');
    let ctx = c.getContext('2d');

    //center point
    ctx.translate(c.width / 2, c.height / 2)

    //drowMainAxis
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.moveTo(0, -c.height / 2);
    ctx.lineTo(0, c.height / 2);
    ctx.moveTo(-c.width / 2, 0);
    ctx.lineTo(c.width / 2, 0);
    ctx.stroke();

    //drowGrid
    ctx.beginPath();
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 0.5;
    for (let x = -3 * Math.PI; x <= 3 * Math.PI; x += Math.PI) {
        ctx.moveTo(x * z, -c.height / 2);
        ctx.lineTo(x * z, c.height / 2);
    }
    for (let x = -3; x <= 3; x++) {
        ctx.moveTo(-c.width / 2, x * z);
        ctx.lineTo(c.width / 2, x * z);
    }
    ctx.stroke();

    //drow funtion
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (var i = -10; i <= 10; i += 0.2) {
        ctx[i ? 'lineTo' : 'moveTo'](i * z, -y(i) * z);
    }
    ctx.stroke();
};