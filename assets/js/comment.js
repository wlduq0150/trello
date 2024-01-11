const commentfor_ = document.getElementById("commentform");
const commentform2 = document.getElementById("commentform2");

function commentform(id) {
    console.log(id);
    const cardid = id;

    commentform2.innerHTML = `
    
        <form id="commentff" method="POST">
        <label for="name">Comment:</label><br>
        <input type="text" id="crcomment" name="crcomment"><br>

        </form>

        <div class="modal-footer">
        <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
        >
            Close
        </button>
        <button onclick="createcomment(${cardid})" type="button"  class="btn">
                댓글 달기
            </button>
    </div>

            
        
    `;
}

let isFunctionCalled = false;

function Comments(commentid) {
    if (isFunctionCalled) {
        return; // 이미 함수가 호출되었다면 아무것도 실행하지 않고 return
    }

    isFunctionCalled = true;
    axios
        .get("/comments/cards/" + commentid + "/comments", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            // 데이터 블러와서 innerHtml로 모달 바디 부분에 입력 하기
            const comments = response.data;
            console.log(comments);

            comments.forEach((comment) => {
                commentfor_.innerHTML += `
    
    <tr>
        <th>${comment.user.name}</th>
        <td width="70%" >${comment.content}</td>
        <td><button class="btn" onclick="deletecomment(${comment.id})">삭제</button></td>
    </tr>
   
    `;
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function createcomment(cardid) {
    //form data 불러오기
    const formData = new FormData(document.getElementById("commentff"));
    // console.log(id);

    axios
        .post(
            "/comments/cards/" + cardid + "/comments",
            {
                comment: formData.get("crcomment"),
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            },
        )
        .then(function (response) {
            alert("댓글 등록");
            const comment = response.data;

            console.log(comment);
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function updateComment(commentid) {
    axios
        .patch(
            "/comments/" + commentid,
            {
                // content: //formData.get("comment");
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            },
        )
        .then(function (response) {
            console.log("수정성공");
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function deletecomment(commentid) {
    axios
        .delete("/comments/" + commentid, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            console.log("삭제성공");
        })
        .catch(function (error) {
            console.log(error);
        });
}
