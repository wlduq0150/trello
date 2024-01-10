async function submitForm(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await axios.post(server + "/auth/login", {
            email: email,
            password: password,
        });

        console.log(response);

        if (response.status === 201) {
            // 로그인 성공
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            console.log(response.data.accessToken);
            alert("로그인에 성공하였습니다.");

            window.location.href = "index.html"; // 로그인 성공 후 이동할 페이지
        } else {
            // 로그인 실패
            alert(response.data.message);
        }
    } catch (error) {
        console.error("에러 발생:", error);
        alert("로그인에 실패하였습니다.");
    }
}
