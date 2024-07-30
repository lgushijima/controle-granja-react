import {useParams} from 'react-router-dom';

export default function Lote() {
    let {loteId} = useParams();

    return <div>Oeee {loteId}</div>;
}
