import Mock from 'mockjs'
const random = Mock.Random
const MockList = Mock.mock({
    'items|28': [
        {
            'id|+1': 1,
            code: () => random.integer(1000000, 200000),
            name: () => random.cname(3, 6),
            price: () => random.float(1, 100, 0, 2),
            desc: () => random.csentence(10, 20),
            count: () => random.integer(10, 200),
            'status|1': [0, 1, 2, 3],
            'updateTime|1': [
                '2019-01-09',
                '2019-02-09',
                '2019-03-09',
                '2019-04-09',
                '2019-05-09'
            ],
            category: {
                id: () => random.integer(1, 200),
                name: () => random.cname(3, 6)
            }
        }
    ]
})
const list = MockList.items
export const getList = (params) => {
    const { name } = params.productVo || {}
    const resultList = list.filter(
        (item) => !name || item.name.indexOf(name) > -1
    )
    const total = resultList.length
    const pageSize = params ? params.size : 10
    const pageNum = params ? params.current : 1
    const result = resultList.slice(
        pageSize * (pageNum - 1),
        pageSize * pageNum
    )
    return {
        result: {
            records: result,
            total: total,
            current: pageNum,
            size: pageSize
        },
        code: '1'
    }
}

export const save = (params) => {
    const id = list.length + 1
    list.push({ id, name: params.name, price: params.price })
    return {
        result: id,
        code: '1'
    }
}

export const update = (params) => {
    const index = list.findIndex((item) => item.id === params.id)
    list[index] = Object.assign(list[index], params)
    return {
        result: list[index],
        code: '1'
    }
}

export const get = (id) => {
    const obj = list.find((item) => item.id === id)
    return {
        result: obj,
        code: '1'
    }
}

export const deleteItem = (id) => {
    const index = list.findIndex((item) => item.id === id)
    const arr = list.splice(index, 1)
    return {
        result: arr.length ? arr[0] : null,
        code: '1'
    }
}
