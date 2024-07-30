import {Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Lote from './pages/Lote';
import NotFound from './pages/NotFound';
import RequireAuth from './components/general/RequireAuth';
import LoteDetalhe from './pages/LoteDetalhe';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <>
            <Routes>
                <Route path="login" element={<Login />} />

                <Route path="/" element={<Layout />}>
                    <Route element={<RequireAuth />}>
                        <Route path="/" element={<Dashboard />} />
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
