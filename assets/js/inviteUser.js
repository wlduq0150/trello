const boardDataDiv_ = document.getElementById("board-data");

//초대 부분
function inviteUser() {
    // var boardid;
    // const boardDataDiv_ = document.getElementById("board-data");
    // boardDataDiv_.dataset.id = boardid;

    const userinfo = document.getElementById("usersinfo");
    const boardid = boardDataDiv_.dataset.id;
    userinfo.innerHTML = ``;

    console.log(boardid);

    axios
        .get("/user", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            userlist = response.data;
            console.log(userlist);

            userlist.forEach((user) => {
                userinfo.innerHTML += `
                    <tr>
                    <th scope="row">${user.name}</th>
                    <td>${user.email}</td> 
                    <td><button class="btn" onclick="invite(${user.id}, ${boardid})">초대하기</button></td>
                </tr>
                `;
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

//User에서 보드 부분도 같이 불러와야함
// async function

async function invite(userId, boardId) {
    // const userId = document.getElementById("userIdInput").value;
    // const boardId = document.getElementById("boardIdInput").value;
    console.log(userId, boardId);

    InviteUser(userId, boardId);
}

async function InviteUser(userId, boardId) {
    axios
        .post(
            `/invited-users/${userId}/${boardId}`,
            {
                userId: userId,
                boardId: boardId,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            },
        )
        .then(function (response) {
            alert("(invited-users) 유저초대에 성공하였습니다.");
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error.response.data);
        });
}
