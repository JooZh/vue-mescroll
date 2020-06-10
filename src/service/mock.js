
import qs from 'querystringify';

// 采用正则匹配，方便传递get参数
const mockApi = {
    getPagination: /\/api\/get-pagination/,
    getData: /\/api\/get-data/,
    getProducts: /\/api\/get-products/
};

// 本地请求响应太快，接口统一延迟1秒在返回，模拟加载
Mock.setup({
    timeout: 1000
})

// 新闻的分页格式
Mock.mock(mockApi.getPagination, (options)=>{
    console.log(options)
    const query = qs.parse(options.url.split('?')[1]);
    let pageSize = query.rows-0
    let pageNumber = query.page-0
    let totalElements = 30;
    let totalPages = Math.ceil(totalElements / pageSize)

    let content = Mock.mock({
        'data|10': [{
            'id|+1': pageNumber ===1 ? 1 : pageNumber*10,
            'title': '新闻标题',
            'content': '@cparagraph'
        }]
    })
    return {
        status:0,
        statusInfo: {
            message: "成功"
        },
        data: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalElements: totalElements,
            first: pageNumber === 1,
            totalPages: totalPages,
            last: pageNumber === totalPages,
            content: content.data
        }
    }
})
// 新闻的非分页格式
Mock.mock(mockApi.getData, (options)=>{
    let content = Mock.mock({
        'data|10': [{
            'id|+1': 1,
            'title': '新闻标题',
            'content': '@cparagraph'
        }]
    })
    return {
        status:0,
        statusInfo: {
            message: "成功"
        },
        data: content.data
    }
})
// 商品的分页格式
Mock.mock(mockApi.getProducts, (options)=>{
    console.log(options)
    const query = qs.parse(options.url.split('?')[1]);
    let pageSize = query.rows-0
    let pageNumber = query.page-0
    let totalElements = 30;
    let totalPages = Math.ceil(totalElements / pageSize)

    let content = Mock.mock({
        'data|10': [{
            'id|+1': pageNumber ===1 ? 1 : pageNumber*10,
            'img': '/static/mock/img/pd3.jpg',
            'name': '商品名字商品名字商品名字商商品名字商',
            'price': 112,
            'sold':'30',
        }]
    })
    return {
        status:0,
        statusInfo: {
            message: "成功"
        },
        data: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalElements: totalElements,
            first: pageNumber === 1,
            totalPages: totalPages,
            last: pageNumber === totalPages,
            content: content.data
        }
    }
})