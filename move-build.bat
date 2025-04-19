REM This script is used to move the build folder to the public documentation directory,
REM where it will be used by Next.js as part of the website build process.

@echo off

set "DESTINATION=..\public\documentation"

if exist "%DESTINATION%" (
  rmdir /s /q "%DESTINATION%"
)

set "FOLDER_TO_MOVE=build"

if exist "%FOLDER_TO_MOVE%" (
  move "%FOLDER_TO_MOVE%" "%DESTINATION%"
)
