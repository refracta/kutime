#!/bin/sh
tmux new -d -s server
tmux kill-session -t server 2> /dev/null
tmux send-keys -t server "bash" C-m
tmux send-keys -t server "cd /usr/src" C-m
tmux send-keys -t server "yarn run start" C-m
