@echo off

echo Starting Smart Milk Delivery System...

start cmd /k run_backend.bat
timeout /t 5
start cmd /k run_frontend.bat

echo Backend and Frontend started successfully!
pause