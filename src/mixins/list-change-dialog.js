/**
 * 在table-panel 上加上 selectedIds="hadSelectRow"
 */
export default {
    props: {
        isDialog: {
            type: Boolean,
            default: false
        },
        keyId: {
            type: String,
            default: 'id'
        }
    },
    data () {
        return {
            hadSelectRow: []
        }
    },
    methods: {
        setSelectRow (rows) {
            this.hadSelectRow = rows
        },
        getSelectRow () {
            return this.selectRows
        }
    }
}
