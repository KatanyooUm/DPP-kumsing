#!/bin/sh
if [ "$#" -eq 0 ]; then
echo "No arguments supplied"
else
printf '%s\n' "$@" | head -n 3
fi
