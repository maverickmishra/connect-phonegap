(function(window) {
    var socket = io('http://' + document.location.host);
    var previousConsole = window.console || {};
    window.console = {
        log:function(){
            if(previousConsole.log) {
                previousConsole.log.apply(previousConsole, arguments);
            }
            socket.emit('console','log', Array.prototype.slice.call(arguments).join('\t'));
        },
        warn:function(){
            if(previousConsole.warn) {
                previousConsole.warn.apply(previousConsole, arguments);
            }
            socket.emit('console','warn', Array.prototype.slice.call(arguments).join('\t'));
        },
        error:function(){
            if(previousConsole.error) {
                previousConsole.error.apply(previousConsole, arguments);
            }
            socket.emit('console','error', Array.prototype.slice.call(arguments).join('\t'));
        },
        assert:function(assertion) {
            if(previousConsole.assert) {
                previousConsole.assert.apply(previousConsole, arguments);
            }
            if(assertion){
                socket.emit('console','assert', Array.prototype.slice.call(arguments, 1).join('\t'));
            }
        }
    }
})(window);
