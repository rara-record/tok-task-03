#! /bin/bash

currentDirectory="$(pwd)"

osascript - "${currentDirectory}" <<EOF 
on run {currentDirectory}
  tell application "Terminal"
    do script "cd " & (quoted form of currentDirectory) & " && cd next-page-init && pnpm i && pnpm dev"
  end tell
end run
EOF

osascript - "${currentDirectory}" <<EOF 
on run {currentDirectory}
  tell application "Terminal"
    do script "cd " & (quoted form of currentDirectory) & " && cd servers/http-mock-server && pnpm i && pnpm start:dev"
  end tell
end run
EOF