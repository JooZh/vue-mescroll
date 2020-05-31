<template>
    <div ref="mescroll" class="mescroll">
        <slot name="header"></slot>
        <template v-if="viewItemComponent">
            <div>
                <component 
                    v-for="(item, index) in listData" 
                    :is="viewItemComponent" 
                    :key="keyName?item[keyName]:index" 
                    :item="item" 
                />
            </div>
        </template>
         <template v-else>
             <slot></slot>
         </template>
        <slot name="footer"></slot>
    </div>
</template>

<script>
import MeScroll from 'mescroll.js';
import { getConfig } from './config.js';
import 'mescroll.js/mescroll.min.css';

const PAGINATION = {
    pageSize: { name: 'rows', value: 10 },
    pageNumber: { name: 'page', value: 1 },
    totalElements: { name: 'totalElements', value: 0 },
    content: { name: 'content', value: [] }
};
export default {
    name: 'MeScrollVue',
    props: {
        autoInit:{
            type: Boolean,
            required: false,
            description: '是否自动初始化组件',
            default: true
        },
        // 下拉刷新参数
        enableRefresh:{
            type: Boolean,
            required: false,
            description: '是否开启下拉刷新',
            default: false
        },
        autoRefresh: {
            type: Boolean,
            required: false,
            description: '是否自动下拉刷新加载数据，下拉加载和上拉加载只开启一个',
            default: false
        },
        // 分页加载参数
        enablePagination:{
            type: Boolean,
            required: false,
            description: '是否开启分页加载',
            default: true
        },
        autoLoad: {
            type: Boolean,
            required: false,
            description: '是否自动加载第一页数据，，下拉加载和上拉加载只开启一个',
            default: true
        },
        paginationAlias: {
            type: Object,
            required: false,
            description: '设置分页参数',
            default: () => { return {} }
        },

        // 数据加载
        loadDataCallBack: {
            type: Function,
            required: false,
            description: '加载数据的方法, 是一个promise',
            default: null
        },
        queryParams: {
            type: Object,
            required: false,
            description: '加载数据参数',
            default: null
        },
        watchQueryChange: {
            type: Boolean,
            required: false,
            description: '是否监听参数的变化, 自动重新加载数据',
            default: false
        },

        dataHandle: {
            type: Function,
            required: false,
            description: '当返回的数据不正确的时候进行数据处理，并且返回',
            default: data=>data
        },

        // 其他参数
        onScroll: {
            type: Function,
            required: false,
            description: '监听滚动，获取scrollTop的值',
            default: null
        },
        // 全部配置
        downConfig:{
            type: Object,
            required: false,
            description: '下拉刷新配置参数',
            default: null
        },
        upConfig:{
            type: Object,
            required: false,
            description: '上拉加载配置参数',
            default: null
        },
        
        // 分页渲染可选功能
        viewItemComponent: {
            type: Object,
            required: false,
            description: '列表元素组件，用于自动渲染',
            default: null
        },
        getData:{
            type: Function,
            required: false,
            description: '获取数据,根据使用场景获取分页数据或者是基本数据',
            default: null
        },
        keyName:{
            type: String,
            required: false,
            description: '列表渲染指定的 v-for 的 key 名称, 默认取index',
            default: null
        },
    },
    data() {
        return {
            pagination: {},
            resData: {},
            listData: [],
            mescroll: null,
            lastScrollTop: 0, // 路由切换时滚动条的位置
            lastBounce: null, // 路由切换时是否禁止ios回弹,
            isRefresh:false,
        };
    },
    computed: {
        // 获取分页参数
        pageSizeObj() {
            return this.paginationAlias.pageSize || PAGINATION.pageSize;
        },
        pageNumberObj() {
            return this.paginationAlias.pageNumber || PAGINATION.pageNumber;
        },
        totalElementsObj() {
            return this.paginationAlias.totalElements || PAGINATION.totalElements;
        },
        contentObj() {
            return this.paginationAlias.content || PAGINATION.content;
        }
    },
    created() {
        // 根据条件判断是否开启watch监听
        if (this.watchQueryChange) {
            this.$watch('queryParams', (newData, oldData) => {
                this.mescroll && this.reload();
            }, { deep: true });
        }
        if (!this.autoInit){
             this.$watch('autoInit', (newData, oldData) => {
                this.init()
            }, { deep: true });
        }
    },
    mounted() {
        if(this.autoInit){
            this.init()
        }
    },
    methods: {
        init(){
            if(this.enablePagination){
                this.initPagination()
            }
            this.$nextTick(() => {
                this.initMeScroll();
            });
        },
        // 初始化或者重置分页参数
        initPagination() {
            this.pagination[this.pageSizeObj.name] = this.pageSizeObj.value || 10;
            this.pagination[this.pageNumberObj.name] = this.pageNumberObj.value || 1;
            this.pagination[this.totalElementsObj.name] = this.totalElementsObj.value || 0;
        },
        // 初始化mescroll
        initMeScroll() {
            if (this.mescroll) return;
            this.mescroll = new MeScroll(this.$refs.mescroll, getConfig(this));
        },
        reload() {
            if(this.enablePagination){
                this.initPagination();
                this.isRefresh = true;
            }
            this.mescroll.resetUpScroll()
        },
        loadPagination() {
            let query = { ...this.queryParams };
            query[this.pageSizeObj.name] = this.pageSizeObj.value;
            query[this.pageNumberObj.name] = this.pagination[this.pageNumberObj.name];

            this.loadDataCallBack(query).then(resData => {
                if(this.isRefresh){
                    this.listData = [];
                    this.isRefresh = false;
                }
                // 额外的数据处理
                this.resData = this.dataHandle(resData);
                this.pagination[this.pageNumberObj.name]++;
                this.pagination[this.totalElementsObj.name] = this.resData[this.totalElementsObj.name];
                this.listData = this.listData.concat(this.resData[this.contentObj.name]);
                this.getData && this.getData(this.listData)
                this.mescroll.endBySize(
                    this.resData[this.contentObj.name].length,
                    Number(this.resData[this.totalElementsObj.name])
                );
            });
        },
        loadData(){
            let query = { ...this.queryParams };
            this.loadDataCallBack(query).then(resData => {
                console.log(resData.data)
                // 手动处理数据
                this.resData = this.dataHandle(resData);
                this.getData && this.getData(this.resData)
                this.mescroll.endSuccess();
            });
        },
        beforeRouteEnter() {
            if (this.mescroll) {
                // 滚动到之前列表的位置
                if (this.lastScrollTop) {
                    this.mescroll.setScrollTop(this.lastScrollTop);
                    setTimeout(() => { // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
                        this.mescroll.setTopBtnFadeDuration(0); // 设置回到顶部按钮显示时无渐显动画
                    }, 16);
                }
                // 恢复到之前设置的isBounce状态
                if (this.lastBounce != null) this.mescroll.setBounce(this.lastBounce);
            }
        },
        beforeRouteLeave() {
            if (this.mescroll) {
                this.lastScrollTop = this.mescroll.getScrollTop(); // 记录当前滚动条的位置
                this.mescroll.hideTopBtn(0); // 隐藏回到顶部按钮,无渐隐动画
                this.lastBounce = this.mescroll.optUp.isBounce; // 记录当前是否禁止ios回弹
                this.mescroll.setBounce(true); // 允许bounce
            }
        }
    }
};
</script>

<style>
</style>
