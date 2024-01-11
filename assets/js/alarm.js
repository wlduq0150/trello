const mainalarm = document.getElementById("alarminfo1");
const subalarm = document.getElementById("alarminfo2");
function alarmcheck(data) {
    if (data === undefined) {
        mainalarm.innerHTML += ``;
    } else {
        alert(data.message);
        mainalarm.innerHTML += `
    <tr>
        <th scope="row">${data.message}</th>
    </tr>
`;
    }
}

async function alarmDelete(alarmid) {
    axios
        .delete("/alarm/" + alarmid, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            //alert("알람이 삭제되었습니다."); //테스트 (실제구현에서는 사용하지 않음)
            // 새로고침을 사용하지 않고 실시간으로 사라지도록 확인하는 방법 고민
        })
        .catch(function (error) {
            console.log(error);
        });
}
