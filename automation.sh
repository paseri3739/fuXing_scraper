#!/bin/bash

# 引数のパース
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -f|--file_name) file_name="$2"; shift ;;
        *) args="$args $1" ;; # その他の引数を保持
    esac
    shift
done

# `file_name` が指定されているかチェック
if [ -z "$file_name" ]; then
    echo "Error: Output file name is required. Use -f or --file_name to specify it without extension."
    exit 1
fi

# FuXingスクレイパーの実行
node dist/fuXingScraper.js $args -f "${file_name}.json" -h

# コマンドが成功したか確認
if [ $? -ne 0 ]; then
    echo "Error: fuXingScraper failed to run."
    exit 1
fi

# `modify_url.js` の実行
node modify_url.js "${file_name}.json" "${file_name}_large.json"

# `download_from_json.js` の実行
node download_from_json.js "${file_name}_large.json"

