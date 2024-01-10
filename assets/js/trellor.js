// app.js
const boardListDiv = document.getElementById("board-list");
const boardDataDiv = document.getElementById("board-data");
const columnbtn = document.getElementById("columnBtn");

window.onload = function () {
    // const boardBtn = document.getElementById("boardBtn");
    // const boardId = "1";

    axios
        .get("/user/me", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            const boards = response.data.boards;
            // console.log(response.data);

            // board를 전체 불러오기 api를 구현후 배열로 받아서 foreach로 보드 전체를 불러온다.
            // const newButton = document.createElement("button");
            // newButton.textContent = boards.title;
            // boardListDiv.appendChild(newButton);

            //보드 기능(삭제, 수정) 메뉴드롭바
            boards.forEach((board) => {
                boardListDiv.innerHTML += `
                <div>
                    <li style="background-color: ${board.background}" onclick="updateBoardData(${board.id})" class="board-item">
                        ${board.title}
                        <div class="dropdown">
                            <button class="dropbtn">메뉴</button>
                            <div class="dropdown-content">
                            <a onclick="deleteColumn()">삭제</a>
                            <a onclick="setTimeout(updateBoardform(${board.id}), 0)" data-bs-toggle="modal"
                            data-bs-target="#updateBoardModal">수정</a>
                            </div>
                        </div>
                    </li>
                </div>`;
            });

            // columns.forEach((element) => {
            //     boardDataDiv.innerHTML += `<div class="column">12</div>`;
            // });
        })
        .catch(function (error) {
            console.log(error);
        });
};

// //초대 부분
// function inviteUser() {
//     const userinfo = document.getElementById("usersinfo");
//     userinfo.innerHTML = ``;

//     axios
//         .get("/user", {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             },
//         })
//         .then(function (response) {
//             userlist = response.data;
//             console.log(userlist);

//             userlist.forEach((user) => {
//                 userinfo.innerHTML += `
//                     <tr>
//                     <th scope="row">${user.name}</th>
//                     <td>${user.email}</td>
//                     <td><button>초대하기</button></td>
//                     </tr>
//                 `;
//             });
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// //카드 목록
// async function updateCardData(columnid, index) {
//     const cardData = document.getElementById("card-data-" + index);
//     axios
//         .get("/columns/" + columnid, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             },
//         })
//         .then(function (response) {
//             const cards = response.data;
//             console.log(cards);

//             cards.cards.forEach((card) => {
//                 cardData.innerHTML += `
//                 <div draggable="true" style="background-color: ${card.color}" class="card">${card.name}
//                 <div class="dropdown">
//                     <button class="dropbtn">메뉴</button>
//                     <div class="dropdown-content">
//                     <a onclick="deleteCard(${card.id})">삭제</a>
//                     <a onclick="updateCardform(${card.id})">수정</a>
//                     </div>
//                 </div>
//               </div>`;
//             });
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// // 카드 삭제
// async function deleteCard(cardid) {
//     axios
//         .delete("/cards/" + cardid, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             },
//         })
//         .then(function (response) {
//             alert("삭제되었습니다.");

//             window.location.reload();
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// //카드 생성폼
// function createCardform(columnid) {
//     //const createcardbtn = document.getElementById("cardBtn");
//     const createcard = document.getElementById("createCard");

//     createcard.innerHTML = `
// <form id="createCardform" method="POST">
//     <label for="name">이름:</label><br>
//     <input type="text" id="crcardname" name="crcardname"><br>

//     <label for="content">내용:</label><br>
//     <textarea id="crcardcontent" name="crcardcontent"></textarea><br>

//     <label for="color">색상:</label><br>
//     <input type="color" id="crcardcolor" name="crcardcolor"><br>

//     <label for="deadline">마감일:</label><br>
//     <input type="datetime-local" id="crcarddeadline" name="crcarddeadline"><br>

//     <input type="button" onclick="createCard(${columnid})" value="등록">
// </form>`;
// }

// //카드 수정폼
// function updateCardform(cardid) {
//     const updatecard = document.getElementById("updateCard");

//     console.log(cardid);

