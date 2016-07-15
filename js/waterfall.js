/* jshint asi:true */
//先等图片都加载完成
//再执行布局函数

/**
 * 执行主函数
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {

    /**
     * 内容JSON
     */
    var demoContent = [{
        page_link: 'http://xmake.io',
        img_link: '/static/img/xmake/xmake_site.png',
        code_link: 'https://github.com/waruqi/xmake',
        title: 'xmake',
        description: 'XMake is a make-like build utility based on lua.'
    },
    {
        page_link: 'https://github.com/waruqi/tbox',
        img_link: '/static/img/logo2.jpg',
        code_link: 'https://github.com/waruqi/tbox',
        title: 'tbox',
        description: 'TBox is a glib-like cross-platform C library that is simple to use yet powerful in nature.'
    },
    {
        page_link: 'https://github.com/waruqi/gbox',
        img_link: '/static/img/gbox/tiger.svg',
        code_link: 'https://github.com/waruqi/gbox',
        title: 'gbox',
        description: 'GBox is a cross-platform 2d graphic library in c language.'
    },
    {
        page_link: 'https://github.com/waruqi/itrace',
        img_link: '/static/img/itrace/itrace.png',
        code_link: 'https://github.com/waruqi/itrace',
        title: 'itrace',
        description: 'Trace objc method call for ios and mac.'
    },
    {
        page_link: 'https://github.com/waruqi/hnr',
        img_link: '/static/img/hnr/before.png',
        code_link: 'https://github.com/waruqi/hnr',
        title: 'hnr',
        description: 'An off-line handwritten numeral recognition system.'
    }];

    contentInit(demoContent) //内容初始化
    waitImgsLoad() //等待图片加载，并执行布局初始化
}());



/**
 * 内容初始化
 * @return {[type]} [description]
 */
function contentInit(content) {
    // var htmlArr = [];
    // for (var i = 0; i < content.length; i++) {
    //     htmlArr.push('<div class="grid-item">')
    //     htmlArr.push('<a class="a-img" href="'+content[i].page_link+'">')
    //     htmlArr.push('<img src="'+content[i].img_link+'">')
    //     htmlArr.push('</a>')
    //     htmlArr.push('<h3 class="demo-title">')
    //     htmlArr.push('<a href="'+content[i].page_link+'">'+content[i].title+'</a>')
    //     htmlArr.push('</h3>')
    //     htmlArr.push('<p>'+content[i].description)
    //     htmlArr.push('<a href="'+content[i].code_link+'">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>')
    //     htmlArr.push('</p>')
    //     htmlArr.push('</div>')
    // }
    // var htmlStr = htmlArr.join('')
    var htmlStr = ''
    for (var i = 0; i < content.length; i++) {
        htmlStr +=
            '<div class="grid-item">' +
            '   <a class="a-img" href="' + content[i].page_link + '">' +
            '       <img src="' + content[i].img_link + '">' +
            '   </a>' +
            '   <h3 class="demo-title">' +
            '       <a href="' + content[i].page_link + '">' + content[i].title + '</a>' +
            '   </h3>' +
            '   <p>' + content[i].description +
            '       <br><a href="' + content[i].code_link + '">Source Code <i class="fa fa-code" aria-hidden="true"></i></a>' +
            '   </p>' +
            '</div>'
    }
    var grid = document.querySelector('.grid')
    grid.insertAdjacentHTML('afterbegin', htmlStr)
}

/**
 * 等待图片加载
 * @return {[type]} [description]
 */
function waitImgsLoad() {
    var imgs = document.querySelectorAll('.grid img')
    var totalImgs = imgs.length
    var count = 0
        //console.log(imgs)
    for (var i = 0; i < totalImgs; i++) {
        if (imgs[i].complete) {
            //console.log('complete');
            count++
        } else {
            imgs[i].onload = function() {
                // alert('onload')
                count++
                //console.log('onload' + count)
                if (count == totalImgs) {
                    //console.log('onload---bbbbbbbb')
                    initGrid()
                }
            }
        }
    }
    if (count == totalImgs) {
        //console.log('---bbbbbbbb')
        initGrid()
    }
}

/**
 * 初始化栅格布局
 * @return {[type]} [description]
 */
function initGrid() {
    var msnry = new Masonry('.grid', {
        // options
        itemSelector: '.grid-item',
        columnWidth: 250,
        isFitWidth: true,
        gutter: 20,
    })
}