#!/bin/sh

react-app-rewired build
rm -rf ./public/manaco/ || true
mkdir ./public/monaco/
cp -r ./build/monaco/ ./public/monaco/
