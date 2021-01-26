import React from "react";
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import { Input } from 'src/components/Input/Input';

function Page() {
    return (
        <div>
            지영페이지
            <p>fontawesome_test</p>
            <button><i class="fas fa-play-circle"></i></button>
            <button><i class="fas fa-bars"></i></button>
            <br/>
            <br/>
            <ButtonComp width="small" border="base" value="버튼" />
            <br/>
            <ButtonComp width="regular" border="base" value="버튼" />
            <br/>
            <ButtonComp width="large" border="base" value="버튼" />
            <br/>
            <ButtonComp width="login" border="login-option" value="로그인" />

            <br/>
            <br/>
            
        </div>
    )
};

export default Page;