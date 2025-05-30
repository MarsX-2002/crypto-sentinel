
<<<<<<< HEAD
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PortfolioItem, CoinGeckoMarketData, CoinGeckoDetailData, Notification, NotificationAction } from './types';
=======
<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import { PortfolioItem, CoinGeckoMarketData, CoinGeckoDetailData } from './types';
=======
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PortfolioItem, CoinGeckoMarketData, CoinGeckoDetailData, Notification, NotificationAction } from './types';
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
import { fetchCoinsMarketData, fetchCoinDetailData } from './services/coingeckoService';
import PortfolioForm from './components/PortfolioForm';
import PortfolioTable from './components/PortfolioTable';
import CoinDetailView from './components/CoinDetailView';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
<<<<<<< HEAD
import NotificationIndicator from './components/NotificationIndicator';
import NotificationPanel from './components/NotificationPanel';
import { VOLATILITY_THRESHOLD } from './constants';
=======
<<<<<<< HEAD
=======
import NotificationIndicator from './components/NotificationIndicator';
import NotificationPanel from './components/NotificationPanel';
import { VOLATILITY_THRESHOLD } from './constants';
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)

const App: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    const savedPortfolio = localStorage.getItem('cryptoPortfolio');
    return savedPortfolio ? JSON.parse(savedPortfolio) : [];
  });
  const [marketData, setMarketData] = useState<Record<string, CoinGeckoMarketData>>({});
  const [detailedCoinData, setDetailedCoinData] = useState<Record<string, CoinGeckoDetailData>>({});
  
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);
  
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(false);
  const [isLoadingCoinDetails, setIsLoadingCoinDetails] = useState(false);
  const [addCoinLoading, setAddCoinLoading] = useState(false);

  const [globalError, setGlobalError] = useState<string | null>(null);
  const [detailViewError, setDetailViewError] = useState<string | null>(null);

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> cdcf72b (add wireframe)
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const savedNotifications = localStorage.getItem('cryptoNotifications');
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [lastVolatilityNotificationTimestamps, setLastVolatilityNotificationTimestamps] = useState<Record<string, number>>(() => {
    const savedTimestamps = localStorage.getItem('lastVolatilityNotificationTimestamps');
    return savedTimestamps ? JSON.parse(savedTimestamps) : {};
  });
  
  const notificationPanelRef = useRef<HTMLDivElement>(null);
  const notificationIndicatorRef = useRef<HTMLButtonElement>(null);

<<<<<<< HEAD
=======
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)

  useEffect(() => {
    localStorage.setItem('cryptoPortfolio', JSON.stringify(portfolio));
  }, [portfolio]);

