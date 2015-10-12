'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var webdriver = require('selenium-webdriver'),
  By = require('selenium-webdriver').By,
  until = require('selenium-webdriver').until;

describe('GET /api/devices', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/devices')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  //it('should start Selenium' , function(done){
  //
  //
  //
  //  var driver = new webdriver.Builder()
  //    .forBrowser('firefox')
  //    .build();
  //
  //  driver.get('http://www.google.com/ncr');
  //  driver.findElement(By.name('q')).sendKeys('webdriver');
  //  driver.findElement(By.name('btnG')).click();
  //  driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  //  driver.quit();
  //
  //})



});