//     axios
//         .get("/cards/" + cardid, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             },
//         })
//         .then(function (response) {
//             const cardinfo = response.data;
//             let date = new Date(cardinfo.deadline);
//             let formattedDate = date.toISOString().split(".")[0];

//             updatecard.innerHTML = `
//         <form id="updateCardform" method="POST">
//             <label for="name">이름:</label><br>
//             <input type="text" id="upcardname" name="upcardname" value="${cardinfo.name}"><br>

//             <label for="content">내용:</label><br>
//             <textarea id="upcardcontent" name="upcardcontent">${cardinfo.content}</textarea><br>

//             <label for="color">색상:</label><br>
//             <input type="color" id="upcardcolor" name="upcardcolor" value="${cardinfo.color}><br>

//             <label for="deadline">마감일:</label><br>
//             <input type="datetime-local" id="upcarddeadline" name="upcarddeadline" value="${formattedDate}"><br>

//             <input type="button" onclick="updateCard(${cardid})" value="수정">
//         </form>`;
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// //카드 등록 기능
// async function createCard(columnid) {
//     const formData = new FormData(document.getElementById("createCardform"));
//     console.log(columnid);

//     axios
//         .post(
//             "/cards",
//             {
//                 columnId: Number(columnid),
//                 name: formData.get("crcardname"),
//                 content: formData.get("crcardcontent"),

//                 // // 색깔 날짜 저장하는 부분 확인해야함
//                 color: formData.get("crcardcolor"),
//                 deadline: Date(formData.get("crcarddeadline")),
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//                 },
//             },
//         )
//         .then(function (response) {
//             alert("(카드) 등록되었습니다.");
//             window.location.reload();
//         })
//         .catch(function (error) {
//             console.log(error.response.data);
//         });
// }

// //카드 수정 기능
// async function updateCard(cardid) {
//     const formData = new FormData(document.getElementById("updateCardform"));
//     let date = new Date(formData.get("upcarddeadline"));
//     let formattedDate = date.toISOString().split(".")[0];
//     console.log(formData.get("upcardcolor"));
//     // console.log(formattedDate); // "2024-01-09T03:30:40"
//     axios
//         .patch(
//             "/cards/" + cardid,
//             {
//                 name: formData.get("upcardname"),
//                 content: formData.get("upcardcontent"),

//                 // 색깔 날짜 저장하는 부분 확인해야함
//                 color: formData.get("upcardcolor"),
//                 deadline: formattedDate,
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//                 },
//             },
//         )
//         .then(function (response) {
//             console.log(response.data);
//             alert("수정이 완료되었습니다.");
//             window.location.reload();
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// //컬럼 삭제
// async function deleteColumn(columnid) {
//     axios
//         .delete("/columns/" + columnid, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             },
//         })
//         .then(function (response) {
//             alert("삭제되었습니다.");

//             window.location.reload();
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// // 컬럼 생성폼
// function createColumnform(boardid) {
//     console.log(boardid);
//     const createcolumn = document.getElementById("createCloumn");

//     createcolumn.innerHTML = `
//     <form id="createColumnform" method="POST">
//         <label for="name">Column Name:</label><br>
//         <input type="text" id="crcolumntitle" name="crcolumntitle"><br>
//         <input type="button" onclick="createColumn(${boardid})" value="등록">
//     </form>
//     `;
// }

// // 컬럼 생성(기능)
// async function createColumn(boardid) {
//     const formData = new FormData(document.getElementById("createColumnform"));

//     axios
//         .post(
//             "/columns",
//             {
//                 title: formData.get("crcolumntitle"),
//                 boardId: boardid,
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//                 },
//             },
//         )
//         .then(function (response) {
//             alert("Column 생성 완료");
//             window.location.reload();
//         })
//         .catch(function (error) {
//             console.log(error.response.data);
//         });
// }

// // 컬럼 수정폼
// function updateColumnform(columnid) {
//     console.log(columnid);
//     const createcolumn = document.getElementById("createCloumn");

//     axios
//         .get("/columns/" + columnid, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             },
//         })
//         .then(function (response) {
//             const columninfo = response.data;

