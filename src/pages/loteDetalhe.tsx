import {useParams} from 'react-router-dom';

const LoteDetalhe = () => {
    let {loteId} = useParams();

    return <div>Oeee {loteId}</div>;
};

export default LoteDetalhe;
