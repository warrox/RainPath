import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CasesList } from './pages/CasesList';
import { CaseDetail } from './pages/CaseDetail';
import { CreateCase } from './pages/CreateCase';
import { HierarchicalGraph } from './pages/HierarchicalGraph';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cases" replace />} />
        <Route path="/cases" element={<CasesList />} />
        <Route path="/cases/:id" element={<CaseDetail />} />
        <Route path="/create-case" element={<CreateCase />} />
        <Route path="/graph/:id" element={<HierarchicalGraph />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
