/* jshint node: true, esnext: true */

'use strict';
const colors = require('colors');

module.exports = function(grunt) {
  grunt.initConfig({
    aws: grunt.file.readJSON('.grunt-aws.json'),
    s3: {
      options: {
        key: '<%= aws.key %>',
        secret: '<%= aws.secret %>',
        bucket: '<%= aws.bucket %>',
        access: 'public-read',
        headers: {
          "Cache-Control": "max-age=630720000, public",
          "Expires": new Date(Date.now() + 63072000000).toUTCString(),
        },
      },
      default: {
        upload: [
          { src: './build/*', dest: '/' },
          { src: './build/static/css/*', dest: '/static/css' },
          { src: './build/static/js/*', dest: '/static/js' },
          { src: './build/static/media/*', dest: '/static/media' }
        ]
      }
    },
  });

  grunt.registerTask('log-s3-info', function () {
    grunt.log.write(colors.blue("S3 Bucket: ") + grunt.config('aws').bucket);
  });
  grunt.loadNpmTasks('grunt-s3');
  grunt.registerTask('deploy', ['log-s3-info', 's3']);
};
