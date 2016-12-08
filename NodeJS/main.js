var https = require('https');
var request = require('request');

(function () {
    'use strict';

    var db_list = [];
    var notice = false;
    var env = require('jsdom').env;
    var idx = 1;
    var html = '';
    var ResponseHandler = function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            html += chunk;
        });
    };

    run();
    notice = true;
    setInterval(run, 10 * 60 * 1000);

    function run() {
        var req = https.request({
            host: 'www.ptt.cc',
            port: '443',
            method: 'GET',
            path: '/bbs/soho/index.html'
        }, ResponseHandler);
        req.end();

        
        req.on('close', function (chunk) {
            env(html, function (errors, window) {
                var $ = require('jquery')(window);
                var list = $('.r-ent');
                for (var i=0; i<list.length; i++) {
                    var title = list.eq(i).find('.title a').text();
                    var href = list.eq(i).find('.title a').attr('href');
                    var date = list.eq(i).find('.meta .date').text();
                    var author = list.eq(i).find('.meta .author').text();
                    if ((title.indexOf('徵才') != -1) || title.indexOf('詢價') != -1) {
                        var msg = date + ': ' + title + ' : ' + author;
                        if (db_list.indexOf(msg) == -1) {
                            $.get('https://script.google.com/macros/s/AKfycbyVUCBEkuhNZ2OZ3Mg3RYfMFbnKUrCasVlLHTUyK2Lr2g25cCX0/exec', {
                                title: msg,
                                content: 'https://www.ptt.cc' + href
                            });
                            console.log({
                                title: msg,
                                content: 'https://www.ptt.cc' + href
                            });
                            // var r = https.request({
                            //     host: 'script.google.com',
                            //     method: 'GET',
                            //     data: {
                            //         name: 'test'
                            //     },
                            //     path: '/macros/s/AKfycbyVUCBEkuhNZ2OZ3Mg3RYfMFbnKUrCasVlLHTUyK2Lr2g25cCX0/exec'
                            // }, function (res) {
                            //     res.setEncoding('utf8');
                            //     res.on('data', function (chunk) {
                            //         html += chunk;
                            //     });
                            // });
                            // r.end();

                            db_list.push(msg);
                            if (notice) {
                                // push
                            }
                        } else {

                        }
                        // console.log(href);
                    }
                }

                // console.log(db_list);
            });
        });
    }
}());

//  https://www.ptt.cc/bbs/soho/M.1481120191.A.A86.html