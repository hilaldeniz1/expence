//! html den gelen elemanlar
const nameInput = document.getElementById('name-input');
const priceInput = document.getElementById('price-input');
const addBtn = document.querySelector('#add-btn');
const listArea = document.getElementById('list');
const statusCheckbox = document.getElementById('status-check');
const sumInfo = document.getElementById('sum-info');
const deleteBtn = document.getElementById('delete');
const userInput = document.getElementById('user-input');
const select = document.querySelector('select');


//! izledigimiz olaylar
addBtn.addEventListener('click',addExpense);
listArea.addEventListener('click',handleUpdate);
userInput.addEventListener('input',saveUser);
document.addEventListener('DOMContentLoaded', getUser);
select.addEventListener('change',handleFilter);

// toplamın degerını burada tutacagız
let sum = 0;

function updateSum(price){
    // js deki toplam degerını gunceller
    sum += Number(price);

    // html dekı toplam bılgı alanını guncelleme
    sumInfo.innerText = sum;
}

// eventlistener ile calıstırılan fonksıyonlar olay hakkında
// bilgileri iceren bir parametre gider
function addExpense(event) {
    // sayfayı yenilenmesini engelleme
    event.preventDefault();

    //!1- inputların biri bile bos ıse boşsa:alert ver ve  fonksiyonu durdur 
    if (!nameInput.value || !priceInput.value) {
        alert('Lütfen formu doldurunuz..');
        return;
    }

    //! 2-inputlar dolu ise bir kart olustur ve html e gonder 
    // a- div olusturma
    const expenseDiv = document.createElement('div');

    // b- dive class ekleme
    expenseDiv.classList.add('expense');

    // egerki ödendi checkboxına tıklandıysa odendı classı ekle
    if(statusCheckbox.checked === true){
        expenseDiv.classList.add('payed');
    }

    // c- icerisindeki html i belirleme
    expenseDiv.innerHTML = `<h2 class="name">${nameInput.value}</h2>
    <h2 class="price">${priceInput.value}</h2>
    <div class="btns">
        <img id="edit" src="images/payicon.png">
        <img id="delete" src="images/delete-icon.png">
    </div>
    `;
    // d- olusan elemanı html e gonderme
    listArea.appendChild(expenseDiv);

    // toplam alanını güncelleme
    updateSum(priceInput.value);

    // formu temizle
    nameInput.value = '';
    priceInput.value = '';
    statusCheckbox.checked = false;


}


// listedeki bır elemana tıklayınca calsıır
function handleUpdate(event){
    // tıklanılan eleman
    const ele = event.target;
     // silme resminin kapsayıcısına erişme
     const parent =ele.parentElement.parentElement;

    // yalnızca silme işlemınde calısacak kod 
    if(ele.id === "delete"){
       
        
        // elementi silme
        parent.remove();

        // toplam bilgisini guncelleme
        const price = parent.querySelector('.price').textContent;

        updateSum(Number(price) * -1);
        
    }

    //tıklanılan elemanın ıd si edit ise onun payed classını varsa cıkar yoksa ekle
    if(ele.id === "edit"){
        parent.classList.toggle('payed');

    }
}


// kullanıcıyı local e kaydetme

function saveUser(event){
    localStorage.setItem('username', event.target.value);

}

// kullanıcı localde varsa onu alma
function getUser(){
    // localden ismi al - isim daha önce kaydedılmemısse null yerıne "" olsun
    const username = localStorage.getItem('username') || '';

    // kullanıcı ısmını ınputa aktar
    userInput.value = username;
}


// filtreleme kısmı

function handleFilter(event) {
    const selected = (event.target.value);
    const items = list.childNodes;


    // butun elemanları donme 
    items.forEach(item => {
        // selected alabılecegı degerlerı ızleme
    switch(selected){
        case "all":
        // hepsini goster
        item.style.display = "flex";
        break;

        case "payed":
            // eleman payed classına sahipse onu goster degılse gızle
            if(item.classList.contains("payed")){
                item.style.display = "flex";
            }else{
                item.style.display = "none";
            }
            break;

        case "not-payed":
        // eleman payed clasına sahip degılse onu goster degılse gızle 
        if(!item.classList.contains("payed")){
            item.style.display = "flex";
        }else{
            item.style.display = "none";
        }
        break;
    }
    });
    
    }