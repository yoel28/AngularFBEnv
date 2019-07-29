const writeFile = require('fs').writeFile;
const readFile = require('fs').readFile;
const argv = require('yargs').argv;

require('dotenv').config();

const environment = argv.environment;
const isProd = environment === 'prod';

const sourcePath = './src/environments/environment.ts';
const targetPath = `./src/environments/environment.${environment}.ts`;

const FBApiKey = 'Firebase.apiKey';
const FBAuthDomain = 'Firebase.authDomain';
const FBDatabaseURL = 'Firebase.databaseURL';
const FBProjectId = 'Firebase.projectId';
const FBStorageBucket = 'Firebase.storageBucket';
const FBMessagingSenderId = 'Firebase.messagingSenderId';
const FBAppId = 'Firebase.appId';
read();

function read() {
  readFile(sourcePath, 'utf8', (err, data) => {
    if (err) {
      throw Error(err);
    }

    data = data.replace(FBApiKey, process.env[FBApiKey] || '')
      .replace(FBAuthDomain, process.env[FBAuthDomain] || '')
      .replace(FBDatabaseURL, process.env[FBDatabaseURL] || '')
      .replace(FBProjectId, process.env[FBProjectId] || '')
      .replace(FBStorageBucket, process.env[FBStorageBucket] || '')
      .replace(FBMessagingSenderId, process.env[FBMessagingSenderId] || '')
      .replace(FBAppId, process.env[FBAppId] || '')
      .replace('production: false', 'production: ' + isProd);

    write(data);
  });
}

function write(content: string) {
  writeFile(targetPath, content, (err) => {
    if (err) {
      throw Error(err);
    }
    console.log(`Output generated at ${targetPath}`);
  });
}
