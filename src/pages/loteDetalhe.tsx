import {useParams} from 'react-router-dom';

const LoteDetalhe = () => {
    let {loteId} = useParams();

    return (
        <div className="m-5">
            <div className="p-5 bg-white rounded-2xl">Lote {loteId}</div>
        </div>
    );
};

export default LoteDetalhe;
