import {Routes, Route} from 'react-router-dom';
import Layout from './components/general/Layout';
import Login from './pages/login';
import Lote from './pages/lote';
import NotFound from './pages/notFound';
import RequireAuth from './components/general/RequireAuth';
import LoteDetalhe from './pages/loteDetalhe';

function App() {
    return (
        <>
            <Routes>
                <Route path="login" element={<Login />} />

                <Route path="/" element={<Layout />}>
                    <Route element={<RequireAuth />}>
                        <Route path="/" element={<Lote />} />
                        <Route path="lotes" element={<Lote />} />
                        <Route path="lote/:loteId" element={<LoteDetalhe />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
