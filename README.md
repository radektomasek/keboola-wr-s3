# Keboola Writer for S3

A S3 Keboola Connect Writer component that handles data writing from KBC storage to Amazon S3. Written in Node.js with utilization of Babel/ES6/ES7 functionality.

## Settings

Configuration is very straightforward. One has to select input files from Keboola Storage, put credentials and you are all set. The possible options are described below.

### Table selection

A Keboola helper for Table Input Mapping selection is enabled. It's a GUI component that simplify the input table selection and enabled some advanced functionality like columns specification. Feel free to experiment with this.

### S3 settings

The configuration structure for the S3 Writer is very straightforward and there is a GUI helper that helps you to prepare the configuration. Check out the summary in the list below.

* S3 Access Key Id - s3 access key, a part of the credentials.
* S3 Secret Access Key - s3 secret access key, a part of the credentials, will be encrypted.
* S3 Bucket Name - s3 bucket name.
* S3 Region - s3 region, default value set to us-east-1.  
* S3 Remote Path - path in S3, default value set to /kbc_upload.
* Append datetime - true/false, helps with adding datetime information as a part of filename, default value set to false.  
* Datetime position - prefix/postfix, helps you to set the datetime position.
* Datetime format - any ISO date format, default set to YYYYMMDD_HHmmss.
* Compress output - true/false, helps with compression of the output files, default value set to false.

### Credentials

The most important parameters are **S3 Access Key Id**, **S3 Secret Access Key**, **S3 Bucket Name**. There must be a non-empty value for each of these parameter in the input configuration. If not, the execution will failed.

### Region settings

The default value is set to **us-east-1** for AWS region. This should be fine for the most configurations, but you can play with region settings a little bit more and provide a different value based on Amazon API Gateway options. If you are interested in, please follow the [AWS documentation](http://docs.aws.amazon.com/general/latest/gr/rande.html#apigateway_region) for more details.    

### Datetime configuration

The output may contain a datetime prefix or postfix. If there is an attribute **Append datetime** in the configuration and is set to **true**, the output file(s) will contain that information. The date position (prefix or postfix) depends on the parameter **Datetime position**. If value **prefix** is set, the date will appear at the beginning of the filename. Value **postfix** tail the date at the end of the filename. No other value for **Datetime position** is allowed! You can also customize the date format (the default value is YYYYMMDD_HHmmss). If you want to do it, just update **Datetime format** parameter and specify any ISO 8601 string. There is a great library [Moment.js](http://momentjs.com/docs/#/parsing/string) that helps with parsing. You can find some examples of valid ISO strings in [this documentation](http://momentjs.com/docs/#/parsing/string/).

### Compression

You can also enable the gzip compression and reduce the size of the output files. Just set **Compress output** param in the configuration to **true**.
