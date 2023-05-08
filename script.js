const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function addItem(e){
    e.preventDefault();

    const newItem = itemInput.value;
    // validate Input
    if(newItem === ''){
        alert('please add an item');
        return;
    }
    // create list item 
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
    // to erase item input after click
    itemInput.value = ''
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

// Event Listeners
itemForm.addEventListener('submit' , addItem)