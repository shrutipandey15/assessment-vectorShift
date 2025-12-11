import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-[#0f0820] via-[#1a0f2e] to-[#2d1b4e] overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.3,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <header className="relative z-50 bg-[#1a0f2e]/95 backdrop-blur-lg border-b border-purple-500/20 px-8 py-4">
        <h1 className="text-xl font-semibold text-white">Build Pipeline</h1>
      </header>

      <div className="relative z-40">
        <PipelineToolbar />
      </div>

      <div className="flex-1 relative">
        <PipelineUI />
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
