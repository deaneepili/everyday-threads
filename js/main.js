// Everyday Threads - contact form, order form and product photos.
// Both forms open the visitor's email app with the message already written (mailto link built with JavaScript).

const INQUIRY_EMAIL = "hello@examplewebsite142.com";
const ORDER_EMAIL = "orders@examplewebsite142.com";

// Opens the visitor's email app with a ready-to-send message
function openEmail(to, subject, body) {
  const link = "mailto:" + to +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);
  window.location.href = link;
}

// Shows or clears an error message under a form field
function setFieldError(field, message) {
  const errorBox = document.getElementById(field.id + "-error");
  if (message) {
    field.setAttribute("aria-invalid", "true");
    errorBox.textContent = message;
    errorBox.hidden = false;
  } else {
    field.removeAttribute("aria-invalid");
    errorBox.textContent = "";
    errorBox.hidden = true;
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// ---------- Contact form (Contact us page) ----------
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameField = document.getElementById("contact-name");
    const emailField = document.getElementById("contact-email");
    const messageField = document.getElementById("contact-message");
    const status = document.getElementById("contact-status");

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const message = messageField.value.trim();

    setFieldError(nameField, name ? "" : "Please enter your name.");
    if (!email) {
      setFieldError(emailField, "Please enter your email address.");
    } else if (!isValidEmail(email)) {
      setFieldError(emailField, "Please enter an email like name@example.com.");
    } else {
      setFieldError(emailField, "");
    }
    setFieldError(messageField, message ? "" : "Please type your message.");

    // Move focus to the first field that needs fixing
    const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
    if (firstInvalid) {
      status.textContent = "Please fix the fields marked in red.";
      firstInvalid.focus();
      return;
    }

    const subject = "Question from " + name;
    const body =
      "Hi Everyday Threads,\n\n" +
      message + "\n\n" +
      "Name: " + name + "\n" +
      "Email: " + email;

    status.textContent = "Your email app should open now with your message ready to send. " +
      "If it does not open, email us at " + INQUIRY_EMAIL + ".";
    openEmail(INQUIRY_EMAIL, subject, body);
  });
}

// ---------- Order form (product pages) ----------
const orderForm = document.getElementById("order-form");

if (orderForm) {
  const qtyInput = document.getElementById("quantity");
  const minusBtn = document.getElementById("qty-minus");
  const plusBtn = document.getElementById("qty-plus");

  function clampQty(n) {
    if (isNaN(n) || n < 1) return 1;
    if (n > 10) return 10;
    return n;
  }

  minusBtn.addEventListener("click", function () {
    qtyInput.value = clampQty(parseInt(qtyInput.value, 10) - 1);
  });

  plusBtn.addEventListener("click", function () {
    qtyInput.value = clampQty(parseInt(qtyInput.value, 10) + 1);
  });

  orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const product = orderForm.dataset.product;
    const price = parseInt(orderForm.dataset.price, 10);
    const color = orderForm.dataset.color;
    const size = orderForm.querySelector('input[name="size"]:checked').value;
    const qty = clampQty(parseInt(qtyInput.value, 10));
    qtyInput.value = qty;
    const total = price * qty;
    const status = document.getElementById("order-status");

    const subject = "Order: " + product;
    const body =
      "Hi Everyday Threads! I'd like to order:\n\n" +
      "Shirt: " + product + "\n" +
      "Color: " + color + "\n" +
      "Size: " + size + "\n" +
      "Quantity: " + qty + "\n" +
      "Price: ₱" + price + " each\n" +
      "Total: ₱" + total + "\n\n" +
      "My name: \n" +
      "Delivery address: \n" +
      "Contact number: ";

    status.textContent = "Your email app should open now with your order ready to send. " +
      "If it does not open, email us at " + ORDER_EMAIL + ".";
    openEmail(ORDER_EMAIL, subject, body);
  });
}

// ---------- Product photo thumbnails ----------
const mainPhoto = document.getElementById("main-photo");

if (mainPhoto) {
  const thumbs = document.querySelectorAll(".thumb");
  thumbs.forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      mainPhoto.src = thumb.dataset.src;
      mainPhoto.alt = thumb.dataset.alt;
      thumbs.forEach(function (t) { t.setAttribute("aria-pressed", "false"); });
      thumb.setAttribute("aria-pressed", "true");
    });
  });
}
