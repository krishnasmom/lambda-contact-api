Basic Lambda Contact Function
=============================

This is part of my article series about hosting a website on S3. Related blog
posts:

- [Configure Amazon S3 to host a static web application](http://justinfox.me/#/articles/4)
- [Configure a CloudFront distribution to deliver application content](http://justinfox.me/#/articles/5)

# How to push to lambda

````
npm install
zip -r website-api-lambda-contact.zip ./
aws lambda update-function-code --function-name website-api-lambda-contact --zip-file fileb:////full//path//to//zip//website-api-lambda-contact.zip
````
