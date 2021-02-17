import React, { useEffect } from "react";
import fire from "src/fire";

function View(props) {


    function fireTest() {
        const database = fire.database();
        let chatList = database.ref('users/chat-plover-KKHH/3/124412412142');
        chatList.on('value', (list) => {
            const data = list.val();
            for (let key in data) {
                console.log(data[key]);
            }
        });
    }

    useEffect(() => {
        fireTest();
    }, []);

    return (
        <div>Chat 페이지</div>
    );
}

export default View;