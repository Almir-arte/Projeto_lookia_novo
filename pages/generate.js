
// pages/generate.js
import { useState } from 'react';

export default function Generate() {
  const [prompt, setPrompt] = useState('');
  const [selectedIA, setSelectedIA] = useState('replicate');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/replicate?prompt=${encodeURIComponent(prompt)}`);
      const data = await res.json();
      setResult(data.output);
    } catch (err) {
      console.error('Erro ao gerar:', err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">LookIA - Gerador de Vídeo</h1>

      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-md space-y-4">
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
          rows={4}
          placeholder="Digite o que deseja gerar..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <select
          className="w-full border border-gray-300 rounded-lg p-3"
          value={selectedIA}
          onChange={(e) => setSelectedIA(e.target.value)}
        >
          <option value="replicate">Stable Diffusion (Imagem)</option>
          <option value="runway" disabled>Runway (em breve)</option>
          <option value="pika" disabled>Pika (em breve)</option>
          <option value="sora" disabled>Sora (em breve)</option>
        </select>

        <button
          onClick={handleGenerate}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          disabled={loading || !prompt}
        >
          {loading ? 'Gerando...' : 'Gerar'}
        </button>

        {result && (
          <div className="mt-4">
            <p className="mb-2 font-medium">Resultado:</p>
            <img src={result} alt="Resultado IA" className="w-full rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
}
