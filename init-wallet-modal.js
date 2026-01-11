/**
 * Initialize Wallet Modal and Buy Buttons Override
 * Add this script to your index.html after loading the wallet and buy buttons scripts
 */

document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit for the existing BuyButtonsOverride to be initialized (if present)
  setTimeout(function() {
    // Initialize the existing buy buttons override
    if (window.buyButtonsOverride && typeof window.buyButtonsOverride.init === 'function') {
      console.log('Initializing existing BuyButtonsOverride instance');
      window.buyButtonsOverride.init();
    }
  }, 500);

  // Make wallet modal globally accessible (will be used by buy-buttons-override.js)
  window.walletModal = window.walletModal || {};

  // Listen for wallet events
  window.addEventListener('walletConnected', function(e) {
    console.log('Wallet connection event received:', e.detail);
  });

  window.addEventListener('purchaseStarted', function(e) {
    console.log('Purchase started:', e.detail);
  });

  window.addEventListener('purchaseCompleted', function(e) {
    console.log('Purchase completed:', e.detail);
  });

  window.addEventListener('purchaseFailed', function(e) {
    console.log('Purchase failed:', e.detail);
  });
});

// Helper function to manually open wallet modal
function openWalletModal() {
  if (window.walletModal) {
    window.walletModal.open();
  }
}

// Helper function to manually trigger purchase
function triggerPurchase(buttonElement) {
  if (window.buyButtonsOverride) {
    window.buyButtonsOverride.handleBuyClick(buttonElement, null);
  }
}

// Helper function to check if wallet is connected
function isWalletConnected() {
  return window.walletModal ? window.walletModal.isConnected() : false;
}

// Helper function to get connected wallet
function getConnectedWallet() {
  return window.walletModal ? window.walletModal.getConnectedWallet() : null;
}
