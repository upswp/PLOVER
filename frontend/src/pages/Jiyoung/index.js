import React from "react";
import Badge from 'src/components/Badge/Badge';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';

function Page() {
    return (
        <div>
            지영페이지
            <p>fontawesome_test</p>
            <button><i className="fas fa-play-circle"></i></button>
            <button><i className="fas fa-bars"></i></button>
            <br/>
            <br/>
            <ButtonComp width="small" type="base" value="버튼s" />
            <br/>
            <ButtonComp width="regular" type="base" value="버튼r" />
            <br/>
            <ButtonComp width="large" type="base" value="버튼l" />
            <br/>
            <ButtonComp width="login" type="login-option" value="로그인" />
            <br/>
            <br/>
            <Badge ordnum="first" value="1" />
            <Badge ordnum="second" value="2" />
            <Badge ordnum="third" value="3" />
            <Badge ordnum="fourth" value="4" />
            <Badge ordnum="fifth" value="5" />

            
        </div>
    )
};

export default Page;