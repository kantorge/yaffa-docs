# This script moves the build folder to the public documentation directory,
# where it will be used by Next.js as part of the website build process.

$destination = "..\public\documentation"

if (Test-Path $destination) {
  Remove-Item -Recurse -Force $destination
}

$folderToMove = "build"

if (Test-Path $folderToMove) {
  Move-Item -Path $folderToMove -Destination $destination
}
