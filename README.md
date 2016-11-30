Basic Lambda Contact Function
=============================

This is part of my article series about hosting a website on S3. Related blog
posts:

- [Configure Amazon S3 to host a static web application](https://justinfox.me/articles/aws-s3-for-basic-websites)
- [Configure a CloudFront distribution to deliver application content](https://justinfox.me/articles/aws-cloudfront-speed-up-your-s3-website)
- [Configure API Gateway to deliver dynamic functionality to S3 hosted websites](https://justinfox.me/articles/aws-api-gateway-and-lambda-basics)

# How to push to lambda

````
npm install
zip -r website-api-lambda-contact.zip ./
aws lambda update-function-code --function-name website-api-lambda-contact --zip-file fileb:////full//path//to//zip//website-api-lambda-contact.zip
````
