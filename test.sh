#! /bin/bash

root_dir=$(cd `dirname $0` && pwd -P)
mkdir -p "$root_dir/demo/components"
cp -rf "$root_dir/src/skeleton" "$root_dir/demo/components/"
