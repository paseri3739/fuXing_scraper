# fuXing_scraper for "Twitter"

This script allows you to get img URL list for downloading corresponding to your search query.

# install and setup

```
$ npm install
$ tsc
```
then make .env file in root,
```
USER_NAME=username
PASSWORD=password
```

# how to use

playwright automatically login to your account then search. After searching, you can scroll manually to get URL.json.
I won't implement automatic scrolling because Twitter bans automation without it's paid API.
You can use your URL list for some process, which can do "without login".