//             createcolumn.innerHTML = `
//             <form id="updateColumnform" method="POST">
//                 <label for="name">Column Name:</label><br>
//                 <input type="text" id="crcolumntitle" name="crcolumntitle" value="${columninfo.title}" ><br>
//                 <input type="button" onclick="updateColumn(${columnid})" value="수정">
//             </form>
//             `;
//         });
// }

// //컬럼 수정 기능
// async function updateColumn(columnid) {
//     const formData = new FormData(document.getElementById("updateColumnform"));

//     axios
//         .put(
//             "/columns/" + columnid,
//             {
//                 title: formData.get("crcolumntitle"),
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//                 },
//             },
//         )
//         .then(function (response) {
//             alert("(Column) 수정 되었습니다.");
//             window.location.reload();
//         })
//         .catch(function (error) {
//             console.log(error.response.data);
//         });
// }

// // 보드 추가폼
// function createBoardform() {
//     const createboard = document.getElementById("createBoard");

//     createboard.innerHTML = `
//     <form id="createBoardform" method="POST">
//         <label for="name">Title:</label><br>
//         <input type="text" id="crboardtitle" name="crboardtitle"><br>

//         <label for="color">Color:</label><br>
//         <input type="color" id="crboardcolor" name="crboardcolor"><br>

//         <label for="content">Desc:</label><br>
//         <textarea id="crboarddesc" name="crboarddesc"></textarea><br>

//         <input type="button" onclick="createBoard()" value="등록">
//     </form>
//     `;
// }

// // 보드 생성(기능)
// async function createBoard() {
//     const formData = new FormData(document.getElementById("createBoardform"));

//     axios
//         .post(
//             "/boards",
//             {
//                 title: formData.get("crboardtitle"),
//                 background: formData.get("crboardcolor"),
//                 description: formData.get("crboarddesc"),
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//                 },
//             },
//         )
//         .then(function (response) {
//             alert("(board) 등록이 완료되었습니다.");
//             window.location.reload();
//         })
//         .catch(function (error) {
//             console.log(error.response.data);
//         });
// }

// //보드 수정 폼
// function updateBoardform(boardid) {
//     const updateboard = document.getElementById("updateBoard");

//     axios
//         .get("/boards/" + boardid, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             },
//         })
//         .then(function (response) {
//             const boardinfo = response.data;

//             updateboard.innerHTML = `
//             <form id="updateBoardform" method="POST">
//                 <label for="name">Title:</label><br>
//                 <input type="text" id="upboardtitle" name="upboardtitle" value="${boardinfo.title}"><br>

//                 <label for="color">Color:</label><br>
//                 <input type="color" id="upboardcolor" name="upboardcolor" value="${boardinfo.background}"><br>

//                 <label for="content">Desc:</label><br>
//                 <textarea id="upboarddesc" name="upboarddesc">${boardinfo.description}</textarea><br>

//                 <input type="button" onclick="updateBoard(${boardid})" value="등록">
//             </form>
//             `;
//         });
// }

// //보드 수정 기능
// async function updateBoard(boardid) {
//     const formData = new FormData(document.getElementById("updateBoardform"));

//     console.log(formData.get("upboardcolor"));

//     axios
//         .put(
//             "/boards/" + boardid,
//             {
//                 title: formData.get("upboardtitle"),
//                 background: formData.get("upboardcolor"),
//                 description: formData.get("upboarddesc"),
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//                 },
//             },
//         )
//         .then(function (response) {
//             alert("(board) 수정 성공하였습니다.");
//             window.location.reload();
//         })
//         .catch(function (error) {
//             console.log(error.response.data);
//         });
// }

// // function getSelf(callback) {
// //     axios
// //         .get("/user/mee", {
// //             headers: {
// //                 authorization: `Bearer ${localStorage.getItem("accessToken")}`,
// //             },
// //         })
// //         .then(function (response) {
// //             callback(response.data.user);
// //         })
// //         .catch(function (error) {
// //             if (error.response.status == 401) {
// //                 alert("로그인이 필요합니다.");
// //                 console.log(error);
// //             } else {
// //                 console.log(error);
// //                 localStorage.clear();
// //                 alert("알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.");
// //             }
// //             // window.location.href = "/login.html";
// //         });
// // }
