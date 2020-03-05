FROM node:13.7-alpine
WORKDIR /workdir
COPY package.json package-lock.json /workdir/
RUN npm install

# types/google-apps-scriptの問題への対応
# 問題箇所を自分でコメントアウトして上書き
# 当該リポジトリのバージョンアップに追従する必要があるが他にいい解決方法が思いつかない
# 参考URL: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/32585
COPY google-apps-script.base.d.ts /workdir/node_modules/@types/google-apps-script/google-apps-script.base.d.ts