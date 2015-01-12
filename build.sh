#!/bin/bash
set -ex
BOOTSTRAP=$HOME/dev/workspace/github/ui/bootstrap/
BOOTSWATCH_YETI=$HOME/dev/workspace/github/ui/bootswatch/yeti/
JQ=$HOME/dev/workspace/github/js/jquery/jquery/
YUE=$HOME/dev/workspace/github/uexim/yue.less/
DIR0=$PWD


# copy bootstrap
cd $BOOTSTRAP
cp -R dist/* $DIR0/assets/bootstrap

# copy bootswatch yeti theme
cd $BOOTSWATCH_YETI
cp bootstrap.css $DIR0/assets/bootstrap/css
cp bootstrap.min.css $DIR0/assets/bootstrap/css

# copy yue.css
cd $YUE
cp yue.min.css $DIR0/assets/css

# build & copy jquery
cd $JQ
git pull origin master
#sudo npm install
grunt
cp -R dist/* $DIR0/assets/js
