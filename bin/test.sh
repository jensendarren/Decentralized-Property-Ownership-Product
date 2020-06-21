#!/bin/bash

set -e

cd eth-contracts
touch .secret
ganache-cli -p 8545 --gasLimit 10000000 2> /dev/null 1> /dev/null &
sleep 5 # to make sure ganache-cli is up and running before compiling
rm -rf build
truffle compile
truffle migrate --reset --network development
truffle test
kill -9 $(lsof -t -i:8545)