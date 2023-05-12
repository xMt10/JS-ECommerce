const categoryList = document.querySelector(".categories");
const productList = document.querySelector(".products");
const modal = document.querySelector(".modal-wrapper");
const openBtn = document.querySelector("#open-btn");
const closeBtn = document.querySelector("#close-btn");

//işimizi garantiye alır. HTML dosyası geldikten sonra kendisini çalıştırır
document.addEventListener("DOMContentLoaded", () => {
  //callback function > içerisinde farklı fonksiyonlar çalıştırır.
  fetchCategories();
  fetchProducts();
});

function fetchCategories() {
  //veri çekme isteği atıyoruz
  fetch("https://api.escuelajs.co/api/v1/categories")
    //gelen veriyi işliyoruz
    .then((res) => res.json())
    //işlenen veriyi foreach ile herbir obje ekrana basıyoruz
    .then((data) =>
      data.slice(0, 4).forEach((category) => {
        //gelen herbir obje için div oluşturma
        const categoryDiv = document.createElement("div");
        // div için class ekleme
        categoryDiv.classList.add("category");
        // divin içeriğini değiştirme
        categoryDiv.innerHTML = `
        <img src = "${category.image}" />
        <span>${category.name}</span>`;
        //Oluşan Divi HTML'deki listeye atma
        categoryList.appendChild(categoryDiv);
      })
    )
    .catch((err) => console.log(err));
}

// Ürünleri çekme
function fetchProducts() {
  fetch("https://api.escuelajs.co/api/v1/products")
    .then((res) => res.json())
    .then((data) =>
      data.slice(0, 25).forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
      <img src="${product.images[0]}" alt="" />
            <p>${product.title}</p>
            <p>${product.category.name}</p>
            <div class="product-action">
              <p>${product.price} $</p>
              <button onclick = "addToBasket({id:${product.id},title:'${product.title}',price:${product.price},img:'${product.images[0]}',amount:1})">Add to basket</button>
            </div> `;
        productList.appendChild(productDiv);
      })
    )
    .catch((err) => console.log(err));
}

let basket = [];

//Operation Of Adding to Basket
function addToBasket(product) {
  //sepetten parametre olarak gelen elamanı arar
  const foundItem = basket.find((basketItem) => basketItem.id === product.id);

  if (foundItem) {
    //eğer eleman sepette varsa bulunan elamanın amountunu bir arttır
    foundItem.amount++;
  } else {
    // eleman sepette yoksa sepete ekle
    basket.push(product);
  }
  console.log(basket);
}

// Basket Events

// Open and close
openBtn.addEventListener("click", () => {
  modal.classList.add("active");
});
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});
//eğer dışarı tıklanınca kapatmak istersek
// clasListlerde contains kullan
modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-wrapper")) {
    modal.classList.remove("active");
  }
});
