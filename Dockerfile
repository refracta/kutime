FROM node:14
EXPOSE 3000

WORKDIR /usr/src
ENV TZ=Asia/Seoul
RUN apt-get -y update && apt install tzdata cron tmux -y
