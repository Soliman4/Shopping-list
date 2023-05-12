const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;


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
    // Check for edit
    if(isEditMode){
        const itemToEdit = itemList.querySelector('.edit-mode');
        itemToEdit.classList.remove('.edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }else{
        if(checkIfitemExixts(newItem)){
            alert('that item already exists');
            return;
        }
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
function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }else{
        setItemToEdit(e.target);
    }
}
function checkIfitemExixts(item){
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

// udpate items 
function setItemToEdit(item){
    isEditMode = true;
    itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'))
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor= '#228b22'
    itemInput.value = item.textContent;
}

function removeItem(item){
    if(confirm ('Are you sure?')){
        // remove item from Dom
        item.remove();

        // Remove item from storage 
        RemoveItemFromStorage(item.textContent);

        CheckUI();
    }
}

function RemoveItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage();
    
    // filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !==item);

    // reset to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function ClearItems(){
    // first way to remove list
    // itemList.innerHTML = ''

    // better than first way
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    // clear from localStorage
    localStorage.removeItem('items');
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
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.background = '#333'

    isEditMode = false;
}

// initalize app 
function init(){
    // Event listeners
    itemForm.addEventListener('submit' , OnaddItem);
    itemList.addEventListener('click' , onClickItem);
    clearBtn.addEventListener('click', ClearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems)
}

init();
CheckUI();

