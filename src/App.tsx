import React, {useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import UsersPage from "./components/Users/UsersPage";
import ProfilePage from "./components/Profile/ProfileContainer";
import LoginPage from "./components/Login/LoginPage";
import {Provider, useDispatch, useSelector} from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import {initializeApp} from "./redux/app-reducer";
import store, {AppStateType} from "./redux/redux-store";
import {Switch} from "react-router-dom";
import Dialogs from "./components/Dialogs/Dialogs";
import {Layout} from "antd";
import {HeaderBlock} from "./components/Header/Header";

const {Sider, Content} = Layout;


const App: React.FC = () => {
    const initialized = useSelector((state: AppStateType) => state.app.initialized);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeApp())
    }, [initialized]);

    return <div>
        {(!initialized) ? <Preloader/> : <Layout>
            <Sider>
                <div className="logo"><img alt='logo' className='sider_logo'
                                           src='https://pro2-bar-s3-cdn-cf.myportfolio.com/1a174dd0337e3641ecb2ebba8bf040bc/b35aa4154fc889d2be5b697c_rw_600.png?h=271c6f1cd4c137a1f171bf30adafef4b'/>
                </div>
                <Navbar/>
            </Sider>
            <Layout className="site-layout">
                <HeaderBlock/>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <div>
                        <Switch>
                            <Route exact path='/'
                                   render={() => <ProfilePage/>}/>
                            <Route path='/dialogs'
                                   render={() => <Dialogs/>}/>
                            <Route path='/profile/:userId?'
                                   render={() => <ProfilePage/>}/>
                            <Route path='/users'
                                   render={() => <UsersPage/>}/>
                            <Route path='/login'
                                   render={() => <LoginPage/>}/>
                            <Route path='*'
                                   render={() => <div>404 NOT FOUND</div>}/>

                        </Switch>
                    </div>
                </Content>
            </Layout>
        </Layout>}
    </div>
};


let AppContainer = withRouter(App);

const MainApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
};

export default MainApp;

