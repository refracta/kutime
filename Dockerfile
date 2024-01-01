FROM node:14

WORKDIR /usr/src
ENV TZ=Asia/Seoul
RUN apt-get -y update && apt install tzdata cron tmux -y
