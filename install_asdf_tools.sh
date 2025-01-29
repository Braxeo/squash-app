#!/bin/bash

# Read .tool-versions and install missing plugins
cut -d ' ' -f 1 ~/.tool-versions | while read -r plugin; do
  if ! asdf plugin-list | grep -q "^$plugin$"; then
    echo "Adding missing plugin: $plugin"
    asdf plugin add "$plugin"
  fi
done

# Install all tools
asdf install