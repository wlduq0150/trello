function checkDuplicateEmail() {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");

    // Simulate email duplication check (replace with actual AJAX call)
    const isEmailDuplicate = Math.random() < 0.5;

    if (isEmailDuplicate) {
        emailError.textContent = "중복된 이메일입니다.";
    } else {
        emailError.textContent = "";
    }
}

function checkPasswordMatch() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const passwordError = document.getElementById("passwordError");

    if (password !== confirmPassword) {
        passwordError.textContent = "비밀번호가 일치하지 않습니다.";
    } else {
        passwordError.textContent = "";
    }
}

async function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("signupForm"));

    let response;

    try {
        response = await axios.post(server + "/auth/signup", {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            checkPassword: formData.get("passwordConfirm"),
        });
    } catch (e) {
        response = e.response.data;
    }

    if (response.status === 201) {
        // Successful signup
        alert("회원가입에 성공하였습니다.");
        window.location.href = "login.html";
    } else {
        // Failed signup
        alert(response.message);
    }
}

async function postData(url, data) {
    const response = await axios.post(server + url, data);
    return response;
}
