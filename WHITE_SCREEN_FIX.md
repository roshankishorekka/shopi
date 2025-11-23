# 🔧 WHITE SCREEN FIX GUIDE

## If you're seeing a white screen, follow these steps:

### QUICK FIX (Try these first):

#### Step 1: Hard Refresh Browser
Press **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R** (Mac)
This clears the cache and reloads.

#### Step 2: Clear Browser Cache
1. Open DevTools: Press **F12**
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

#### Step 3: Check Browser Console
1. Press **F12** to open DevTools
2. Click "Console" tab
3. Look for red error messages
4. Share the error message if you see one

#### Step 4: Restart Dev Server
```bash
# Stop all running servers (Ctrl+C in each terminal)
# Then start fresh:
npm run dev -- --port 5178
```

#### Step 5: Open in Incognito/Private Window
- Chrome: Ctrl + Shift + N  
- Firefox: Ctrl + Shift + P
- This tests without cache/extensions

### COMMON CAUSES:

1. **Browser Cache** - Old JavaScript cached
   - Solution: Hard refresh (Ctrl + Shift + R)

2. **JavaScript Error** - Check console (F12)
   - Solution: Look for error in console

3. **Wrong Port** - Server not running on 5178
   - Solution: Check terminal for actual port

4. **Module Not Found** - Missing dependency
   - Solution: Run `npm install`

### DETAILED TROUBLESHOOTING:

#### If console shows "Failed to load module":
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
npm run dev -- --port 5178
```

#### If console shows "Unexpected token":
- There's a syntax error in the code
- Check the file mentioned in the error

#### If nothing in console:
1. Check network tab (F12 → Network)
2. Refresh page
3. Look for failed requests (red)
4. Check if index.html loaded

### TEST IF SERVER IS RUNNING:

Open new terminal and run:
```bash
curl http://localhost:5178
```

Should return HTML. If not, server isn't running.

### NUCLEAR OPTION (If nothing else works):

```bash
# Kill all node processes
taskkill /F /IM node.exe

# Clean everything
rm -rf node_modules
rm -rf dist
rm -rf .vite

# Reinstall
npm install

# Rebuild
npm run dev -- --port 5178
```

### WHAT TO CHECK:

1. ✅ Is dev server running? (Check terminal)
2. ✅ Are there errors in console? (F12)
3. ✅ Is correct URL? (http://localhost:5178)
4. ✅ Is another app using port 5178?

### MOST LIKELY FIX:

**Just press Ctrl + Shift + R to hard refresh!**

The browser is probably showing a cached version from before the latest changes.

---

## If still white screen, check:

1. Open http://localhost:5178 in browser
2. Press F12
3. Go to Console tab
4. Take a screenshot of any errors
5. Share that screenshot

The error message will tell us exactly what's wrong!
