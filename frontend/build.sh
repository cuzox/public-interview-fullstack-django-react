#!/bin/sh

react-app-rewired build
rm -rf ../backend/echo/app/assets/monaco || true
mkdir ../backend/echo/app/assets/monaco
cp -r ./build/assets/monaco/ ../backend/echo/app/assets/monaco/
