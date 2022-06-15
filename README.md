# Bitcoin App
I had the urge to add a shit-ton of comments everywhere, but that's an example project, so... maybe in the future.

## Production URL
http://bitcoinapp-env.eba-c7cshmw2.us-east-1.elasticbeanstalk.com

## How to run on local environment
Use `docker-compose up` to create and run the containers. The Alphavantage API key received as an environment variable, and therefore you should pass it along with the command.

For example:

`ALPHAVANTAGE_API_KEY=*THE_KEY* docker-compose -f docker-compose.dev.yml up`
