
function initMenu() {
    addMenuItems(menuList);
}

function addMenuItems(menuArray) {
    const menuDiv = document.querySelector('#items');
    menuArray.forEach(item => {
        menuDiv.appendChild(createMenuItem(item));
    });
}

function createMenuItem(item){

    const containerDiv = document.createElement('div');
    containerDiv.setAttribute('menu-id', item.id);
    containerDiv.classList.add('card');
    containerDiv.draggable = true;
    containerDiv.ondragstart = function (event){
        event.dataTransfer.setData('text', item.id);}

    const h4Element = document.createElement('h4');
    h4Element.innerHTML = item.name;

    const costElement = document.createElement('p');
    costElement.innerHTML = "Rs. " + item.price;

    containerDiv.appendChild(h4Element);
    containerDiv.appendChild(costElement);

    return containerDiv;
}


function destroyMenuItems() {
    document.getElementById("items").innerHTML="";
}


function processSearchMenu() {
    const newMenuArray = searchMenu();

    destroyMenuItems();
    addMenuItems(newMenuArray);
}

function searchMenu() {
    const searchInput = document.querySelector('#menu-search-input').value.toLowerCase();

    newMenuList = menuList.filter((menu) => {
        if (menu.name.toLowerCase().indexOf(searchInput) !== -1 ||
            menu.type.toLowerCase().indexOf(searchInput) !== -1) {
            return true;
        }
        return false;
    });
    return newMenuList;
}


function getMenuItemById(theId) {
    const newMenuList = menuList.filter((menu) => {
        if (menu.id == theId) {
            return true;
        }
        return false;
    });
    return newMenuList[0];
}

function tableSearch() {
    let tablesearchfilter = document.getElementById("tablesearch").value;
    tablesearchfilter = tablesearchfilter.toLowerCase();
    let tableitems = document.getElementsByClassName("table");
    console.log(tableitems);
    for (let k = 0; k < tableitems.length; k++) {
        if (tableitems[k].textContent.toLowerCase().indexOf(tablesearchfilter) != -1) {
            tableitems[k].style.display = 'block';
        } else {
            tableitems[k].style.display = 'none';
        }
    }
}

function setQuantity(element) {
    let quantity = element.value;
    if (quantity < 0 || quantity > 10) {
        alert("Minimum order 1 and Maximum orders is 10");
        element.defaultValue = 1;
        element.value = 1;
    } else {
        element.defaultValue = quantity;
    }
    console.log(element);
}

function calculateTotal(tableId) {

    var totalId = "total" + tableId;
    var total = 0;
    console.log(totalId);
    console.log(tableId);
    var Rows = document.getElementById(tableId).rows;
    for (let k = 1; k < Rows.length; k++) {

        let inputId = Rows[k].children[2].children[0].id;
        let price = parseInt(Rows[k].children[1].textContent);
        total += price * parseInt(document.getElementById(inputId).value);
    }
    var itemsId = "items" + tableId;
    document.getElementById(itemsId).innerHTML = `Items : ${Rows.length-1}`
    document.getElementById(totalId).innerHTML = `Total : ${total}`;
    totalId = "total_" + tableId;
    document.getElementById(totalId).innerHTML = `<b>Total :</b> ${total}`;
    return total;

}

function deleteItem(element, id) {
    element.parentElement.parentElement.parentElement.remove();
    calculateTotal(id);
}


function resetTable(id) {
    alert("The total bill is " + calculateTotal(id));
    document.getElementById(id).innerHTML = `<thead><tr>
    <th>Item</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>delete</th>
    </tr></thead>`
    calculateTotal(id);
    console.log(id);
    let viewId = "view" + id.slice(1);
    let bId = "reset" + id.slice(1);
    const modal = document.querySelector('#my-modal-' + id);
    modal.display = 'none';
    const table = document.getElementById("table" + id.slice(1));
    console.log("*******************"+id);
    closeTable(id);
}

function closeTable(id) {
    const modal = document.querySelector('#my-modal-' + id);
    modal.style.display = 'none';
    const table = document.getElementById("table" + id.slice(1));
    table.style.backgroundColor = 'white';

}



function showTable(id) {

    console.log(id);
    const modal = document.querySelector('#my-modal-' + id);
    modal.style.display = 'block';
}

function allowDrop(ev) {
    ev.preventDefault();
}


function drop(ev, target) {
    ev.preventDefault();
    document.getElementById(target.id).addEventListener("ondrop", ()=>document.getElementById(target.id).style.backgroundColor = "lightblue");
    var data = ev.dataTransfer.getData("text");
    console.log(target.id);
    console.log(data);
    let item = getMenuItemById(data);
    // let item = element.textContent;
    console.log(item);
    console.log(target.id);
    var setTableId = target.id.replace('able', '');
    console.log(setTableId);
    var vals = [item.name,item.price];
    console.log(vals);

    var itemexists = false;
    let tbodies = document.getElementById(setTableId).getElementsByTagName("tbody");
    console.log(tbodies);
    console.log(tbodies.length);

    for (var i = 0; i < tbodies.length; i++) {
        let tr = tbodies[i].children[0];
        let itemname = tr.children[0].textContent;
        console.log(itemname);
        if (itemname == vals[0]) {
            itemexists = true;
            inputId = setTableId + "i" + (i + 1);
            console.log("inputid", inputId);
            console.log("inputid", document.getElementById(inputId));
            let quantity = parseInt(document.getElementById(inputId).value) + 1;
            tr.children[2].innerHTML = `<input type="number" id=${inputId} value=${quantity}  min='1' max='10' onChange="setQuantity(this); calculateTotal('${setTableId}'); ">`
            break;
        }
    }
    let quantity = 1;
    let inpId = setTableId + "i" + document.getElementById(setTableId).rows.length;

    if (itemexists == false) {
        console.log(document.getElementById(setTableId).innerHTML);
        document.getElementById(setTableId).innerHTML += `<tr><td>${vals[0]}</td><td>${vals[1]}</td><td><input type="number" id=${inpId} value=${quantity}  min='1' max='10' onChange="setQuantity(this); calculateTotal('${setTableId}'); "></td><td><a onclick="deleteItem(this,'${setTableId}')"><div class="w3-padding w3-xlarge w3-text-black">
        <i class="material-icons">delete</i>
        </div></a></td></tr>`;
        total = calculateTotal(setTableId);
        document.getElementById("total_" + setTableId).innerHTML = `${total}`;
    }
    var itemsId = "items" + setTableId;
    var noOfItems = document.getElementById(setTableId).rows.length - 1;
    document.getElementById(itemsId).innerHTML = `Items : ${noOfItems}`;
    calculateTotal(setTableId);
}
