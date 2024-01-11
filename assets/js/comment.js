async function Comments(commentid) {
    axios
        .get("/comments/" + commentid, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            // 데이터 블러와서 innerHtml로 모달 바디 부분에 입력 하기
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function createComment() {
    //form data 불러오기

    axios
        .post(
            "/comments",
            {
                // content: //formData.get("crcomment");
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            },
        )
        .then(function (response) {
            const comment = response.data;

            console.log(comment);
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
                // content: //formData.get("crcomment");
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

async function deleteComment(commentid) {
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
