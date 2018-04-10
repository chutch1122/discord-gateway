var http = require('http');
var httpProxy = require('http-proxy');

var port = 8080;
var url = 'https://github.com/chutch1122/discord-gateway';
var version = '1.0.0';
var custom = '';

if (process.env.DISCORD_GATEWAY_PORT) {
    port = process.env.DISCORD_GATEWAY_PORT;
}

if (process.env.DISCORD_GATEWAY_VERSION) {
    url = process.env.DISCORD_GATEWAY_VERSION;
}

if (process.env.DISCORD_GATEWAY_URL) {
    url = process.env.DISCORD_GATEWAY_URL;
}

if (process.env.DISCORD_GATEWAY_CUSTOM) {
    custom = ' / ' + process.env.DISCORD_GATEWAY_CUSTOM;
}

var header = 'DiscordBot (' + url + ', ' + version + ')' + custom;

var proxy = httpProxy.createProxyServer({
    changeOrigin: true
});

proxy.on('proxyReq', function (proxyRequest) {
    proxyRequest.setHeader('User-Agent', header);
});

var server = http.createServer(function (request, response) {
    console.log('Forwarding request to: ' + request.url);
    proxy.web(request, response, {target: 'https://discordapp.com'});
});

console.log('Discord gateway listening on port ' + port);
console.log('Will append User-Agent header "' + header + '"');
server.listen(port);
