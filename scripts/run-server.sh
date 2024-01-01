#!/bin/sh
tmux kill-session -t server 2> /dev/null
tmux new -d -s server
tmux send-keys -t server "bash" C-m
tmux send-keys -t server "cd /usr/src" C-m
tmux send-keys -t server "yarn run start" C-m
