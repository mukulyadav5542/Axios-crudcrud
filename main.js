function saveToCrudCrud(event) {
    event.preventDefault();
    const candyname = event.target.CandyName.value;
    const description = event.target.Description.value;
    const price = event.target.Price.value;
    const quantity = event.target.Quantity.value;

    const obj = {
        candyname,
        description,
        price,
        quantity
    }

    axios.post("https://crudcrud.com/api/2cb51ea95c424064923d54f1c6681c35/restApi", obj)
        .then((response) => {
            showDetailsOnScreen(response.data);
        })
        .catch((err) => {
            document.innerHTML = document.innerHTML + "<h4> Something Went Wrong </h4>"
            console.log(err);
        }) 
}

function getData() {
    const parentElem = document.getElementById('ListOfCandies');
    while (parentElem?.firstChild) {
        parentElem.firstChild.remove();
    }
    console.log(parentElem);
    axios.get("https://crudcrud.com/api/2cb51ea95c424064923d54f1c6681c35/restApi")
        .then((response) => {
            for(let i = 0; i < response.data.length; i++) {
                showDetailsOnScreen(response.data[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function editData(obj) {
    let id = obj._id;
    delete obj._id
    axios.put(`https://crudcrud.com/api/2cb51ea95c424064923d54f1c6681c35/restApi/${id}`, obj)
        .then((response) => {
            getData();
        })
        .catch((err) => {
            console.log(err);
        })
}

window.addEventListener("DOMContentLoaded", () => {
    getData();
})

function showDetailsOnScreen(obj) {
    const parentElem = document.getElementById('ListOfCandies');
    const childElem = document.createElement('li');
    childElem.textContent = obj.candyname + ' - ' + obj.description + ' - ' + obj.price + ' - ' + obj.quantity
    const editButton = document.createElement('input');
    editButton.type = "button"
    editButton.value = "BuyOne"
    editButton.onclick = () => {
        obj.quantity = obj.quantity - 1;
        editData(obj);
    }    
    const editButton1 = document.createElement('input');
    editButton1.type = "button"
    editButton1.value = "BuyTwo"
    editButton1.onclick = () => {
        obj.quantity = obj.quantity - 2;
        editData(obj); 
    }        
    const editButton2 = document.createElement('input');
    editButton2.type = "button"
    editButton2.value = "BuyThree"
    editButton2.onclick = () => {
        obj.quantity = obj.quantity - 3;
        editData(obj);        
    }
    //parentElem.removeChild(childElem)
    document.getElementById('CandyNameInputTag').value = obj.candyname;
    document.getElementById('DescriptionInputTag').value = obj.description;
    document.getElementById('PriceInputTag').value = obj.price;
    document.getElementById('QuantityInputTag').value = obj.quantity;

    childElem.appendChild(editButton)
    childElem.appendChild(editButton1)
    childElem.appendChild(editButton2)

    parentElem.appendChild(childElem)
}