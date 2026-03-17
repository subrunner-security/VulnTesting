// Intentional command injection vulnerability

const { exec } = require("child_process");

function runBackup(filename) {
  exec("tar -czf backup.tar.gz " + filename);
}

function pingHost(host) {
  exec("ping -c 4 " + host, (err, stdout) => {
    console.log(stdout);
  });
}

module.exports = { runBackup, pingHost };
