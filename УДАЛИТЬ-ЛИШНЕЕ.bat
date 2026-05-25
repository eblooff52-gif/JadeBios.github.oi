@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Удаляю node_modules и пустые папки...
if exist node_modules rmdir /s /q node_modules
if exist views rmdir /s /q views
if exist js rmdir /s /q js
if exist img rmdir /s /q img
echo Готово. Для GitHub останутся только файлы в корне.
pause
