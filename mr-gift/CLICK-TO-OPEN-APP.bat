@echo off
echo 🎁 Opening Mr Gift Application...
echo.
echo Looking for HTML files...
if exist "OPEN-THIS-FILE.html" (
    echo ✅ Found demo file! Opening in browser...
    start "" "OPEN-THIS-FILE.html"
) else if exist "index.html" (
    echo ✅ Found main app! Opening in browser...
    start "" "index.html"
) else (
    echo ❌ HTML files not found in current directory
    echo Please navigate to the mr-gift folder first
)
echo.
pause
