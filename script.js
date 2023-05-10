const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemtoDom(item));
    CheckUI();
}

function OnaddItem(e){
    e.preventDefault();

    const newItem = itemInput.value;
    // validate Input
    if(newItem === ''){
        alert('please add an item');
        return;
    }
    // create itom Dom element 
    addItemtoDom(newItem)
    // add item to local storage
    addItemToStorage(newItem)

    CheckUI();
    // to erase item input after click
    itemInput.value = '';
}

function addItemtoDom(item){
    // create list item 
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    // add li to the dom
    itemList.appendChild(li);
}


function createButton(clases){
    const button = document.createElement('button');
    button.className = clases;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon)
    return button;
}


function createIcon(clases){
    const icon = document.createElement('i');
    icon.className = clases;
    return icon;
}
function addItemToStorage(item){
    const itemsfromStorage = getItemsFromStorage();
    // add new item to array
    itemsfromStorage.push(item);

    // convert to json string and set to local storage 
    localStorage.setItem('items', JSON.stringify(itemsfromStorage))
}

function getItemsFromStorage(){
    let itemsfromStorage;
    if (localStorage.getItem('items') === null) {
        itemsfromStorage = [];
    }else{
        itemsfromStorage =JSON.parse(localStorage.getItem('items'));
    }
    return itemsfromStorage;

}
function removeItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            CheckUI();
        }
    }
}

function ClearItems(){
    // one way to remove list
    // itemList.innerHTML = ''

    // better than first way
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    CheckUI();
}

function filterItems(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    items.forEach(item =>{
        const itemName = item.firstChild.textContent.toLocaleLowerCase();
        if(itemName.indexOf(text) !=-1){
            item.style.display = 'flex';
        }else{
            item.style.display = 'none';
        }
    })
}

function CheckUI() {
    const items = itemList.querySelectorAll('li');
    if(items.length === 0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

// initalize app 
function init(){
    // Event listeners
    itemForm.addEventListener('submit' , OnaddItem);
    itemList.addEventListener('click' , removeItem);
    clearBtn.addEventListener('click', ClearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems)
}

init();
CheckUI();

