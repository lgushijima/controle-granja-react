import {useNavigate} from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>A página solicitada não foi encontrada.</p>

            <button onClick={goBack}>Voltar</button>
        </div>
    );
};

export default NotFound;
