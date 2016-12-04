'use strict';
import moment from 'moment';
import { isEmpty, isUndefined } from 'lodash';
import { DEFAULT_DATE_FORMAT, POSTFIX_DATE_POSITION, DEFAULT_OUTPUT_DIR } from '../constants';
// This function check the input configuration specified in KBC.
// Check whether the required fields are provided.
// Prepare simple output that is going to be used in later phases.
export async function parseConfiguration(configObject) {
  return new Promise((resolve, reject) => {
    const inputFiles = configObject.get('storage:input:tables');
    // If no file is specified, we can stop the processing.
    if (isUndefined(inputFiles) || isEmpty(inputFiles)) {
      reject('No KBC Bucket/Table selected!');
    }
    const accessKeyId = configObject.get('parameters:#s3_access_key_id');
    const secretAccessKey = configObject.get('parameters:#s3_secret_access_key');
    const bucketName = configObject.get('parameters:s3_bucket_name');
    if (isUndefined(accessKeyId) || isUndefined(secretAccessKey) || isUndefined(bucketName)) {
      reject('Missing S3 credentials! Neither accessKeyId, secretAccessKey, nor bucketName specified!');
    }
    // Other params
    const region = configObject.get('parameters:s3_region') || "us-east-1";
    const remotePathParam = configObject.get('parameters:s3_remote_path') || "/";
    const remotePath = remotePathParam === '/' ? DEFAULT_OUTPUT_DIR : remotePathParam;
    const compressOutput = configObject.get('parameters:compress_output') || false;
    const appendDatetime = configObject.get('parameters:append_datetime') || false;
    const datetimePosition = configObject.get('parameters:datetime_position') || POSTFIX_DATE_POSITION;
    const datetimeFormat = configObject.get('parameters:datetime_format') || DEFAULT_DATE_FORMAT;
    // We need to check whether the date based on the input params is a valid date.
    // If not, we can still return a default option.
    const inputDate = moment(moment().format(datetimeFormat)).isValid() ?
      moment().format(datetimeFormat) : moment().format(DEFAULT_DATE_FORMAT);
    // We need to make sure either prefix or suffix is specified for parameters:datetime_position.
    const datePositionCheckExpression = /prefix|postfix/;
    if (!datePositionCheckExpression.test(datetimePosition)) {
      reject(`Invalid value in datetime_position parameter! Only value 'prefix' or 'postfix' allowed! `);
    }
    // If we don't want to append any date pre/post filename, we can return an empty object.
    const fileNameExtension = appendDatetime ? { extensionType: datetimePosition, extensionValue: inputDate } : {};

    resolve({ region,
      bucketName,
      remotePath,
      inputFiles,
      accessKeyId,
      fileNameExtension,
      compressOutput,
      secretAccessKey
    });
  })
}
