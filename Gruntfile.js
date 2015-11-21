module.exports = function (grunt) {
	//описываем конфигурацию 
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'), //подгружаем package.json, чтобы использовать его данные

	    concat: {  //описываем работу плагина конкатенации
	    	dist: {
	    		src: ['dev/js/owl.carousel.min.js', 'dev/js/waypoints.min.js', 'dev/js/readmore.min.js', 'dev/js/front.js'],  // какие файлы конкатенировать
	    		dest: 'dest/js/build.js'  // куда класть файл, который получиться после процесса конкатенации 
	    	}
	    },

	    uglify: {  //описываем работу плагина минификации js - uglify.
	    	options: {
	    		stripBanners: true,
	    		banner: '/* <%= pkg.name %> - v<%= pkg.version %> */\n' //комментарий который будет в минифицированном файле.
	    	},

	    	build: {
	    		src: 'dest/js/build.js',  // какой файл минифицировать
	    		dest: 'dest/js/build.min.js' // куда класть файл, который получиться после процесса минификации
	    	}
	    },

	    cssmin: { //описываем работу плагина минификации и конкатенации css.
	    	with_banner: {
	    		options: {
	    			banner: '/*  minified CSS */'  //комментарий который будет в output файле.
	    		},

	    		files: {
	    			'dest/css/style.min.css' : ['dev/css/jquery-ui.min.css', 'dev/css/style.turquoise.css', 'dev/css/custom.css']   // первая строка - output файл. массив из строк, какие файлы конкатенировать и минифицировать.
	    		}
	    	}
	    },

	    watch: { //описываем работу плагина слежки за файлами.
	    	scripts: {
		    	files: ['dev/js/*.js'],  //следить за всеми js файлами в папке src
		    	tasks: ['concat', 'uglify']  //при их изменении запускать следующие задачи
	    	},
	    	css: {
		    	files: ['dev/css/*.css'], //следить за всеми css файлами в папке src
		    	tasks: ['cssmin'] //при их изменении запускать следующую задачу
	    	}
	    },


	});

	//подгружаем необходимые плагины
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-remove-logging');


	//регистрируем задачу 
	grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'watch']); 
	
};