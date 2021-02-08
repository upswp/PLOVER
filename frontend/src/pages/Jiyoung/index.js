import React from "react";
import Badge from 'src/components/Badge/Badge';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import Tabs from 'src/components/Tabs/Tabs';



function Page() {
    return (
        <div>
            지영페이지
            <h1>------------------</h1>
            
            <h1>------------------</h1>
            <p>fontawesome_test</p>
            <button><i className="fas fa-play-circle"></i></button>
            <button><i className="fas fa-bars"></i></button>
            <br/>
            <br/>
            <ButtonComp width="small" type="base" textvalue="버튼s" />
            <br/>
            <ButtonComp width="regular" type="base" textvalue="버튼r" />
            <br/>
            <ButtonComp width="large" type="base" textvalue="버튼l" />
            <br/>
            <ButtonComp width="login" type="login-option" textvalue="로그인" />
            <br/>
            <br/>
            <Badge ordnum="first" value="1" />
            <Badge ordnum="second" value="2" />
            <Badge ordnum="third" value="3" />
            <Badge ordnum="fourth" value="4" />
            <Badge ordnum="fifth" value="5" />
            <br/>
            <br/>
            <br/>
            <Tabs>
                <div label="20k 팔로워">
                <p>팔로워~~~~~~~~~~~</p>
                </div>
                <div label="23 팔로잉">
                <p>팔로잉!!!!!!!!!!!!!!!!!!!</p>
                </div>
            </Tabs>
            <br/>
            <br/>
            <br/>
            <Tabs>
                <div label="Tab 1">
                <p>TAB 1 contents!!!!!!!!!!!!!!!!!!!</p>
                </div>
                <div label="Tab 2">
                <p>TAB 2 contents!!!!!!!!!!!!!!!!!!!</p>
                </div>
                <div label="Tab 3">
                <p>TAB 3 contents!!!!!!!!!!!!!!!!!!!</p>
                </div>
            </Tabs>
            
        </div>
    )
};

export default Page;