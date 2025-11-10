import React, { useState, useEffect } from 'react';
import { Music, Clock, Disc3 } from 'lucide-react';
import { getShoutcastData, ShoutcastData, TrackInfo } from '../services/trackService';

const TrackDisplay: React.FC = () => {
  const [data, setData] = useState<ShoutcastData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const refreshIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getShoutcastData();
        if (result) {
          setData(result);
          setLastUpdate(new Date().toLocaleTimeString('pt-BR'));
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    refreshIntervalRef.current = setInterval(fetchData, 30000);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Disc3 className="w-6 h-6 animate-spin" />
            <h2 className="text-xl font-bold">Histórico de Músicas</h2>
          </div>
          {lastUpdate && (
            <span className="text-sm font-medium text-red-100">
              Atualizado: {lastUpdate}
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-300 border-t-red-600"></div>
          </div>
        ) : data ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 border-2 border-red-300 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Music className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                    Tocando Agora
                  </p>
                  <h3 className="font-bold text-lg text-slate-900 truncate mt-1">
                    {data.current.title}
                  </h3>
                  <p className="text-sm text-slate-700 truncate mt-0.5">
                    {data.current.artist}
                  </p>
                </div>
              </div>
            </div>

            {data.history && data.history.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="w-5 h-5 text-slate-600" />
                  <h3 className="font-bold text-slate-800">5 Músicas Anteriores</h3>
                </div>

                <div className="space-y-2">
                  {data.history.map((track: TrackInfo, index: number) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-3 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 font-bold text-slate-400 text-sm min-w-6">
                          #{index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-800 text-sm truncate">
                            {track.trackName}
                          </h4>
                          <p className="text-xs text-slate-600 truncate mt-0.5">
                            {track.artist}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(!data.history || data.history.length === 0) && (
              <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
                <p className="text-sm text-slate-500">
                  Carregando histórico de músicas...
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
            <p className="text-sm text-slate-600">
              Erro ao carregar dados do servidor
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackDisplay;
