export function getConfig(vm){
    
    // let upDefaultConfig = {
    //     use: true, // 是否初始化上拉加载; 默认true
    //     auto: true, // 是否在初始化时以上拉加载的方式自动加载第一页数据; 默认true
    //     isLock: false, // 是否锁定上拉,默认false
    //     isBoth: false, // 上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认false,两者不可同时触发; 这里为了演示改为true,不必等列表加载完毕才可下拉;
    //     isBounce: true, // 是否允许ios的bounce回弹;默认true,允许回弹; 此处配置为false,可解决微信,QQ,Safari等等iOS浏览器列表顶部下拉和底部上拉露出浏览器灰色背景和卡顿2秒的问题
    //     callback: null, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
    //     page: {
    //         num: 0, // 当前页 默认0,回调之前会加1; 即callback(page)会从1开始
    //         size: 10, // 每页数据条数
    //         time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
    //     },
    //     noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
    //     offset: 100, // 离底部的距离开始刷新
    //     toTop: {
    //         // 回到顶部按钮,需配置src才显示
    //         warpId: null, // 父布局的id; 默认添加在body中
    //         src: null, // 图片路径,默认null;
    //         html: null, // html标签内容,默认null; 如果同时设置了src,则优先取src
    //         offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
    //         warpClass: 'mescroll-totop', // 按钮样式,参见mescroll.css
    //         showClass: 'mescroll-fade-in', // 显示样式,参见mescroll.css
    //         hideClass: 'mescroll-fade-out', // 隐藏样式,参见mescroll.css
    //         fadeDuration: 0.5, // 回到顶部按钮的显示隐藏动画时长,默认0.5秒. (注意:showClass和hideClass设置的动画时长不会生效.)
    //         duration: 300, // 回到顶部的动画时长,默认300ms
    //         supportTap: false, // 如果您的运行环境支持tap,则可配置true;
    //         btnClick: null // 点击按钮的回调; 小提示:如果在回调里return true,将不执行回到顶部的操作.
    //     },
    //     loadFull: {
    //         use: false, // 列表数据过少,不足以滑动触发上拉加载,是否自动加载下一页,直到满屏或者无更多数据为止;默认false,因为可通过调高page.size或者嵌套mescroll-bounce的div避免这个情况
    //         delay: 500 // 延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
    //     },
    //     empty: {
    //         // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId或clearEmptyId才生效;
    //         warpId: null, // 父布局的id; 如果此项有值,将不使用clearEmptyId的值;
    //         customId: null, // 自定义空布局的id; 如果此项有值,将不使用empty所有配置;空布局的显示隐藏只控制customId元素的显示隐藏;用于完全自定义empty的场景
    //         icon: null, // 图标路径
    //         tip: '~ 空空如也 ~', // 提示
    //         btntext: '', // 按钮
    //         btnClick: null, // 点击按钮的回调
    //         supportTap: false // 如果您的运行环境支持tap,则可配置true;
    //     },
    //     clearId: null, // 加载第一页时需清空数据的列表id; 如果此项有值,将不使用clearEmptyId的值; 使用vue则不能配置此项
    //     clearEmptyId: null, // 相当于同时设置了clearId和empty.warpId; 简化写法,默认null; 使用vue则不能配置此项
    //     hardwareClass: 'mescroll-hardware', // 硬件加速样式,动画更流畅,参见mescroll.css
    //     warpId: null, // 可配置上拉加载的布局添加到指定id的div;默认不配置,默认添加到mescrollId
    //     warpClass: 'mescroll-upwarp', // 容器,装载布局内容,参见mescroll.css
    //     htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>', // 上拉加载中的布局
    //     htmlNodata: '<p class="upwarp-nodata">-- END --</p>', // 无数据的布局
    //     inited: function (mescroll, upwarp) {
    //         // 初始化完毕的回调,可缓存dom 比如 mescroll.upProgressDom = upwarp.getElementsByClassName("upwarp-progress")[0];
    //       },
    //     showLoading: function (mescroll, upwarp) {
    //         // 上拉加载中.. mescroll.upProgressDom.style.display = "block" 不通过此方式显示,因为ios快速滑动到底部,进度条会无法及时渲染
    //         upwarp.innerHTML = mescroll.optUp.htmlLoading;
    //     },
    //     showNoMore: function (mescroll, upwarp) {
    //         // 无更多数据
    //         upwarp.innerHTML = mescroll.optUp.htmlNodata;
    //     },
    //     onScroll: null, // 列表滑动监听,默认null; 例如 onScroll: function(mescroll, y, isUp){ }; //y为列表当前滚动条的位置; isUp=true向上滑,isUp=false向下滑
    //     scrollbar: {
    //         use: isPC, // 默认只在PC端自定义滚动条样式
    //         barClass: 'mescroll-bar'
    //     },
    //     lazyLoad: {
    //         use: false, // 是否开启懒加载,默认false
    //         attr: 'imgurl', // 网络图片地址的属性名 (图片加载成功会自动移除改属性): <img imgurl='网络图  src='占位图''/>
    //         showClass: 'mescroll-lazy-in', // 显示样式,参见mescroll.css
    //         delay: 500, // 列表滚动的过程中每500ms检查一次图片是否在可视区域,如果在可视区域则加载图片
    //         offset: 200 // 超出可视区域200px的图片仍可触发懒加载,目的是提前加载部分图片
    //     }
    // }

    // let downDefaultConfig = {
    //     use: true, // 是否初始化下拉刷新; 默认true
    //     auto: true, // 是否在初始化完毕之后自动执行下拉回调callback; 默认true
    //     autoShowLoading: false, // 如果在初始化完毕之后自动执行下拉回调,是否显示下拉刷新进度; 默认false
    //     isLock: false, // 是否锁定下拉,默认false;
    //     isBoth: false, // 下拉刷新时,如果滑动到列表底部是否可以同时触发上拉加载;默认false,两者不可同时触发;
    //     offset: 80, // 触发刷新的距离,默认80
    //     inOffsetRate: 1, // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    //     outOffsetRate: 0.2, // 超过指定距离范围外时,改变下拉区域高度比例;值小于1且越接近0,越往下拉高度变化越小;
    //     bottomOffset: 20, // 当手指touchmove位置在距离body底部20px范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
    //     minAngle: 45, // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
    //     hardwareClass: 'mescroll-hardware', // 硬件加速样式;解决iOS下拉因隐藏进度条而闪屏的问题,参见mescroll.css
    //     mustToTop: false, // 是否滚动条必须在顶部,才可以下拉刷新.默认false. 当您发现下拉刷新会闪白屏时,设置true即可修复.
    //     warpId: null, // 可配置下拉刷新的布局添加到指定id的div;默认不配置,默认添加到mescrollId
    //     warpClass: 'mescroll-downwarp', // 容器,装载布局内容,参见mescroll.css
    //     resetClass: 'mescroll-downwarp-reset', // 高度重置的动画,参见mescroll.css
    //     textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
    //     textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
    //     textLoading: '加载中 ...', // 加载中的提示文本
    //     htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip"></p>', // 布局内容
    //     callback: function (mescroll) {
    //         // 下拉刷新的回调;默认重置上拉加载列表为第一页
    //         mescroll.resetUpScroll();
    //     },
    //     inited: function (mescroll, downwarp) {
    //         // 初始化完毕的回调,可缓存dom
    //         mescroll.downTipDom = downwarp.getElementsByClassName('downwarp-tip')[0]
    //         mescroll.downProgressDom = downwarp.getElementsByClassName('downwarp-progress')[0]
    //     },
    //     inOffset: function (mescroll) {
    //         // 进入指定距离offset范围内那一刻的回调
    //         if (mescroll.downTipDom) mescroll.downTipDom.innerHTML = mescroll.optDown.textInOffset
    //         if (mescroll.downProgressDom) mescroll.downProgressDom.classList.remove('mescroll-rotate')
    //     },
    //     outOffset: function (mescroll) {
    //         // 下拉超过指定距离offset那一刻的回调
    //         if (mescroll.downTipDom) mescroll.downTipDom.innerHTML = mescroll.optDown.textOutOffset
    //     },
    //     onMoving: function (mescroll, rate, downHight) {
    //         // 下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离offset的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
    //         if (mescroll.downProgressDom) {
    //             var progress = 360 * rate
    //             mescroll.downProgressDom.style.webkitTransform = 'rotate(' + progress + 'deg)'
    //             mescroll.downProgressDom.style.transform = 'rotate(' + progress + 'deg)'
    //         }
    //     },
    //     beforeLoading: function (mescroll, downwarp) {
    //         // 准备触发下拉刷新的回调
    //         return false // 如果要完全自定义下拉刷新,那么return true,此时将不再执行showLoading(),callback();
    //     },
    //     showLoading: function (mescroll) {
    //         // 触发下拉刷新的回调
    //         if (mescroll.downTipDom) mescroll.downTipDom.innerHTML = mescroll.optDown.textLoading
    //         if (mescroll.downProgressDom) mescroll.downProgressDom.classList.add('mescroll-rotate')
    //     },
    //     afterLoading: function (mescroll) {
    //         // 结束下拉之前的回调. 返回延时执行结束下拉的时间,默认0ms; 常用于结束下拉之前再显示另外一小段动画,才去结束下拉的场景, 参考案例【dotJump】
    //         return 0
    //     }
    // }

    let loadData = vm.loadData;
    if(vm.enablePagination){
        loadData = vm.loadPagination
    }
    /**================================
     * 上拉加载配置
     *================================*/
    let upConfig = {};

    let bindUpConfig = {
        auto: vm.autoLoad, // 是否在初始化时以上拉加载的方式自动加载第一页数据; 默认true
        isLock: !vm.enablePagination, // 是否锁定上拉,默认false
        callback: loadData,
        page: {
            num: 0, // 当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: vm.pagination[vm.pageSizeObj.queryName], // 每页数据条数
            time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
        }
    }
    if(vm.onScroll){
        bindUpConfig.onScroll = (mescroll, y, isUp) => {
            vm.onScroll(y, isUp);
        }
    }
    upConfig = bindUpConfig;
    if(vm.upConfig){
        upConfig = Object.assign(bindUpConfig, vm.upConfig)
    } 
    /**================================
     * 下拉加载配置
     *================================*/
    let downConfig = {};
    let bindDownConfig = {
        use: vm.enableRefresh, // 是否启用下拉刷新; 默认true
        auto: vm.autoRefresh, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
        autoShowLoading: vm.autoRefresh,
        callback: vm.reload,
    }
    downConfig = bindDownConfig;
    if(vm.downConfig){
        downConfig = Object.assign(bindDownConfig, vm.downConfig)
    }

    return {
        up: upConfig,
        down: downConfig
    }
}