//카드 목록
async function updateCardData(columnid, index) {
    const cardData = document.getElementById("card-data-" + index);
    axios
        .get("/columns/" + columnid, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            const cards = response.data;
            console.log(cards);

            cards.cards.forEach((card) => {
                cardData.innerHTML += `
                <div draggable="true" style="display:flex; background-color: ${card.color}" class="card">
                <div class="dropdown">
                    <button class="dropbtn"><i class="fas fa-solid fa-bars"></i></button>
                    <div class="dropdown-content">
                    <a onclick="deleteCard(${card.id})">삭제</a>
                    <a onclick="setTimeout(updateCardform(${card.id}), 0)" data-bs-toggle="modal" data-bs-target="#updateCardModal">수정</a>
                    </div>
                </div>
                ${card.name}
              </div>`;
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

// 카드 삭제
async function deleteCard(cardid) {
    axios
        .delete("/cards/" + cardid, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            alert("삭제되었습니다.");

            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });
}

//카드 생성폼
function createCardform(columnid) {
    //const createcardbtn = document.getElementById("cardBtn");
    const createcard = document.getElementById("createCard");

    createcard.innerHTML = `
<form id="createCardform" method="POST">
    <label for="name">이름:</label><br>
    <input type="text" id="crcardname" name="crcardname"><br>
    
    <label for="content">내용:</label><br>
    <textarea id="crcardcontent" name="crcardcontent"></textarea><br>

    <label for="color">색상:</label><br>
    <input type="color" id="crcardcolor" name="crcardcolor"><br>

    <label for="deadline">마감일:</label><br>
    <input type="datetime-local" id="crcarddeadline" name="crcarddeadline"><br>

    
</form>

<div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            onclick="createCard(${columnid})"
                            type="button"
                            class="btn btn-primary"
                        >
                            Create
                        </button>
                    </div>
`;
}

//카드 수정폼
function updateCardform(cardid) {
    const updatecard = document.getElementById("updateCard");

    console.log(cardid);

    axios
        .get("/cards/" + cardid, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            const cardinfo = response.data;
            let date = new Date(cardinfo.deadline);
            let formattedDate = date.toISOString().split(".")[0];

            updatecard.innerHTML = `
        <form id="updateCardform" method="POST">
            <label for="name">이름:</label><br>
            <input type="text" id="upcardname" name="upcardname" value="${cardinfo.name}"><br>
            
            <label for="content">내용:</label><br>
            <textarea id="upcardcontent" name="upcardcontent">${cardinfo.content}</textarea><br>
    
            <label for="color">색상:</label><br>
            <input type="color" id="upcardcolor" name="upcardcolor" value="${cardinfo.color}><br>
    
            <label for="deadline">마감일:</label><br>
            <input type="datetime-local" id="upcarddeadline" name="upcarddeadline" value="${formattedDate}"><br>
        </form>
        
        <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            onclick="updateCard(${cardid})"
                            type="button"
                            class="btn btn-primary"
                        >
                            Create
                        </button>
                    </div>
        `;
        })
        .catch(function (error) {
            console.log(error);
        });
}

//카드 등록 기능
async function createCard(columnid) {
    const formData = new FormData(document.getElementById("createCardform"));
    console.log(columnid);

    axios
        .post(
            "/cards",
            {
                columnId: Number(columnid),
                name: formData.get("crcardname"),
                content: formData.get("crcardcontent"),

                // // 색깔 날짜 저장하는 부분 확인해야함
                color: formData.get("crcardcolor"),
                deadline: Date(formData.get("crcarddeadline")),
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            },
        )
        .then(function (response) {
            alert("(카드) 등록되었습니다.");
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error.response.data);
        });
}

//카드 수정 기능
async function updateCard(cardid) {
    const formData = new FormData(document.getElementById("updateCardform"));
    let date = new Date(formData.get("upcarddeadline"));
    let formattedDate = date.toISOString().split(".")[0];
    console.log(formData.get("upcardcolor"));
    // console.log(formattedDate); // "2024-01-09T03:30:40"
    axios
        .patch(
            "/cards/" + cardid,
            {
                name: formData.get("upcardname"),
                content: formData.get("upcardcontent"),

                // 색깔 날짜 저장하는 부분 확인해야함
                color: formData.get("upcardcolor"),
                deadline: formattedDate,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            },
        )
        .then(function (response) {
            console.log(response.data);
            alert("수정이 완료되었습니다.");
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });
}
