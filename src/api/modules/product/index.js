/**
 * 产品
 */
import fetch from '@/utils/fetch'
const baseUrl = '/api/product'
export default {
    // 新增产品
    addProduct (params = {}) {
        return fetch(`${baseUrl}/save`, params, { method: 'post' })
    },
    // 根据id查询
    getProductById (params) {
        return fetch(`${baseUrl}/get`, params, { method: 'post' })
    },
    // 更新产品
    updateProduct (params = {}) {
        return fetch(`${baseUrl}/update`, params, { method: 'post' })
    },
    // 删除产品
    deleteProductById (id) {
        return fetch(`${baseUrl}/${id}`, '', { method: 'delete' })
    },
    // 批量删除产品
    deleteProductBatch (params) {
        return fetch(`${baseUrl}/deleteBatch`, params, { method: 'post' })
    },
    // 查询产品
    productList (params = {}) {
        return fetch(`${baseUrl}/page`, params, { method: 'post' })
    },
    // 多条件分页查询带出关联对象
    productCascadeList (params = {}) {
        return fetch(`${baseUrl}/productCascadePage`, params, {
            method: 'post'
        })
    },
    // 根据id查询明细，并带出关联Category对象
    getProductCascade (params = {}) {
        return fetch(`${baseUrl}/getCascade`, params, { method: 'post' })
    }
}
