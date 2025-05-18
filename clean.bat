@echo off
echo Cleaning up build artifacts...

if exist .next (
  echo Removing .next directory...
  rd /s /q .next
)

if exist out (
  echo Removing out directory...
  rd /s /q out
)

if exist cache (
  echo Removing cache directory...
  rd /s /q cache
)

if exist node_modules\.cache (
  echo Removing node_modules\.cache directory...
  rd /s /q node_modules\.cache
)

echo Clean completed!
