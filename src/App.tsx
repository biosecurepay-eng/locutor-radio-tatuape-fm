import RadioPlayer from './components/RadioPlayer';
import AIAnnouncer from './components/AIAnnouncer';
import TrackDisplay from './components/TrackDisplay';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            Rádio Tatuape FM
          </h1>
          <p className="text-xl text-blue-200 font-medium">
            Nitro Rádio - It's Just Culture
          </p>
          <p className="text-sm text-blue-300 mt-2">
            Com DJ Virtual Inteligente
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <RadioPlayer />
          <AIAnnouncer />
          <TrackDisplay />
        </div>

        <div className="text-center mt-8 text-blue-200 text-sm">
          <p>A DJ Virtual comenta automaticamente sobre as músicas tocando ao vivo</p>
          <p className="mt-2 text-xs text-blue-300">
            Powered by Gemini AI • Text-to-Speech • Shoutcast Integration
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
