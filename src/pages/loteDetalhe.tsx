import {useParams} from 'react-router-dom';

const LoteDetalhe = () => {
    let {loteId} = useParams();

    return (
        <div className="p-5 h-full">
            <div className="p-5 h-full bg-white rounded-2xl">Lote {loteId}</div>
        </div>
    );
};

export default LoteDetalhe;
