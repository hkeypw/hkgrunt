/ Обязательная обёртка
module.exports = function(grunt) {

    // Задачи
    grunt.initConfig({
        // Склеиваем
        concat: {
            main: {
                src: [
                    'js/libs/jquery.js',
                    'js/mylibs/**/*.js'  // Все JS-файлы в папке
                ],
                dest: 'build/scripts.js'
            }
        },
        // Сжимаем
        uglify: {
            main: {
                files: {
                    // Результат задачи concat
                    'build/scripts.min.js': '<%= concat.main.dest %>'
                }
            }
        }
    });

    // Загрузка плагинов, установленных с помощью npm install
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Задача по умолчанию
    grunt.registerTask('default', ['concat', 'uglify']);
};
