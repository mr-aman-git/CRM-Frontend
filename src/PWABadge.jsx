import React from "react";
import "./PWABadge.css";
import { useRegisterSW } from "virtual:pwa-register/react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, X, WifiOff, Zap } from "lucide-react";

function PWABadge() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      console.log("SW Registered");
    },
    onRegisterError(error) {
      console.error("SW registration error", error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <AnimatePresence>
      {(offlineReady || needRefresh) && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="pwa-toast-container"
          role="alert"
        >
          <div className="pwa-toast-content">
            <div className="pwa-icon-section">
              {offlineReady ? (
                <div className="pwa-icon-bg bg-emerald-100 text-emerald-600">
                  <WifiOff size={20} />
                </div>
              ) : (
                <div className="pwa-icon-bg bg-blue-100 text-blue-600">
                  <Zap size={20} />
                </div>
              )}
            </div>

            <div className="pwa-text-section">
              <h4 className="pwa-title">
                {offlineReady ? "Offline Ready" : "Update Available"}
              </h4>
              <p className="pwa-description">
                {offlineReady
                  ? "App is cached and ready to work offline."
                  : "A new version is available for a better experience."}
              </p>
            </div>

            <div className="pwa-actions">
              {needRefresh && (
                <button
                  className="pwa-btn pwa-btn-primary"
                  onClick={() => updateServiceWorker(true)}
                >
                  <RefreshCw size={14} className="mr-1" /> Reload
                </button>
              )}
              <button className="pwa-btn pwa-btn-close" onClick={close}>
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PWABadge;
