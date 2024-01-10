async function columnMove(event) {
    if (event.target.className !== "column") return;

    const id = event.target.dataset.id;
    console.log("이동: ", id);

    let prevId = null;
    let nextId = null;

    const boardDataDiv = document.getElementById("board-data");
    const columns = boardDataDiv.children;

    let changedColumnIndex = -1;

    for (let idx in columns) {
        if (idx === "length") break;

        if (columns[idx].getAttribute("data-id") === id) {
            changedColumnIndex = +idx;
        }
    }

    console.log(changedColumnIndex);

    if (changedColumnIndex !== -1 && changedColumnIndex > 0) {
        prevId = columns[changedColumnIndex - 1].getAttribute("data-id");
    }

    if (changedColumnIndex !== -1 && changedColumnIndex < columns.length - 1) {
        nextId = columns[changedColumnIndex + 1].getAttribute("data-id");
    }

    console.log("prev ", prevId);
    console.log("next ", nextId);

    let response;

    try {
        response = await axios.patch(
            server + `/columns/${id}/move`,

            {
                prevId,
                nextId,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            },
        );
    } catch (e) {
        response = e.response;
    }

    console.log(response);
}

//컴럼 조회
async function updateBoardData(boardid) {
    const boardDataDiv_ = document.getElementById("board-data");
    boardDataDiv_.dataset.id = boardid;

    boardDataDiv.innerHTML = ``;
    columnbtn.innerHTML = ``;
    axios
        .get("/boards/" + boardid, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            const columns = response.data.columns;
            // console.log(response.data);

            columns.forEach((column, index) => {
                boardDataDiv.innerHTML += `
                <div data-id="${column.id}" draggable="true" class="column" ondragend="columnMove(event)">
                    <div>
                        <h3>
                        <div style="display: flex">
                        <div class="dropdown">
                            <button class="dropbtn"><i class="fas fa-solid fa-bars"></i></button>
                            <div class="dropdown-content">
                            <a onclick="deleteColumn(${column.id})">삭제</a>
                            <a onclick="setTimeout(updateColumnform(${column.id}), 0)" data-bs-toggle="modal"
                            data-bs-target="#updatetColumnModal">수정</a>
                            </div>
                        </div>
                        ${column.title}
                        </h3>
                        <div id="card-data-${index}"></div>
                    </div>
                    <div>
                        <button onclick="setTimeout(createCardform(${column.id}), 0)" id="cardBtn" data-bs-toggle="modal" data-bs-target="#createCardModal">Add a card...</button>
                    </div>
                </div>`;
                setTimeout(() => {
                    updateCardData(column.id, index);
                }, 0);
            });
            //컬럼 생성 버튼
            columnbtn.innerHTML += `<button onclick="setTimeout(createColumnform(${boardid}), 0)" data-bs-toggle="modal" data-bs-target="#createColumnModal" id="columnBtn"><i class="fas fa-solid fa-plus"></i> Add a Column</button>`;
        })
        .catch(function (error) {
            console.log(error);
        });
}

//컬럼 삭제
async function deleteColumn(columnid) {
    axios
        .delete("/columns/" + columnid, {
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

// 컬럼 생성폼
function createColumnform(boardid) {
    console.log(boardid);
    const createcolumn = document.getElementById("createCloumn");

    createcolumn.innerHTML = `
    <form id="createColumnform" method="POST">
        <label for="name">Column Name:</label><br>
        <input type="text" id="crcolumntitle" name="crcolumntitle"><br>
        
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
                            onclick="createColumn(${boardid})"
                            type="button"
                            class="btn btn-primary"
                        >
                            Create
                        </button>
                    </div>
    `;
}

// 컬럼 생성(기능)
async function createColumn(boardid) {
    const formData = new FormData(document.getElementById("createColumnform"));

    axios
        .post(
            "/columns",
            {
                title: formData.get("crcolumntitle"),
                boardId: boardid,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            },
        )
        .then(function (response) {
            alert("Column 생성 완료");
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error.response.data);
        });
}

// 컬럼 수정폼
function updateColumnform(columnid) {
    console.log(columnid);
    const updatecolumn = document.getElementById("updateCloumn");

    axios
        .get("/columns/" + columnid, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            const columninfo = response.data;

            updatecolumn.innerHTML = `
            <form id="updateColumnform" method="POST">
                <label for="name">Column Name:</label><br>
                <input type="text" id="crcolumntitle" name="crcolumntitle" value="${columninfo.title}"><br>
                
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
                            onclick="updateColumnn(${columnid})"
                            type="button"
                            class="btn btn-primary"
                        >
                            Create
                        </button>
                    </div>
            `;
        });
}

//컬럼 수정 기능
async function updateColumnn(columnid) {
    const formData = new FormData(document.getElementById("updateColumnform"));

    axios
        .put(
            "/columns/" + columnid,
            {
                title: formData.get("crcolumntitle"),
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            },
        )
        .then(function (response) {
            alert("(Column) 수정 되었습니다.");
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error.response.data);
        });
}
