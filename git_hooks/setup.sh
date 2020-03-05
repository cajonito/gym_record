#!/bin/sh

CURRENT_DIR=$(cd $(dirname $0); pwd)
GIT_HOOK_DIR=$(cd $(dirname $0);cd ..;pwd)/.git/hooks
for file in $(ls $CURRENT_DIR)
do
  [ $file = 'setup.sh' ] && continue
  ln -fnsv ${CURRENT_DIR}/${file} ${GIT_HOOK_DIR}/${file}
done
