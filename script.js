/* Dropdown Handler */
function toggleDropdown(dropdownId) {
    var dropdowns = document.querySelectorAll('.dropdown.show');
    dropdowns.forEach(function(dropdown) {
        if (dropdown.id !== dropdownId) {
            dropdown.classList.remove("show");
        }
    });

    var dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle("show");
  }

/* Shape Button Handler */
const buttons = document.querySelectorAll('.shape');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

/* Upload Handler */
const uploadButton = document.getElementById("upload-button");
const fileInput = document.getElementById("file-input");

uploadButton.addEventListener("click", function() {
  fileInput.click();
});