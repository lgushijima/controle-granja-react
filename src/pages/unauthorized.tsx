import {useNavigate} from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Permissão de acesso negada.</p>

            <button onClick={goBack}>Voltar</button>
        </div>
    );
};

export default Unauthorized;
