const prettier = require('prettier');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const {execSync} = require('child_process');

const opts = process.argv.slice(2).reduce((opts, arg) => {
  switch (arg) {
    case '-h':
    case '--help':
      opts.showHelp = true;
      break;
    case '-a':
    case '--all':
      opts.allFiles = true;
      break;
    default:
      opts.unknown = arg;
      break;
  }
  return opts;
}, {});

if (opts.unknown) {
  console.error(`Unknown options ${opts.unknown}`);
  process.exit(1);
} else if (opts.showHelp) {
  showHelp();
} else {
  prettify(!opts.allFiles);
}

function showHelp() {
  console.log(`Usage: ${process.argv[0]} [options]`);
  console.log('options:');
  console.log('  -h, --help    Show this help and exit');
  console.log('  -a, --all     Format all files');
}

function prettify(modifiedOnly = true) {
  const projectDir = path.join(__dirname, '..');
  const rcFile = path.join(projectDir, '.prettierrc.json');
  const opts = require(rcFile);

  const cmd =
    'git ls-files ' +
    (modifiedOnly ? '--other --modified' : '') +
    ' --exclude-standard "*.js" "*.jsx" "*.json" | grep -v "^flow-typed"';

  const files = execSync(cmd)
    .toString()
    .split('\n')
    .filter(f => f.length)
    .map(f => path.join(projectDir, f));

  files.forEach(filePath => {
    const inputStr = fs.readFileSync(filePath, 'utf8');
    console.log(`Formatting ${filePath}...`);
    try {
      var outputStr;
      if (/\.json$/i.test(filePath)) {
        outputStr = JSON.stringify(JSON.parse(inputStr), null, 2);
        return;
      } else {
        outputStr = prettier.format(inputStr, opts);
      }
      fs.writeFileSync(filePath, outputStr, 'utf8');
    } catch (e) {
      const isParseError = Boolean(e && e.loc && e.loc.start);
      const isValidationError = /Validation Error/.test(e && e.message);

      if (isParseError) {
        const {line, column} = e.loc.start;
        const message = String(e).replace(/\s*\(\d+:\d+\)$/m, '');
        console.error(`${filePath}:${line}:${column} ${message}`);
      } else if (isValidationError) {
        console.error(String(e));
        // If validation fails for one file, it will fail for all of them.
        process.exit(1);
      } else {
        console.error(filePath + ':', e.stack || e);
      }

      // Don't exit the process if one file failed
      process.exitCode = 2;
      return;
    }
  });
}
