import { useContext } from 'react';
import { Button, Title3 } from '@fluentui/react-components';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { UserContext } from '../contexts/context';
import { instance } from '../store/axios';
import { User } from '../store/interface';

interface LoginContainerProps {
    userInfo?: User;
}

const LoginContainer: React.FC<LoginContainerProps> = (props) => {
    const { userInfo } = useContext(UserContext);

    const onClickLogin = async (credentialResponse: CredentialResponse) => {
        const result = await instance.post('auth/login', { credential: credentialResponse.credential });
        if (result.data) {
            window.close();
        }
    };

    const onClickLogout = async () => {
        const result = await instance.post('auth/logout', {});
        if (result.data.success) {
            window.close(); // 자식 창 닫기
        }
    };

    return (
        <div style={{ width: '100%', minHeight: '95vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                }}
            >
                {userInfo ? (
                    <div>
                        <div>
                            <Title3>logout</Title3>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}></div>
                        <div>
                            <Button onClick={() => {
                                window.close();
                            }}>
                                Close
                            </Button>
                            <Button appearance="primary" onClick={() => onClickLogout()}>
                                logout
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div>
                            <Title3 style={{}}>login</Title3>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                            <GoogleLogin
                                type="icon"
                                shape="circle"
                                onSuccess={(credentialResponse) => onClickLogin(credentialResponse)}
                                onError={() => {}}
                            />
                        </div>
                        <div>
                            <Button onClick={() => {
                                window.close();
                            }}>
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginContainer;
