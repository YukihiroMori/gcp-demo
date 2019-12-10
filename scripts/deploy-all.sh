for filepath in $(ls ./functions); do
  bash ./functions/$filepath/deploy.sh
done