<<<<<<< HEAD
  useEffect(() => {
    localStorage.setItem('cryptoNotifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('lastVolatilityNotificationTimestamps', JSON.stringify(lastVolatilityNotificationTimestamps));
  }, [lastVolatilityNotificationTimestamps]);

  // Click outside handler for notification panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationPanelRef.current &&
        !notificationPanelRef.current.contains(event.target as Node) &&
        notificationIndicatorRef.current &&
        !notificationIndicatorRef.current.contains(event.target as Node) 
      ) {
        setShowNotificationPanel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const addNotification = useCallback((
    type: Notification['type'], 
    message: string, 
    relatedCoinId?: string, 
    action?: NotificationAction
  ) => {
    const newNotification: Notification = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      message,
      timestamp: Date.now(),
      isRead: false,
      relatedCoinId,
      action
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 49)]); // Keep max 50 notifications
  }, []);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;


  const generateErrorMessage = (baseMessage: string, error: unknown): string => {
    let fullMessage = baseMessage;
    if (error instanceof Error && error.message.toLowerCase().includes('failed to fetch')) {
      fullMessage += ` This often indicates a network issue, a browser extension (like an ad-blocker) interfering, or a VPN/proxy problem. Please check your connection, try disabling extensions, and ensure your network allows access to api.coingecko.com.`;
    }
     // Add as error notification
    addNotification('error', `${baseMessage} ${ error instanceof Error ? error.message : ''}`);
    return fullMessage;
  };

  const handleSelectCoinFromNotification = (coinId: string) => {
    handleSelectCoin(coinId);
    setShowNotificationPanel(false); // Close panel after action
  };

  const fetchMarketDataForPortfolio = useCallback(async () => {
    if (portfolio.length === 0) {
      setMarketData({});
=======
<<<<<<< HEAD
  const fetchMarketDataForPortfolio = useCallback(async () => {
    if (portfolio.length === 0) {
      setMarketData({}); // Clear market data if portfolio is empty
=======
  useEffect(() => {
    localStorage.setItem('cryptoNotifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('lastVolatilityNotificationTimestamps', JSON.stringify(lastVolatilityNotificationTimestamps));
  }, [lastVolatilityNotificationTimestamps]);

  // Click outside handler for notification panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationPanelRef.current &&
        !notificationPanelRef.current.contains(event.target as Node) &&
        notificationIndicatorRef.current &&
        !notificationIndicatorRef.current.contains(event.target as Node) 
      ) {
        setShowNotificationPanel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const addNotification = useCallback((
    type: Notification['type'], 
    message: string, 
    relatedCoinId?: string, 
    action?: NotificationAction
  ) => {
    const newNotification: Notification = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      message,
      timestamp: Date.now(),
      isRead: false,
      relatedCoinId,
      action
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 49)]); // Keep max 50 notifications
  }, []);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;


  const generateErrorMessage = (baseMessage: string, error: unknown): string => {
    let fullMessage = baseMessage;
    if (error instanceof Error && error.message.toLowerCase().includes('failed to fetch')) {
      fullMessage += ` This often indicates a network issue, a browser extension (like an ad-blocker) interfering, or a VPN/proxy problem. Please check your connection, try disabling extensions, and ensure your network allows access to api.coingecko.com.`;
    }
     // Add as error notification
    addNotification('error', `${baseMessage} ${ error instanceof Error ? error.message : ''}`);
    return fullMessage;
  };

  const handleSelectCoinFromNotification = (coinId: string) => {
    handleSelectCoin(coinId);
    setShowNotificationPanel(false); // Close panel after action
  };

  const fetchMarketDataForPortfolio = useCallback(async () => {
    if (portfolio.length === 0) {
      setMarketData({});
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
      return;
    }
    setIsLoadingPortfolio(true);
    setGlobalError(null);
    try {
      const coinIds = portfolio.map(item => item.id);
      const fetchedDataArray = await fetchCoinsMarketData(coinIds);
      const newMarketData = fetchedDataArray.reduce((acc, data) => {
        acc[data.id] = data;
        return acc;
      }, {} as Record<string, CoinGeckoMarketData>);
      setMarketData(prevData => ({...prevData, ...newMarketData}));

<<<<<<< HEAD
      const updatedTimestamps = { ...lastVolatilityNotificationTimestamps };
      let newNotificationsAdded = false;

      setPortfolio(prevPortfolio => 
        prevPortfolio.map(item => {
          const data = newMarketData[item.id];
=======
<<<<<<< HEAD
      // Update portfolio items with names and symbols if missing
      setPortfolio(prevPortfolio => 
        prevPortfolio.map(item => {
          const data = newMarketData[item.id];
          if (data && (!item.name || !item.symbol)) {
            return { ...item, name: data.name, symbol: data.symbol };
=======
      const updatedTimestamps = { ...lastVolatilityNotificationTimestamps };
      let newNotificationsAdded = false;

      setPortfolio(prevPortfolio => 
        prevPortfolio.map(item => {
          const data = newMarketData[item.id];
>>>>>>> cdcf72b (add wireframe)
          if (data) {
            // Volatility check
            const isCurrentlyVolatile = Math.abs(data.price_change_percentage_24h) > VOLATILITY_THRESHOLD;
            const lastNotifiedTime = updatedTimestamps[data.id];
            const VOLATILITY_NOTIFICATION_COOLDOWN = 1 * 60 * 60 * 1000; // 1 hour

            if (isCurrentlyVolatile && (!lastNotifiedTime || Date.now() - lastNotifiedTime > VOLATILITY_NOTIFICATION_COOLDOWN)) {
              const direction = data.price_change_percentage_24h > 0 ? 'increased' : 'decreased';
              addNotification(
                'warning', 
                `${data.name} is volatile! Price ${direction} by ${data.price_change_percentage_24h.toFixed(2)}% in 24h.`,
                data.id,
                { label: `View ${data.symbol.toUpperCase()}`, onAction: () => handleSelectCoinFromNotification(data.id) }
              );
              updatedTimestamps[data.id] = Date.now();
              newNotificationsAdded = true;
            }
            
            // Update portfolio item with names and symbols if missing
            if (!item.name || !item.symbol) {
              return { ...item, name: data.name, symbol: data.symbol };
            }
<<<<<<< HEAD
=======
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
          }
          return item;
        })
      );
<<<<<<< HEAD
      
      if(newNotificationsAdded) {
        setLastVolatilityNotificationTimestamps(updatedTimestamps);
      }

    } catch (error) {
      console.error('Failed to fetch market data for portfolio:', error);
      const baseMsg = 'Could not load market data.';
      setGlobalError(generateErrorMessage(baseMsg, error));
=======
<<<<<<< HEAD

    } catch (error) {
      console.error('Failed to fetch market data for portfolio:', error);
      setGlobalError('Could not load market data. Please check your connection or try again later.');
=======
      
      if(newNotificationsAdded) {
        setLastVolatilityNotificationTimestamps(updatedTimestamps);
      }

    } catch (error) {
      console.error('Failed to fetch market data for portfolio:', error);
      const baseMsg = 'Could not load market data.';
      setGlobalError(generateErrorMessage(baseMsg, error));
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
    } finally {
      setIsLoadingPortfolio(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
<<<<<<< HEAD
  }, [portfolio.map(p => p.id).join(','), addNotification, lastVolatilityNotificationTimestamps]); 
=======
<<<<<<< HEAD
  }, [portfolio.map(p => p.id).join(',')]); // Depend on a string representation of portfolio IDs
=======
  }, [portfolio.map(p => p.id).join(','), addNotification, lastVolatilityNotificationTimestamps]); 
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)

  useEffect(() => {
    fetchMarketDataForPortfolio();
  }, [fetchMarketDataForPortfolio]);

<<<<<<< HEAD
=======
<<<<<<< HEAD
  // Periodically refresh market data
=======
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (portfolio.length > 0) {
        console.log("Refreshing market data...");
        fetchMarketDataForPortfolio();
      }
<<<<<<< HEAD
    }, 60000); 
=======
<<<<<<< HEAD
    }, 60000); // Refresh every 60 seconds
=======
    }, 60000); 
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
    return () => clearInterval(intervalId);
  }, [fetchMarketDataForPortfolio, portfolio.length]);


  const handleAddCoin = async (id: string, quantity: number) => {
    setAddCoinLoading(true);
    setGlobalError(null);
    
    const existingCoin = portfolio.find(coin => coin.id === id);
    if (existingCoin) {
<<<<<<< HEAD
      const message = `"${id}" is already in your portfolio. You can adjust quantity or remove and re-add.`;
      setGlobalError(message);
      addNotification('warning', message, id);
=======
<<<<<<< HEAD
      setGlobalError(`"${id}" is already in your portfolio. You can adjust quantity or remove and re-add.`);
=======
      const message = `"${id}" is already in your portfolio. You can adjust quantity or remove and re-add.`;
      setGlobalError(message);
      addNotification('warning', message, id);
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
      setAddCoinLoading(false);
      return;
    }

    try {
<<<<<<< HEAD
      const initialDataArray = await fetchCoinsMarketData([id]);
      if (initialDataArray.length === 0) {
        const message = `Coin ID "${id}" not found. Please ensure you're using the correct CoinGecko ID.`;
        setGlobalError(message);
        addNotification('error', message);
=======
<<<<<<< HEAD
      // Fetch initial data to confirm coin exists and get name/symbol
      const initialDataArray = await fetchCoinsMarketData([id]);
      if (initialDataArray.length === 0) {
        setGlobalError(`Coin ID "${id}" not found. Please ensure you're using the correct CoinGecko ID (e.g., "bitcoin", "ethereum", "the-open-network" for Toncoin). Check CoinGecko's website for the exact ID if unsure.`);
=======
      const initialDataArray = await fetchCoinsMarketData([id]);
      if (initialDataArray.length === 0) {
        const message = `Coin ID "${id}" not found. Please ensure you're using the correct CoinGecko ID.`;
        setGlobalError(message);
        addNotification('error', message);
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
        setAddCoinLoading(false);
        return;
      }
      const coinInfo = initialDataArray[0];
      
      setPortfolio(prev => [...prev, { id, quantity, name: coinInfo.name, symbol: coinInfo.symbol }]);
<<<<<<< HEAD
      addNotification('success', `${coinInfo.name} (${coinInfo.symbol.toUpperCase()}) added to portfolio.`, id, { label: `View ${coinInfo.symbol.toUpperCase()}`, onAction: () => handleSelectCoinFromNotification(id) });
      
    } catch (error) {
      console.error('Error adding coin:', error);
      const baseMsg = `Failed to add coin "${id}".`;
      setGlobalError(generateErrorMessage(baseMsg, error));
=======
<<<<<<< HEAD
      // Market data will be updated by the useEffect hook that watches `portfolio`
    } catch (error) {
      console.error('Error adding coin:', error);
      // This error occurs if fetchCoinsMarketData itself fails (e.g. network error, API server error)
      setGlobalError(`Failed to add coin "${id}". This could be due to a network problem or an issue with the CoinGecko API. Please try again later.`);
=======
      addNotification('success', `${coinInfo.name} (${coinInfo.symbol.toUpperCase()}) added to portfolio.`, id, { label: `View ${coinInfo.symbol.toUpperCase()}`, onAction: () => handleSelectCoinFromNotification(id) });
      
    } catch (error) {
      console.error('Error adding coin:', error);
      const baseMsg = `Failed to add coin "${id}".`;
      setGlobalError(generateErrorMessage(baseMsg, error));
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
    } finally {
      setAddCoinLoading(false);
    }
  };

  const handleRemoveCoin = (id: string) => {
<<<<<<< HEAD
    const coinToRemove = portfolio.find(c => c.id === id);
=======
<<<<<<< HEAD
=======
    const coinToRemove = portfolio.find(c => c.id === id);
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
    setPortfolio(prev => prev.filter(coin => coin.id !== id));
    setMarketData(prev => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });
<<<<<<< HEAD
    if (coinToRemove) {
      addNotification('info', `${coinToRemove.name} (${coinToRemove.symbol.toUpperCase()}) removed from portfolio.`, id);
    }
    if (selectedCoinId === id) {
      setSelectedCoinId(null); 
=======
<<<<<<< HEAD
    if (selectedCoinId === id) {
      setSelectedCoinId(null); // Close detail view if removed coin was selected
=======
    if (coinToRemove) {
      addNotification('info', `${coinToRemove.name} (${coinToRemove.symbol.toUpperCase()}) removed from portfolio.`, id);
    }
    if (selectedCoinId === id) {
      setSelectedCoinId(null); 
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
    }
  };

  const handleSelectCoin = async (id: string) => {
    setSelectedCoinId(id);
    setIsLoadingCoinDetails(true);
    setDetailViewError(null);
    try {
      if (!detailedCoinData[id]) {
        const detailData = await fetchCoinDetailData(id);
        setDetailedCoinData(prev => ({ ...prev, [id]: detailData }));
      }
<<<<<<< HEAD
=======
<<<<<<< HEAD
       // Ensure market data is also fresh for the selected coin, if not already loaded
=======
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
      if (!marketData[id]) {
        const market = await fetchCoinsMarketData([id]);
        if (market.length > 0) {
            setMarketData(prev => ({...prev, [id]: market[0]}));
        }
      }
    } catch (error) {
      console.error(`Error fetching details for ${id}:`, error);
<<<<<<< HEAD
      const coinName = marketData[id]?.name || detailedCoinData[id]?.name || id;
      const baseMsg = `Failed to load details for ${coinName}.`;
      setDetailViewError(generateErrorMessage(baseMsg, error));
=======
<<<<<<< HEAD
      setDetailViewError(`Failed to load details for ${marketData[id]?.name || id}. Please check your connection or try again.`);
=======
      const coinName = marketData[id]?.name || detailedCoinData[id]?.name || id;
      const baseMsg = `Failed to load details for ${coinName}.`;
      setDetailViewError(generateErrorMessage(baseMsg, error));
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
    } finally {
      setIsLoadingCoinDetails(false);
    }
  };

  const handleCloseDetailView = () => {
    setSelectedCoinId(null);
    setDetailViewError(null);
  };
  
  const currentMarketDataForDetailView = selectedCoinId ? marketData[selectedCoinId] : null;
  const currentDetailedDataForDetailView = selectedCoinId ? detailedCoinData[selectedCoinId] : null;


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6">
<<<<<<< HEAD
      <header className="w-full max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            🛡️ Crypto Sentinel
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">Your personal crypto portfolio tracker and insights dashboard.</p>
        </div>
        <div className="relative"> {/* Removed ref from this div */}
            <NotificationIndicator 
                ref={notificationIndicatorRef} // Pass ref here
                unreadCount={unreadNotificationCount} 
                onClick={() => setShowNotificationPanel(prev => !prev)} 
            />
        </div>
=======
<<<<<<< HEAD
      <header className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
          🛡️ Crypto Sentinel
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">Your personal crypto portfolio tracker and insights dashboard.</p>
>>>>>>> cdcf72b (add wireframe)
      </header>
      
      {/* Notification Panel - positioned relative to its parent or viewport */}
      {showNotificationPanel && (
        <div ref={notificationPanelRef}>
            <NotificationPanel
                notifications={notifications}
                onDismiss={dismissNotification}
                onMarkAsRead={markNotificationAsRead}
                onClearAll={clearAllNotifications}
                onClose={() => setShowNotificationPanel(false)}
            />
        </div>
      )}

<<<<<<< HEAD

      {globalError && !showNotificationPanel && <ErrorMessage message={globalError} onDismiss={() => setGlobalError(null)} />}
=======
      {globalError && <ErrorMessage message={globalError} onDismiss={() => setGlobalError(null)} />}
=======
      <header className="w-full max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            🛡️ Crypto Sentinel
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">Your personal crypto portfolio tracker and insights dashboard.</p>
        </div>
        <div className="relative"> {/* Removed ref from this div */}
            <NotificationIndicator 
                ref={notificationIndicatorRef} // Pass ref here
                unreadCount={unreadNotificationCount} 
                onClick={() => setShowNotificationPanel(prev => !prev)} 
            />
        </div>
      </header>
      
      {/* Notification Panel - positioned relative to its parent or viewport */}
      {showNotificationPanel && (
        <div ref={notificationPanelRef}>
            <NotificationPanel
                notifications={notifications}
                onDismiss={dismissNotification}
                onMarkAsRead={markNotificationAsRead}
                onClearAll={clearAllNotifications}
                onClose={() => setShowNotificationPanel(false)}
            />
        </div>
      )}


      {globalError && !showNotificationPanel && <ErrorMessage message={globalError} onDismiss={() => setGlobalError(null)} />}
>>>>>>> ea2fb85 (final code)
>>>>>>> cdcf72b (add wireframe)
      
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PortfolioForm onAddCoin={handleAddCoin} isLoading={addCoinLoading} />
          <PortfolioTable
            portfolio={portfolio}
            marketData={marketData}
            onRemoveCoin={handleRemoveCoin}
            onSelectCoin={handleSelectCoin}
            isLoading={isLoadingPortfolio && portfolio.length > 0}
          />
        </div>
        
        <div className="lg:col-span-1 relative">
          {selectedCoinId && (
            <CoinDetailView
              coinId={selectedCoinId}
              marketData={currentMarketDataForDetailView}
              detailedData={currentDetailedDataForDetailView}
              onClose={handleCloseDetailView}
              isLoadingDetails={isLoadingCoinDetails}
              detailError={detailViewError}
            />
          )}
          {!selectedCoinId && (
            <div className="sticky top-6 p-6 bg-gray-800 rounded-lg shadow-md h-96 flex flex-col items-center justify-center text-center">
                <span className="text-5xl mb-4">🧐</span>
                <h3 className="text-xl font-semibold text-white mb-2">Coin Details</h3>
                <p className="text-gray-400">Select a coin from your portfolio to view detailed information, security insights, and recent news.</p>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Crypto data by <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">CoinGecko</a>. "Recent News" feed uses a mocked gRPC service for demonstration.</p>
        <p>&copy; {new Date().getFullYear()} Crypto Sentinel. For informational purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
