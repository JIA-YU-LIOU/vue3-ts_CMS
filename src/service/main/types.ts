// 分頁查詢條件，指定查詢資料的起始位置與每頁顯示筆數
export interface IPageQuery {
  offset: number
  size: number
}

// 分頁查詢條件外，允許額外傳入其他查詢條件
export type IPageQueryParams = IPageQuery & Record<string, unknown>

// 部門資料
export interface IDepartment {
  id: number
  name: string
  parentId: number | null
  createAt: string
  updateAt: string
  leader: string
}

// 角色資料
export interface IRole {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
  menuList: IMenu[]
}

// 選單資料
export interface IMenu {
  id: number
  name: string
  type: number
  url: string
  icon?: string
  sort: number
  permission?: string
  children: IMenu[] | null
}

// 使用者表單資料
export interface IUserFormData {
  name: string
  realname: string
  password: string
  cellphone: string
  roleId: number | string
  departmentId: number | string
}

// 商品金額統計資料
export interface IGoodsAmount {
  amount: string
  title: string
  tips: string
  subtitle: string
  number1: number
  number2: number
}

// 商品數量統計資料
export interface IGoodsCount {
  id: number
  name: string
  goodsCount: number
}

// 商品收藏統計資料
export interface IGoodsFavor {
  id: number
  name: string
  goodsFavor: number
}

// 各地區銷售統計資料
export interface IAddressSale {
  address: string
  count: number
}
