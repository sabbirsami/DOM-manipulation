const orderList = document.getElementById("order-list");
const totalAmount = document.getElementById("total");
const newTotalPriceElement = document.getElementById("total-price");
const discountAmount = document.getElementById("discount");
const coupon = document.getElementById("coupon");
const applyCouponButton = document.getElementById("apply-coupon");
const makePurchase = document.getElementById("make-purchase");

let totalPrice = 0;
let total = 0;
let discount = 0;

function handleProduct(e) {
    // GET VALUE
    const productName = e.childNodes[3].childNodes[3].innerText;
    const productPrice = parseFloat(
        e.childNodes[3].childNodes[5].childNodes[1].innerText
    );
    // CREATE NEW lI FOR ORDER PRODUCT
    const orderedProduct = document.createElement("li");
    orderedProduct.innerText = productName;
    orderedProduct.classList.add("fw-semibold");
    orderedProduct.classList.add("pt-1");
    orderList.appendChild(orderedProduct);
    totalPrice = totalPrice + productPrice;
    total = total + productPrice;

    if (total <= 0) {
        goHomepage();
    } else {
        makePurchase.removeAttribute("disabled");
    }

    newTotalPriceElement.innerText = totalPrice;
    totalAmount.innerText = total;
}

// GET COUPON AND CHECK
coupon.addEventListener("keyup", function () {
    const couponField = coupon.value;
    console.log(couponField);
    console.log(totalPrice);
    if (totalPrice >= 200 && couponField === "SELL200") {
        applyCouponButton.removeAttribute("disabled");
        applyCouponButton.addEventListener("click", function () {
            const newTotal = ((total * 20) / 100).toFixed(2);
            discountAmount.innerText = newTotal;
            total = total - newTotal;
            totalAmount.innerText = total.toFixed(2);
        });
    } else {
        applyCouponButton.setAttribute("disabled", true);
    }
});

// COPY COUPON CODE
function copyCoupon() {
    const copyCode = document.getElementById("coupon-code");
    copyCode.select();
    copyCode.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyCode.value);
}

// HANDLE MODAL
function goHomepage() {
    location.reload();
}
