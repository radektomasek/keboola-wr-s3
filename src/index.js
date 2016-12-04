'use strict';
import AWS from 'aws-sdk';
import path from 'path';
import command from './lib/helpers/cliHelper';
import { getConfig } from './lib/helpers/configHelper';
import { uploadFiles } from './lib/helpers/s3Helper';
import { parseConfiguration } from './lib/helpers/keboolaHelper';
import { CONFIG_FILE, DEFAULT_OUTPUT_DIR, INPUT_TABLES_DIR } from './lib/constants';

const CONFIG = getConfig(path.join(command.data, CONFIG_FILE));
const SOURCE_DIR = path.join(command.data, INPUT_TABLES_DIR);

(async() => {
  try {
    // Read the input configuration.
    const {
      region,
      bucketName,
      remotePath,
      inputFiles,
      accessKeyId,
      compressOutput,
      fileNameExtension,
      secretAccessKey
    } = await parseConfiguration(CONFIG);
    // Set AWS environment.
    AWS.config.update({ accessKeyId, secretAccessKey, region });
    // Process the files selected in the KBC.
    const result = await Promise.all(
      uploadFiles(
        AWS,
        SOURCE_DIR,
        { inputFiles, bucketName, remotePath, fileNameExtension, compressOutput }
      )
    );
    console.log(`${result.length} file(s) uploaded successfully!`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
