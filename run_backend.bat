@echo off
echo Starting Smart Milk Delivery Backend...

cd backend

call venv\Scripts\activate.bat

python manage.py runserver

pause