/*!
 * Module dependencies.
 */

var InjectorTransform = require('../../lib/util/injector-transform'),
    util = require('util'),
    fs = require('fs'),
    path = require('path');

/*!
 * Specification.
 */

describe('Injector Transform', function() {
    var options, injectorTransform;

    beforeEach(function() {
        options = {
            appID: '1234',
            autoreload: false,
            console: false,
            deploy: false,
            homepage: false,
            isBrowser: false,
            proxy: false,
            push: false,
            refresh: false,
            req: {
                headers: {
                    host: '127.0.0.1'
                }
            }
        };

        injectorTransform = new InjectorTransform(options);
    });
    
    it('should return an object', function() {
        expect(injectorTransform).toEqual(jasmine.any(Object));
    });

    it('should replace CSP', function(done) {
        var cspCordovaStream = fs.createReadStream(path.join(__dirname, '../fixture/app-with-csp/www/index.html'), 'utf-8');
        var cspTestString = /<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self' data: gap: https:\/\/ssl.gstatic.com 'unsafe-eval' \* ws:;style-src 'self' 'unsafe-inline' data: blob:;media-src \*;script-src \* 'unsafe-inline' 'unsafe-eval' data: blob:;\">/;
        var injectorStream = cspCordovaStream.pipe(injectorTransform)
        injectorStream.setEncoding('utf-8');
        injectorStream.on('data', function(chunk) {
            expect(chunk).toMatch(cspTestString);
            done();
        })

    });

    it('should add CSP when none is present', function(done) {
        var cspCordovaStream = fs.createReadStream(path.join(__dirname, '../fixture/app-without-csp/www/index.html'), 'utf-8');
        var cspTestString = /<meta http-equiv=\"Content-Security-Policy\" content=\"default-src \* gap: ws: https:\/\/ssl.gstatic.com;style-src 'self' 'unsafe-inline' data: blob:;script-src \* 'unsafe-inline' 'unsafe-eval' data: blob:;\"/;
        var injectorStream = cspCordovaStream.pipe(injectorTransform)
        injectorStream.setEncoding('utf-8');
        injectorStream.on('data', function(chunk) {
            expect(chunk).toMatch(cspTestString);
            done();
        })

    });

});
