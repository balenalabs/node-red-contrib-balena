var request = require('request');
var lockFile = require('lockfile');
var msg;
module.exports = function(RED) {
    function unlockUpdates(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.on('input', function(msg) {
          lockFile.unlock('/tmp/balena/updates.lock', function(error) {
            if (error) {
              node.error("An error occurred: " + error);
              msg = {
                  payload: false
              };
              node.send(msg);
              return;
            }
            msg = {
                payload: "updates unlocked"
            };
            node.send(msg);
          });
        });
    }
    RED.nodes.registerType("unlock", unlockUpdates);
};
