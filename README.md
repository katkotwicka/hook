

## Local SetUp
**Make sure your node version is ^14.18.3**

you can switch the version using [nvm](https://github.com/nvm-sh/nvm), then:

```
nvm install 14.18.3
nvm use 14.18.3
```

To run the app:
`npm start`

# Testing

By default, the table is sorted by the index number. 
To sort by the numeric columns, please remember to add encoded value of the `+` character, ex.:

### 300m+
http://localhost:3000/?sortBy=300m%2B

### Telecom Towers
http://localhost:3000/?sortBy=Telecom%20Towers



Thanks for taking the time to look at it, feel free to reach out to me with any questions and most important - feedback :) 
