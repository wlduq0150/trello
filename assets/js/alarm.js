function alarmcheck(data) {
    console.log(data);
    const mainalarm = document.getElementById("alarminfo1");
    const subalarm = document.getElementById("alarminfo2");

    axios
        .get("/alarm", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            const alarms = response.data;
            console.log(response.data);

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

            alarms.forEach((alarm) => {
                subalarm.innerHTML += `
            <tr>
                <th scope="row">${alarm.message} <button onclick="alarmDelete(${alarm.id})">삭제</button></th>
            </tr>`;
            });
        })
        .catch(function (error) {
            console.log(error);
        });
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
        })
        .catch(function (error) {
            console.log(error);
        });
}
